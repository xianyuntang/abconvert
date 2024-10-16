import { ClickHouseClient } from '@clickhouse/client';
import { status } from '@grpc/grpc-js';
import { MikroORM } from '@mikro-orm/core';
import { CreateRequestContext, EntityManager } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import {
  CLICKHOUSE_CLIENT_TOKEN,
  GetRunningTestingRequest,
  GetTestingRequest,
  GetTestingResultRequest,
  GetTestingResultResponse,
  GetTestingResultResponse_Statistics,
  StartTestingRequest,
  StopTestingRequest,
} from 'backend-shared';
import dayjs from 'dayjs';
import { EventPayload, EventType, mapToObject } from 'shared';

import { GrpcException } from '../filters';
import {
  ProductRepository,
  TestingRepository,
  VersionRepository,
} from '../orm';

@Injectable()
export class TestingsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    @Inject(CLICKHOUSE_CLIENT_TOKEN)
    private readonly clickhouseClient: ClickHouseClient,
    private readonly productRepository: ProductRepository,
    private readonly testingRepository: TestingRepository,
    private readonly versionRepository: VersionRepository
  ) {}

  @CreateRequestContext()
  async startTesting({ productId, details }: StartTestingRequest) {
    await this.em.transactional(async () => {
      const product = await this.productRepository.findOneOrFail(
        { id: productId },
        { failHandler: () => new GrpcException(status.NOT_FOUND) }
      );
      const primaryVersion = await this.versionRepository.findOneOrFail(
        {
          product: productId,
          primary: true,
        },
        { failHandler: () => new GrpcException(status.NOT_FOUND) }
      );

      const newVersion = this.versionRepository.create({
        product,
        primary: false,
        details: [
          ...details.map((detail: StartTestingRequest['details'][0]) => ({
            key: detail.key,
            value: detail.value,
          })),
        ],
      });

      this.testingRepository.create({
        product: product,
        versionA: primaryVersion,
        versionB: newVersion,
        isRunning: true,
      });
    });
  }

  @CreateRequestContext()
  async getRunningTesting({ productId }: GetRunningTestingRequest) {
    const testing = await this.testingRepository.findOne(
      {
        product: productId,
        isRunning: true,
      },
      { populate: ['versionA', 'versionB'] }
    );
    return {
      id: testing?.id,
      primaryId: testing?.versionA.id,
      testingId: testing?.versionB.id,
    };
  }

  @CreateRequestContext()
  async stopTesting({ productId }: StopTestingRequest) {
    await this.em.transactional(async (em) => {
      const testing = await this.testingRepository.findOneOrFail(
        {
          product: productId,
          isRunning: true,
        },
        { failHandler: () => new GrpcException(status.NOT_FOUND) }
      );

      em.assign(testing, { isRunning: false });
    });
  }

  @CreateRequestContext()
  async getTestingResult({
    productId,
    testingId,
  }: GetTestingResultRequest): Promise<GetTestingResultResponse> {
    const testing = await this.testingRepository.findOneOrFail(
      {
        id: testingId,
        product: productId,
      },
      { populate: ['versionA', 'versionB'] }
    );

    const versionA = await this.clickhouseClient.query({
      query: `select client_id                                                as clientId,
                     testing_id                                               as testingId,
                     version_id                                               as versionId,
                     event_type                                               as eventType,
                     payload,
                     event_date                                               as eventDate
              from events
              where version_id = '${testing.versionA.id}'`,
    });
    const versionB = await this.clickhouseClient.query({
      query: `select client_id                                                as clientId,
                     testing_id                                               as testingId,
                     version_id                                               as versionId,
                     event_type                                               as eventType,
                     payload,
                     event_date                                               as eventDate
              from events
              where version_id = '${testing.versionB.id}'`,
    });

    const primaryEvents = (await versionA.json()).data as EventPayload[];

    const testingEvents = (await versionB.json()).data as EventPayload[];

    const primaryStatistics = await this.computeEventStatistics(primaryEvents);
    const testingStatistics = await this.computeEventStatistics(testingEvents);

    return {
      primary: primaryStatistics,
      testing: testingStatistics,
      clickElements: Array.from(
        new Set([
          ...Object.keys(primaryStatistics.clickMap),
          ...Object.keys(testingStatistics.clickMap),
        ])
      ),
    };
  }

  @CreateRequestContext()
  async getTestings({ productId }: GetTestingRequest) {
    const testings = await this.testingRepository.find(
      {
        product: productId,
      },
      { populate: ['versionA', 'versionB'] }
    );

    return testings.map((testing) => ({
      id: testing.id,
      primaryVersionId: testing.versionA.id,
      testingVersionId: testing.versionB.id,
      createdAt: dayjs(testing.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }));
  }

  private async computeEventStatistics(
    events: EventPayload[]
  ): Promise<GetTestingResultResponse_Statistics> {
    const visits = new Set<string>();
    let timeOnPage = 0;
    const clickMap = new Map<string, number>();

    events.map((event) => {
      if (event.eventType === EventType.Enter) {
        visits.add(event.clientId);
      }
      if (event.eventType === EventType.Stay) {
        timeOnPage += 1;
      }
      if (event.eventType === EventType.Click) {
        const payload = JSON.parse(event.payload as string);
        const eleId = payload['id'];
        clickMap.set(eleId, (clickMap.get(eleId) || 0) + 1);
      }
    });

    return {
      visits: visits.size,
      averageTimeOnPage: visits.size > 0 ? timeOnPage / visits.size : 0,
      clickMap: mapToObject(clickMap),
    };
  }
}

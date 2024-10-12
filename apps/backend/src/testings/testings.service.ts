import { status } from '@grpc/grpc-js';
import { MikroORM } from '@mikro-orm/core';
import { CreateRequestContext, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import {
  CheckTestingStatusRequest,
  StartTestingRequest,
  StopTestingRequest,
} from 'shared';

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
  async checkTestingStatus({ productId }: CheckTestingStatusRequest) {
    const testing = await this.testingRepository.findOne({
      product: productId,
      isRunning: true,
    });
    return { isRunning: testing?.isRunning };
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
}

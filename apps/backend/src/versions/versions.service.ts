import { status } from '@grpc/grpc-js';
import { MikroORM } from '@mikro-orm/core';
import { CreateRequestContext, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { GrpcException } from '../filters';
import {
  ProductRepository,
  TestingRepository,
  VersionRepository,
} from '../orm';

@Injectable()
export class VersionsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    private readonly productRepository: ProductRepository,
    private readonly versionRepository: VersionRepository,
    private readonly testingRepository: TestingRepository
  ) {}

  @CreateRequestContext()
  async listVersions(product: string) {
    return this.versionRepository.find(
      { product },
      {
        populate: ['details'],
      }
    );
  }

  @CreateRequestContext()
  async getPrimaryVersion(product: string) {
    return this.versionRepository.findOneOrFail(
      { product, primary: true },
      {
        populate: ['details'],
        failHandler: () => new GrpcException(status.NOT_FOUND),
      }
    );
  }

  @CreateRequestContext()
  async getVersion(product: string, version: string) {
    return this.versionRepository.findOneOrFail(
      { product, id: version },
      {
        populate: ['details'],
        failHandler: () => new GrpcException(status.NOT_FOUND),
      }
    );
  }

  @CreateRequestContext()
  async getRandomVersion(productId: string) {
    const testing = await this.testingRepository.findOne(
      {
        product: productId,
        isRunning: true,
      },
      { populate: ['versionA.details', 'versionB.details'] }
    );

    if (testing) {
      return Math.random() > 0.5 ? testing.versionA : testing.versionB;
    }

    return this.versionRepository.findOneOrFail(
      {
        product: productId,
        primary: true,
      },
      {
        populate: ['details'],
        failHandler: () => new GrpcException(status.NOT_FOUND),
      }
    );
  }
}

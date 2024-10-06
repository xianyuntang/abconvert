import { status } from '@grpc/grpc-js';
import { MikroORM } from '@mikro-orm/core';
import { CreateRequestContext, EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateVersionRequest } from 'shared';

import { GrpcException } from '../filters';
import { VersionRepository } from '../orm';

@Injectable()
export class VersionsService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
    private readonly versionRepository: VersionRepository
  ) {}

  @CreateRequestContext()
  async createVersion(dto: CreateVersionRequest) {
    const version = this.versionRepository.create({
      product: dto.product,
      details: [
        ...dto.details.map((detail: CreateVersionRequest['details'][0]) => ({
          key: detail.key,
          value: detail.value,
        })),
      ],
    });
    await this.em.persistAndFlush(version);
  }

  @CreateRequestContext()
  async getVersion(product: string) {
    return this.versionRepository.findOneOrFail(
      { product },
      {
        populate: ['details'],
        failHandler: () => new GrpcException(status.NOT_FOUND),
      }
    );
  }
}

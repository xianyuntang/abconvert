import { Metadata } from '@grpc/grpc-js';
import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import dayjs from 'dayjs';
import {
  CreateVersionRequest,
  GetRandomVersionRequest,
  GetRandomVersionResponse,
} from 'shared';

import { GrpcExceptionsFilter } from '../filters';
import { VersionsService } from './versions.service';

@Controller()
@UseFilters(GrpcExceptionsFilter)
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @GrpcMethod('VersionService', 'CreateVersion')
  async createVersion(data: CreateVersionRequest) {
    await this.versionsService.createVersion(data);

    return { message: 'ok' };
  }

  @GrpcMethod('VersionService', 'GetRandomVersion')
  async getRandomVersion(
    { product }: GetRandomVersionRequest,
    metadata: Metadata
  ): Promise<GetRandomVersionResponse> {
    console.log(metadata);
    const response = await this.versionsService.getVersion(product);

    return {
      id: response?.id,
      product: response.product,
      createdAt: dayjs(response.createdAt).toISOString(),
      updatedAt: dayjs(response.updatedAt).toISOString(),
      details: [
        ...response.details.map((detail) => ({
          id: detail.id,
          key: detail.key,
          value: detail.value,
          createdAt: dayjs(detail.createdAt).toISOString(),
          updatedAt: dayjs(detail.updatedAt).toISOString(),
        })),
      ],
    };
  }
}

import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import dayjs from 'dayjs';
import {
  GetSpecifiedVersionRequest,
  GetVersionRequest,
  GetVersionResponse,
  ListVersionsRequest,
  ListVersionsResponse,
} from 'shared';

import { GrpcExceptionsFilter } from '../filters';
import { VersionsService } from './versions.service';

@Controller()
@UseFilters(GrpcExceptionsFilter)
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @GrpcMethod('VersionService', 'ListVersions')
  async listVersions({
    productId,
  }: ListVersionsRequest): Promise<ListVersionsResponse> {
    const response = await this.versionsService.listVersions(productId);

    return {
      data: response.map((version) => {
        return {
          id: version?.id,
          productId: version.product.id,
          createdAt: dayjs(version.createdAt).toISOString(),
          updatedAt: dayjs(version.updatedAt).toISOString(),
          details: [
            ...version.details.map((detail) => ({
              id: detail.id,
              key: detail.key,
              value: detail.value,
              createdAt: dayjs(detail.createdAt).toISOString(),
              updatedAt: dayjs(detail.updatedAt).toISOString(),
            })),
          ],
        };
      }),
    };
  }

  @GrpcMethod('VersionService', 'GetVersion')
  async GetVersion({
    productId,
    versionId,
  }: GetSpecifiedVersionRequest): Promise<GetVersionResponse> {
    console.log(productId, versionId);
    const response = await this.versionsService.getVersion(
      productId,
      versionId
    );

    return {
      id: response?.id,
      productId: response.product.id,
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

  @GrpcMethod('VersionService', 'GetPrimaryVersion')
  async getPrimaryVersion({
    productId,
  }: GetVersionRequest): Promise<GetVersionResponse> {
    const response = await this.versionsService.getPrimaryVersion(productId);

    return {
      id: response?.id,
      productId: response.product.id,
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

  @GrpcMethod('VersionService', 'GetRandomVersion')
  async getRandomVersion({
    productId,
  }: GetVersionRequest): Promise<GetVersionResponse> {
    const response = await this.versionsService.getRandomVersion(productId);

    return {
      id: response?.id,
      productId: response.product.id,
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

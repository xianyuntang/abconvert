import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { VERSION_SERVICE_NAME, VersionServiceClient } from 'backend-shared';

import { BACKEND_PACKAGE_NAME } from '../backend.constant';

@Controller('backend/products/:productId/versions')
export class VersionsController implements OnModuleInit {
  private versionServiceClient!: VersionServiceClient;

  constructor(
    @Inject(BACKEND_PACKAGE_NAME) private readonly clientGrpc: ClientGrpc
  ) {}

  async onModuleInit() {
    this.versionServiceClient =
      this.clientGrpc.getService<VersionServiceClient>(VERSION_SERVICE_NAME);
  }

  @Get('')
  async listVersions(@Param('productId') productId: string) {
    return this.versionServiceClient.listVersions({ productId });
  }

  @Get(':versionId')
  async getVersion(
    @Param('productId') productId: string,
    @Param('versionId') versionId: string
  ) {
    if (versionId === 'primary') {
      return this.versionServiceClient.getPrimaryVersion({ productId });
    } else if (versionId === 'random') {
      return this.versionServiceClient.getRandomVersion({ productId });
    }

    return this.versionServiceClient.getVersion({ productId, versionId });
  }
}

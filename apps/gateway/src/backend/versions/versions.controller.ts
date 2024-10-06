import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Query,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { VersionServiceClient } from 'shared';

import { BACKEND_PACKAGE_TOKEN } from '../backend.constant';
import { CreateVersionRequestDto } from '../dto/create-version.dto';

@Controller('backend/versions')
export class VersionsController implements OnModuleInit {
  private versionServiceClient!: VersionServiceClient;

  constructor(
    @Inject(BACKEND_PACKAGE_TOKEN) private readonly clientGrpc: ClientGrpc
  ) {}

  async onModuleInit() {
    this.versionServiceClient =
      this.clientGrpc.getService<VersionServiceClient>('VersionService');
  }

  @Post()
  async createVersion(@Body() dto: CreateVersionRequestDto) {
    return this.versionServiceClient.createVersion(dto);
  }

  @Get('/random')
  async getVersion(@Query('product') product: string) {
    return this.versionServiceClient.getRandomVersion({ product });
  }
}

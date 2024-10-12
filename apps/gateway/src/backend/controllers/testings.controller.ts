import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TestingServiceClient } from 'shared';

import { BACKEND_PACKAGE_TOKEN } from '../backend.constant';
import { CreateVersionRequestDto } from '../dto/create-version.dto';

@Controller('backend/products/:productId/testings')
export class TestingsController implements OnModuleInit {
  private testingServiceClient!: TestingServiceClient;

  constructor(
    @Inject(BACKEND_PACKAGE_TOKEN) private readonly clientGrpc: ClientGrpc
  ) {}

  async onModuleInit() {
    this.testingServiceClient =
      this.clientGrpc.getService<TestingServiceClient>('TestingService');
  }

  @Post('start')
  @HttpCode(HttpStatus.OK)
  async startTesting(
    @Param('productId') productId: string,
    @Body() dto: CreateVersionRequestDto
  ) {
    return this.testingServiceClient.startTesting({
      productId,
      details: dto.details,
    });
  }

  @Post('stop')
  @HttpCode(HttpStatus.OK)
  async stopTesting(@Param('productId') productId: string) {
    return this.testingServiceClient.stopTesting({
      productId,
    });
  }

  @Get('status')
  async checkStatus(@Param('productId') productId: string) {
    return this.testingServiceClient.checkTestingStatus({
      productId,
    });
  }
}

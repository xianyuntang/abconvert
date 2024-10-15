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
import { firstValueFrom } from 'rxjs';
import { TESTING_SERVICE_NAME, TestingServiceClient } from 'shared';

import { BACKEND_PACKAGE_NAME } from '../backend.constant';
import { CreateVersionRequestDto } from '../dto/create-version.dto';

@Controller('backend/products/:productId/testings')
export class TestingsController implements OnModuleInit {
  private testingService!: TestingServiceClient;

  constructor(
    @Inject(BACKEND_PACKAGE_NAME) private readonly clientGrpc: ClientGrpc
  ) {}

  async onModuleInit() {
    this.testingService =
      this.clientGrpc.getService<TestingServiceClient>(TESTING_SERVICE_NAME);
  }

  @Post('start')
  @HttpCode(HttpStatus.OK)
  async startTesting(
    @Param('productId') productId: string,
    @Body() dto: CreateVersionRequestDto
  ) {
    return this.testingService.startTesting({
      productId,
      details: dto.details,
    });
  }

  @Post('stop')
  @HttpCode(HttpStatus.OK)
  async stopTesting(@Param('productId') productId: string) {
    return this.testingService.stopTesting({
      productId,
    });
  }

  @Get('running')
  async getRunningTesting(@Param('productId') productId: string) {
    return this.testingService.getRunningTesting({
      productId,
    });
  }

  @Get(':testingId/result')
  async getTestingResult(
    @Param('productId') productId: string,
    @Param('testingId') testingId: string
  ) {
    return this.testingService.getTestingResult({
      productId,
      testingId,
    });
  }

  @Get()
  async getTestings(@Param('productId') productId: string) {
    const response = await firstValueFrom(
      this.testingService.getTestings({
        productId,
      })
    );

    if (!response.data) {
      return { data: [] };
    }
  }
}

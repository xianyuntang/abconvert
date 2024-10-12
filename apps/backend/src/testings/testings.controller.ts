import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CheckTestingStatusRequest, StartTestingRequest } from 'shared';

import { GrpcExceptionsFilter } from '../filters';
import { TestingsService } from './testings.service';

@Controller()
@UseFilters(GrpcExceptionsFilter)
export class TestingsController {
  constructor(private readonly testingsService: TestingsService) {}

  @GrpcMethod('TestingService', 'StartTesting')
  async startTesting({ productId, details }: StartTestingRequest) {
    await this.testingsService.startTesting({ productId, details });

    return { message: 'ok' };
  }

  @GrpcMethod('TestingService', 'CheckTestingStatus')
  async checkTestingStatus({ productId }: CheckTestingStatusRequest) {
    const { isRunning } = await this.testingsService.checkTestingStatus({
      productId,
    });
    return { isRunning };
  }

  @GrpcMethod('TestingService', 'StopTesting')
  async stopTesting({ productId }: CheckTestingStatusRequest) {
    await this.testingsService.stopTesting({ productId });

    return { message: 'ok' };
  }
}

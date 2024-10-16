import { Controller, UseFilters } from '@nestjs/common';
import {
  GetRunningTestingRequest,
  GetRunningTestingResponse,
  GetTestingRequest,
  GetTestingResponse,
  GetTestingResultRequest,
  GetTestingResultResponse,
  StartTestingRequest,
  StartTestingResponse,
  StopTestingRequest,
  StopTestingResponse,
  TestingServiceController,
  TestingServiceControllerMethods,
} from 'backend-shared';

import { GrpcExceptionsFilter } from '../filters';
import { TestingsService } from './testings.service';

@Controller()
@UseFilters(GrpcExceptionsFilter)
@TestingServiceControllerMethods()
export class TestingsController implements TestingServiceController {
  constructor(private readonly testingsService: TestingsService) {}

  async startTesting({
    productId,
    details,
  }: StartTestingRequest): Promise<StartTestingResponse> {
    await this.testingsService.startTesting({ productId, details });

    return { message: 'ok' };
  }

  async getRunningTesting({
    productId,
  }: GetRunningTestingRequest): Promise<GetRunningTestingResponse> {
    const { id } = await this.testingsService.getRunningTesting({
      productId: productId,
    });
    return { id };
  }

  async stopTesting({
    productId,
  }: StopTestingRequest): Promise<StopTestingResponse> {
    await this.testingsService.stopTesting({ productId });

    return { message: 'ok' };
  }

  async getTestingResult({
    testingId,
    productId,
  }: GetTestingResultRequest): Promise<GetTestingResultResponse> {
    return this.testingsService.getTestingResult({
      productId,
      testingId,
    });
  }

  async getTestings({
    productId,
  }: GetTestingRequest): Promise<GetTestingResponse> {
    const response = await this.testingsService.getTestings({ productId });

    return { data: response || [] };
  }
}

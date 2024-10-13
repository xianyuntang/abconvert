import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
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
} from 'shared';

import { GrpcExceptionsFilter } from '../filters';
import { TestingsService } from './testings.service';

@Controller()
@UseFilters(GrpcExceptionsFilter)
export class TestingsController {
  constructor(private readonly testingsService: TestingsService) {}

  @GrpcMethod('TestingService', 'StartTesting')
  async startTesting({
    productId,
    details,
  }: StartTestingRequest): Promise<StartTestingResponse> {
    await this.testingsService.startTesting({ productId, details });

    return { message: 'ok' };
  }

  @GrpcMethod('TestingService', 'GetRunningTesting')
  async getRunningTesting({
    productId,
  }: GetRunningTestingRequest): Promise<GetRunningTestingResponse> {
    const { id } = await this.testingsService.getRunningTesting({
      productId: productId,
    });
    return { id };
  }

  @GrpcMethod('TestingService', 'StopTesting')
  async stopTesting({
    productId,
  }: StopTestingRequest): Promise<StopTestingResponse> {
    await this.testingsService.stopTesting({ productId });

    return { message: 'ok' };
  }

  @GrpcMethod('TestingService', 'GetTestingResult')
  async getTestingResult({
    testingId,
    productId,
  }: GetTestingResultRequest): Promise<GetTestingResultResponse> {
    return this.testingsService.getTestingResult({
      productId,
      testingId,
    });
  }

  @GrpcMethod('TestingService', 'GetTestings')
  async getTestings({
    productId,
  }: GetTestingRequest): Promise<GetTestingResponse> {
    const response = await this.testingsService.getTestings({ productId });

    return { data: response };
  }
}

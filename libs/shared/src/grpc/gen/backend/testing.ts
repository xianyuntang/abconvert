// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.3
//   protoc               v5.28.1
// source: backend/testing.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface StartTestingRequest {
  productId: string;
  details: StartTestingRequest_Detail[];
}

export interface StartTestingRequest_Detail {
  key: string;
  value: string;
}

export interface StartTestingResponse {
  message: string;
}

export interface GetRunningTestingRequest {
  productId: string;
}

export interface GetRunningTestingResponse {
  id?: string | undefined;
}

export interface StopTestingRequest {
  productId: string;
}

export interface StopTestingResponse {
  message: string;
}

export interface GetTestingResultRequest {
  productId: string;
  testingId: string;
}

export interface GetTestingResultResponse {
  primary: GetTestingResultResponse_Statistics | undefined;
  testing: GetTestingResultResponse_Statistics | undefined;
  clickElements: string[];
}

export interface GetTestingResultResponse_Statistics {
  visits: number;
  averageTimeOnPage: number;
  clickMap: { [key: string]: number };
}

export interface GetTestingResultResponse_Statistics_ClickMapEntry {
  key: string;
  value: number;
}

export interface GetTestingRequest {
  productId: string;
}

export interface GetTestingResponse {
  data: GetTestingResponse_Testing[];
}

export interface GetTestingResponse_Testing {
  id: string;
  primaryVersionId: string;
  testingVersionId: string;
  createdAt: string;
}

export interface TestingServiceClient {
  startTesting(request: StartTestingRequest): Observable<StartTestingResponse>;

  getRunningTesting(request: GetRunningTestingRequest): Observable<GetRunningTestingResponse>;

  stopTesting(request: StopTestingRequest): Observable<StopTestingResponse>;

  getTestingResult(request: GetTestingResultRequest): Observable<GetTestingResultResponse>;

  getTestings(request: GetTestingRequest): Observable<GetTestingResponse>;
}

export interface TestingServiceController {
  startTesting(
    request: StartTestingRequest,
  ): Promise<StartTestingResponse> | Observable<StartTestingResponse> | StartTestingResponse;

  getRunningTesting(
    request: GetRunningTestingRequest,
  ): Promise<GetRunningTestingResponse> | Observable<GetRunningTestingResponse> | GetRunningTestingResponse;

  stopTesting(
    request: StopTestingRequest,
  ): Promise<StopTestingResponse> | Observable<StopTestingResponse> | StopTestingResponse;

  getTestingResult(
    request: GetTestingResultRequest,
  ): Promise<GetTestingResultResponse> | Observable<GetTestingResultResponse> | GetTestingResultResponse;

  getTestings(
    request: GetTestingRequest,
  ): Promise<GetTestingResponse> | Observable<GetTestingResponse> | GetTestingResponse;
}

export function TestingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "startTesting",
      "getRunningTesting",
      "stopTesting",
      "getTestingResult",
      "getTestings",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TestingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TestingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TESTING_SERVICE_NAME = "TestingService";

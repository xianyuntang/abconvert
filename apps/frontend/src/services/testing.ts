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
} from 'frontend-shared';

import { fetcher } from '../core';

export const startTesting = ({ productId, details }: StartTestingRequest) => {
  return fetcher.post<StartTestingResponse>(
    `/api/backend/products/${productId}/testings/start`,
    { details }
  );
};

export const getRunningTesting = ({ productId }: GetRunningTestingRequest) => {
  return fetcher.get<GetRunningTestingResponse>(
    `/api/backend/products/${productId}/testings/running`
  );
};

export const stopTesting = ({ productId }: StopTestingRequest) => {
  return fetcher.post<StopTestingResponse>(
    `/api/backend/products/${productId}/testings/stop`
  );
};

export const getTestingResultRequest = ({
  productId,
  testingId,
}: GetTestingResultRequest) => {
  return fetcher.get<GetTestingResultResponse>(
    `/api/backend/products/${productId}/testings/${testingId}/result`
  );
};

export const getTestings = ({ productId }: GetTestingRequest) => {
  return fetcher.get<GetTestingResponse>(
    `/api/backend/products/${productId}/testings`
  );
};

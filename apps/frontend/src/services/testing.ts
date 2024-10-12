import {
  CheckTestingStatusRequest,
  CheckTestingStatusResponse,
  StartTestingRequest,
  StartTestingResponse,
  StopTestingRequest,
  StopTestingResponse,
} from 'shared';

import { fetcher } from '../core';

export const startTesting = ({ productId, details }: StartTestingRequest) => {
  return fetcher.post<StartTestingResponse>(
    `/api/backend/products/${productId}/testings/start`,
    { details }
  );
};

export const checkTestingStatus = ({
  productId,
}: CheckTestingStatusRequest) => {
  return fetcher.get<CheckTestingStatusResponse>(
    `/api/backend/products/${productId}/testings/status`
  );
};

export const stopTesting = ({ productId }: StopTestingRequest) => {
  return fetcher.post<StopTestingResponse>(
    `/api/backend/products/${productId}/testings/stop`
  );
};

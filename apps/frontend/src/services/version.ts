import {
  GetSpecifiedVersionRequest,
  GetVersionRequest,
  GetVersionResponse,
} from 'frontend-shared';

import { fetcher } from '../core';

export const getRandomVersion = ({ productId }: GetVersionRequest) => {
  return fetcher.get<GetVersionResponse>(
    `/api/backend/products/${productId}/versions/random`
  );
};

export const getPrimaryVersion = ({ productId }: GetVersionRequest) => {
  return fetcher.get<GetVersionResponse>(
    `/api/backend/products/${productId}/versions/primary`
  );
};

export const gerVersion = ({
  productId,
  versionId,
}: GetSpecifiedVersionRequest) => {
  return fetcher.get<GetVersionResponse>(
    `/api/backend/products/${productId}/versions/${versionId}`
  );
};

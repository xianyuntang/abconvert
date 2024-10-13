import { AddEventRequest } from 'shared';

import { fetcher } from '../core';

export const addEvent = async ({
  clientId,
  testingId,
  versionId,
  eventType,
  payload,
}: AddEventRequest) => {
  await fetcher.post('/api/events', {
    clientId,
    testingId,
    versionId,
    eventType,
    payload,
  });
};

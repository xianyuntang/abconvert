import { AddEventRequest } from 'shared';

import { fetcher } from '../core';

export const addEvent = async ({
  eventType,
  versionId,
  payload,
}: AddEventRequest) => {
  await fetcher.post('/api/events', { eventType, versionId, payload });
};

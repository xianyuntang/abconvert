import { EventType } from '../constants';

export interface EventPayload {
  clientId: string;
  testingId: string;
  versionId: string;
  eventType: EventType;
  payload?: object;
}

export type AddEventRequest = EventPayload;

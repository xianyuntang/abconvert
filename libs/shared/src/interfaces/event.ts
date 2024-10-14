import { EventType } from '../constants';

export interface EventPayload {
  clientId: string;
  testingId: string;
  versionId: string;
  eventType: EventType;
  payload?: object | string;
}

export type AddEventRequest = EventPayload;

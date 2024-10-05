import { EventType } from '../constants';

export interface EventPayload {
  versionId: string;
  eventType: EventType;
  payload?: object;
}

export type AddEventRequest = EventPayload;

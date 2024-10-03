import { EventType } from '../constants';

export interface EventPayload {
  clientId: string;
  eventType: EventType;
  payload?: object;
}

export type AddEventRequest = EventPayload;

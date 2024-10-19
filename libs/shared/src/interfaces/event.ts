import { EventType } from '../constants';

export interface EventPayload {
  clientId: string;
  testingId: string;
  versionId: string;
  eventType: EventType;
  payload?: object | string | PositionPayload;
}

export type AddEventRequest = EventPayload;

export interface PositionPayload {
  x: number;
  y: number;
  width: number;
  height: number;
}

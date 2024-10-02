import { EventType } from 'shared';

export interface EventPayload {
  clientId: string;
  eventType: EventType;
  payload?: object;
}

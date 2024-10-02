import { EventType } from '../constants';

export interface AddEventRequest {
  clientId: string;
  eventType: EventType;
  payload?: object;
}

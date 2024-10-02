import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventType } from 'shared';

import { CLIENT_KAFKA_TOKEN } from './events.constant';
import { EventPayload } from './events.interface';

@Injectable()
export class EventService implements OnModuleInit {
  constructor(
    @Inject(CLIENT_KAFKA_TOKEN) private readonly clientKafka: ClientKafka
  ) {}

  async onModuleInit() {
    await this.clientKafka.connect();
  }

  addEvent(clientId: string, eventType: EventType, payload?: object) {
    this.clientKafka.emit<string, EventPayload>('customer-event', {
      clientId,
      eventType,
      payload,
    });
  }
}

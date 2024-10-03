import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventPayload } from 'shared';

import { AddEventRequestDto } from './dto';
import { CLIENT_KAFKA_TOKEN } from './events.constant';

@Injectable()
export class EventService implements OnModuleInit {
  constructor(
    @Inject(CLIENT_KAFKA_TOKEN) private readonly clientKafka: ClientKafka
  ) {}

  async onModuleInit() {
    await this.clientKafka.connect();
  }

  addEvent(dto: AddEventRequestDto) {
    this.clientKafka.emit<string, EventPayload>('store-customer-event', {
      clientId: dto.clientId,
      eventType: dto.eventType,
      payload: dto.payload,
    });
  }
}

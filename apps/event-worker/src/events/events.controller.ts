import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventPayload } from 'shared';

import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('store-customer-event')
  async processCustomerEvent(dto: EventPayload) {
    await this.eventsService.storeEvent(dto);
  }
}

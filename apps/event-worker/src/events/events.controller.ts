import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventPayload } from 'shared';

@Controller()
export class EventsController {
  @MessagePattern('store-customer-event')
  processCustomerEvent(dto: EventPayload) {
    console.log(dto);
  }
}

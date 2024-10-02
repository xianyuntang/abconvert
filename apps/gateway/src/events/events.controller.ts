import { Body, Controller, Post } from '@nestjs/common';

import { AddEventRequestDto } from './dto';
import { EventService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  addEvent(@Body() dto: AddEventRequestDto) {
    this.eventService.addEvent(dto.clientId, dto.eventType, dto.payload);
  }
}

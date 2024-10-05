import { Body, Controller, Post } from '@nestjs/common';

import { AddEventRequestDto } from './dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  addEvent(@Body() dto: AddEventRequestDto) {
    this.eventService.addEvent(dto);
  }
}

import { Module } from '@nestjs/common';

import { ClickhouseModule } from '../clickhouse';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [ClickhouseModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

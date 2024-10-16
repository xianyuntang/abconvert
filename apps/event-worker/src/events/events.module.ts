import { Module } from '@nestjs/common';
import { ClickhouseModule } from 'backend-shared';

import { AppConfigService } from '../app-config';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    ClickhouseModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        const {
          services: {
            clickhouse: { database, password, url, username },
          },
        } = appConfigService;
        return { database, password, url, username };
      },
      inject: [AppConfigService],
    }),
  ],

  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

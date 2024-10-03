import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppConfigService } from '../app-config';
import { CLIENT_KAFKA_TOKEN } from './events.constant';
import { EventsController } from './events.controller';
import { EventService } from './events.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CLIENT_KAFKA_TOKEN,
        useFactory: (appConfigService: AppConfigService) => {
          const {
            services: {
              kafka: { host, port },
            },
          } = appConfigService;
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [`${host}:${port}`],
              },
              consumer: {
                groupId: 'event-worker',
              },
            },
          };
        },
        inject: [AppConfigService],
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventService],
})
export class EventsModule {}

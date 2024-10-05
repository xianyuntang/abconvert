import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConsumerGroup } from 'shared';

import { AppConfigService } from '../app-config';
import { CLIENT_KAFKA_TOKEN } from './events.constant';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

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
                groupId: ConsumerGroup.EventProcessGroup,
              },
            },
          };
        },
        inject: [AppConfigService],
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsumerGroup } from 'shared';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const appConfigService = app.get(AppConfigService);

  const {
    services: {
      kafka: { host, port },
    },
  } = appConfigService;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`${host}:${port}`],
      },
      consumer: {
        groupId: ConsumerGroup.EventProcessGroup,
      },
    },
  });

  await app.startAllMicroservices();

  Logger.log(`🚀 Application is running`);
}

void bootstrap();

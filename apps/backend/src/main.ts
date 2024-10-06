import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import path from 'path';

import { AppModule } from './app';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'backend',
        protoPath: path.resolve(__dirname, 'proto', 'backend.proto'),
        url: '0.0.0.0:50051',
      },
    }
  );

  Logger.log(`🚀 Application is running 0.0.0.0:50051`);
  await app.listen();
}

void bootstrap();

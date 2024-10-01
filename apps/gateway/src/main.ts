import { Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  const appConfigService = app.get(AppConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const {
    server: { port },
  } = appConfigService;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

void bootstrap();

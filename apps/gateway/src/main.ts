import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfigService } from './app-config';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const appConfigService = app.get(AppConfigService);

  const {
    server: { port },
    env: { isProduction },
  } = appConfigService;

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      enableDebugMessages: !isProduction,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );

  app.enableCors({});

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

void bootstrap();

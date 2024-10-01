import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PROJECT_ROOT } from '../app';
import { AppConfigService } from './app-config.service';
import { AppEnvSchema } from './app-env.schema';
import { Environment, validateObject } from 'shared';
import path from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: process.env.NODE_ENV === Environment.Production,
      envFilePath: [
        path.resolve(PROJECT_ROOT, `.env.local`),
        path.resolve(PROJECT_ROOT, `.env`),
      ],
      ignoreEnvVars: process.env['NODE_ENV'] === Environment.Development,
      validate: (config) => validateObject(AppEnvSchema, config),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

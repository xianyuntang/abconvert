import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvField } from './env.constant';
import { Environment } from 'shared';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get env() {
    return {
      nodeEnv: this.configService.getOrThrow<Environment>(EnvField.NODE_ENV),
      isProduction:
        this.configService.getOrThrow<Environment>(EnvField.NODE_ENV) ===
        Environment.Production,
    };
  }

  get server() {
    return {
      port: this.configService.getOrThrow<number>(EnvField.SERVER_PORT),
    };
  }
}
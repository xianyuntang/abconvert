import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

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

  get services() {
    return {
      kafka: {
        host: this.configService.getOrThrow<number>(EnvField.KAFKA_HOST),
        port: this.configService.getOrThrow<number>(EnvField.KAFKA_PORT),
      },
    };
  }
}

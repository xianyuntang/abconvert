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

  get services() {
    return {
      kafka: {
        host: this.configService.getOrThrow<string>(EnvField.KAFKA_HOST),
        port: this.configService.getOrThrow<number>(EnvField.KAFKA_PORT),
      },
      clickhouse: {
        url: this.configService.getOrThrow<string>(EnvField.CLICKHOUSE_URL),
        username: this.configService.getOrThrow<string>(
          EnvField.CLICKHOUSE_USERNAME
        ),
        password: this.configService.getOrThrow<string>(
          EnvField.CLICKHOUSE_PASSWORD
        ),
        database: this.configService.getOrThrow<string>(
          EnvField.CLICKHOUSE_DATABASE
        ),
      },
    };
  }
}

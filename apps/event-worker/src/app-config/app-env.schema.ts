import { IsEnum, IsNumber, IsUrl, Max, Min } from 'class-validator';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsUrl({ require_protocol: false, require_tld: false })
  [EnvField.KAFKA_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.KAFKA_PORT]!: number;
}

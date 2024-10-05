import { IsEnum, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsUrl({ require_protocol: false, require_tld: false })
  [EnvField.PG_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.PG_PORT]!: number;

  @IsString()
  [EnvField.PG_USERNAME]!: string;

  @IsString()
  [EnvField.PG_PASSWORD]!: string;

  @IsString()
  [EnvField.PG_DATABASE]!: string;
}

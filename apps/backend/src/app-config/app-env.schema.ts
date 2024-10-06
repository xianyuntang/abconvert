import { IsEnum, IsNumber, IsString, IsUrl, Max, Min } from 'class-validator';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsUrl({ require_protocol: false, require_tld: false })
  [EnvField.DB_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.DB_PORT]!: number;

  @IsString()
  [EnvField.DB_USERNAME]!: string;

  @IsString()
  [EnvField.DB_PASSWORD]!: string;

  @IsString()
  [EnvField.DB_DATABASE]!: string;
}

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

  @IsUrl({ require_protocol: true, require_tld: false })
  [EnvField.CLICKHOUSE_URL]!: string;

  @IsString()
  [EnvField.CLICKHOUSE_USERNAME]!: string;

  @IsString()
  [EnvField.CLICKHOUSE_PASSWORD]!: string;

  @IsString()
  [EnvField.CLICKHOUSE_DATABASE]!: string;
}

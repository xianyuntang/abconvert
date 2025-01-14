import { IsEnum, IsNumber, IsUrl, Max, Min } from 'class-validator';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsNumber()
  @Max(65535)
  @Min(1001)
  [EnvField.SERVER_PORT]!: number;

  @IsUrl({ require_protocol: false, require_tld: false })
  [EnvField.KAFKA_HOST]!: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  [EnvField.KAFKA_PORT]!: number;

  @IsUrl({ require_protocol: false, require_tld: false })
  [EnvField.BACKEND_GRPC_URL]!: string;
}

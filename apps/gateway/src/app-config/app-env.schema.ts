import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { Environment } from 'shared';

import { EnvField } from './env.constant';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsNumber()
  @Max(65535)
  @Min(1001)
  [EnvField.SERVER_PORT]!: number;
}

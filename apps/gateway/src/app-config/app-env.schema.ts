import { IsEnum, IsNumber, Max, Min } from 'class-validator';

import { EnvField } from './env.constant';
import { Environment } from 'shared';

export class AppEnvSchema {
  @IsEnum(Environment)
  [EnvField.NODE_ENV]!: Environment;

  @IsNumber()
  @Max(65535)
  @Min(1001)
  [EnvField.SERVER_PORT]!: number;
}

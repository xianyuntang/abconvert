import { createClient } from '@clickhouse/client';
import { DynamicModule, Module } from '@nestjs/common';

import { CLICKHOUSE_CLIENT_TOKEN } from './clickhouse.constant';
import { ClickhouseAsyncModuleOptions } from './clickhouse.interface';

@Module({})
export class ClickhouseModule {
  static async forRootAsync(
    options: ClickhouseAsyncModuleOptions
  ): Promise<DynamicModule> {
    return {
      module: ClickhouseModule,
      controllers: [],
      providers: [
        {
          provide: CLICKHOUSE_CLIENT_TOKEN,
          useFactory: (...args: never[]) => {
            const factoryOptions = options.useFactory(...args);

            return createClient({ ...factoryOptions });
          },
          inject: options.inject,
        },
      ],
      exports: [CLICKHOUSE_CLIENT_TOKEN],
    };
  }
}

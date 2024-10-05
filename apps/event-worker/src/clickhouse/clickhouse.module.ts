import { createClient } from '@clickhouse/client';
import { Module } from '@nestjs/common';

import { AppConfigService } from '../app-config';
import { CLICKHOUSE_CLIENT_TOKEN } from '../events/events.constant';

@Module({
  providers: [
    {
      provide: CLICKHOUSE_CLIENT_TOKEN,
      useFactory: (appConfigService: AppConfigService) => {
        const {
          services: {
            clickhouse: { url, username, password, database },
          },
        } = appConfigService;
        return createClient({
          database,
          url,
          username,
          password,
        });
      },
      inject: [AppConfigService],
    },
  ],
  exports: [CLICKHOUSE_CLIENT_TOKEN],
})
export class ClickhouseModule {}

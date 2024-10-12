import { ClickHouseClient } from '@clickhouse/client';

import { Migration } from '../migration';

export class Migration20241012022001_AddEvent extends Migration {
  static async up(client: ClickHouseClient) {
    await client.query({
      query: `
        CREATE TABLE IF NOT EXISTS events
        (
          version_id String,
          event_type String,
          payload Object('json'),
          ) ENGINE = MergeTree()
          ORDER BY (event_date)
          SETTINGS index_granularity = 8192;
    `,
    });
  }
}

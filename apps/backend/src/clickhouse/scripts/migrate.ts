import { createClient } from '@clickhouse/client';

import clickhouseConfig from '../clickhouse.config';
import { Migration20241012022001_AddEvent } from '../migrations';

export const migrate = async () => {
  const client = createClient({
    ...clickhouseConfig,
    clickhouse_settings: { allow_experimental_object_type: 1 },
  });

  const migrations = [Migration20241012022001_AddEvent];
  for (const migration of migrations) {
    await migration.up(client);
  }
};

void migrate();

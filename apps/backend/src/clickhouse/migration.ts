import { ClickHouseClient } from '@clickhouse/client';
import { NotImplementedException } from '@nestjs/common';

export class Migration {
  async up(client: ClickHouseClient) {
    await client.close();
    throw new NotImplementedException();
  }
}

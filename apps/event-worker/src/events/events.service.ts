import { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { EventPayload } from 'shared';

import { CLICKHOUSE_CLIENT_TOKEN } from './events.constant';

@Injectable()
export class EventsService {
  constructor(
    @Inject(CLICKHOUSE_CLIENT_TOKEN)
    private readonly clickhouseClient: ClickHouseClient
  ) {}

  async storeEvent(dto: EventPayload) {
    await this.clickhouseClient.insert({
      table: 'events',
      values: [
        [
          dto.versionId,
          dto.eventType,
          JSON.stringify(dto.payload),
          dayjs().unix(),
        ],
      ],
    });
  }
}

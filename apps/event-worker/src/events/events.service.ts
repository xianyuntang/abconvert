import { ClickHouseClient } from '@clickhouse/client';
import { Inject, Injectable } from '@nestjs/common';
import { CLICKHOUSE_CLIENT_TOKEN } from 'backend-shared';
import dayjs from 'dayjs';
import { EventPayload } from 'shared';

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
          dto.clientId,
          dto.testingId,
          dto.versionId,
          dto.eventType,
          JSON.stringify(dto.payload),
          dayjs().unix(),
        ],
      ],
    });
  }
}

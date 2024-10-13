import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClickhouseModule } from 'shared';

import { AppConfigService } from '../app-config';
import { Product, Testing, Version, VersionDetail } from '../orm';
import { TestingsController } from './testings.controller';
import { TestingsService } from './testings.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Version, VersionDetail, Product, Testing]),
    ClickhouseModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        const {
          services: {
            clickhouse: { database, password, url, username },
          },
        } = appConfigService;
        return { database, password, url, username };
      },
      inject: [AppConfigService],
    }),
  ],
  controllers: [TestingsController],
  providers: [TestingsService],
})
export class TestingsModule {}

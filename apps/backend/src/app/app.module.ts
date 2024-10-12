import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';

import { AppConfigModule, AppConfigService } from '../app-config';
import * as entities from '../db/entities';
import { TestingsModule } from '../testings';
import { VersionsModule } from '../versions';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    MikroOrmModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        const {
          env: { isProduction },
          services: {
            db: { host, port, database, password, username },
          },
        } = appConfigService;
        return {
          driver: PostgreSqlDriver,
          host: host,
          port: port,
          dbName: database,
          user: username,
          password: password,
          entities: [...Object.values(entities)],
          debug: !isProduction,
        };
      },
      inject: [AppConfigService],
    }),
    VersionsModule,
    TestingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

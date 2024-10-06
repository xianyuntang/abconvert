import { Module } from '@nestjs/common';

import { AppConfigModule } from '../app-config';
import { BackendModule } from '../backend';
import { EventsModule } from '../events';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, EventsModule, BackendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

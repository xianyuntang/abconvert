import { Module } from '@nestjs/common';

import { AppConfigModule } from '../app-config';
import { EventsModule } from '../events';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppConfigModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Product, Testing, Version, VersionDetail } from '../orm';
import { TestingsController } from './testings.controller';
import { TestingsService } from './testings.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Version, VersionDetail, Product, Testing]),
  ],
  controllers: [TestingsController],
  providers: [TestingsService],
})
export class TestingsModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Product, Testing, Version, VersionDetail } from '../orm';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Version, VersionDetail, Product, Testing]),
  ],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}

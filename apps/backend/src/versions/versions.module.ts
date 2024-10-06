import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Version, VersionDetail } from '../orm';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';

@Module({
  imports: [MikroOrmModule.forFeature([Version, VersionDetail])],
  controllers: [VersionsController],
  providers: [VersionsService],
})
export class VersionsModule {}

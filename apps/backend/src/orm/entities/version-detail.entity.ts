import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../custom-base.entity';
import { VersionDetailRepository } from '../repositories';
import { Version } from './version.entity';

@Entity({
  tableName: 'version_details',
  repository: () => VersionDetailRepository,
})
export class VersionDetail extends CustomBaseEntity {
  @Property()
  key!: string;

  @Property({ type: 'text' })
  value!: string;

  @ManyToOne(() => Version, { deleteRule: 'cascade' })
  version!: Version;
}

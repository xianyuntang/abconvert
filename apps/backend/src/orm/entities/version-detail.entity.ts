import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

import { VersionDetailRepository } from '../repositories';
import { Version } from './version.entity';

@Entity({
  tableName: 'version_details',
  repository: () => VersionDetailRepository,
})
export class VersionDetail {
  @PrimaryKey({ length: 21 })
  id = nanoid();

  @Property()
  key!: string;

  @Property()
  value!: string;

  @ManyToOne(() => Version, { deleteRule: 'cascade' })
  version!: Version;
}

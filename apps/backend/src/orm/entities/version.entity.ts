import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { nanoid } from 'nanoid';

import { VersionRepository } from '../repositories';
import { VersionDetail } from './version-detail.entity';

@Entity({ tableName: 'versions', repository: () => VersionRepository })
export class Version {
  @PrimaryKey({ length: 21 })
  id = nanoid();

  @OneToMany(() => VersionDetail, 'version')
  details = new Collection<VersionDetail>(this);
}

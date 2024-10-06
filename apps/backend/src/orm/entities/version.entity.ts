import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../custom-base.entity';
import { VersionRepository } from '../repositories';
import { VersionDetail } from './version-detail.entity';

@Entity({ tableName: 'versions', repository: () => VersionRepository })
export class Version extends CustomBaseEntity {
  @Property()
  product!: string;

  @OneToMany(() => VersionDetail, 'version')
  details = new Collection<VersionDetail>(this);
}

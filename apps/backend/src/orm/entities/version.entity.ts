import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { CustomBaseEntity } from '../custom-base.entity';
import { VersionRepository } from '../repositories';
import { Product } from './product.entity';
import { VersionDetail } from './version-detail.entity';

@Entity({ tableName: 'versions', repository: () => VersionRepository })
export class Version extends CustomBaseEntity {
  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  primary!: boolean;

  @OneToMany(() => VersionDetail, 'version')
  details = new Collection<VersionDetail>(this);
}

import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../custom-base.entity';
import { TestingRepository } from '../repositories';
import { Product } from './product.entity';
import { Version } from './version.entity';

@Entity({ tableName: 'testing', repository: () => TestingRepository })
export class Testing extends CustomBaseEntity {
  @ManyToOne(() => Product)
  product!: Product;

  @ManyToOne(() => Version)
  versionA!: Version;

  @ManyToOne(() => Version)
  versionB!: Version;

  @Property()
  isRunning!: boolean;
}

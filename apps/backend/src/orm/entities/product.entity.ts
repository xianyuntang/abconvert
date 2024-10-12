import { Entity, Property } from '@mikro-orm/core';

import { CustomBaseEntity } from '../custom-base.entity';
import { ProductRepository } from '../repositories';

@Entity({ tableName: 'products', repository: () => ProductRepository })
export class Product extends CustomBaseEntity {
  @Property()
  name!: string;
}

import { EntityRepository } from '@mikro-orm/core';

import { Product } from '../entities';

export class ProductRepository extends EntityRepository<Product> {}

import { EntityRepository } from '@mikro-orm/core';

import { Testing } from '../entities';

export class TestingRepository extends EntityRepository<Testing> {}

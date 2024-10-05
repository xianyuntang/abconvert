import { EntityRepository } from '@mikro-orm/core';

import { Version } from '../entities';

export class VersionRepository extends EntityRepository<Version> {}

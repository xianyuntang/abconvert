import { MigrationObject } from '@mikro-orm/core';
import { Migration } from '@mikro-orm/migrations';
import { ClassConstructor } from 'class-transformer';

import { Migration20241005024640_add_version } from './Migration20241005024640_add_version';

const migrationClasses: ClassConstructor<Migration>[] = [
  Migration20241005024640_add_version,
];

export const migrationsList: MigrationObject[] = migrationClasses.map(
  (migrationClass) => ({ name: migrationClass.name, class: migrationClass })
);

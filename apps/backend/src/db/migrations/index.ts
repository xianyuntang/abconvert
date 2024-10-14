import { MigrationObject } from '@mikro-orm/core';
import { Migration } from '@mikro-orm/migrations';
import { ClassConstructor } from 'class-transformer';

import { Migration20241014165213_InitTable } from './Migration20241014165213_InitTable';

const migrationClasses: ClassConstructor<Migration>[] = [
  Migration20241014165213_InitTable,
];

export const migrationsList: MigrationObject[] = migrationClasses.map(
  (migrationClass) => ({ name: migrationClass.name, class: migrationClass })
);

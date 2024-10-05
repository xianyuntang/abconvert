import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import dotenv from 'dotenv';
import path from 'path';

import { PROJECT_ROOT } from '../app';
import { MIGRATION_ROOT, SEEDER_ROOT } from './db.constant';
import * as entities from './entities';
import { migrationsList } from './migrations';

dotenv.config({
  path: path.resolve(PROJECT_ROOT, `.env.local`),
});
dotenv.config({
  path: path.resolve(PROJECT_ROOT, `.env`),
});

const config = defineConfig({
  debug: true,
  extensions: [Migrator, SeedManager],
  driver: PostgreSqlDriver,
  entities: [...Object.values(entities)],
  host: process.env.DB_HOST,
  dbName: process.env.DB_DATABASE,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: MIGRATION_ROOT, // path to the folder with migrations
    migrationsList,
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: false, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
  },
  seeder: {
    path: SEEDER_ROOT, // path to the folder with seeders
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
});
export default config;

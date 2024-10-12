import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import MikroOrmConfig from '../mikro-orm.config';
import { ProductSeeder } from '../seeders';

export const createSchema = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const seeder = orm.getSeeder();

  await seeder.seed(ProductSeeder);

  await orm.close(true);
};

void createSchema();

import * as process from 'node:process';

import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Environment } from 'shared';

import MikroOrmConfig from '../mikro-orm.config';

export const refreshSchema = async () => {
  if (process.env.NODE_ENV === Environment.Production) {
    return;
  }
  const orm = await MikroORM.init<PostgreSqlDriver>({ ...MikroOrmConfig });
  const generator = orm.getSchemaGenerator();

  await generator.refreshDatabase();

  await orm.close(true);
};

void refreshSchema();

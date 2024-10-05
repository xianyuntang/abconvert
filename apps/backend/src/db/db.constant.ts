import path from 'path';

import { PROJECT_ROOT } from '../app';

const DB_ROOT = path.resolve(PROJECT_ROOT, 'src', 'db');

export const MIGRATION_ROOT = path.resolve(DB_ROOT, 'migrations');
export const SEEDER_ROOT = path.resolve(DB_ROOT, 'seeders');

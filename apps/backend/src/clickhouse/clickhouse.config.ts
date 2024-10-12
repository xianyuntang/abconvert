import dotenv from 'dotenv';
import path from 'path';

import { PROJECT_ROOT } from '../app';

dotenv.config({
  path: path.resolve(PROJECT_ROOT, `.env.local`),
});
dotenv.config({
  path: path.resolve(PROJECT_ROOT, `.env`),
});

const config = {
  database: process.env.CLICKHOUSE_DATABASE,
  url: process.env.CLICKHOUSE_URL,
  username: process.env.CLICKHOUSE_USERNAME,
  password: process.env.CLICKHOUSE_PASSWORD,
};

console.log(config);
export default config;

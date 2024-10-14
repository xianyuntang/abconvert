#!/usr/bin/env sh

node /app/migrate.js up
node /app/seed.js
node /app/clickhouse-migrate.js

exec node /app/main.js

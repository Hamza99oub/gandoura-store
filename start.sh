#!/usr/bin/env bash
set -e

echo "Waiting for database..."
for i in $(seq 1 60); do
  node -e "
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 3000 });
    client.connect().then(() => process.exit(0)).catch(() => process.exit(1));
  " 2>/dev/null && echo "Database ready!" && break
  echo "Waiting for database... ($i/60)"
  sleep 3
done

echo "Running migrations..."
npx medusa db:migrate

echo "Starting Medusa server..."
npx medusa start

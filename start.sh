#!/usr/bin/env bash

echo "Checking database URL..."
echo "DATABASE_URL is set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"

echo "Waiting for database..."
for i in $(seq 1 30); do
  node -e "
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
    client.connect().then(() => process.exit(0)).catch(() => process.exit(1));
  " 2>/dev/null && echo "Database is ready!" && break
  echo "Waiting for database... attempt $i"
  sleep 5
done

echo "Running database migrations..."
npx medusa db:migrate || echo "Migrations failed, continuing anyway..."

echo "Starting Medusa server..."
npx medusa start

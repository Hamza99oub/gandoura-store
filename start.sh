#!/usr/bin/env bash
set -e

echo "Waiting for database..."
for i in $(seq 1 30); do
  npx medusa db:migrate 2>&1 && break
  echo "Retrying in 2s... ($i/30)"
  sleep 2
done

echo "Starting Medusa server..."
npx medusa start

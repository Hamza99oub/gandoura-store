#!/usr/bin/env bash
set -e

echo "Running database migrations..."
npx medusa migrations run

echo "Seeding database..."
npx medusa seed || echo "Seed skipped (data may already exist)"

echo "Starting Medusa server..."
npx medusa start

#!/usr/bin/env bash
set -e

echo "Running database migrations..."
npx medusa db:migrate

echo "Starting Medusa server..."
npx medusa start

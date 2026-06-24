#!/usr/bin/env bash
set -e
echo "Running migrations..."
NODE_OPTIONS="--max-old-space-size=512" npx medusa db:migrate
echo "Building admin panel..."
NODE_OPTIONS="--max-old-space-size=512" npx medusa build --admin-only
echo "Starting server on port ${PORT:-9000}..."
NODE_OPTIONS="--max-old-space-size=512" npx medusa start --port "${PORT:-9000}"

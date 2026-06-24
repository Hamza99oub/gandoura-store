#!/usr/bin/env bash
echo "Running migrations..."
NODE_OPTIONS="--max-old-space-size=512" npx medusa db:migrate
echo "Starting server..."
NODE_OPTIONS="--max-old-space-size=512" npx medusa start

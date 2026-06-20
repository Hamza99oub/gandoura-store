#!/usr/bin/env bash
echo "Running migrations..."
npx medusa db:migrate
echo "Starting server..."
npx medusa start

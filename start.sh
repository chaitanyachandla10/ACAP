#!/usr/bin/env bash
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js 20.19+, 22.12+, or 24+ is required."
  exit 1
fi

if [ ! -d node_modules ]; then
  npm ci
fi

echo "Starting ACAP API on http://localhost:3000 and web app on http://localhost:4200"
npm run start:all

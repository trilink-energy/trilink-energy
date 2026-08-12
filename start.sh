#!/bin/bash
echo "🧹 Cleaning up..."
rm -rf node_modules pnpm-lock.yaml
echo "📦 Installing dependencies..."
pnpm install
echo "🚀 Launching site at http://localhost:3000 ..."
pnpm run dev:www

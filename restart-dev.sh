#!/bin/bash

# Kill frontend (Vite) processes
echo "Killing Vite processes..."
pkill -f "vite" || true

# Kill backend (Node/TSX) processes
echo "Killing Node server processes..."
pkill -f "tsx src/server/index.ts" || true

# Start full dev environment
echo "Starting dev environment..."
npm run dev:full
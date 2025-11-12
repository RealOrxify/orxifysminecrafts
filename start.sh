#!/bin/bash

echo "Starting Minecraft Downloads Page..."
echo ""
echo "Starting Python backend..."
python3 app.py &
BACKEND_PID=$!

sleep 2

echo "Starting React frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait


@echo off
echo Starting Minecraft Downloads Page...
echo.
echo Starting Python backend...
start "Backend Server" cmd /k "python app.py"
timeout /t 2 /nobreak >nul
echo.
echo Starting React frontend...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause


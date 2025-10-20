@echo off
echo Starting Notes App...
echo.

REM Check if MongoDB is running
echo Checking if MongoDB is available...
timeout /t 2 > nul

REM Start backend
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment
timeout /t 3 > nul

REM Start frontend
echo Starting frontend server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173 or http://localhost:5174
echo.
pause
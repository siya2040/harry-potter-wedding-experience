@echo off
echo ========================================================
echo   Starting Magical Wedding Invitation Local Server...
echo ========================================================
echo.
echo Launching browser at http://localhost:8000/ ...
start http://localhost:8000/
py -m http.server 8000
pause

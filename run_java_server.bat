@echo off
echo ========================================================
echo   Compiling and Starting Hogwarts Java Server...
echo ========================================================
if not exist "bin" mkdir bin
javac -d bin src\main\java\com\hogwarts\wedding\MagicalWeddingServer.java
if %errorlevel% neq 0 (
    echo Compilation failed. Make sure Java 21+ JDK is on your PATH.
    pause
    exit /b %errorlevel%
)
echo.
echo Launching Magical Wedding Java Server on http://localhost:8080/ ...
java -cp bin com.hogwarts.wedding.MagicalWeddingServer
pause

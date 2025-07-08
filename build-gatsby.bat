@echo off
echo Starting Gatsby Build...
echo This will take 3-5 minutes - please be patient!
echo.

cd /d "c:\WORKSPACE\azure-static-web-apps\gatsby-portfolio-blog"

echo Cleaning previous builds...
call npm run clean

echo.
echo Starting build process...
echo If this takes a long time, that's normal for Gatsby!
call npm run build

echo.
echo Build complete! Check the public/ folder.
pause

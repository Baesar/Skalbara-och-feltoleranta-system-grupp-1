@echo off
cd grupp_project\frontend
start "" cmd /c "frontstart.bat"

cd ..\backend
start "" cmd /c "backstart.bat"

exit
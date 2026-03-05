@echo off
REM Setup script for Django Backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo Running migrations...
python manage.py migrate

echo Setup complete!
echo.
echo Next steps:
echo 1. Create a superuser: python manage.py createsuperuser
echo 2. Run the server: python manage.py runserver
echo.
pause

@echo off
title Playwright cron 1m
:loop
echo =============================
echo %date% %time% - START
cd /d "C:\Users\HP\Desktop\Site\alin"
call npm test
echo %date% %time% - DONE
timeout /t 900 /nobreak
goto loop
@echo off
chcp 65001 >nul
title CS313 法语研习社 · 本地极速平台
echo ==========================================================
echo   正在启动 CS313 法语研习社 本地极速平台...
echo   电脑浏览器推荐访问: http://localhost:5175/
echo ==========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0serve_local.ps1"
pause

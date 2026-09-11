param(
    [int]$Port = 5175
)

$env:ELECTRON_RUN_AS_NODE = "1"
$env:WEB_PORT = "$Port"

$ideExe = "C:\Users\cheng\AppData\Local\Programs\Antigravity IDE\Antigravity IDE.exe"
if (-not (Test-Path $ideExe)) {
    $ideExe = "C:\Users\cheng\AppData\Local\Programs\Antigravity\Antigravity.exe"
}

$serverScript = Join-Path $PSScriptRoot "server\server.cjs"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  CS313 French Platform - Server Running (Node)!" -ForegroundColor Cyan
Write-Host "  [Frontend Web]: http://localhost:$Port/" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green

& $ideExe "$serverScript"

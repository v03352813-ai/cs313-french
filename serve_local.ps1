param(
    [int]$Port = 5175
)

$nodeExe = "C:\Users\cheng\AppData\Local\OpenAI\Codex\runtimes\cua_node\1d17ec7e898678cb\bin\node.exe"
if (-not (Test-Path $nodeExe)) {
    $nodeExe = "node"
}

$env:WEB_PORT = "$Port"
$serverScript = Join-Path $PSScriptRoot "server\server.cjs"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  CS313 法语研习社 - 本地极速服务已开启！" -ForegroundColor Cyan
Write-Host "  [电脑浏览器访问]: http://localhost:$Port/" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Green

& $nodeExe "$serverScript"

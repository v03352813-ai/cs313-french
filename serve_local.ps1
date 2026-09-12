param(
    [int]$Port = 5175,
    [string]$NoOpen = ""
)

$nodeExe = "C:\Users\cheng\AppData\Local\OpenAI\Codex\runtimes\cua_node\1d17ec7e898678cb\bin\node.exe"
if (-not (Test-Path $nodeExe)) {
    if (Get-Command node -ErrorAction SilentlyContinue) {
        $nodeExe = "node"
    } else {
        $ideExe = "C:\Users\cheng\AppData\Local\Programs\Antigravity IDE\Antigravity IDE.exe"
        if (Test-Path $ideExe) {
            $nodeExe = $ideExe
            $env:ELECTRON_RUN_AS_NODE = "1"
        } else {
            $nodeExe = "node"
        }
    }
}

$env:WEB_PORT = "$Port"
$serverScript = Join-Path $PSScriptRoot "server\server.cjs"

$nodeArgs = @("$serverScript")
if ($NoOpen -ne "1") {
    $nodeArgs += "--open"
}

& $nodeExe @nodeArgs

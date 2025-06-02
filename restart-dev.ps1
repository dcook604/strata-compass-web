# PowerShell script for Windows

# Kill frontend (Vite) processes
Write-Host "Killing Vite processes..."
Get-Process | Where-Object { $_.ProcessName -eq "node" -and $_.CommandLine -like "*vite*" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Kill backend (Node/TSX) processes
Write-Host "Killing Node server processes..."
Get-Process | Where-Object { $_.ProcessName -eq "node" -and $_.CommandLine -like "*tsx src/server/index.ts*" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Start full dev environment
Write-Host "Starting dev environment..."
npm run dev:full
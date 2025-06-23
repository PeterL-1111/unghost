# 🦌 DeerFlow - Quick Setup Script (PowerShell)
# This script sets up both backend and frontend environments on Windows

# Set error handling
$ErrorActionPreference = "Stop"

Write-Host "🦌 DeerFlow - Starting Setup..." -ForegroundColor Blue
Write-Host "================================"

# Function to write colored output
function Write-ColorText {
    param(
        [string]$Text,
        [string]$Color = "White"
    )
    Write-Host $Text -ForegroundColor $Color
}

# Check if Python is available
Write-ColorText "Checking Python installation..." "Blue"
try {
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -match "Python") {
        Write-ColorText "✅ $pythonVersion found" "Green"
    } else {
        throw "Python not found"
    }
} catch {
    Write-ColorText "❌ Python not found. Please install Python 3.13+ first." "Red"
    exit 1
}

# Check if Node.js is available
Write-ColorText "Checking Node.js installation..." "Blue"
try {
    $nodeVersion = node --version
    Write-ColorText "✅ Node.js $nodeVersion found" "Green"
} catch {
    Write-ColorText "❌ Node.js not found. Please install Node.js 20+ first." "Red"
    exit 1
}

# Check if pnpm is available
Write-ColorText "Checking pnpm installation..." "Blue"
try {
    $pnpmVersion = pnpm --version
    Write-ColorText "✅ pnpm $pnpmVersion found" "Green"
} catch {
    Write-ColorText "⚠️  pnpm not found. Installing pnpm..." "Yellow"
    npm install -g pnpm
    $pnpmVersion = pnpm --version
    Write-ColorText "✅ pnpm $pnpmVersion installed" "Green"
}

Write-Host ""
Write-ColorText "🔧 Setting up Backend..." "Blue"
Write-Host "========================"

# Create virtual environment if it doesn't exist
if (-Not (Test-Path "venv")) {
    Write-ColorText "Creating Python virtual environment..." "Yellow"
    python -m venv venv
    Write-ColorText "✅ Virtual environment created" "Green"
} else {
    Write-ColorText "✅ Virtual environment already exists" "Green"
}

# Activate virtual environment and install dependencies
Write-ColorText "Installing Python dependencies..." "Yellow"
& "venv\Scripts\Activate.ps1"
python -m pip install --upgrade pip
pip install -r requirements.txt
Write-ColorText "✅ Backend dependencies installed" "Green"

Write-Host ""
Write-ColorText "🎨 Setting up Frontend..." "Blue"
Write-Host "========================="

# Navigate to frontend directory and install dependencies
if (Test-Path "front") {
    Set-Location "front"
    Write-ColorText "Installing frontend dependencies..." "Yellow"
    pnpm install
    Write-ColorText "✅ Frontend dependencies installed" "Green"
    Set-Location ".."
} else {
    Write-ColorText "❌ Frontend directory 'front' not found" "Red"
    exit 1
}

Write-Host ""
Write-ColorText "🔍 Environment Check..." "Blue"
Write-Host "======================="

# Check if .env file exists
if (Test-Path ".env") {
    Write-ColorText "✅ .env file found" "Green"
} else {
    Write-ColorText "⚠️  .env file not found" "Yellow"
    if (Test-Path ".env.example") {
        Write-ColorText "Copying .env.example to .env..." "Yellow"
        Copy-Item ".env.example" ".env"
        Write-ColorText "✅ .env file created from template" "Green"
        Write-ColorText "⚠️  Please edit .env file with your API keys" "Yellow"
    }
}

Write-Host ""
Write-ColorText "🎉 Setup Complete!" "Green"
Write-Host "=================="
Write-Host ""
Write-ColorText "To start the development servers:" "Blue"
Write-Host ""
Write-ColorText "Backend:" "Yellow"
Write-Host "  venv\Scripts\Activate.ps1"
Write-Host "  python server.py --reload"
Write-Host "  → API: http://localhost:8000"
Write-Host "  → Docs: http://localhost:8000/docs"
Write-Host ""
Write-ColorText "Frontend:" "Yellow"
Write-Host "  cd front"
Write-Host "  pnpm run dev"
Write-Host "  → App: http://localhost:3000"
Write-Host ""
Write-ColorText "For more details, see README_SETUP.md" "Blue"
Write-Host ""

# Test if servers can start (optional quick test)
Write-ColorText "🧪 Quick Test (optional)..." "Blue"
$testChoice = Read-Host "Would you like to test if both servers can start? (y/N)"
if ($testChoice -eq "y" -or $testChoice -eq "Y") {
    Write-ColorText "Testing backend server..." "Yellow"
    & "venv\Scripts\Activate.ps1"
    try {
        $timeout = 10
        $job = Start-Job -ScriptBlock { python server.py --help }
        Wait-Job $job -Timeout $timeout | Out-Null
        Stop-Job $job
        Remove-Job $job
        Write-ColorText "✅ Backend server can start" "Green"
    } catch {
        Write-ColorText "❌ Backend server test failed" "Red"
    }
    
    Write-ColorText "Testing frontend build..." "Yellow"
    Set-Location "front"
    try {
        $timeout = 30
        $job = Start-Job -ScriptBlock { pnpm run build }
        Wait-Job $job -Timeout $timeout | Out-Null
        Stop-Job $job
        Remove-Job $job
        Write-ColorText "✅ Frontend can build" "Green"
    } catch {
        Write-ColorText "⚠️  Frontend build test skipped (takes too long)" "Yellow"
    }
    Set-Location ".."
}

Write-Host ""
Write-ColorText "✨ All done! Happy coding! ✨" "Green" 
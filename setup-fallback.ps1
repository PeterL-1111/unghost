# 🦌 Unghost Agent - Fallback Setup Script (PowerShell, without UV)
# This script sets up the environment using standard Python tools

# Set error handling
$ErrorActionPreference = "Stop"

Write-Host "🦌 Unghost Agent - Fallback Setup (without UV)..." -ForegroundColor Blue
Write-Host "=============================================="

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
    Write-ColorText "❌ Python not found. Please install Python 3.12+ first." "Red"
    exit 1
}

# Check if pip is available
Write-ColorText "Checking pip installation..." "Blue"
try {
    python -m pip --version | Out-Null
    Write-ColorText "✅ pip found" "Green"
} catch {
    Write-ColorText "❌ pip not found. Please install pip first." "Red"
    exit 1
}

Write-Host ""
Write-ColorText "🔧 Setting up Backend (Standard Python)..." "Blue"
Write-Host "=========================================="

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
python -m pip install -r requirements.txt
Write-ColorText "✅ Backend dependencies installed" "Green"

# Check if Node.js is available for frontend
Write-Host ""
Write-ColorText "Checking Node.js for frontend..." "Blue"
try {
    $nodeVersion = node --version
    Write-ColorText "✅ Node.js $nodeVersion found" "Green"
    
    # Check if pnpm is available
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
        Write-ColorText "⚠️  Frontend directory 'front' not found, skipping frontend setup" "Yellow"
    }
} catch {
    Write-ColorText "⚠️  Node.js not found, skipping frontend setup" "Yellow"
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
Write-ColorText "To start the application:" "Blue"
Write-Host ""
Write-ColorText "Backend (Python):" "Yellow"
Write-Host "  venv\Scripts\Activate.ps1"
Write-Host "  python main.py --interactive"
Write-Host "  # or for server mode:"
Write-Host "  python server.py"
Write-Host ""
if (Get-Command node -ErrorAction SilentlyContinue) {
    if (Test-Path "front") {
        Write-ColorText "Frontend (if available):" "Yellow"
        Write-Host "  cd front"
        Write-Host "  pnpm run dev"
        Write-Host "  → App: http://localhost:3000"
        Write-Host ""
    }
}
Write-ColorText "Note: This setup uses standard Python tools instead of UV" "Blue"
Write-ColorText "For UV setup, install UV first: https://docs.astral.sh/uv/getting-started/installation/" "Blue"
Write-Host ""
Write-ColorText "✨ All done! Happy coding! ✨" "Green"
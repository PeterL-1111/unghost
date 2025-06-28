#!/bin/bash

# 🦌 Unghost Agent - Fallback Setup Script (without UV)
# This script sets up the environment using standard Python tools

set -e  # Exit on any error

echo "🦌 Unghost Agent - Fallback Setup (without UV)..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Python3 is available
echo -e "${BLUE}Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 not found. Please install Python 3.12+ first.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo -e "${GREEN}✅ Python ${PYTHON_VERSION} found${NC}"

# Check if pip is available
echo -e "${BLUE}Checking pip installation...${NC}"
if ! command -v pip3 &> /dev/null && ! python3 -m pip --version &> /dev/null; then
    echo -e "${RED}❌ pip not found. Please install pip first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ pip found${NC}"

echo ""
echo -e "${BLUE}🔧 Setting up Backend (Standard Python)...${NC}"
echo "=========================================="

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv venv
    echo -e "${GREEN}✅ Virtual environment created${NC}"
else
    echo -e "${GREEN}✅ Virtual environment already exists${NC}"
fi

# Activate virtual environment and install dependencies
echo -e "${YELLOW}Installing Python dependencies...${NC}"
source venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

# Check if Node.js is available for frontend
echo ""
echo -e "${BLUE}Checking Node.js for frontend...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"
    
    # Check if pnpm is available
    if ! command -v pnpm &> /dev/null; then
        echo -e "${YELLOW}⚠️  pnpm not found. Installing pnpm...${NC}"
        npm install -g pnpm
    fi
    
    PNPM_VERSION=$(pnpm --version)
    echo -e "${GREEN}✅ pnpm ${PNPM_VERSION} found${NC}"
    
    echo ""
    echo -e "${BLUE}🎨 Setting up Frontend...${NC}"
    echo "========================="
    
    # Navigate to frontend directory and install dependencies
    if [ -d "front" ]; then
        cd front
        echo -e "${YELLOW}Installing frontend dependencies...${NC}"
        pnpm install
        echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
        cd ..
    else
        echo -e "${YELLOW}⚠️  Frontend directory 'front' not found, skipping frontend setup${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Node.js not found, skipping frontend setup${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Environment Check...${NC}"
echo "======================="

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env file found${NC}"
else
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}Copying .env.example to .env...${NC}"
        cp .env.example .env
        echo -e "${GREEN}✅ .env file created from template${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env file with your API keys${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================="
echo ""
echo -e "${BLUE}To start the application:${NC}"
echo ""
echo -e "${YELLOW}Backend (Python):${NC}"
echo "  source venv/bin/activate"
echo "  python main.py --interactive"
echo "  # or for server mode:"
echo "  python server.py"
echo ""
if command -v node &> /dev/null && [ -d "front" ]; then
    echo -e "${YELLOW}Frontend (if available):${NC}"
    echo "  cd front"
    echo "  pnpm run dev"
    echo "  → App: http://localhost:3000"
    echo ""
fi
echo -e "${BLUE}Note: This setup uses standard Python tools instead of UV${NC}"
echo -e "${BLUE}For UV setup, install UV first: https://docs.astral.sh/uv/getting-started/installation/${NC}"
echo ""
echo -e "${GREEN}✨ All done! Happy coding! ✨${NC}"
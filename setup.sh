#!/bin/bash

# 🦌 DeerFlow - Quick Setup Script
# This script sets up both backend and frontend environments

set -e  # Exit on any error

echo "🦌 DeerFlow - Starting Setup..."
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Python3 is available
echo -e "${BLUE}Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 not found. Please install Python 3.13+ first.${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
echo -e "${GREEN}✅ Python ${PYTHON_VERSION} found${NC}"

# Check if Node.js is available
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 20+ first.${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} found${NC}"

# Check if pnpm is available
echo -e "${BLUE}Checking pnpm installation...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing pnpm...${NC}"
    npm install -g pnpm
fi

PNPM_VERSION=$(pnpm --version)
echo -e "${GREEN}✅ pnpm ${PNPM_VERSION} found${NC}"

echo ""
echo -e "${BLUE}🔧 Setting up Backend...${NC}"
echo "========================"

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
pip install --upgrade pip
pip install -r requirements.txt
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

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
    echo -e "${RED}❌ Frontend directory 'front' not found${NC}"
    exit 1
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
echo -e "${BLUE}To start the development servers:${NC}"
echo ""
echo -e "${YELLOW}Backend:${NC}"
echo "  source venv/bin/activate"
echo "  python server.py --reload"
echo "  → API: http://localhost:8000"
echo "  → Docs: http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}Frontend:${NC}"
echo "  cd front"
echo "  pnpm run dev"
echo "  → App: http://localhost:3000"
echo ""
echo -e "${BLUE}For more details, see README_SETUP.md${NC}"
echo ""

# Test if servers can start (optional quick test)
echo -e "${BLUE}🧪 Quick Test (optional)...${NC}"
read -p "Would you like to test if both servers can start? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Testing backend server...${NC}"
    source venv/bin/activate
    timeout 10s python server.py --help > /dev/null
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend server can start${NC}"
    else
        echo -e "${RED}❌ Backend server test failed${NC}"
    fi
    
    echo -e "${YELLOW}Testing frontend build...${NC}"
    cd front
    timeout 30s pnpm run build > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend can build${NC}"
    else
        echo -e "${YELLOW}⚠️  Frontend build test skipped (takes too long)${NC}"
    fi
    cd ..
fi

echo ""
echo -e "${GREEN}✨ All done! Happy coding! ✨${NC}" 
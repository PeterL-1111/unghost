# 🦌 DeerFlow - Project Setup Guide

## Overview
DeerFlow is a full-stack application with a Python backend (FastAPI) and a Next.js frontend. This guide will help you set up the development environment.

## Prerequisites
- Python 3.13+ (verified working with 3.13.2)
- Node.js 20+ (verified working with 23.9.0)
- pnpm package manager

## 🚀 Quick Setup

### 1. Clone and Setup Backend
```bash
# Navigate to project root
cd project-bolt

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment (macOS/Linux)
source venv/bin/activate
# On Windows use: venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Setup Frontend
```bash
# Navigate to frontend directory
cd front

# Install frontend dependencies
pnpm install
```

### 3. Environment Configuration
Ensure you have a `.env` file in the project root with the required environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
# From project root with venv activated
source venv/bin/activate
python server.py --reload --port 8000
```

The backend will be available at:
- API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Interactive API: http://localhost:8000/redoc

### Start Frontend Server
```bash
# From the front/ directory
cd front
pnpm run dev
```

The frontend will be available at:
- Application: http://localhost:3000

## 🔧 Development Commands

### Backend Commands
```bash
# Start server with auto-reload
python server.py --reload

# Start server on different port
python server.py --port 8080

# Enable debug logging
python server.py --log-level debug

# Run interactive mode
python main.py --interactive

# Run tests
pytest
```

### Frontend Commands
```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Run linting
pnpm run lint

# Format code
pnpm run format:write

# Type check
pnpm run typecheck
```

## 📁 Project Structure
```
project-bolt/
├── venv/                    # Python virtual environment
├── src/                     # Backend source code
│   ├── server/             # FastAPI server
│   ├── agents/             # AI agents
│   ├── config/             # Configuration
│   └── ...
├── front/                   # Frontend Next.js app
│   ├── src/                # Frontend source
│   ├── public/             # Static assets
│   └── package.json
├── requirements.txt         # Python dependencies
├── .env                    # Environment variables
└── server.py               # Backend entry point
```

## 🐳 Docker Support

### Using Docker Compose
```bash
# Start both frontend and backend
docker-compose up

# Build and start
docker-compose up --build

# Run in background
docker-compose up -d
```

## 🚀 Deployment Ready Features

### Backend (FastAPI)
- ✅ Virtual environment configured
- ✅ Dependencies installed
- ✅ Auto-reload for development
- ✅ API documentation available
- ✅ Environment variables support
- ✅ Logging configured

### Frontend (Next.js)
- ✅ Dependencies installed  
- ✅ Development server running
- ✅ Environment variables configured
- ✅ TypeScript support
- ✅ Tailwind CSS configured
- ✅ Component library setup

## 🔍 Health Check
Both services are verified working:
- Backend: http://localhost:8000/docs ✅
- Frontend: http://localhost:3000 ✅

## 📦 Ready for Deployment

### DigitalOcean App Platform
The project is configured for deployment on DigitalOcean App Platform with:
- Separate backend and frontend services
- Environment variable configuration
- Docker support
- Production-ready builds

### GitHub Repository
Ready to push to GitHub with:
- Proper .gitignore files
- Environment variable templates
- Documentation
- Development setup instructions

## 🛠 Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3000 and 8000 are available
2. **Python version**: Use Python 3.13+ for best compatibility
3. **Dependencies**: Run `pip install -r requirements.txt` if packages are missing
4. **Node version**: Ensure Node.js 20+ is installed

### Verification Commands
```bash
# Check Python version
python3 --version

# Check Node version
node --version

# Check pnpm version
pnpm --version

# Verify backend is running
curl http://localhost:8000/docs

# Verify frontend is running
curl http://localhost:3000
```

## 📞 Support
If you encounter any issues, please check:
1. All dependencies are installed
2. Environment variables are configured
3. Ports 3000 and 8000 are available
4. Virtual environment is activated for backend commands 
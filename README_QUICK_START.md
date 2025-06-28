# Quick Start Guide - Unghost Agent

This guide provides multiple ways to set up Unghost Agent, including fallback options when `uv` is not available.

## Setup Options

### Option 1: Simplest Method (No Virtual Environment)

```bash
# Install dependencies directly
python -m pip install -r requirements.txt

# Run the application with the alternative launcher
python run.py --interactive
```

### Option 2: With Virtual Environment (Recommended)

#### Linux/macOS:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py --interactive
# or
python run.py --interactive
```

#### Windows:
```powershell
# Create and activate virtual environment
python -m venv venv
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Run the application
python main.py --interactive
# or
python run.py --interactive
```

### Option 3: Using npm scripts

```bash
# Setup with virtual environment
npm run setup-venv

# Run the application
npm run dev
```

## Frontend Setup

After setting up the backend:

```bash
# Navigate to frontend directory
cd front

# Install dependencies
npm install
# or if you have pnpm
pnpm install

# Start the frontend development server
npm run dev
# or
pnpm run dev
```

## Configuration

1. Copy the example environment file if you haven't already:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your API keys:
   - `TAVILY_API_KEY` - Required for web search
   - `OPENAI_API_KEY` or another LLM provider key

## Troubleshooting

- **Python module errors**: Make sure you've installed all dependencies with `pip install -r requirements.txt`
- **Environment issues**: Ensure you're using Python 3.12+ and have activated your virtual environment
- **API key errors**: Check that your `.env` file contains the necessary API keys

## Running the Web Interface

Once the backend is running, you can access:
- API: http://localhost:8000
- Web UI: http://localhost:3000 (after starting the frontend)

For detailed configuration, see the main README.md file.
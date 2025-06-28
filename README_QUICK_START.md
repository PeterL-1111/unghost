# Quick Start Guide - Unghost Agent

This guide provides multiple ways to set up Unghost Agent, including fallback options when `uv` is not available.

## Setup Options

### Option 1: With UV (Recommended)

If you have `uv` installed:

```bash
# Install dependencies
uv sync

# Run the application
npm run dev-uv
# or directly: uv run python main.py --interactive
```

### Option 2: Without UV (Fallback)

If `uv` is not available, use standard Python tools:

#### Linux/macOS:
```bash
# Run fallback setup
chmod +x setup-fallback.sh
./setup-fallback.sh

# Activate virtual environment
source venv/bin/activate

# Run the application
python main.py --interactive
```

#### Windows:
```powershell
# Run fallback setup
.\setup-fallback.ps1

# Activate virtual environment
venv\Scripts\Activate.ps1

# Run the application
python main.py --interactive
```

### Option 3: Manual Setup

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\Activate.ps1  # Windows

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your API keys
# Then run:
python main.py --interactive
```

## Installing UV (Optional)

If you want to use `uv` for faster dependency management:

```bash
# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or with pip
pip install uv

# Then use the UV commands
uv sync
npm run dev-uv
```

## Troubleshooting

- **"uv command not found"**: Use the fallback setup scripts or install `uv` first
- **Python version issues**: Ensure you have Python 3.12+ installed
- **Permission errors**: Make sure setup scripts are executable (`chmod +x setup-fallback.sh`)

## Next Steps

1. Edit your `.env` file with the required API keys
2. Run the application using one of the methods above
3. Access the web interface at `http://localhost:3000` (if frontend is set up)
4. Or use the console interface directly

For detailed configuration, see the main README.md file.
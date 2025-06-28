# 🚀 Running Unghost Agent in bolt.new

This guide explains how to set up and run the Unghost Agent in bolt.new's webcontainer environment.

## 🔍 What Was the Problem?

The original error occurred because:
- **bolt.new uses webcontainers**: These run in browsers without access to OS-level signals
- **Missing `_signal` module**: A C extension required by `subprocess` and `signal` modules
- **Platform detection issues**: The original code didn't properly detect webcontainer environments

## ✅ What's Been Fixed

### 1. Enhanced Platform Detection
Both `run.py` and `server.py` now include improved webcontainer detection:
```python
def is_webcontainer_environment():
    return (
        sys.platform in ("emscripten", "wasm", "wasm32") or
        os.getenv('BOLT_ENV') == 'true' or  # bolt.new specific
        os.getenv('WEBCONTAINER') == 'true' or
        'webcontainer' in os.getcwd().lower() or
        not hasattr(os, 'fork')  # Most webcontainers don't support fork
    )
```

### 2. Safe Module Imports
- **subprocess**: Only imported when available, with fallbacks for webcontainers
- **signal**: Gracefully disabled in webcontainer environments
- **Better error handling**: More informative error messages

### 3. Webcontainer-Optimized Settings
- **Auto-reload disabled**: Prevents subprocess-related issues
- **Host binding**: Uses `0.0.0.0` for proper webcontainer networking
- **Fallback mechanisms**: Multiple startup approaches for reliability

## 🛠️ Setup Instructions

### Step 1: Test Your Environment
First, run the test script to verify your environment:
```bash
python3 test_webcontainer.py
```

This will show you:
- Whether webcontainer environment is detected
- Which modules are available
- Specific recommendations for your setup

### Step 2: Install Dependencies
Install the required Python packages:
```bash
pip install -r requirements.txt
```

If you get dependency issues, try installing core components individually:
```bash
pip install fastapi uvicorn langchain langgraph python-dotenv
```

### Step 3: Configure Environment
Create a `.env` file with your API keys:
```bash
# Copy from example (if available)
cp .env.example .env

# Or create manually
cat > .env << EOF
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
EOF
```

### Step 4: Start the Server
Use the fixed server script:
```bash
python3 server.py --host 0.0.0.0 --port 8000
```

Or use the alternative run script:
```bash
python3 run.py
```

## 🎯 bolt.new Specific Considerations

### Port Configuration
- bolt.new typically exposes port 8000 by default
- Use `--host 0.0.0.0` to allow external connections
- The server will be accessible at the bolt.new provided URL

### File System
- bolt.new has a persistent file system
- Your `.env` file and dependencies will persist between sessions
- Log files and temporary files work normally

### Networking
- External API calls (OpenAI, Tavily) work normally
- WebSocket connections are supported
- CORS is pre-configured for bolt.new URLs

### Performance
- Initial startup may be slower due to dependency loading
- Subsequent requests should perform normally
- Some AI operations may be slower due to network latency

## 🐛 Troubleshooting

### Still Getting `_signal` Errors?
If you still see signal-related errors:
```bash
# Check if the fixes were applied
grep -n "is_webcontainer_environment" run.py server.py

# Verify platform detection
python3 -c "
import sys, os
print(f'Platform: {sys.platform}')
print(f'Has fork: {hasattr(os, \"fork\")}')
print(f'CWD: {os.getcwd()}')
"
```

### Module Import Errors?
```bash
# Install missing dependencies
pip install --upgrade fastapi uvicorn langchain langgraph

# Check specific module
python3 -c "import fastapi; print('FastAPI OK')"
python3 -c "import uvicorn; print('Uvicorn OK')"
```

### Server Won't Start?
```bash
# Try the fallback approach
python3 -c "
from src.server.app import app
import uvicorn
uvicorn.run(app, host='0.0.0.0', port=8000)
"
```

### Port Issues?
```bash
# Try a different port
python3 server.py --port 3000
# or
python3 server.py --port 5000
```

## 🔧 Development Tips

### Debugging
Enable debug logging:
```bash
python3 server.py --log-level debug
```

### Testing Changes
The server runs without auto-reload by default in webcontainers. To test changes:
1. Stop the server (Ctrl+C)
2. Make your changes
3. Restart: `python3 server.py`

### Frontend Development
If you're also running the frontend:
```bash
# In the front/ directory
npm install
npm run dev
```

## 📝 What's Different in bolt.new

| Feature | Standard Environment | bolt.new Environment |
|---------|---------------------|---------------------|
| Signal handling | ✅ Full support | ❌ Disabled |
| Subprocess | ✅ Full support | ❌ Limited/Disabled |
| Auto-reload | ✅ Available | ❌ Disabled |
| File system | ✅ Full access | ✅ Persistent virtual FS |
| Networking | ✅ Direct | ✅ Proxied through bolt.new |
| Performance | ✅ Native speed | ⚠️ Slightly slower |

## 🚀 Quick Start Commands

```bash
# 1. Test environment
python3 test_webcontainer.py

# 2. Install dependencies (if needed)
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env with your API keys

# 4. Start server
python3 server.py

# 5. Access your app at the bolt.new provided URL
```

## 🆘 Need Help?

If you're still having issues:
1. Run `python3 test_webcontainer.py` and share the output
2. Check the server logs for specific error messages
3. Verify your API keys are correctly set in `.env`
4. Try the alternative startup methods mentioned above

The fixes should resolve the `_signal` module issues and allow your Unghost Agent to run properly in bolt.new! 🎉 
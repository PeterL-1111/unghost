#!/usr/bin/env python3
"""
Alternative entry point that doesn't require uv
"""
import sys
import os
from pathlib import Path

# Better platform detection for webcontainer environments
def is_webcontainer_environment():
    """Detect if running in a webcontainer/WASM environment"""
    return (
        sys.platform in ("emscripten", "wasm", "wasm32") or
        hasattr(sys, 'platform') and 'wasm' in sys.platform or
        os.getenv('BOLT_ENV') == 'true' or  # bolt.new specific
        os.getenv('WEBCONTAINER') == 'true' or  # webcontainer specific
        'webcontainer' in os.getcwd().lower() or
        not hasattr(os, 'fork')  # Most webcontainers don't support fork
    )

# Conditional imports based on environment
if not is_webcontainer_environment():
    try:
        import subprocess
    except ImportError:
        print("⚠️  subprocess module not available, some features may be limited")
        subprocess = None
else:
    print("🌐 Detected webcontainer environment - subprocess disabled")
    subprocess = None

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import fastapi
        import langchain
        import langgraph
        print("✅ Core dependencies found")
        return True
    except ImportError as e:
        print(f"❌ Missing dependencies: {e}")
        print("Please run: python -m pip install -r requirements.txt")
        return False

def setup_environment():
    """Setup environment variables"""
    env_file = Path(".env")
    if not env_file.exists():
        print("⚠️  .env file not found. Please create one based on .env.example")
        return False
    
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        print("⚠️  python-dotenv not installed, loading environment manually")
        # Manual .env loading for webcontainer environments
        if env_file.exists():
            with open(env_file, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        os.environ[key.strip()] = value.strip().strip('"\'')
    
    # Check for required API keys
    required_keys = ["OPENAI_API_KEY", "TAVILY_API_KEY"]
    missing_keys = []
    
    for key in required_keys:
        if not os.getenv(key) or os.getenv(key) == f"your_{key.lower()}_here":
            missing_keys.append(key)
    
    if missing_keys:
        print(f"⚠️  Missing API keys in .env: {', '.join(missing_keys)}")
        print("Please add your API keys to the .env file")
        return False
    
    print("✅ Environment setup complete")
    return True

def main():
    """Main entry point"""
    print("🦌 Deer AI Research Assistant")
    print("=" * 40)
    
    if is_webcontainer_environment():
        print("🌐 Running in webcontainer environment (bolt.new)")
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Setup environment
    if not setup_environment():
        print("⚠️  Continuing with incomplete setup...")
    
    # Import and run the main application
    try:
        from src.server.app import app
        import uvicorn
        
        print("🚀 Starting server...")
        uvicorn.run(
            "src.server.app:app",
            host="0.0.0.0",
            port=8000,
            reload=False  # Disable reload in webcontainers to avoid subprocess issues
        )
    except ImportError as e:
        print(f"❌ Failed to import application: {e}")
        print("Trying alternative main.py...")
        
        # Fallback to main.py if it exists
        if Path("main.py").exists():
            if subprocess:
                subprocess.run([sys.executable, "main.py"] + sys.argv[1:])
            else:
                print("❌ Subprocess not available in this environment")
                print("Trying to import and run main.py directly...")
                try:
                    import main
                    # Try to run main directly without subprocess
                    if hasattr(main, 'main'):
                        main.main()
                    else:
                        print("❌ No main() function found in main.py")
                        sys.exit(1)
                except Exception as main_error:
                    print(f"❌ Failed to run main.py: {main_error}")
                    sys.exit(1)
        else:
            print("❌ No main.py found")
            sys.exit(1)

if __name__ == "__main__":
    main()
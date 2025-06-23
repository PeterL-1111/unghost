#!/usr/bin/env python3
"""
Alternative entry point that doesn't require uv
"""
import sys
import subprocess
import os
from pathlib import Path

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
    
    from dotenv import load_dotenv
    load_dotenv()
    
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
            reload=True
        )
    except ImportError as e:
        print(f"❌ Failed to import application: {e}")
        print("Trying alternative main.py...")
        
        # Fallback to main.py if it exists
        if Path("main.py").exists():
            subprocess.run([sys.executable, "main.py"] + sys.argv[1:])
        else:
            print("❌ No main.py found")
            sys.exit(1)

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Test script to verify webcontainer environment detection and module availability
"""
import sys
import os

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

def test_modules():
    """Test availability of various modules"""
    print("🧪 Testing module availability...")
    print("=" * 50)
    
    # Test basic info
    print(f"Python version: {sys.version}")
    print(f"Platform: {sys.platform}")
    print(f"Current directory: {os.getcwd()}")
    print(f"Has os.fork: {hasattr(os, 'fork')}")
    print(f"BOLT_ENV: {os.getenv('BOLT_ENV', 'not set')}")
    print(f"WEBCONTAINER: {os.getenv('WEBCONTAINER', 'not set')}")
    print()
    
    # Test webcontainer detection
    is_webcontainer = is_webcontainer_environment()
    print(f"🌐 Webcontainer detected: {'YES' if is_webcontainer else 'NO'}")
    print()
    
    # Test modules
    modules_to_test = [
        ('signal', 'Signal handling'),
        ('subprocess', 'Process management'),
        ('threading', 'Threading'),
        ('asyncio', 'Async I/O'),
        ('fastapi', 'FastAPI web framework'),
        ('uvicorn', 'ASGI server'),
        ('langchain', 'LangChain'),
        ('langgraph', 'LangGraph'),
    ]
    
    available_modules = []
    unavailable_modules = []
    
    for module_name, description in modules_to_test:
        try:
            __import__(module_name)
            print(f"✅ {module_name:12} - {description}")
            available_modules.append(module_name)
        except ImportError as e:
            print(f"❌ {module_name:12} - {description} (Error: {e})")
            unavailable_modules.append(module_name)
    
    print()
    print("📊 Summary:")
    print(f"Available modules: {len(available_modules)}")
    print(f"Unavailable modules: {len(unavailable_modules)}")
    
    if unavailable_modules:
        print(f"Missing: {', '.join(unavailable_modules)}")
    
    # Test specific signal functionality
    print()
    print("🔧 Testing signal functionality...")
    try:
        import signal
        if hasattr(signal, 'SIGINT'):
            print("✅ signal.SIGINT available")
        else:
            print("❌ signal.SIGINT not available")
        
        if hasattr(signal, 'signal'):
            print("✅ signal.signal() function available")
        else:
            print("❌ signal.signal() function not available")
            
    except ImportError:
        print("❌ signal module not importable")
    except Exception as e:
        print(f"❌ signal module error: {e}")
    
    # Test subprocess functionality
    print()
    print("⚙️  Testing subprocess functionality...")
    try:
        import subprocess
        result = subprocess.run(['echo', 'test'], capture_output=True, text=True, timeout=5)
        print("✅ subprocess.run() works")
    except ImportError:
        print("❌ subprocess module not importable")
    except Exception as e:
        print(f"❌ subprocess error: {e}")
    
    return is_webcontainer, available_modules, unavailable_modules

if __name__ == "__main__":
    print("🦌 Unghost Agent - Webcontainer Compatibility Test")
    print("=" * 60)
    
    is_webcontainer, available, unavailable = test_modules()
    
    print()
    print("🎯 Recommendations:")
    if is_webcontainer:
        print("- You're in a webcontainer environment (like bolt.new)")
        print("- Signal handling and subprocess features are limited")
        print("- Use the fixed run.py and server.py files")
        print("- Disable auto-reload to avoid subprocess issues")
    else:
        print("- You're in a standard Python environment")
        print("- All features should work normally")
    
    if 'fastapi' in available and 'uvicorn' in available:
        print("- ✅ Web server components are available")
        print("- You can run: python3 server.py --host 0.0.0.0 --port 8000")
    else:
        print("- ❌ Missing web server dependencies")
        print("- Install with: pip install fastapi uvicorn")
    
    print()
    print("🚀 Next steps:")
    print("1. Install missing dependencies if needed")
    print("2. Create/configure your .env file with API keys")
    print("3. Run: python3 server.py")
    print("4. Access your app at: http://localhost:8000") 
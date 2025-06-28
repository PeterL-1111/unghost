# Copyright (c) 2025 Peter Liu
# SPDX-License-Identifier: MIT

"""
Server script for running the Unghost Agent API.
"""

import argparse
import logging
import sys
import os
import threading
import uvicorn

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

# Conditional import for signal module
if not is_webcontainer_environment():
    try:
        import signal
    except ImportError:
        print("⚠️  signal module not available")
        signal = None
else:
    print("🌐 Detected webcontainer environment - signal handling disabled")
    signal = None

try:
    from main import create_app
except ImportError:
    # If main.py doesn't have create_app, we'll handle it in the main section
    create_app = None

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)


def handle_shutdown(signum, frame):
    """Handle graceful shutdown on SIGTERM/SIGINT"""
    logger.info("Received shutdown signal. Starting graceful shutdown...")
    sys.exit(0)


# Register signal handlers if the signal module is available
if signal:
    try:
        signal.signal(signal.SIGTERM, handle_shutdown)
        signal.signal(signal.SIGINT, handle_shutdown)
        logger.info("Signal handlers registered successfully")
    except (OSError, AttributeError) as e:
        logger.warning(f"Could not register signal handlers: {e}")
else:
    logger.info("Signal handling disabled (webcontainer environment)")

def create_graceful_shutdown_handler():
    """Create a graceful shutdown handler for webcontainer environments"""
    def shutdown_handler():
        logger.info("Initiating graceful shutdown...")
        # Add any cleanup logic here
        os._exit(0)
    
    return shutdown_handler

if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Run the Unghost Agent API server")
    parser.add_argument(
        "--reload",
        action="store_true",
        help="Enable auto-reload (default: False for webcontainers)",
    )
    parser.add_argument(
        "--host",
        type=str,
        default="0.0.0.0",  # Use 0.0.0.0 for webcontainers
        help="Host to bind the server to (default: 0.0.0.0)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to bind the server to (default: 8000)",
    )
    parser.add_argument(
        "--log-level",
        type=str,
        default="info",
        choices=["debug", "info", "warning", "error", "critical"],
        help="Log level (default: info)",
    )

    args = parser.parse_args()

    # Determine reload setting - disable for webcontainers
    reload = False
    if args.reload and not is_webcontainer_environment():
        reload = True
    elif args.reload and is_webcontainer_environment():
        logger.warning("Auto-reload disabled in webcontainer environment")

    try:
        logger.info(f"Starting Unghost Agent API server on {args.host}:{args.port}")
        
        if is_webcontainer_environment():
            logger.info("🌐 Running in webcontainer environment (bolt.new)")
        
        # Try to use the FastAPI app directly from src.server
        uvicorn.run(
            "src.server.app:app",
            host=args.host,
            port=args.port,
            reload=reload,
            log_level=args.log_level,
        )
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        
        # Fallback: try to import and run the app directly
        try:
            logger.info("Attempting fallback server startup...")
            from src.server.app import app
            uvicorn.run(
                app,
                host=args.host,
                port=args.port,
                reload=False,  # Never reload in fallback mode
                log_level=args.log_level,
            )
        except Exception as fallback_error:
            logger.error(f"Fallback startup also failed: {str(fallback_error)}")
            sys.exit(1)

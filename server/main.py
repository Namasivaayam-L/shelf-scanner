import logging, os
from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from config.logging_manager import get_logger

from dotenv import load_dotenv
load_dotenv() # Load environment variables from .env file

from routes.image_processing import router as image_processing_router
from routes.recommendations import router as recommendations_router
from config.config import setup_middleware

# Initialize FastAPI app
app = FastAPI()

# Setup middleware from config
setup_middleware(app)

# Include the route routers with /api prefix
app.include_router(image_processing_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")

# Mount static files if they exist (built frontend)
static_dir = os.path.join(os.path.dirname(__file__), "..", "client", "dist")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

logger = get_logger()

# Root endpoint - serve index.html or ping for health checks
@app.get("/")
@app.head("/")
async def root():
    """
    Root endpoint. Serves index.html for GET requests (SPA) or responds to HEAD for health checks.
    """
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"status": "ok"}

# Ping endpoint for health checks
@app.get("/ping")
@app.head("/ping")
async def ping():
    """
    Simple ping endpoint for health checks.
    Returns a basic response to confirm the server is running.
    """
    return {"status": "healthy", "message": "Server is running"}

@app.post("/logging/level")
async def set_logging_level(level: str):
    """
    Set the logging level for the application.
    Accepts 'info' or 'debug' as the level parameter.
    """
    try:
        level = level.lower()
        if level == 'info':
            logger.set_level(logging.INFO)
            logger.info("Logging level set to INFO")
            return JSONResponse(content={"status": "success", "message": "Logging level set to INFO"})
        elif level == 'debug':
            logger.set_level(logging.DEBUG)
            logger.info("Logging level set to DEBUG")
            return JSONResponse(content={"status": "success", "message": "Logging level set to DEBUG"})
        else:
            return JSONResponse(content={"status": "error", "message": "Invalid logging level. Use 'info' or 'debug'."}, status_code=400)
    except Exception as e:
        logger.error(f"Error setting logging level: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)


@app.get("/logging/level")
async def get_logging_level():
    """
    Get the current logging level for the application.
    """
    try:
        current_level = logger.get_current_level()
        level_name = logging.getLevelName(current_level)
        logger.info(f"Current logging level is {level_name}")
        return JSONResponse(content={"level": level_name.lower()})
    except Exception as e:
        logger.error(f"Error getting logging level: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)


# SPA routing: serve index.html for all non-API routes
@app.get("/{full_path:path}")
@app.head("/{full_path:path}")
async def serve_spa(full_path: str):
    """
    Serve the React SPA for all routes that are not API endpoints.
    This enables client-side routing for the React application.
    """
    # List of API routes that should not be intercepted
    api_prefixes = ["api/", "process-image", "books/", "logging/", "ping", "recommendations"]
    
    # Check if this is an API route
    for prefix in api_prefixes:
        if full_path.startswith(prefix):
            return JSONResponse({"error": "Not Found"}, status_code=404)
    
    # Serve index.html for all other routes (SPA routing)
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    
    return JSONResponse({"error": "Frontend not built"}, status_code=404)


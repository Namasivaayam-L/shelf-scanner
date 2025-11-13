import logging
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from config.logging_manager import get_logger

# Create API router
router = APIRouter()
logger = get_logger()


@router.post("/logging/level")
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


@router.get("/logging/level")
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

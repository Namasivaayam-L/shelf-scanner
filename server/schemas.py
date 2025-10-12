# This file can be used for Pydantic models if more complex data structures are needed.
# For the current task, the request body is handled directly by FastAPI's UploadFile and Form.

from logging_manager import get_logger

logger = get_logger()
logger.debug("Loading schemas module")

# Future Pydantic models can be defined here if needed
# For now, this file serves as a placeholder for potential future use

logger.debug("Schemas module loaded successfully")

import os
from langchain_google_genai import ChatGoogleGenerativeAI
from logging_manager import get_logger
from dotenv import load_dotenv

load_dotenv()

logger = get_logger()
logger.info("Initializing Gemini LLM model")

# Get API key from environment variable with validation
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable is required")

# Get model name from environment variable, default to gemini-2.5-flash
gemini_model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

gemini = ChatGoogleGenerativeAI(
    model=gemini_model,
    google_api_key=gemini_api_key
)
logger.debug("Gemini LLM model initialized successfully")

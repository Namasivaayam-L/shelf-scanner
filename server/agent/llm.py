from langchain_google_genai import ChatGoogleGenerativeAI
from logging_manager import get_logger

logger = get_logger()
logger.info("Initializing Gemini LLM model")
gemini = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
logger.debug("Gemini LLM model initialized successfully")

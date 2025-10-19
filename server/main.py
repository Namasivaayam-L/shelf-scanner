from fastapi import FastAPI, UploadFile, File, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from PIL import Image
import logging
import io
import base64
import os
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from langchain_core.messages import HumanMessage
from agent.agent import agent
from agent.post_process import post_process_llm_response
from dotenv import load_dotenv
from logging_manager import get_logger

load_dotenv() # Load environment variables from .env file

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)
 
app = FastAPI()

# Add security headers middleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import time

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response

app.add_middleware(SecurityHeadersMiddleware)

# Set up rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add Trusted Host middleware
trusted_hosts = os.getenv("TRUSTED_HOSTS", "*").split(",")
app.add_middleware(TrustedHostMiddleware, allowed_hosts=trusted_hosts)

# Add CORS middleware with environment-driven settings
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost,http://localhost:3000,http://localhost:5173").split(",")
allow_credentials = os.getenv("ALLOW_CREDENTIALS", "true").lower() == "true"
allow_methods = os.getenv("ALLOW_METHODS", "*").split(",")
allow_headers = os.getenv("ALLOW_HEADERS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=allow_credentials,
    allow_methods=allow_methods,
    allow_headers=allow_headers,
)

logger = get_logger()

# Define Pydantic model for recommendations request
class RecommendationsRequest(BaseModel):
    books: list

@app.post("/process-image")
@limiter.limit(os.getenv("PROCESS_IMAGE_RATE_LIMIT", "10/minute"))
async def process_image(request: Request, image: UploadFile = File(...)):
    """
    Accepts an image file, processes the image, and returns a response from the agent.
    """
    try:
        logger.info(f"Received image: {image.filename} ({image.content_type})")

        # Read image content
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data))
        logger.info(f"Image size: {img.size} (width, height)")

        # Base64 encode the image data
        encoded_image = base64.b64encode(image_data).decode("utf-8")
        # Construct the data URI for the image
        image_url_data_uri = f"data:{image.content_type};base64,{encoded_image}"
        logger.debug(f"Image data URI (first 50 chars): {image_url_data_uri[:50]}...")

        # Create the initial message for the agent
        # The query is now implicitly handled by the system prompt, so we send a generic text or empty string
        messages_for_agent = [
            HumanMessage(
                content=[
                    {"type": "image_url", "image_url": {"url": image_url_data_uri}},
                ]
            )
        ]
        
        # Invoke the agent with the messages
        agent_response = agent.invoke({"messages": messages_for_agent})
        
        # Extract the content from the agent's response
        # Assuming the agent's response is a dict with a 'messages' key,
        # and the last message contains the final answer.
        final_response_content = post_process_llm_response(agent_response["messages"][-1].content)
        logger.info("Agent response successfully retrieved.")

        # Transform the response to match the client's expected format
        books = []
        if isinstance(final_response_content, dict):
            # Generate mock book data with IDs, descriptions, and cover images
            id_counter = 1
            for title, description in final_response_content.items():
                books.append({
                    "id": id_counter,
                    "title": title,
                    "description": description,
                    "cover": f"https://picsum.photos/200/300?random={id_counter}"  # Mock cover image
                })
                id_counter += 1
        else:
            # Handle error case
            return JSONResponse(content={"status": "error", "message": "Invalid response format"}, status_code=500)

        return JSONResponse(content={
            "books": books
        })
    except Exception as e:
        logger.error(f"Error processing image: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

@app.post("/books/recommendations")
@limiter.limit(os.getenv("RECOMMENDATIONS_RATE_LIMIT", "5/minute"))
async def get_recommendations(request: Request, books: RecommendationsRequest):
    """
    Returns recommendations based on provided books.
    """
    try:
        books = books.books
        logger.info(f"Generating recommendations for {len(books)} books")
        
        # Create a prompt for the LLM to generate recommendations
        books_titles = [book['title'] for book in books]
        logger.debug(f"Book titles for recommendations: {books_titles}")
        
        # Read the recommendation prompt from the file
        with open('agent/prompts/recommendation_prompt.md', 'r') as file:
            recommendation_prompt = file.read()
        logger.debug("Loaded recommendation prompt from file")
        
        # Create the final prompt with the books list
        final_prompt = f"{recommendation_prompt}\n\n**Input Books:**\n{books_titles}\n\n**Your Response:**"
        
        # Generate content using the model
        logger.debug("Sending prompt to agent for recommendations")
        agent_response = agent.invoke({"messages": [HumanMessage(content=final_prompt)]})
        
        # Extract the text response
        recommendations = post_process_llm_response(agent_response["messages"][-1].content)
        logger.info(f"Received {len(recommendations) if isinstance(recommendations, dict) else 'unknown'} recommendations")
        
        # Transform the response to match the client's expected format
        recommended_books = []
        id_counter = 1
        if isinstance(recommendations, dict):
            for title, description in recommendations.items():
                recommended_books.append({
                    "id": id_counter,
                    "title": title,
                    "description": description,
                    "cover": f"https://picsum.photos/200/300?random={id_counter}"  # Mock cover image
                })
                id_counter += 1
            logger.debug(f"Transformed {len(recommended_books)} recommendations to client format")
        else:
            logger.warning("Recommendations response is not in expected dictionary format")
        
        return JSONResponse(content={
            "recommendations": recommended_books
        })
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

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

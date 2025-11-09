import logging, io, base64
from PIL import Image
from fastapi import APIRouter, UploadFile, File, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from langchain_core.messages import HumanMessage

from agent.agent import agent
from agent.post_process import post_process_llm_response
from config.logging_manager import get_logger
from models.models import BooksResponse

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create API router
router = APIRouter()
logger = get_logger()

@router.post("/process-image")
@limiter.limit("15/minute")  # Using the same rate limit as in the original
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

        # Return response using the defined model
        return BooksResponse(books=books)
    except Exception as e:
        logger.error(f"Error processing image: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

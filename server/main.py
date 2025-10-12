from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import base64
from langchain_core.messages import HumanMessage
from agent.agent import agent
from agent.post_process import post_process_llm_response
import logging
import os # Import os
from dotenv import load_dotenv # Import load_dotenv

load_dotenv() # Load environment variables from .env file
 
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(filename)s:%(lineno)d - %(message)s')
logger = logging.getLogger(__name__)

@app.post("/process-image")
async def process_image(image: UploadFile = File(...)):
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

# Mock data endpoints
@app.get("/books/{book_id}/recommendations")
async def get_book_recommendations(book_id: int):
    """
    Returns mock recommendations for a specific book.
    """
    # Mock recommendations data
    recommendations = [
        {
            "id": 101,
            "title": "Similar Thriller Novel",
            "description": "Another thrilling mystery that fans of detective stories will love.",
            "cover": "https://picsum.photos/200/300?random=101"
        },
        {
            "id": 102,
            "title": "Crime and Punishment",
            "description": "A classic psychological thriller exploring the mind of a criminal.",
            "cover": "https://picsum.photos/200/300?random=102"
        },
        {
            "id": 103,
            "title": "The Girl with the Dragon Tattoo",
            "description": "A modern Scandinavian thriller with complex characters and intricate plot.",
            "cover": "https://picsum.photos/200/300?random=103"
        }
    ]
    
    return JSONResponse(content={
        "book_id": book_id,
        "recommendations": recommendations
    })

@app.post("/books/{book_id}/save")
async def save_book_to_library(book_id: int):
    """
    Saves a book to the user's library.
    """
    return JSONResponse(content={
        "status": "success",
        "message": f"Book with ID {book_id} saved to library"
    })

@app.post("/books/save-all")
async def save_all_books():
    """
    Saves all books to the user's library.
    """
    return JSONResponse(content={
        "status": "success",
        "message": "All books saved to library"
    })

@app.get("/books/recommendations")
async def get_all_recommendations():
    """
    Returns mock recommendations for all books.
    """
    # Mock recommendations data
    recommendations = [
        {
            "id": 201,
            "title": "Bestselling Fiction",
            "description": "A collection of contemporary bestsellers across genres.",
            "cover": "https://picsum.photos/200/300?random=201"
        },
        {
            "id": 202,
            "title": "Award Winners",
            "description": "Books that have won prestigious literary awards recently.",
            "cover": "https://picsum.photos/200/300?random=202"
        },
        {
            "id": 203,
            "title": "Hidden Gems",
            "description": "Underrated books that deserve more recognition.",
            "cover": "https://picsum.photos/200/300?random=203"
        }
    ]
    
    return JSONResponse(content={
        "recommendations": recommendations
    })

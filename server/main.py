from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
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

        return JSONResponse(content={
            "response": final_response_content,
        })
    except Exception as e:
        logger.error(f"Error processing image: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

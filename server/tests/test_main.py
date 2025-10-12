import sys
import os

# Add the parent directory (server/) to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from main import app
import io
from PIL import Image
# Import logging manager
from logging_manager import get_logger

# Create logger instance
logger = get_logger()

client = TestClient(app)

def create_dummy_image(filename="test_image.png"):
    """Creates a dummy PNG image in memory."""
    logger.debug(f"Creating dummy image: {filename}")
    img = Image.new('RGB', (100, 100), color = 'red')
    byte_arr = io.BytesIO()
    img.save(byte_arr, format='PNG')
    byte_arr.seek(0)
    logger.debug("Dummy image created successfully")
    return (byte_arr, filename, "image/png")

def test_process_image_success():
    """Test the /process-image endpoint with a valid image and query."""
    logger.info("Running test_process_image_success")
    image_file, filename, content_type = create_dummy_image()
    query_text = "What is in this image?"
    logger.debug(f"Test parameters - filename: {filename}, content_type: {content_type}, query: {query_text}")

    response = client.post(
        "/process-image",
        files={"image": (filename, image_file, content_type)},
        data={"query": query_text}
    )
    
    logger.debug(f"Response status code: {response.status_code}")
    logger.debug(f"Response JSON: {response.json()}")

    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["query_received"] == query_text
    assert response.json()["filename"] == filename
    assert response.json()["content_type"] == content_type
    assert "image_dimensions" in response.json()
    assert response.json()["image_dimensions"]["width"] == 100
    assert response.json()["image_dimensions"]["height"] == 100
    logger.info("test_process_image_success completed successfully")

def test_process_image_no_image():
    """Test the /process-image endpoint without an image."""
    logger.info("Running test_process_image_no_image")
    query_text = "No image here"
    logger.debug(f"Test parameter - query: {query_text}")

    response = client.post(
        "/process-image",
        data={"query": query_text}
    )
    logger.debug(f"Response status code: {response.status_code}")
    assert response.status_code == 422 # Unprocessable Entity due to missing image
    logger.info("test_process_image_no_image completed successfully")

def test_process_image_no_query():
    """Test the /process-image endpoint without a query."""
    logger.info("Running test_process_image_no_query")
    image_file, filename, content_type = create_dummy_image()
    logger.debug(f"Test parameters - filename: {filename}, content_type: {content_type}")

    response = client.post(
        "/process-image",
        files={"image": (filename, image_file, content_type)}
    )
    logger.debug(f"Response status code: {response.status_code}")
    assert response.status_code == 422 # Unprocessable Entity due to missing query
    logger.info("test_process_image_no_query completed successfully")

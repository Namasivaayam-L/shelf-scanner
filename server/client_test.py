import requests
import io
from PIL import Image
from logging_manager import get_logger

# Create logger instance
logger = get_logger()

# URL of your FastAPI endpoint
API_URL = "http://127.0.0.1:8000/process-image"
logger.info(f"Client test configured to use API URL: {API_URL}")

def create_dummy_image(filename="client_test_image.png"):
    """Creates a dummy PNG image in memory for client testing."""
    logger.debug(f"Creating dummy image: {filename}")
    img = Image.new('RGB', (200, 150), color = 'blue')
    byte_arr = io.BytesIO()
    img.save(byte_arr, format='PNG')
    byte_arr.seek(0)
    logger.debug("Dummy image created successfully")
    return byte_arr, filename, "image/png"

def run_client_test():
    """Sends a POST request to the FastAPI endpoint with an image and a query."""
    logger.info("Running client test...")
    print("Running client test...")

    image_file, filename, content_type = create_dummy_image()
    query_text = "What objects are present in this blue image?"
    logger.debug(f"Test parameters - filename: {filename}, content_type: {content_type}, query: {query_text}")

    files = {'image': (filename, image_file, content_type)}
    data = {'query': query_text}

    try:
        logger.info("Sending POST request to API endpoint")
        response = requests.post(API_URL, files=files, data=data)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
        logger.info(f"Received successful response with status code: {response.status_code}")

        print(f"Status Code: {response.status_code}")
        print("Response JSON:")
        print(response.json())
        logger.debug(f"Response JSON: {response.json()}")

    except requests.exceptions.ConnectionError as e:
        error_msg = f"Error: Could not connect to the server at {API_URL}."
        print(error_msg)
        logger.error(error_msg)
        print("Please ensure the FastAPI server is running (e.g., `uvicorn main:app --reload`)")
        logger.error(f"Connection error: {e}")
    except requests.exceptions.RequestException as e:
        error_msg = f"An error occurred: {e}"
        print(error_msg)
        logger.error(error_msg)

if __name__ == "__main__":
    logger.info("Starting client test script")
    run_client_test()
    logger.info("Client test script completed")

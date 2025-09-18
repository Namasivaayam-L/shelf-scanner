import requests
import io
from PIL import Image

# URL of your FastAPI endpoint
API_URL = "http://127.0.0.1:8000/process-image"

def create_dummy_image(filename="client_test_image.png"):
    """Creates a dummy PNG image in memory for client testing."""
    img = Image.new('RGB', (200, 150), color = 'blue')
    byte_arr = io.BytesIO()
    img.save(byte_arr, format='PNG')
    byte_arr.seek(0)
    return byte_arr, filename, "image/png"

def run_client_test():
    """Sends a POST request to the FastAPI endpoint with an image and a query."""
    print("Running client test...")

    image_file, filename, content_type = create_dummy_image()
    query_text = "What objects are present in this blue image?"

    files = {'image': (filename, image_file, content_type)}
    data = {'query': query_text}

    try:
        response = requests.post(API_URL, files=files, data=data)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)

        print(f"Status Code: {response.status_code}")
        print("Response JSON:")
        print(response.json())

    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to the server at {API_URL}.")
        print("Please ensure the FastAPI server is running (e.g., `uvicorn main:app --reload`)")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    run_client_test()

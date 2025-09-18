import sys
import os

# Add the parent directory (server/) to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi.testclient import TestClient
from main import app
import io
from PIL import Image

client = TestClient(app)

def create_dummy_image(filename="test_image.png"):
    """Creates a dummy PNG image in memory."""
    img = Image.new('RGB', (100, 100), color = 'red')
    byte_arr = io.BytesIO()
    img.save(byte_arr, format='PNG')
    byte_arr.seek(0)
    return (byte_arr, filename, "image/png")

def test_process_image_success():
    """Test the /process-image endpoint with a valid image and query."""
    image_file, filename, content_type = create_dummy_image()
    query_text = "What is in this image?"

    response = client.post(
        "/process-image",
        files={"image": (filename, image_file, content_type)},
        data={"query": query_text}
    )

    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["query_received"] == query_text
    assert response.json()["filename"] == filename
    assert response.json()["content_type"] == content_type
    assert "image_dimensions" in response.json()
    assert response.json()["image_dimensions"]["width"] == 100
    assert response.json()["image_dimensions"]["height"] == 100

def test_process_image_no_image():
    """Test the /process-image endpoint without an image."""
    query_text = "No image here"

    response = client.post(
        "/process-image",
        data={"query": query_text}
    )
    assert response.status_code == 422 # Unprocessable Entity due to missing image

def test_process_image_no_query():
    """Test the /process-image endpoint without a query."""
    image_file, filename, content_type = create_dummy_image()

    response = client.post(
        "/process-image",
        files={"image": (filename, image_file, content_type)}
    )
    assert response.status_code == 422 # Unprocessable Entity due to missing query

#!/usr/bin/env python3
"""
Test script to verify the integration between client and server.
This script will:
1. Start the FastAPI server
2. Simulate a client request to process an image
3. Verify the response format
"""

import requests
import time
import subprocess
import sys
import os
from pathlib import Path

def test_server_connection():
    """Test if the server is running and responding correctly."""
    try:
        # Test the server health endpoint
        response = requests.get("http://localhost:8000/docs", timeout=5)
        if response.status_code == 200:
            print("✅ Server is running and accessible")
            return True
        else:
            print(f"❌ Server returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running or not accessible")
        return False
    except Exception as e:
        print(f"❌ Error connecting to server: {e}")
        return False

def test_process_image_endpoint():
    """Test the /process-image endpoint with a sample image."""
    try:
        # Use an existing test image from the server tests directory
        test_image_path = Path("server/tests/book-shelf-image.jpg")
        
        if not test_image_path.exists():
            print("❌ Test image not found at server/tests/book-shelf-image.jpg")
            return False
        
        with open(test_image_path, 'rb') as img_file:
            files = {'image': (test_image_path.name, img_file, 'image/jpeg')}
            response = requests.post(
                "http://localhost:8000/process-image",
                files=files,
                timeout=30
            )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ /process-image endpoint responded successfully")
            print(f"Response: {data}")
            
            # Check if response has the expected structure
            if 'books' in data and isinstance(data['books'], list):
                print("✅ Response has correct structure with 'books' array")
                return True
            else:
                print("❌ Response doesn't have expected 'books' structure")
                print(f"Response keys: {data.keys()}")
                return False
        else:
            print(f"❌ /process-image endpoint returned status code: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing /process-image endpoint: {e}")
        return False

def test_mock_endpoints():
    """Test the mock endpoints for recommendations and save operations."""
    try:
        # Test get recommendations for a book
        response = requests.get("http://localhost:8000/books/1/recommendations", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ /books/1/recommendations endpoint responded successfully")
        else:
            print(f"❌ Recommendations endpoint returned status code: {response.status_code}")
            return False
            
        # Test save book to library
        response = requests.post("http://localhost:8000/books/1/save", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ /books/1/save endpoint responded successfully")
        else:
            print(f"❌ Save book endpoint returned status code: {response.status_code}")
            return False
            
        # Test save all books
        response = requests.post("http://localhost:8000/books/save-all", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ /books/save-all endpoint responded successfully")
        else:
            print(f"❌ Save all books endpoint returned status code: {response.status_code}")
            return False
            
        # Test get all recommendations
        response = requests.get("http://localhost:8000/books/recommendations", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print("✅ /books/recommendations endpoint responded successfully")
        else:
            print(f"❌ All recommendations endpoint returned status code: {response.status_code}")
            return False
            
        return True
        
    except Exception as e:
        print(f"❌ Error testing mock endpoints: {e}")
        return False

def main():
    """Main test function."""
    print("🧪 Starting integration tests...")
    print("=" * 50)
    
    # Test 1: Server connection
    print("\n1. Testing server connection...")
    if not test_server_connection():
        print("❌ Server connection test failed")
        return False
    
    # Test 2: Process image endpoint
    print("\n2. Testing /process-image endpoint...")
    if not test_process_image_endpoint():
        print("❌ Process image endpoint test failed")
        return False
    
    # Test 3: Mock endpoints
    print("\n3. Testing mock endpoints...")
    if not test_mock_endpoints():
        print("❌ Mock endpoints test failed")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All integration tests passed!")
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)

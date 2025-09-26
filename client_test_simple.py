#!/usr/bin/env python3
"""
Simple test script to verify the frontend-backend integration.
This script will:
1. Test if the server is running
2. Test the /process-image endpoint with a real image file
3. Verify the response format expected by the frontend
"""

import requests
import sys
from pathlib import Path

def test_server_health():
    """Test if the server is running."""
    try:
        response = requests.get("http://localhost:8000/docs", timeout=5)
        if response.status_code == 200:
            print("✅ Server is running")
            return True
        else:
            print(f"❌ Server returned status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Server is not accessible: {e}")
        return False

def test_process_image():
    """Test the /process-image endpoint with a real image."""
    try:
        # Use the existing test image
        test_image_path = Path("server/tests/book-shelf-image.jpg")
        
        if not test_image_path.exists():
            print("❌ Test image not found")
            return False
        
        print(f"📤 Sending image: {test_image_path}")
        print(f"📏 File size: {test_image_path.stat().st_size} bytes")
        
        with open(test_image_path, 'rb') as img_file:
            files = {'image': (test_image_path.name, img_file, 'image/jpeg')}
            response = requests.post(
                "http://localhost:8000/process-image",
                files=files,
                timeout=30
            )
        
        print(f"📥 Response status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Process image endpoint working correctly")
            print(f"📊 Response structure: {list(data.keys())}")
            
            # Check if response has the expected structure for frontend
            if 'books' in data:
                books = data['books']
                print(f"📚 Books found: {len(books)}")
                
                if len(books) > 0:
                    book = books[0]
                    print("📖 Sample book structure:")
                    for key in book.keys():
                        print(f"   - {key}: {type(book[key]).__name__}")
                        
                    # Verify required fields for frontend
                    required_fields = ['id', 'title', 'description', 'cover']
                    missing_fields = [field for field in required_fields if field not in book]
                    
                    if not missing_fields:
                        print("✅ Book structure matches frontend requirements")
                        print("🎉 Frontend-backend integration is working!")
                        return True
                    else:
                        print(f"❌ Missing required fields: {missing_fields}")
                        return False
                else:
                    print("⚠️  No books detected in image (this might be expected)")
                    print("✅ Response format is correct for frontend")
                    return True
            else:
                print("❌ Response missing 'books' key")
                return False
        else:
            print(f"❌ Process image endpoint failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing process image: {e}")
        return False

def main():
    """Main test function."""
    print("🧪 Testing frontend-backend integration...")
    print("=" * 50)
    
    # Test 1: Server health
    print("\n1. Testing server health...")
    if not test_server_health():
        print("❌ Server health test failed")
        return False
    
    # Test 2: Process image endpoint
    print("\n2. Testing process image endpoint...")
    if not test_process_image():
        print("❌ Process image test failed")
        return False
    
    print("\n" + "=" * 50)
    print("🎉 All integration tests passed!")
    print("The frontend should now be able to communicate with the backend.")
    return True


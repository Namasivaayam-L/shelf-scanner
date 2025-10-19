"""
Test script to verify the new route structure is working correctly.
"""
import requests
import os

# Test the logging endpoints (should still be available in main)
def test_logging_endpoints():
    base_url = "http://127.0.0.1:8000"
    
    # Test getting current logging level
    try:
        response = requests.get(f"{base_url}/logging/level")
        print(f"GET /logging/level status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error testing GET /logging/level: {e}")
    
    # Test setting logging level to debug
    try:
        response = requests.post(f"{base_url}/logging/level", params={"level": "debug"})
        print(f"POST /logging/level status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error testing POST /logging/level: {e}")
    
    # Test setting logging level back to info
    try:
        response = requests.post(f"{base_url}/logging/level", params={"level": "info"})
        print(f"POST /logging/level (info) status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error testing POST /logging/level: {e}")

if __name__ == "__main__":
    print("Testing the restructured server endpoints...")
    test_logging_endpoints()
    print("Test completed!")

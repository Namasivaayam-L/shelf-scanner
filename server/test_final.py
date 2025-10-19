"""
Final test script to verify all the restructured components are working correctly.
"""
import requests
import os
import time

def test_endpoints():
    base_url = "http://127.0.0.1:8000"
    
    print("Testing endpoints...")
    
    # Test ping endpoint
    try:
        response = requests.get(f"{base_url}/ping")
        print(f"GET /ping status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error testing GET /ping: {e}")
    
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
    print("Testing the fully restructured server endpoints...")
    # Give a moment for server to be ready if needed
    time.sleep(2)
    test_endpoints()
    print("Final test completed!")

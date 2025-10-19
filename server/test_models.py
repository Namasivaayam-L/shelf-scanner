"""
Test script to verify the models are working correctly.
"""
from models import RecommendationsRequest, BookResponse, RecommendationsResponse, BooksResponse

def test_models():
    # Test RecommendationsRequest model
    req = RecommendationsRequest(books=[{"title": "Test Book", "author": "Test Author"}])
    print(f"RecommendationsRequest: {req}")
    print(f"Books in request: {req.books}")
    
    # Test BookResponse model
    book = BookResponse(id=1, title="Test Book", description="A test book", cover="http://example.com/cover.jpg")
    print(f"BookResponse: {book}")
    
    # Test RecommendationsResponse model
    rec_response = RecommendationsResponse(recommendations=[book])
    print(f"RecommendationsResponse: {rec_response}")
    
    # Test BooksResponse model
    books_response = BooksResponse(books=[book])
    print(f"BooksResponse: {books_response}")
    
    print("All models working correctly!")

if __name__ == "__main__":
    test_models()

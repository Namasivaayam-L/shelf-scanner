import os
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from langchain_core.messages import HumanMessage

from agent.agent import agent
from agent.post_process import post_process_llm_response
from config.logging_manager import get_logger
from models.models import RecommendationsRequest, RecommendationsResponse, BookResponse

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create API router
router = APIRouter()
logger = get_logger()

@router.post("/books/recommendations")
@limiter.limit(os.getenv("RECOMMENDATIONS_RATE_LIMIT", "5/minute"))
async def get_recommendations(request: Request, req: RecommendationsRequest):
    """
    Returns recommendations based on provided books.
    """
    try:
        # Use the books from the request model
        books = req.books
        logger.info(f"Generating recommendations for {len(books)} books")
        
        # Create a prompt for the LLM to generate recommendations
        books_titles = [book['title'] for book in books]
        logger.debug(f"Book titles for recommendations: {books_titles}")
        
        # Read the recommendation prompt from the file
        with open('agent/prompts/recommendation_prompt.md', 'r') as file:
            recommendation_prompt = file.read()
        logger.debug("Loaded recommendation prompt from file")
        
        # Create the final prompt with the books list
        final_prompt = f"{recommendation_prompt}\n\n**Input Books:**\n{books_titles}\n\n**Your Response:**"
        
        # Generate content using the model
        logger.debug("Sending prompt to agent for recommendations")
        agent_response = agent.invoke({"messages": [HumanMessage(content=final_prompt)]})
        
        # Extract the text response
        recommendations = post_process_llm_response(agent_response["messages"][-1].content)
        logger.info(f"Received {len(recommendations) if isinstance(recommendations, dict) else 'unknown'} recommendations")
        
        # Transform the response to match the client's expected format
        recommended_books = []
        id_counter = 1
        if isinstance(recommendations, dict):
            for title, description in recommendations.items():
                recommended_books.append({
                    "id": id_counter,
                    "title": title,
                    "description": description,
                    "cover": f"https://picsum.photos/200/300?random={id_counter}"  # Mock cover image
                })
                id_counter += 1
            logger.debug(f"Transformed {len(recommended_books)} recommendations to client format")
        else:
            logger.warning("Recommendations response is not in expected dictionary format")
        
        # Return response using the defined model
        return RecommendationsResponse(recommendations=recommended_books)
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}", exc_info=True)
        return JSONResponse(content={"status": "error", "message": str(e)}, status_code=500)

import json
import re
from agent.schemas import BookGistResponse
from typing import Union, Dict
from logging_manager import get_logger

logger = get_logger()

def post_process_llm_response(raw_content: str) -> Union[Dict[str, str], str]:
    """
    Post-processes the raw LLM response to extract and validate JSON content.

    Args:
        raw_content: The raw string content from the LLM's response.

    Returns:
        A dictionary representing the validated JSON response, or an error string.
    """
    logger.debug(f"Post-processing LLM response (length: {len(raw_content)})")
    parsed_json_data = None
    
    # Attempt to extract JSON from markdown code block (```json { ... } ```)
    json_match = re.search(r"```json\s*(\{.*?\})\s*```", raw_content, re.DOTALL)
    
    if json_match:
        json_string = json_match.group(1)
        logger.debug("Found JSON in markdown code block")
        try:
            parsed_json_data = json.loads(json_string)
            logger.debug("Successfully parsed JSON from markdown block")
        except json.JSONDecodeError as e:
            logger.warning(f"Failed to parse JSON from markdown block: {e}")
            # If markdown block is present but content is not valid JSON, try raw content
            pass
    
    if parsed_json_data is None:
        # If no markdown block or parsing failed, try to parse the raw content directly
        logger.debug("Attempting to parse raw content as JSON")
        try:
            parsed_json_data = json.loads(raw_content)
            logger.debug("Successfully parsed raw content as JSON")
        except json.JSONDecodeError as e:
            logger.warning(f"Failed to parse raw content as JSON: {e}")
            # If all parsing fails, return the raw content as an error string
            logger.debug("Returning raw content as error string")
            return raw_content

    # Validate with Pydantic model
    logger.debug("Validating parsed JSON with Pydantic model")
    try:
        validated_response = BookGistResponse.model_validate(parsed_json_data)
        logger.info("Successfully validated LLM response with Pydantic model")
        # Return the validated Pydantic object's root content (the dict)
        return validated_response.root
    except Exception as e:
        # If Pydantic validation fails, return an error message along with the raw content
        logger.error(f"Error validating LLM response with Pydantic model: {e}")
        error_msg = f"Error validating LLM response: {e}\nRaw content: {raw_content}"
        logger.debug("Returning validation error message")
        return error_msg

import json
import re
from agent.schemas import BookGistResponse
from typing import Union, Dict

def post_process_llm_response(raw_content: str) -> Union[Dict[str, str], str]:
    """
    Post-processes the raw LLM response to extract and validate JSON content.

    Args:
        raw_content: The raw string content from the LLM's response.

    Returns:
        A dictionary representing the validated JSON response, or an error string.
    """
    parsed_json_data = None
    # Attempt to extract JSON from markdown code block (```json { ... } ```)
    json_match = re.search(r"```json\s*(\{.*?\})\s*```", raw_content, re.DOTALL)
    
    if json_match:
        json_string = json_match.group(1)
        try:
            parsed_json_data = json.loads(json_string)
        except json.JSONDecodeError:
            # If markdown block is present but content is not valid JSON, try raw content
            pass
    
    if parsed_json_data is None:
        # If no markdown block or parsing failed, try to parse the raw content directly
        try:
            parsed_json_data = json.loads(raw_content)
        except json.JSONDecodeError:
            # If all parsing fails, return the raw content as an error string
            return raw_content

    # Validate with Pydantic model
    try:
        validated_response = BookGistResponse.model_validate(parsed_json_data)
        # Return the validated Pydantic object's root content (the dict)
        return validated_response.root
    except Exception as e:
        # If Pydantic validation fails, return an error message along with the raw content
        return f"Error validating LLM response: {e}\nRaw content: {raw_content}"

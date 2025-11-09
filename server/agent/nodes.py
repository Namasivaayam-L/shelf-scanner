from langgraph.graph import MessagesState
from langchain_core.messages import SystemMessage, AIMessage
from agent.llm import gemini
from agent.prompts.retrieve_prompts import read_md_file
from agent.post_process import post_process_llm_response # Import the new post-process function
from config.logging_manager import get_logger
import json # Import json for converting dict to string

logger = get_logger()

# Load the system prompt content
SYSTEM_PROMPT_CONTENT = read_md_file("sys_prompt.md")

# Nodes
def llm_call(state: MessagesState):
    """
    Invokes the LLM and post-processes its response to ensure it conforms to BookGistResponse schema.
    """
    # Invoke the LLM to get a raw string response
    llm_response_message = gemini.invoke(
        [
            SystemMessage(
                content=SYSTEM_PROMPT_CONTENT
            )
        ]
        + state["messages"]
    )
    
    raw_content = llm_response_message.content
    
    # Use the new post-processing function
    processed_content = post_process_llm_response(raw_content)

    # AIMessage content expects a string or a list, not a dict directly.
    # Convert the dictionary to a JSON string if it's a dict.
    if isinstance(processed_content, dict):
        final_content = json.dumps(processed_content, indent=2)
    else:
        final_content = processed_content

    return {
        "messages": [AIMessage(content=final_content)]
    }

import os
from logging_manager import get_logger

logger = get_logger()

def read_md_file(filename: str) -> str:
    """
    Reads and returns the content of a Markdown file from the same directory.

    Args:
        filename: The name of the Markdown file (e.g., "sys_prompt.md").

    Returns:
        The content of the Markdown file as a string.
    """
    logger.debug(f"Reading markdown file: {filename}")
    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, filename)
    logger.debug(f"File path: {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        logger.info(f"Successfully read file: {filename} ({len(content)} characters)")
        return content
    except FileNotFoundError:
        error_msg = f"Error: File '{filename}' not found in '{current_dir}'."
        logger.error(error_msg)
        return error_msg
    except Exception as e:
        error_msg = f"Error reading file '{filename}': {e}"
        logger.error(error_msg)
        return error_msg

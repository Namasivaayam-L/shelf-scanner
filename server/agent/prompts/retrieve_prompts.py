import os

def read_md_file(filename: str) -> str:
    """
    Reads and returns the content of a Markdown file from the same directory.

    Args:
        filename: The name of the Markdown file (e.g., "sys_prompt.md").

    Returns:
        The content of the Markdown file as a string.
    """
    current_dir = os.path.dirname(__file__)
    filepath = os.path.join(current_dir, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return content
    except FileNotFoundError:
        return f"Error: File '{filename}' not found in '{current_dir}'."
    except Exception as e:
        return f"Error reading file '{filename}': {e}"

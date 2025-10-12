from pydantic import RootModel, Field
from typing import Dict
from logging_manager import get_logger

logger = get_logger()
logger.debug("Loading BookGistResponse schema")

class BookGistResponse(RootModel[Dict[str, str]]):
    """
    Represents the expected JSON output format for book gists.
    Each key is a book title (string) and its value is a one-liner gist (string).
    """
    root: Dict[str, str] = Field(
        ...,
        example={
            "The Hitchhiker's Guide to the Galaxy": "A comedic space opera that follows an unwitting human's misadventures across the universe after Earth's destruction.",
            "Pride and Prejudice": "A timeless romantic novel exploring societal expectations and the complexities of love in 19th-century England.",
            "Dune": "An epic science fiction saga set on a desert planet, delving into politics, religion, and ecological warfare."
        },
        description="A dictionary where keys are book titles and values are their one-liner gists."
    )

logger.debug("BookGistResponse schema loaded successfully")

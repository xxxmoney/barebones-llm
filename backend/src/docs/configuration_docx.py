from fastapi.openapi.models import Example
from src.constants.llm_constants import DEFAULT_MODEL, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE, DEFAULT_OPEN_AI_TOKEN, \
    DEFAULT_OPEN_AI_URL
from src.dtos.configuration.configuration import Configuration

UPDATE_CONFIGURATION_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=Configuration(
                open_ai_url=DEFAULT_OPEN_AI_URL,
                open_ai_token=DEFAULT_OPEN_AI_TOKEN,
                model=DEFAULT_MODEL,
                max_tokens=DEFAULT_MAX_TOKENS,
                temperature=DEFAULT_TEMPERATURE
            )
        )
    }

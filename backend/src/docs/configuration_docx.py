from fastapi.openapi.models import Example
from src.constants.llm_constants import SAMPLE_DEFAULT_MODEL, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE, SAMPLE_DEFAULT_OPEN_AI_TOKEN, \
    SAMPLE_DEFAULT_OPEN_AI_URL
from src.dtos.configuration.configuration import ConfigurationDto

UPDATE_CONFIGURATION_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=ConfigurationDto(
                open_ai_url=SAMPLE_DEFAULT_OPEN_AI_URL,
                open_ai_token=SAMPLE_DEFAULT_OPEN_AI_TOKEN,
                model=SAMPLE_DEFAULT_MODEL,
                max_tokens=DEFAULT_MAX_TOKENS,
                temperature=DEFAULT_TEMPERATURE
            )
        )
    }

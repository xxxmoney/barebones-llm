from dataclasses import dataclass

from src.constants.llm_constants import DEFAULT_OPEN_AI_URL, DEFAULT_AI_TOKEN, DEFAULT_MODEL, DEFAULT_MAX_TOKENS, \
    DEFAULT_TEMPERATURE

@dataclass
class Configuration:
    open_ai_url: str
    open_ai_token: str
    model: str
    max_tokens: int
    temperature: float

    @staticmethod
    def default() -> "Configuration":
        return Configuration(
            open_ai_url=DEFAULT_OPEN_AI_URL,
            open_ai_token=DEFAULT_AI_TOKEN,
            model=DEFAULT_MODEL,
            max_tokens=DEFAULT_MAX_TOKENS,
            temperature=DEFAULT_TEMPERATURE
        )


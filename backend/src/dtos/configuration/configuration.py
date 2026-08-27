from src.dtos.base import BaseDto

class ConfigurationDto(BaseDto):
    is_configured: bool
    open_ai_url: str | None
    open_ai_token: str | None
    model: str | None
    max_tokens: int
    temperature: float

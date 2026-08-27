from src.dtos.base import BaseDto

class ConfigurationUpdateDto(BaseDto):
    open_ai_url: str
    open_ai_token: str
    model: str | None = None # During setup up when no model is available
    max_tokens: int
    temperature: float

from src.dtos.base import BaseModel

class ConfigurationDto(BaseModel):
    open_ai_url: str | None
    open_ai_token: str | None
    model: str | None
    max_tokens: int
    temperature: float

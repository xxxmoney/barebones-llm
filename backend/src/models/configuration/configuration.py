from src.models.base import BaseModel

class ConfigurationModel(BaseModel):
    is_configured: bool = False
    open_ai_url: str | None
    open_ai_token: str | None
    model: str | None
    max_tokens: int
    temperature: float
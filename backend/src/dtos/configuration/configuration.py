from pydantic import BaseModel

class Configuration(BaseModel):
    open_ai_url: str
    open_ai_token: str
    model: str
    max_tokens: int
    temperature: float

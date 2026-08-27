from src.dtos.base.camel import CamelBaseModel

class Configuration(CamelBaseModel):
    open_ai_url: str
    open_ai_token: str
    model: str
    max_tokens: int
    temperature: float

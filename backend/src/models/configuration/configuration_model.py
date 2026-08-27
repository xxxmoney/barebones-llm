from dataclasses import dataclass

@dataclass
class ConfigurationModel:
    open_ai_url: str | None
    open_ai_token: str | None
    model: str | None
    max_tokens: int
    temperature: float
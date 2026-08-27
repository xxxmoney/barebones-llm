from src.dtos.base import BaseDto


class ConnectionDto(BaseDto):
    open_ai_url: str
    open_ai_token: str

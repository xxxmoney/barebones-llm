from src.dtos.base import BaseDto

class MessageUpdateDto(BaseDto):
    text: str
    role: str | None = None

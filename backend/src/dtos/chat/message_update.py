from src.dtos.base import BaseModel

class MessageUpdateDto(BaseModel):
    text: str
    role: str | None = None

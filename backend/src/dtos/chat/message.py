from datetime import datetime
from uuid import UUID
from src.dtos.base import BaseDto

class MessageDto(BaseDto):
    id: UUID
    text: str
    role: str
    creation_date: datetime
    update_date: datetime | None = None


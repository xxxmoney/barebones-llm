from datetime import datetime
from uuid import UUID
from src.dtos.base import BaseModel


class ChatDto(BaseModel):
    id: UUID
    name: str
    creation_date: datetime
    update_date: datetime | None = None

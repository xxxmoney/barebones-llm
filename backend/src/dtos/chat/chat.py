from datetime import datetime

from pydantic import BaseModel
from uuid import UUID
from src.dtos.chat.message import Message

class Chat(BaseModel):
    id: UUID
    name: str
    messages: list[Message]
    creation_date: datetime
    update_date: datetime | None

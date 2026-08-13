from datetime import datetime
from uuid import UUID
from src.models.chat.message import Message
from dataclasses import dataclass

@dataclass
class Chat:
    id: UUID
    name: str
    messages: list[Message]
    creation_date: datetime
    update_date: datetime | None

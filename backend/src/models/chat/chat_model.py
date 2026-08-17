from datetime import datetime
from uuid import UUID
from src.models.chat.message_model import MessageModel
from dataclasses import dataclass

@dataclass
class ChatModel:
    id: UUID
    name: str
    messages: list[MessageModel]
    creation_date: datetime
    update_date: datetime | None

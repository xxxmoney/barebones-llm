from datetime import datetime
from uuid import UUID
from src.models.base import BaseModel
from src.models.chat.message_model import MessageModel

class ChatModel(BaseModel):
    id: UUID
    name: str
    messages: list[MessageModel]
    creation_date: datetime
    update_date: datetime | None

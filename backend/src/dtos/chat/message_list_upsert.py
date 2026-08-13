from typing import List
from uuid import UUID
from pydantic import BaseModel
from src.dtos.chat.message_upsert import MessageUpsert

class MessageListUpsert(BaseModel):
    chat_id: UUID
    messages: List[MessageUpsert]


from datetime import datetime
from uuid import UUID
from src.models.base import BaseModel

class MessageModel(BaseModel):
    id: UUID
    text: str
    role: str
    creation_date: datetime
    update_date: datetime | None


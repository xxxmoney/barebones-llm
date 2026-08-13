from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class MessageUpsert(BaseModel):
    id: UUID | None
    text: str
    role: str
    date: datetime

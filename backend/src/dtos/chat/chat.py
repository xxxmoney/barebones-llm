from datetime import datetime
from uuid import UUID
from pydantic import BaseModel

class Chat(BaseModel):
    id: UUID
    name: str
    creation_date: datetime
    update_date: datetime | None = None

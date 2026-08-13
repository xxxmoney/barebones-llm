from datetime import datetime
from uuid import UUID

from pydantic import BaseModel

class Message(BaseModel):
    id: UUID
    text: str
    role: str
    creation_date: datetime
    update_date: datetime | None


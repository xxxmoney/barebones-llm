from uuid import UUID
from pydantic import BaseModel

class MessageUpsert(BaseModel):
    id: UUID | None = None
    text: str
    role: str

from uuid import UUID
from pydantic import BaseModel

class ChatUpsert(BaseModel):
    id: UUID | None = None
    name: str

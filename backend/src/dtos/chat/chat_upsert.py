from uuid import UUID
from xmlrpc.client import DateTime
from pydantic import BaseModel


class ChatUpsert(BaseModel):
    id: UUID | None
    name: str
    date: DateTime

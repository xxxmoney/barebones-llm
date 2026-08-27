from datetime import datetime
from uuid import UUID
from src.dtos.base.camel import CamelBaseModel

class Message(CamelBaseModel):
    id: UUID
    text: str
    role: str
    creation_date: datetime
    update_date: datetime | None = None


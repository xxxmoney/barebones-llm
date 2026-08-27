from datetime import datetime
from uuid import UUID
from src.dtos.base.camel import CamelBaseModel


class Chat(CamelBaseModel):
    id: UUID
    name: str
    creation_date: datetime
    update_date: datetime | None = None

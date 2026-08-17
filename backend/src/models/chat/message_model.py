from datetime import datetime
from typing import Literal
from uuid import UUID
from dataclasses import dataclass

@dataclass
class MessageModel:
    id: UUID
    text: str
    role: str
    creation_date: datetime
    update_date: datetime | None


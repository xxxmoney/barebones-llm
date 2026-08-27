from src.dtos.base.camel import CamelBaseModel

class MessageUpdate(CamelBaseModel):
    text: str
    role: str | None = None

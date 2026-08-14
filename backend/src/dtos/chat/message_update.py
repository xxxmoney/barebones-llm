from pydantic import BaseModel

class MessageUpdate(BaseModel):
    text: str
    role: str

from typing import List
from pydantic import BaseModel
from src.dtos.openai.completion import Message

class CompletionRequest(BaseModel):
    messages: List[Message]

class CompletionResponse(BaseModel):
    text: str

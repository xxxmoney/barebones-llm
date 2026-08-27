from typing import List
from src.dtos.base import BaseModel
from src.dtos.openai.completion import Message

class CompletionRequestDto(BaseModel):
    messages: List[Message]

class CompletionResponseDto(BaseModel):
    text: str

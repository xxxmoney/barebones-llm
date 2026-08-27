from typing import List
from src.dtos.base import BaseDto
from src.dtos.openai.completion import Message

class CompletionRequestDto(BaseDto):
    messages: List[Message]

class CompletionResponseDto(BaseDto):
    text: str

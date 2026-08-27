from typing import List
from src.dtos.base.camel import CamelBaseModel
from src.dtos.openai.completion import Message

class CompletionRequest(CamelBaseModel):
    messages: List[Message]

class CompletionResponse(CamelBaseModel):
    text: str

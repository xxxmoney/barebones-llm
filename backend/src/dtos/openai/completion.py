from typing import List
from openai.types.chat import ChatCompletionDeveloperMessageParam, ChatCompletionSystemMessageParam, \
    ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam, ChatCompletionToolMessageParam, \
    ChatCompletionFunctionMessageParam
from src.dtos.base import BaseDto
from src.dtos.openai.connection import ConnectionDto

Message = ChatCompletionDeveloperMessageParam | ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam | ChatCompletionAssistantMessageParam | ChatCompletionToolMessageParam | ChatCompletionFunctionMessageParam

class CompletionRequestDto(BaseDto):
    model: str | None
    messages: List[Message]
    temperature: float
    max_tokens: int

class FullCompletionRequestDto(BaseDto):
    connection: ConnectionDto
    completion: CompletionRequestDto

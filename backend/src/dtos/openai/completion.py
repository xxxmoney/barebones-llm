from typing import List
from openai.types.chat import ChatCompletionDeveloperMessageParam, ChatCompletionSystemMessageParam, \
    ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam, ChatCompletionToolMessageParam, \
    ChatCompletionFunctionMessageParam
from src.dtos.base import BaseDto

Message = ChatCompletionDeveloperMessageParam | ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam | ChatCompletionAssistantMessageParam | ChatCompletionToolMessageParam | ChatCompletionFunctionMessageParam

class CompletionRequestDto(BaseDto):
    model: str
    messages: List[Message]
    temperature: float
    max_tokens: int

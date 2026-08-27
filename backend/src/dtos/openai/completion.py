from typing import List
from openai.types.chat import ChatCompletionDeveloperMessageParam, ChatCompletionSystemMessageParam, \
    ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam, ChatCompletionToolMessageParam, \
    ChatCompletionFunctionMessageParam
from src.dtos.base.camel import CamelBaseModel

Message = ChatCompletionDeveloperMessageParam | ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam | ChatCompletionAssistantMessageParam | ChatCompletionToolMessageParam | ChatCompletionFunctionMessageParam

class CompletionRequest(CamelBaseModel):
    model: str
    messages: List[Message]
    temperature: float
    max_tokens: int

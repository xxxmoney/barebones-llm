from typing import List

from openai.types.chat import ChatCompletionDeveloperMessageParam
from pydantic import BaseModel

class CompletionRequest(BaseModel):
    model: str
    messages: List[ChatCompletionDeveloperMessageParam]
    temperature: float
    max_tokens: int

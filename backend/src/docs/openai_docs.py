from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from src.constants.llm_constants import DEFAULT_MODEL, DEFAULT_MAX_TOKENS
from src.dtos.openai.completion import CompletionRequest

COMPLETION_REQUEST_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=CompletionRequest(
                model=DEFAULT_MODEL,
                messages=[
                    ChatCompletionSystemMessageParam(role="system", content="You are an assistant, do as the user says."),
                    ChatCompletionUserMessageParam(role="user", content="Hey there."),
                    ChatCompletionAssistantMessageParam(role="assistant", content="Hello there, happy to help, ask away."),
                    ChatCompletionUserMessageParam(role="user", content="Tell me one interesting fact.")
                ],
                temperature=0.7,
                max_tokens=DEFAULT_MAX_TOKENS
            ).model_dump()
        )
    }

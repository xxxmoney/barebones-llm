from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from src.constants.llm_constants import DEFAULT_MODEL, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE
from src.dtos.openai.completion import CompletionRequest

CREATE_CHAT_COMPLETION_EXAMPLES = {
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
                temperature=DEFAULT_TEMPERATURE,
                max_tokens=DEFAULT_MAX_TOKENS
            ).model_dump()
        )
    }

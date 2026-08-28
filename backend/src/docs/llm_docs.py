from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from src.dtos.llm.completion import CompletionRequestDto

CREATE_COMPLETION_EXAMPLES={
        "example": Example(
            summary="Request example",
            description="",
            value=CompletionRequestDto(
                messages=[
                    ChatCompletionSystemMessageParam(role="system",
                                                     content="You are an assistant, do as the user says."),
                    ChatCompletionUserMessageParam(role="user", content="Hey there."),
                    ChatCompletionAssistantMessageParam(role="assistant",
                                                        content="Hello there, happy to help, ask away."),
                    ChatCompletionUserMessageParam(role="user", content="Tell me one interesting fact.")
                ],
            )
        )
    }

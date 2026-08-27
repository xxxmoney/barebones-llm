from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from src.constants.llm_constants import SAMPLE_DEFAULT_MODEL, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE, \
    SAMPLE_DEFAULT_OPEN_AI_URL, SAMPLE_DEFAULT_OPEN_AI_TOKEN
from src.dtos.openai.completion import FullCompletionRequestDto, CompletionRequestDto
from src.dtos.openai.connection import ConnectionDto

CREATE_CHAT_COMPLETION_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=FullCompletionRequestDto(
                connection=ConnectionDto(
                    open_ai_url=SAMPLE_DEFAULT_OPEN_AI_URL,
                    open_ai_token=SAMPLE_DEFAULT_OPEN_AI_TOKEN
                ),
               completion=CompletionRequestDto(
                   model=SAMPLE_DEFAULT_MODEL,
                   messages=[
                       ChatCompletionSystemMessageParam(role="system",
                                                        content="You are an assistant, do as the user says."),
                       ChatCompletionUserMessageParam(role="user", content="Hey there."),
                       ChatCompletionAssistantMessageParam(role="assistant",
                                                           content="Hello there, happy to help, ask away."),
                       ChatCompletionUserMessageParam(role="user", content="Tell me one interesting fact.")
                   ],
                   temperature=DEFAULT_TEMPERATURE,
                   max_tokens=DEFAULT_MAX_TOKENS
               )
            ).model_dump()
        )
    }

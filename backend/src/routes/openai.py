from fastapi import APIRouter, Body
from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam
from src.constants.llm_constants import DEFAULT_MODEL, DEFAULT_MAX_TOKENS
from src.dtos.openai.completion import CompletionRequest
from src.services import persistence_manager
from src.services.openai_client import OpenAIClient

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models():
    config = persistence_manager.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        models = client.get_models()

    return models

@openai_route.post("/chat-completion")
def create_chat_completion(completion: CompletionRequest = Body(
    openapi_examples={
        "example": Example(
            summary="Sample request example",
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
)):
    config = persistence_manager.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        completion = client.get_chat_completion(completion)

    return completion

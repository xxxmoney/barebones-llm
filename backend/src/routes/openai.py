from typing import List
from fastapi import APIRouter, Body
from src.docs.openai_docs import CREATE_CHAT_COMPLETION_EXAMPLES
from src.dtos.openai.completion import CompletionRequestDto
from src.dtos.openai.model import ModelDto
from src.dtos.openai.validation import ValidationDto
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models() -> List[ModelDto]:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        models = client.get_models()

    return [ModelDto(name=model.id) for model in models.data]

@openai_route.post("/validate")
def create_chat_completion(completion: CompletionRequestDto = Body(openapi_examples=CREATE_CHAT_COMPLETION_EXAMPLES)) -> ValidationDto:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        validation = client.validate(completion.model, config.max_tokens, config.temperature)

    return validation

@openai_route.post("/chat-completion")
def create_chat_completion(completion: CompletionRequestDto = Body(openapi_examples=CREATE_CHAT_COMPLETION_EXAMPLES)) -> str:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        completion = client.get_chat_completion(completion)

    return completion

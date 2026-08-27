from typing import List
from fastapi import APIRouter, Body
from src.docs.openai_docs import CREATE_CHAT_COMPLETION_EXAMPLES
from src.dtos.openai.completion import CompletionRequest
from src.dtos.openai.model import Model
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models() -> List[Model]:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        models = client.get_models()

    return [Model(name=model.id) for model in models.data]

@openai_route.post("/chat-completion")
def create_chat_completion(completion: CompletionRequest = Body(openapi_examples=CREATE_CHAT_COMPLETION_EXAMPLES)) -> str:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        completion = client.get_chat_completion(completion)

    return completion

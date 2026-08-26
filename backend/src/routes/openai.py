from fastapi import APIRouter, Body
from src.docs.openai_docs import COMPLETION_REQUEST_EXAMPLES
from src.dtos.openai.completion import CompletionRequest
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models():
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        models = client.get_models()

    return models

@openai_route.post("/chat-completion")
def create_chat_completion(completion: CompletionRequest = Body(
    openapi_examples=COMPLETION_REQUEST_EXAMPLES
)):
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        completion = client.get_chat_completion(completion)

    return completion

from typing import List
from fastapi import APIRouter, Body, Query
from src.docs.openai_docs import CREATE_CHAT_COMPLETION_EXAMPLES, GET_MODELS_EXAMPLES
from src.dtos.openai.completion import FullCompletionRequestDto
from src.dtos.openai.connection import ConnectionDto
from src.dtos.openai.model import ModelDto
from src.dtos.openai.validation import ValidationDto
from src.services.openai_client import OpenAIClient

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models(connection: ConnectionDto = Query(openapi_examples=GET_MODELS_EXAMPLES)) -> List[ModelDto]:
    with OpenAIClient(connection) as client:
        models = client.get_models()

    return [ModelDto(name=model.id) for model in models.data]

@openai_route.post("/validate")
def create_chat_completion(request: FullCompletionRequestDto = Body(openapi_examples=CREATE_CHAT_COMPLETION_EXAMPLES)) -> ValidationDto:
    with OpenAIClient(request.connection) as client:
        validation = client.validate(request.completion)

    return validation

@openai_route.post("/chat-completion")
def create_chat_completion(request: FullCompletionRequestDto = Body(openapi_examples=CREATE_CHAT_COMPLETION_EXAMPLES)) -> str:
    with OpenAIClient(request.connection) as client:
        completion = client.get_chat_completion(request.completion)

    return completion

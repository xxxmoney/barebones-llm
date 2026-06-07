from fastapi import APIRouter
from src.dtos.openai.completion import CompletionRequest
from src.services import openai_client

openai_route = APIRouter(prefix="/api/openai", tags=["OpenAI"])

@openai_route.get("/models")
def get_models():
    return openai_client.get_models()

@openai_route.post("/chat-completion")
def create_chat_completion(completion: CompletionRequest):
    return openai_client.get_chat_completion(completion)

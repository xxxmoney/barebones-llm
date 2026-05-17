
from fastapi import APIRouter
import src.services.llm_provider as llm_provider
from src.dtos.llm.completion import CompletionRequest

# TODO: figure out why this route not show in /docs
llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.get("/models")
def get_models():
    return llm_provider.get_models()

@llm_route.post("/chat-completion")
def get_chat_completion(completion: CompletionRequest):
    return llm_provider.get_chat_completion(completion)

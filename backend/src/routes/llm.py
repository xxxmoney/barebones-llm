from fastapi import APIRouter
from src.dtos.llm.completion import CompletionRequest
from src.services import llm_provider

llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.post("/completion")
def create_completion(request: CompletionRequest):
    return llm_provider.create_completion(request)




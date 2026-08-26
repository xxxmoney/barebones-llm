from fastapi import APIRouter, Body
from src.docs.llm_docs import CREATE_COMPLETION_EXAMPLES
from src.dtos.llm.completion import CompletionRequest
from src.services import llm_service

llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.post("/completion")
def create_completion(request: CompletionRequest = Body(openapi_examples=CREATE_COMPLETION_EXAMPLES)):
    return llm_service.create_completion(request)




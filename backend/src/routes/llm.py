from fastapi import APIRouter, Body
from src.docs.llm_docs import COMPLETION_REQUEST_EXAMPLES
from src.dtos.llm.completion import CompletionRequest
from src.services import llm_service

llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.post("/completion")
def create_completion(request: CompletionRequest = Body(
    openapi_examples=COMPLETION_REQUEST_EXAMPLES
)):
    return llm_service.create_completion(request)




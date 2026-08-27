from typing import List
from fastapi import APIRouter, Body
from src.docs.llm_docs import CREATE_COMPLETION_EXAMPLES
from src.dtos.llm.completion import CompletionRequestDto, CompletionResponseDto
from src.dtos.llm.model import ModelDto
from src.services import llm_service

llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.get("/models")
def get_models() -> List[ModelDto]:
    return llm_service.get_models()

@llm_route.post("/completion")
def create_completion(request: CompletionRequestDto = Body(openapi_examples=CREATE_COMPLETION_EXAMPLES)) -> CompletionResponseDto:
    return llm_service.create_completion(request)


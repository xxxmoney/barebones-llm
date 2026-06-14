from fastapi import APIRouter, Body
from fastapi.openapi.models import Example
from openai.types.chat import ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam, \
    ChatCompletionAssistantMessageParam

from src.dtos.llm.completion import CompletionRequest
from src.services import llm_provider

llm_route = APIRouter(prefix="/api/llm", tags=["LLM"])

@llm_route.post("/completion")
def create_completion(request: CompletionRequest = Body(
    openapi_examples={
        "example": Example(
            summary="Sample request example",
            description="",
            value=CompletionRequest(
                messages=[
                    ChatCompletionSystemMessageParam(role="system",
                                                     content="You are an assistant, do as the user says."),
                    ChatCompletionUserMessageParam(role="user", content="Hey there."),
                    ChatCompletionAssistantMessageParam(role="assistant",
                                                        content="Hello there, happy to help, ask away."),
                    ChatCompletionUserMessageParam(role="user", content="Tell me one interesting fact.")
                ],
            )
        )
    }
)):
    return llm_provider.create_completion(request)




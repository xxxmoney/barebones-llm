from typing import List

from src.dtos.llm.completion import CompletionRequestDto, CompletionResponseDto
from src.dtos.llm.model import ModelDto
from src.dtos.openai.completion import CompletionRequestDto as ClientCompletionRequest
from src.dtos.openai.connection import ConnectionDto
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

def get_models() -> List[ModelDto]:
    config = configuration_repository.get_configuration()

    with OpenAIClient(ConnectionDto.model_validate(config)) as client:
        models = client.get_models()

    return [ModelDto(name=model.id) for model in models]

def create_completion(request: CompletionRequestDto) -> CompletionResponseDto:
    config = configuration_repository.get_configuration()

    with OpenAIClient(ConnectionDto.model_validate(config)) as client:
        text = client.get_chat_completion(
            ClientCompletionRequest(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                messages=request.messages
            )
        )

    return CompletionResponseDto(text=text)


from typing import List
import logging
from src.dtos.llm.completion import CompletionRequestDto, CompletionResponseDto
from src.dtos.llm.model import ModelDto
from src.dtos.openai.completion import CompletionRequestDto as ClientCompletionRequest
from src.dtos.openai.connection import ConnectionDto
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

logger = logging.getLogger(__name__)

def get_models() -> List[ModelDto]:
    logger.debug("Getting configuration...")
    config = configuration_repository.get_configuration()
    logger.debug("Got configuration")

    logger.debug("Getting models...")
    with OpenAIClient(ConnectionDto.model_validate(config)) as client:
        models = client.get_models()
    logger.debug("Got models")

    return [ModelDto(name=model.id) for model in models]

def create_completion(request: CompletionRequestDto) -> CompletionResponseDto:
    logger.debug("Getting configuration...")
    config = configuration_repository.get_configuration()
    logger.debug("Got configuration")

    logger.debug("Getting chat completion...")
    with OpenAIClient(ConnectionDto.model_validate(config)) as client:
        text = client.get_chat_completion(
            ClientCompletionRequest(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                messages=request.messages
            )
        )
    logger.debug("Got chat completion")

    return CompletionResponseDto(text=text)


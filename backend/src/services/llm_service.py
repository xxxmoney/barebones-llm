from src.dtos.llm.completion import CompletionRequestDto, CompletionResponseDto
from src.dtos.openai.completion import CompletionRequestDto as ClientCompletionRequest
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

def create_completion(request: CompletionRequestDto) -> CompletionResponseDto:
    config = configuration_repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        text = client.get_chat_completion(
            ClientCompletionRequest(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                messages=request.messages
            )
        )

    return CompletionResponseDto(text=text)


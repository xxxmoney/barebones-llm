from src.dtos.llm.completion import CompletionRequest, CompletionResponse
from src.dtos.openai.completion import CompletionRequest as ClientCompletionRequest
from src.services import repository
from src.services.openai_client import OpenAIClient

def create_completion(request: CompletionRequest) -> CompletionResponse:
    config = repository.get_configuration()

    with OpenAIClient(config.open_ai_url, config.open_ai_token) as client:
        text = client.get_chat_completion(
            ClientCompletionRequest(
                model=config.model,
                temperature=config.temperature,
                max_tokens=config.max_tokens,
                messages=request.messages
            )
        )

    return CompletionResponse(text=text)


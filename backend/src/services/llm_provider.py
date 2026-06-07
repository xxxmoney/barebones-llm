from src.dtos.llm.completion import CompletionRequest, CompletionResponse
from src.dtos.openai.completion import CompletionRequest as ClientCompletionRequest
import src.services.openai_client as client
from src.services.configuration import config

def create_completion(request: CompletionRequest) -> CompletionResponse:
    response = client.get_chat_completion(
        ClientCompletionRequest(
            model=config.model,
            temperature=config.temperature,
            max_tokens=config.max_tokens,
            messages=request.messages
        )
    )

    return CompletionResponse(text=response)


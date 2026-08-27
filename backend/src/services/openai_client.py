from openai import OpenAI
from src.dtos.openai.completion import CompletionRequestDto

class OpenAIClient:
    _open_ai_url: str
    _open_ai_token: str
    _client: OpenAI

    def __init__(self, open_ai_url: str, open_ai_token: str):
        self._open_ai_url = open_ai_url
        self._open_ai_token = open_ai_token

    def __enter__(self) -> "OpenAIClient":
        self._client = OpenAI(
            base_url=self._open_ai_url,
            api_key=self._open_ai_token,
        )

        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:
        self._client.close()

        return False

    def get_models(self):
        return self._client.models.list()

    def get_chat_completion(self, completion: CompletionRequestDto):
        response = self._client.chat.completions.create(
            model= completion.model,
            messages= completion.messages,
            temperature= completion.temperature,
            max_tokens= completion.max_tokens
        )

        return response.choices[0].message.content


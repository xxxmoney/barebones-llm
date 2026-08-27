from openai import OpenAI, APIConnectionError, AuthenticationError, NotFoundError, BadRequestError
from src.constants.llm_constants import ROLE_USER, TEST_PROMPT
from src.dtos.openai.completion import CompletionRequestDto
from src.dtos.openai.validation import ValidationDto, ValidationFieldsDto


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
            max_tokens=completion.max_tokens,
            temperature= completion.temperature
        )

        return response.choices[0].message.content

    def validate(self, model: str, max_tokens: int, temperature: float) -> ValidationDto:
        try:
            self.get_models()

            self.get_chat_completion(CompletionRequestDto(
                model=model,
                messages=[{"content": TEST_PROMPT, "role": ROLE_USER}],
                max_tokens=max_tokens,
                temperature=temperature
            ))
        except APIConnectionError:
            return ValidationDto(is_valid=False, fields = ValidationFieldsDto(open_ai_url=False))
        except AuthenticationError:
            return ValidationDto(is_valid=False, fields = ValidationFieldsDto(open_ai_url=False))
        except NotFoundError:
            return ValidationDto(is_valid=False, fields = ValidationFieldsDto(model=False))
        except BadRequestError:
            return ValidationDto(is_valid=False, fields = ValidationFieldsDto(temperature=False, max_tokens=False))

        return ValidationDto(is_valid=True)
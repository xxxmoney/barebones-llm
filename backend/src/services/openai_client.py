import logging
from openai import OpenAI, APIConnectionError, AuthenticationError, BadRequestError, NotFoundError, RateLimitError
from src.dtos.openai.completion import CompletionRequestDto
from src.dtos.openai.connection import ConnectionDto
from src.dtos.openai.validation_fields import ValidationFieldsDto
from src.dtos.validation import ValidationDto

logger = logging.getLogger(__name__)

class OpenAIClient:
    _open_ai_url: str
    _open_ai_token: str
    _client: OpenAI

    def __init__(self, connection: ConnectionDto):
        self._open_ai_url = connection.open_ai_url
        self._open_ai_token = connection.open_ai_token

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

    def validate(self, completion: CompletionRequestDto) -> ValidationDto:
        try:
            self.get_models()

            if completion.model == "" or completion.model is None:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(model=False))

            self.get_chat_completion(completion)
        except APIConnectionError as e:
            logger.warning(e)

            return ValidationDto(is_valid=False, fields=ValidationFieldsDto(open_ai_url=False), error=e)
        except AuthenticationError as e:
            logger.warning(e)

            return ValidationDto(is_valid=False, fields=ValidationFieldsDto(open_ai_token=False), error=e)
        except NotFoundError as e:
            logger.warning(e)

            if "model" in e.message:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(model=False), error=e)
            elif "url" in e.message:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(open_ai_url=False), error=e)
            else:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(open_ai_url=False, open_ai_token=False), error=e)
        except RateLimitError as e:
            logger.warning(e)

            return ValidationDto(is_valid=False, fields=ValidationFieldsDto(model=False), error=e)
        except BadRequestError as e:
            logger.warning(e)

            if e.code == "model_not_found":
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(model=False), error=e)
            elif "max_tokens" in e.message:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(max_tokens=False), error=e)
            elif "temperature" in e.message:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(temperature=False), error=e)
            elif "model" in e.message:
                return ValidationDto(is_valid=False, fields=ValidationFieldsDto(model=False), error=e)

        return ValidationDto(is_valid=True, fields=ValidationFieldsDto())
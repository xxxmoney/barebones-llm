from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.dtos.openai.completion import CompletionRequestDto
from src.dtos.openai.connection import ConnectionDto
from src.dtos.openai.validation import ValidationDto
from src.models.configuration.configuration import ConfigurationModel
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

def get_configuration() -> ConfigurationDto:
    config = configuration_repository.get_configuration()

    return ConfigurationDto.model_validate(config)

def validate_configuration_update(configuration: ConfigurationUpdateDto) -> ValidationDto:
    with OpenAIClient(ConnectionDto(open_ai_url=configuration.open_ai_url, open_ai_token=configuration.open_ai_token)) as client:
        validation = client.validate(
            CompletionRequestDto(
                model=configuration.model,
                max_tokens=configuration.max_tokens,
                temperature=configuration.temperature
            )
        )

    return validation

def update_configuration(configuration: ConfigurationUpdateDto) -> ConfigurationDto:
    model = ConfigurationModel.model_validate(configuration)
    model.is_configured = True # Any successful update makes it configured

    config = configuration_repository.update_configuration(model)

    return ConfigurationDto.model_validate(config)

def delete_configuration() -> None:
    configuration_repository.delete_configuration()

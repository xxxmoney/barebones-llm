from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.dtos.openai.validation import ValidationDto
from src.models.configuration.configuration import ConfigurationModel
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

def get_configuration() -> ConfigurationDto:
    config = configuration_repository.get_configuration()

    return ConfigurationDto.model_validate(config)

def validate_configuration_update(configuration: ConfigurationUpdateDto) -> ValidationDto:
    with OpenAIClient(configuration.open_ai_url, configuration.open_ai_token) as client:
        validation = client.validate(configuration.model, configuration.max_tokens, configuration.temperature)

    return validation

def update_configuration(configuration: ConfigurationUpdateDto) -> ConfigurationDto:
    model = ConfigurationModel.model_validate(configuration)
    model.is_configured = True

    config = configuration_repository.update_configuration(model)

    return ConfigurationDto.model_validate(config)

def delete_configuration() -> None:
    configuration_repository.delete_configuration()

import logging
from src.constants.llm_constants import TEST_PROMPT, ROLE_USER
from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.dtos.openai.completion import CompletionRequestDto
from src.dtos.openai.connection import ConnectionDto
from src.dtos.validation import ValidationDto
from src.models.configuration.configuration import ConfigurationModel
from src.repositories import configuration_repository
from src.services.openai_client import OpenAIClient

logger = logging.getLogger(__name__)

def get_configuration() -> ConfigurationDto:
    logger.debug("Getting configuration...")
    config = configuration_repository.get_configuration()
    logger.debug("Got configuration")

    return ConfigurationDto.model_validate(config)

def validate_configuration_update(configuration: ConfigurationUpdateDto) -> ValidationDto:
    logger.debug("Validating configuration...")
    with OpenAIClient(ConnectionDto(open_ai_url=configuration.open_ai_url, open_ai_token=configuration.open_ai_token)) as client:
        validation = client.validate(
            CompletionRequestDto(
                model=configuration.model,
                messages=[{"content": TEST_PROMPT, "role": ROLE_USER}],
                max_tokens=configuration.max_tokens,
                temperature=configuration.temperature
            )
        )
    logger.debug("Validated configuration: %s", validation.is_valid)

    return validation

def update_configuration(configuration: ConfigurationUpdateDto, is_valid: bool) -> ConfigurationDto:
    logger.debug("Validating model configuration...")
    model = ConfigurationModel.model_validate(configuration)
    model.is_valid = is_valid
    logger.debug("Validated model configuration %s", model.is_valid)

    logger.debug("Updating configuration...")
    config = configuration_repository.update_configuration(model)
    logger.debug("Updated configuration")

    return ConfigurationDto.model_validate(config)

def delete_configuration() -> None:
    logger.debug("Deleting configuration...")
    configuration_repository.delete_configuration()
    logger.debug("Deleted configuration")

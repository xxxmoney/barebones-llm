from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.models.configuration.configuration_model import ConfigurationModel
from src.repositories import configuration_repository

def get_configuration() -> ConfigurationDto:
    config = configuration_repository.get_configuration()

    return ConfigurationDto.model_validate(config)

def update_configuration(configuration: ConfigurationUpdateDto) -> ConfigurationDto:
    config = configuration_repository.update_configuration(
        ConfigurationModel.model_validate(configuration)
    )

    return ConfigurationDto.model_validate(config)

def delete_configuration() -> None:
    configuration_repository.delete_configuration()

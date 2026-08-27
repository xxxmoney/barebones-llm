from fastapi import APIRouter, Body
from src.docs.configuration_docx import UPDATE_CONFIGURATION_EXAMPLES
from src.dtos.configuration.configuration import Configuration
from src.models.configuration.configuration_model import ConfigurationModel
from src.repositories import configuration_repository

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration() -> Configuration:
    config = configuration_repository.get_configuration()

    return Configuration(
        open_ai_url=config.open_ai_url,
        open_ai_token=config.open_ai_token,
        model=config.model,
        max_tokens=config.max_tokens,
        temperature=config.temperature
    )

@configuration_route.put("/")
def update_configuration(configuration: Configuration = Body(openapi_examples=UPDATE_CONFIGURATION_EXAMPLES)) -> Configuration:
    configuration_repository.update_configuration(ConfigurationModel(
        open_ai_url=configuration.open_ai_url,
        open_ai_token=configuration.open_ai_token,
        model=configuration.model,
        max_tokens=configuration.max_tokens,
        temperature=configuration.temperature
    ))

    return configuration

@configuration_route.delete("/")
def delete_configuration() -> None:
    configuration_repository.delete_configuration()


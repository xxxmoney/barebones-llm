from fastapi import APIRouter, Body, Response, status

from src.docs.configuration_docx import UPDATE_CONFIGURATION_EXAMPLES
from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.services import configuration_service

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration() -> ConfigurationDto:
    return configuration_service.get_configuration()

@configuration_route.put("/")
def update_configuration(response: Response, configuration: ConfigurationUpdateDto = Body(openapi_examples=UPDATE_CONFIGURATION_EXAMPLES)) -> ConfigurationDto:
    validation = configuration_service.validate_configuration_update(configuration)
    configuration = configuration_service.update_configuration(configuration, validation.is_valid)

    if not validation.is_valid:
        response.status_code = status.HTTP_400_BAD_REQUEST

    return configuration

@configuration_route.delete("/")
def delete_configuration() -> None:
    configuration_service.delete_configuration()


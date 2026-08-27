from http.client import HTTPException
from fastapi import APIRouter, Body, HTTPException
from src.docs.configuration_docx import UPDATE_CONFIGURATION_EXAMPLES
from src.dtos.configuration.configuration import ConfigurationDto
from src.dtos.configuration.configuration_update import ConfigurationUpdateDto
from src.dtos.openai.validation import ValidationDto
from src.services import configuration_service

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration() -> ConfigurationDto:
    return configuration_service.get_configuration()

@configuration_route.post("/validate")
def validate_configuration_update(configuration: ConfigurationUpdateDto = Body(openapi_examples=UPDATE_CONFIGURATION_EXAMPLES)) -> ValidationDto:
    return configuration_service.validate_configuration_update(configuration)

@configuration_route.put("/")
def update_configuration(configuration: ConfigurationUpdateDto = Body(openapi_examples=UPDATE_CONFIGURATION_EXAMPLES)) -> ConfigurationDto:
    validation = configuration_service.validate_configuration_update(configuration)
    if not validation.is_valid:
        raise HTTPException(status_code=400, detail=validation)

    return configuration_service.update_configuration(configuration)

@configuration_route.delete("/")
def delete_configuration() -> None:
    configuration_service.delete_configuration()


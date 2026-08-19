from fastapi import APIRouter
from src.models.configuration.configuration_model import ConfigurationModel
from src.repositories import configuration_repository

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration():
    config = configuration_repository.get_configuration()

    return config

@configuration_route.put("/")
def update_configuration(configuration: ConfigurationModel):
    configuration_repository.update_configuration(configuration)

    return configuration

@configuration_route.delete("/")
def delete_configuration():
    configuration_repository.delete_configuration()


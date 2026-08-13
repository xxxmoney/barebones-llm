from fastapi import APIRouter
from src.models.configuration.configuration import Configuration
from src.services import repository

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration():
    config = repository.get_configuration()

    return config

@configuration_route.post("/")
def update_configuration(configuration: Configuration):
    repository.update_configuration(configuration)

    return configuration

@configuration_route.delete("/")
def delete_configuration():
    repository.delete_configuration()


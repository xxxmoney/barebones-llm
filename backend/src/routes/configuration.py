from fastapi import APIRouter
from src.dtos.configuration.configuration import Configuration
from src.services import persistence_manager

configuration_route = APIRouter(prefix="/api/configuration", tags=["Configuration"])

@configuration_route.get("/")
def get_configuration():
    config = persistence_manager.get_configuration()

    return config

@configuration_route.post("/")
def update_configuration(configuration: Configuration):
    persistence_manager.update_configuration(configuration)

    return configuration

@configuration_route.delete("/")
def delete_configuration():
    persistence_manager.delete_configuration()


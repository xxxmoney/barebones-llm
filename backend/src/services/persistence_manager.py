from src.dtos.configuration.configuration import Configuration
from src.services.persistence import Persistence

configuration_key = "configuration"

def get_configuration() -> Configuration:
    with Persistence() as persistence:
        if configuration_key not in persistence.db.keys():
            persistence.db[configuration_key] = Configuration.default()

        config = persistence.db[configuration_key]

    return config

def update_configuration(configuration: Configuration) -> None:
    with Persistence() as persistence:
        persistence.db[configuration_key] = configuration

def delete_configuration() -> None:
    with Persistence() as persistence:
        persistence.db.pop(configuration_key)



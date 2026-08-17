from src.models.configuration.configuration_model import ConfigurationModel
from src.services.persistence import Persistence

configuration_key = "configuration"

def get_configuration() -> ConfigurationModel:
    with Persistence() as persistence:
        if configuration_key not in persistence.db.keys():
            persistence.db[configuration_key] = ConfigurationModel.default()

        config = persistence.db[configuration_key]

    return config

def update_configuration(configuration: ConfigurationModel) -> None:
    with Persistence() as persistence:
        persistence.db[configuration_key] = configuration

def delete_configuration() -> None:
    with Persistence() as persistence:
        persistence.db.pop(configuration_key)

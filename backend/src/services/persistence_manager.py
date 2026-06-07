from src.models.configuration import Configuration
from src.services.persistence import Persistence

def get_configuration() -> Configuration:
    with Persistence() as persistence:
        if "configuration" not in persistence.db.keys():
            persistence.db["configuration"] = Configuration.default()

        config = persistence.db["configuration"]

    return config

def update_configuration(configuration: Configuration) -> None:
    with Persistence() as persistence:
        persistence.db["configuration"] = configuration



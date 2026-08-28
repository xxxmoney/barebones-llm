from src.models.configuration.configuration import ConfigurationModel
from src.services.persistence import Persistence
from src.constants.llm_constants import DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE

configuration_key = "configuration"

def get_configuration() -> ConfigurationModel:
    with Persistence() as persistence:
        if configuration_key not in persistence.db.keys():
            persistence.db[configuration_key] = ConfigurationModel(
                is_valid=False,
                open_ai_url=None,
                open_ai_token=None,
                model=None,
                max_tokens=DEFAULT_MAX_TOKENS,
                temperature=DEFAULT_TEMPERATURE
            )

        config = persistence.db[configuration_key]

    return config

def update_configuration(configuration: ConfigurationModel) -> ConfigurationModel:
    with Persistence() as persistence:
        persistence.db[configuration_key] = configuration

    return configuration

def delete_configuration() -> None:
    with Persistence() as persistence:
        persistence.db.pop(configuration_key)

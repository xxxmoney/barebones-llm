from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    is_debug: bool = False

    model_config = SettingsConfigDict(
        env_file = ".env"
    )


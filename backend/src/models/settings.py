from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    is_debug: bool = False
    host: str | None = None

    model_config = SettingsConfigDict(
        env_file = ".env"
    )


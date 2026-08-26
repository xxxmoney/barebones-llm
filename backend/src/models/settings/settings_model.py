from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    is_debug: bool = False

    class Config:
        env_file = ".env"

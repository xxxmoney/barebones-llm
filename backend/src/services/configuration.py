
class Configuration:
    _open_ai_url: str
    _open_ai_token: str

    def __init__(self):
        # TODO: proper load configuration
        self._open_ai_url = "http://localhost:1234/v1"
        self._open_ai_token = "lm-studio"

    @property
    def open_ai_url(self):
        return self._open_ai_url

    @property
    def open_ai_token(self):
        return self._open_ai_token

config = Configuration()

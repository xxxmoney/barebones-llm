from src.constants.llm_constants import DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS

class Configuration:
    _open_ai_url: str
    _open_ai_token: str
    _model: str
    _temperature: float
    _max_tokens: int

    def __init__(self):
        # TODO: proper load configuration
        self._open_ai_url = "http://localhost:1234/v1"
        self._open_ai_token = "lm-studio"
        self._model = "magidonia-24b-v4.3-absolute-heresy-i1"
        self._temperature = DEFAULT_TEMPERATURE
        self._max_tokens = DEFAULT_MAX_TOKENS

    @property
    def open_ai_url(self):
        return self._open_ai_url

    @property
    def open_ai_token(self):
        return self._open_ai_token

    @property
    def model(self):
        return self._model

    @property
    def temperature(self):
        return self._temperature

    @property
    def max_tokens(self):
        return self._max_tokens

config = Configuration()

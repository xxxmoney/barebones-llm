from openai import OpenAI
from src.constants.llm_constants import DEFAULT_MAX_TOKENS
from src.dtos.llm.completion import CompletionRequest
from src.services.configuration import config

client = OpenAI(
    base_url=config.open_ai_url,
    api_key=config.open_ai_token,
)

def get_models():
    return client.models.list()

def get_chat_completion(completion: CompletionRequest):
    response = client.post(
        "chat/completions",
        body={
            "model": completion.model,
            "messages": completion.messages,
            "temperature": completion.temperature,
            "max_tokens": DEFAULT_MAX_TOKENS if completion.max_tokens is None else completion.max_tokens,        }
    )

    return response.choices[0].message.content


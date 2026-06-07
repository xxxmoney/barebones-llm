from openai import OpenAI
from src.dtos.openai.completion import CompletionRequest
from src.services.configuration import config

client = OpenAI(
    base_url=config.open_ai_url,
    api_key=config.open_ai_token,
)

def get_models():
    return client.models.list()

def get_chat_completion(completion: CompletionRequest):
    response = client.chat.completions.create(
        model= completion.model,
        messages= completion.messages,
        temperature= completion.temperature,
        max_tokens= completion.max_tokens
    )

    return response.choices[0].message.content


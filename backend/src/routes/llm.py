
from fastapi import APIRouter
from openai import OpenAI

llm_route = APIRouter(prefix="/api/llm")

client = OpenAI(
    base_url="http://localhost:1234/v1", # TODO: move to some configuration - used based?
    api_key="lm-studio", # TODO: move to some configuration - used based?
)

@llm_route.get("")
def get_models():
    models = client.models.list()

    return models

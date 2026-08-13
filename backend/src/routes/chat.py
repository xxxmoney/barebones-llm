import uuid
from fastapi import APIRouter
from src.dtos.chat.chat_upsert import ChatUpsert
from src.services import chat_service

chat_route = APIRouter(prefix="/api/chat", tags=["Chat"])

@chat_route.get("/")
def get_chats():
    chats = chat_service.get_chats()
    return chats

@chat_route.post("/{chat_id}/message")
def get_messages(chat_id: uuid):
    messages = chat_service.get_messages(chat_id)
    return messages

@chat_route.post("/{chat_id}")
def upsert_chat(chat_upsert: ChatUpsert):
    chat = chat_service.upsert_chat(chat_upsert)
    return chat


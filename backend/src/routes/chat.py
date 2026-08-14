from typing import List
from uuid import UUID
from fastapi import APIRouter
from src.dtos.chat.chat import Chat
from src.dtos.chat.chat_update import ChatUpdate
from src.dtos.chat.message import Message
from src.dtos.chat.message_update import MessageUpdate
from src.services import chat_service

chat_route = APIRouter(prefix="/api/chat", tags=["Chat"])

@chat_route.get("/")
def get_chats() -> List[Chat]:
    chats = chat_service.get_chats()
    return chats

@chat_route.post("/")
def insert_chat(chat: ChatUpdate) -> Chat:
    chat = chat_service.insert_chat(chat)
    return chat

@chat_route.put("/{chat_id}")
def update_chat(chat_id: UUID, chat: ChatUpdate) -> Chat:
    chat = chat_service.update_chat(chat_id, chat)
    return chat

@chat_route.get("/{chat_id}/message")
def get_messages(chat_id: UUID) -> List[Message]:
    messages = chat_service.get_messages(chat_id)
    return messages

@chat_route.post("/{chat_id}/message")
def submit_message(chat_id: UUID, message: MessageUpdate) -> List[Message]:
    messages = chat_service.submit_message(chat_id, message)
    return messages

@chat_route.put("/{chat_id}/message/{message_id}")
def update_message(chat_id: UUID, message_id: UUID, message: MessageUpdate) -> Message:
    messages = chat_service.update_message(chat_id, message_id, message)
    return messages


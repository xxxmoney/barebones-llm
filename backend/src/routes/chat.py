from typing import List
from uuid import UUID
from fastapi import APIRouter, Body
from src.docs.chat_docs import INSERT_CHAT_EXAMPLES, UPDATE_CHAT_EXAMPLES, SUBMIT_MESSAGE_EXAMPLES, \
    UPDATE_MESSAGE_EXAMPLES
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
def insert_chat(chat: ChatUpdate = Body(openapi_examples=INSERT_CHAT_EXAMPLES)) -> Chat:
    chat = chat_service.insert_chat(chat)
    return chat

@chat_route.put("/{chat_id}")
def update_chat(chat_id: UUID, chat: ChatUpdate = Body(openapi_examples=UPDATE_CHAT_EXAMPLES)) -> Chat:
    chat = chat_service.update_chat(chat_id, chat)
    return chat

@chat_route.delete("/{chat_id}")
def delete_chat(chat_id: UUID) -> UUID:
    id = chat_service.delete_chat(chat_id)
    return id


@chat_route.get("/{chat_id}/message")
def get_messages(chat_id: UUID) -> List[Message]:
    messages = chat_service.get_messages(chat_id)
    return messages

@chat_route.post("/{chat_id}/message")
def submit_message(chat_id: UUID, message: MessageUpdate = Body(openapi_examples=SUBMIT_MESSAGE_EXAMPLES)) -> List[Message]:
    messages = chat_service.submit_message(chat_id, message)
    return messages

@chat_route.put("/{chat_id}/message/{message_id}")
def update_message(chat_id: UUID, message_id: UUID, message: MessageUpdate = Body(openapi_examples=UPDATE_MESSAGE_EXAMPLES)) -> Message:
    messages = chat_service.update_message(chat_id, message_id, message)
    return messages

@chat_route.delete("/{chat_id}/message/{message_id}")
def delete_message(chat_id: UUID, message_id: UUID) -> UUID:
    id = chat_service.delete_message(chat_id, message_id)
    return id

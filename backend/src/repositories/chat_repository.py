import uuid
from uuid import UUID
from typing import List, Callable
from src.models.chat.chat_model import ChatModel
from src.models.chat.message_model import MessageModel
from src.services.persistence import Persistence

chats_key = "chats"

def get_chats() -> List[ChatModel]:
    with Persistence() as persistence:
        if chats_key not in persistence.db.keys():
            persistence.db[chats_key] = []

        chats = persistence.db[chats_key]

    return chats

def get_chat(chat_id: uuid) -> ChatModel | None:
    chats = get_chats()

    return next((chat for chat in chats if chat.id == chat_id), None)

def insert_chat(insert: ChatModel) -> ChatModel:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chats.append(insert)
        persistence.db[chats_key] = chats

    return insert

def insert_chat_messages(chat_id: uuid, inserts: List[MessageModel]) -> List[MessageModel]:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        chat.messages.extend(inserts)

        persistence.db[chats_key] = chats

    return inserts

def update_chat(chat_id: uuid, update_function: Callable[[ChatModel], None]) -> ChatModel:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        update_function(chat)

        persistence.db[chats_key] = chats

    return chat

def update_chat_message(chat_id: uuid, message_id: uuid, update_function: Callable[[MessageModel], None]) -> MessageModel:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        message = next((message for message in chat.messages if message.id == message_id), None)

        if message is None:
            raise Exception("Message not found")

        update_function(message)

        persistence.db[chats_key] = chats

    return message

def delete_chat(chat_id: uuid) -> UUID:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        chats.remove(chat)

        persistence.db[chats_key] = chats

    return chat.id

def delete_chat_messages(chat_id: UUID, message_ids: List[UUID]) -> List[UUID]:
    with Persistence() as persistence:
        chats: List[ChatModel] = persistence.db[chats_key]
        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        deleted: List[UUID] = []

        for message in chat.messages:
            if message.id in message_ids:
                chat.messages.remove(message)

                deleted.append(message.id)

        persistence.db[chats_key] = chats

    return deleted
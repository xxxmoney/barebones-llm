from uuid import UUID
from typing import List
from src.dtos.chat.chat import Chat
from src.dtos.chat.chat_upsert import ChatUpsert
from src.dtos.chat.message import Message
from src.dtos.chat.message_upsert import MessageUpsert
from src.dtos.configuration.configuration import Configuration
from src.services.persistence import Persistence

configuration_key = "configuration"
chats_key = "chats"

def get_configuration() -> Configuration:
    with Persistence() as persistence:
        if configuration_key not in persistence.db.keys():
            persistence.db[configuration_key] = Configuration.default()

        config = persistence.db[configuration_key]

    return config

def update_configuration(configuration: Configuration) -> None:
    with Persistence() as persistence:
        persistence.db[configuration_key] = configuration

def delete_configuration() -> None:
    with Persistence() as persistence:
        persistence.db.pop(configuration_key)


def get_chats() -> List[Chat]:
    with Persistence() as persistence:
        if chats_key not in persistence.db.keys():
            persistence.db[chats_key] = []

        chats = persistence.db[chats_key]

    return chats

def upsert_chat(chat_update: ChatUpsert) -> ChatUpsert:
    with Persistence() as persistence:
        chats: List[Chat] = persistence.db[chats_key]

        upserted: Chat

        if chat_update.id is None:
            insert = Chat(id=UUID(), name=chat_update.name, messages=[], creation_date=chat_update.date, update_date=None)
            chats.append(insert)

            upserted = insert
        else:
            chat = next((chat for chat in chats if chat.id == chat_update.id), None)

            if chat is None:
                raise Exception("Chat not found")

            chat.name = chat_update.chat_name
            chat.update_date = chat_update.date

            upserted = chat

        persistence.db[chats_key] = chats

    return ChatUpsert(id=upserted.id, name=upserted.name, date=upserted.update_date if upserted.update_date else upserted.creation_date)

def upsert_chat_messages(chat_id: UUID, message_upserts: List[MessageUpsert]) -> List[MessageUpsert]:
    with Persistence() as persistence:
        chats: List[Chat] = persistence.db[chats_key]

        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        upserted: List[Message] = []

        updates: dict[UUID, MessageUpsert] = {}
        for message_upsert in message_upserts:
            # Handle insert
            if message_upsert.chat_id is None:
                insert = Message(id=UUID(), text=message_upsert.text, role=message_upsert.role, creation_date=message_upsert.date, update_date=None)
                chat.messages.append(insert)

                upserted.append(insert)
            else:
                updates[message_upsert.id] = message_upsert

        # Handle update
        for message in chat.messages:
            update = updates.get(message.id, None)

            if update is not None:
                message.text = update.text
                message.role = update.role
                message.update_date = update.date

                upserted.append(message)

    return [MessageUpsert(id=upsert.id, text=upsert.text, role=upsert.role, date=upsert.update_date if upsert.update_date else upsert.creation_date) for upsert in upserted]

def delete_chat_messages(chat_id: UUID, message_ids: List[UUID]) -> List[UUID]:
    with Persistence() as persistence:
        chats: List[Chat] = persistence.db[chats_key]

        chat = next((chat for chat in chats if chat.id == chat_id), None)

        if chat is None:
            raise Exception("Chat not found")

        deleted: List[UUID] = []

        for message in chat.messages:
            if message.id in message_ids:
                chat.messages.remove(message)

                deleted.append(message.id)

    return deleted
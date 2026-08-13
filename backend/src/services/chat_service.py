from datetime import datetime, UTC
from typing import List
from uuid import UUID, uuid4
from src.dtos.chat.chat import Chat
from src.dtos.chat.chat_upsert import ChatUpsert
from src.dtos.chat.message import Message
from src.dtos.chat.message_upsert import MessageUpsert
from src.dtos.chat.message_list_upsert import MessageListUpsert
from src.models.chat.chat_model import ChatModel
from src.models.chat.message_model import MessageModel
from src.repositories import chat_repository

def get_chats() -> List[Chat]:
    models = chat_repository.get_chats()

    return [Chat(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.creation_date) for model in models]

def get_messages(chat_id: UUID) -> List[Message]:
    model = chat_repository.get_chat(chat_id)

    return [Message(id=message.id, text=message.text, role=message.role, creation_date=message.creation_date, update_date=message.update_date) for message in model.messages]

def upsert_chat(upsert: ChatUpsert):
    model: ChatModel

    if upsert.id is None:
        model = chat_repository.insert_chat(ChatModel(id=uuid4(), name=upsert.name, messages=[], creation_date=datetime.now(UTC), update_date=None))
    else:
        def update_function(chat: ChatModel):
            chat.name = upsert.name
            chat.update_date = datetime.now(UTC)

        model = chat_repository.update_chat(upsert.id, update_function)

    return Chat(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.update_date)

def upsert_messages(upsert: MessageListUpsert) -> List[Message]:
    inserts: List[MessageUpsert] = []
    updates: List[MessageUpsert] = []
    for message_upsert in upsert.messages:
        if upsert.id is None:
            inserts.append(message_upsert)
        else:
            updates.append(message_upsert)

    now = datetime.now(UTC)

    updated: List[MessageModel] = chat_repository.insert_chat_messages(
        upsert.chat_id,
        [MessageModel(id=uuid4(), text=insert.text, role=insert.role, creation_date=now, update_date=None) for insert in inserts]
    )

    inserted: List[MessageModel] = []
    for update in updates:
        def update_function(message: MessageModel):
            message.text = update.text
            message.role = update.role
            message.update_date = now

        model = chat_repository.update_chat_message(upsert.chat_id, update.id, update_function)
        inserted.append(model)

    return [Message(id=message.id, text=message.text, role=message.role, creation_date=message.creation_date, update_date=message.update_date) for message in [*updated, *inserted]]

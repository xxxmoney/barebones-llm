import datetime
import uuid
from typing import List
from src.dtos.chat.chat import Chat
from src.dtos.chat.chat_upsert import ChatUpsert
from src.dtos.chat.message import Message
from src.models.chat.chat_model import ChatModel
from src.services import repository

def get_chats() -> List[Chat]:
    models = repository.get_chats()

    return [Chat(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.creation_date) for model in models]

def get_messages(chat_id: int) -> List[Message]:
    model = repository.get_chat(chat_id)

    return [Message(id=message.id, text=message.text, role=message.role, creation_date=message.creation_date, update_date=message.update_date) for message in model.messages]

def upsert_chat(chat_upsert: ChatUpsert):
    model: ChatModel

    if chat_upsert.id is None:
         model = repository.insert_chat(ChatModel(id=uuid.uuid4(), name=chat_upsert.name, messages=[], creation_date=datetime.datetime.now(datetime.UTC), update_date=None))
    else:
        def update_function(chat: ChatModel):
            chat.name = chat_upsert.name

        model = repository.update_chat(update_function)

    return Chat(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.update_date)

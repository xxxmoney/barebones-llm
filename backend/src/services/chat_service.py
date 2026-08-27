from datetime import datetime, UTC
from typing import List
from uuid import UUID, uuid4
from src.constants.llm_constants import ROLE_USER, ROLE_ASSISTANT
from src.dtos.chat.chat import ChatDto
from src.dtos.chat.chat_update import ChatUpdateDto
from src.dtos.chat.message import MessageDto
from src.dtos.chat.message_update import MessageUpdateDto
from src.dtos.llm.completion import CompletionRequestDto
from src.models.chat.chat_model import ChatModel
from src.models.chat.message_model import MessageModel
from src.repositories import chat_repository
from src.services import llm_service

def get_chats() -> List[ChatDto]:
    models = chat_repository.get_chats()

    return [ChatDto(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.creation_date) for model in models]

def get_messages(chat_id: UUID) -> List[MessageDto]:
    model = chat_repository.get_chat(chat_id)

    return [MessageDto(id=message.id, text=message.text, role=message.role, creation_date=message.creation_date, update_date=message.update_date) for message in model.messages]

def update_chat(chat_id: UUID, update: ChatUpdateDto) -> ChatDto:
    def update_function(chat: ChatModel):
        chat.name = update.name
        chat.update_date = datetime.now(UTC)

    model: ChatModel = chat_repository.update_chat(chat_id, update_function)

    return ChatDto(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.update_date)

def insert_chat(update: ChatUpdateDto) -> ChatDto:
    model: ChatModel = chat_repository.insert_chat(ChatModel(id=uuid4(), name=update.name, messages=[], creation_date=datetime.now(UTC), update_date=None))

    return ChatDto(id=model.id, name=model.name, creation_date=model.creation_date, update_date=model.update_date)

def delete_chat(chat_id: UUID) -> UUID:
    id = chat_repository.delete_chat(chat_id)

    return id


def submit_message(chat_id: UUID, message: MessageUpdateDto) -> List[MessageDto]:
    chat = chat_repository.get_chat(chat_id)

    current_messages = [{"content": message.text, "role": message.role} for message in chat.messages]
    user_message = {"content": message.text, "role": ROLE_USER}

    completion = llm_service.create_completion(CompletionRequestDto(messages=[*current_messages, user_message]))

    messages = insert_messages(chat_id, [
        MessageUpdateDto(text=message.text, role=ROLE_USER),
        MessageUpdateDto(text=completion.text, role=ROLE_ASSISTANT),
    ])

    return messages

def insert_messages(chat_id: UUID, messages: List[MessageUpdateDto]):
    now = datetime.now(UTC)

    if None in [message.role for message in messages]:
        raise Exception("No role specified")

    inserted: List[MessageModel] = chat_repository.insert_chat_messages(
        chat_id,
        [MessageModel(id=uuid4(), text=insert.text, role=insert.role, creation_date=now, update_date=None) for insert in messages]
    )

    return [MessageDto(id=message.id, text=message.text, role=message.role, creation_date=message.creation_date,
                       update_date=message.update_date) for message in [*inserted]]


def update_message(chat_id: UUID, message_id: UUID, message: MessageUpdateDto) -> MessageDto:
    now = datetime.now(UTC)

    def update_function(model: MessageModel):
        model.text = message.text
        if message.role is not None:
            model.role = message.role
        model.update_date = now
    model = chat_repository.update_chat_message(chat_id, message_id, update_function)

    return MessageDto(id=model.id, text=model.text, role=model.role, creation_date=model.creation_date, update_date=model.update_date)

def delete_message(chat_id: UUID, message_id: UUID):
    ids = chat_repository.delete_chat_messages(chat_id, [message_id])

    return ids[0]
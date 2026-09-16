from datetime import datetime, UTC
from typing import List
from uuid import UUID, uuid4
import logging
from src.constants.llm_constants import ROLE_USER, ROLE_ASSISTANT
from src.dtos.chat.chat import ChatDto
from src.dtos.chat.chat_update import ChatUpdateDto
from src.dtos.chat.message import MessageDto
from src.dtos.chat.message_update import MessageUpdateDto
from src.dtos.llm.completion import CompletionRequestDto
from src.models.chat.chat import ChatModel
from src.models.chat.message import MessageModel
from src.repositories import chat_repository
from src.services import llm_service

logger = logging.getLogger(__name__)

def get_chats() -> List[ChatDto]:
    logger.debug("Getting chat list...")
    models = chat_repository.get_chats()
    logger.debug("Got chat list")

    return [ChatDto.model_validate(model) for model in models]

def get_messages(chat_id: UUID) -> List[MessageDto]:
    logger.debug("Getting messages for chat %s...", chat_id)
    model = chat_repository.get_chat(chat_id)
    logger.debug("Got messages for chat %s", chat_id)

    return [MessageDto.model_validate(message) for message in model.messages]

def update_chat(chat_id: UUID, update: ChatUpdateDto) -> ChatDto:
    def update_function(chat: ChatModel):
        chat.name = update.name
        chat.update_date = datetime.now(UTC)

    logger.debug("Updating chat %s...", chat_id)
    model: ChatModel = chat_repository.update_chat(chat_id, update_function)
    logger.debug("Updated chat %s", chat_id)

    return ChatDto.model_validate(model)

def insert_chat(update: ChatUpdateDto) -> ChatDto:
    logger.debug("Inserting chat %s...", update.chat_id)
    model: ChatModel = chat_repository.insert_chat(ChatModel(id=uuid4(), name=update.name, messages=[], creation_date=datetime.now(UTC), update_date=None))
    logger.debug("Inserted chat %s", update.chat_id)

    return ChatDto.model_validate(model)

def delete_chat(chat_id: UUID) -> UUID:
    logger.debug("Deleting chat %s...", chat_id)
    id = chat_repository.delete_chat(chat_id)
    logger.debug("Deleted chat %s", id)

    return id

def submit_message(chat_id: UUID, message: MessageUpdateDto) -> List[MessageDto]:
    chat = chat_repository.get_chat(chat_id)

    current_messages = [{"content": message.text, "role": message.role} for message in chat.messages]
    user_message = {"content": message.text, "role": ROLE_USER}

    completion = llm_service.create_completion(CompletionRequestDto(messages=[*current_messages, user_message]))

    logger.debug("Inserting submitted messages for chat %s...", chat_id)
    messages = insert_messages(chat_id, [
        MessageUpdateDto(text=message.text, role=ROLE_USER),
        MessageUpdateDto(text=completion.text, role=ROLE_ASSISTANT),
    ])
    logger.debug("Inserted submitted messages for chat %s...", chat_id)

    return messages

def insert_messages(chat_id: UUID, messages: List[MessageUpdateDto]):
    now = datetime.now(UTC)

    if None in [message.role for message in messages]:
        raise Exception("No role specified")

    logger.debug("Inserting messages for chat %s...", chat_id)
    inserted: List[MessageModel] = chat_repository.insert_chat_messages(
        chat_id,
        [MessageModel(id=uuid4(), text=insert.text, role=insert.role, creation_date=now, update_date=None) for insert in messages]
    )
    logger.debug("Inserted messages for chat %s...", chat_id)

    return [MessageDto.model_validate(message) for message in [*inserted]]

def update_message(chat_id: UUID, message_id: UUID, message: MessageUpdateDto) -> MessageDto:
    now = datetime.now(UTC)

    def update_function(model: MessageModel):
        model.text = message.text
        if message.role is not None:
            model.role = message.role
        model.update_date = now

    logger.debug("Updating message %s for chat %s...", message_id, chat_id)
    model = chat_repository.update_chat_message(chat_id, message_id, update_function)
    logger.debug("Updated message %s for chat %s", message_id, chat_id)

    return MessageDto.model_validate(model)

def delete_message(chat_id: UUID, message_id: UUID):
    logger.debug("Deleting message %s for chat %s...", message_id, chat_id)
    ids = chat_repository.delete_chat_messages(chat_id, [message_id])
    logger.debug("Deleted message %s for chat %s", message_id, chat_id)

    return ids[0]
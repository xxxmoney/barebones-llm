from fastapi.openapi.models import Example
from src.dtos.chat.chat_update import ChatUpdateDto
from src.dtos.chat.message_update import MessageUpdateDto

INSERT_CHAT_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=ChatUpdateDto(
                name="New Chat"
            )
        )
    }

UPDATE_CHAT_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=ChatUpdateDto(
                name="Existing Chat"
            )
        )
    }

SUBMIT_MESSAGE_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=MessageUpdateDto(
                text="New message",
            )
        )
    }

UPDATE_MESSAGE_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=MessageUpdateDto(
                text="Existing message",
            )
        )
    }
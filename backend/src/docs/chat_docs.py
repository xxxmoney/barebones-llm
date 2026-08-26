from fastapi.openapi.models import Example
from src.dtos.chat.chat_update import ChatUpdate
from src.dtos.chat.message_update import MessageUpdate

INSERT_CHAT_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=ChatUpdate(
                name="New Chat"
            )
        )
    }

UPDATE_CHAT_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=ChatUpdate(
                name="Existing Chat"
            )
        )
    }

SUBMIT_MESSAGE_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=MessageUpdate(
                text="New message",
            )
        )
    }

UPDATE_MESSAGE_EXAMPLES = {
        "example": Example(
            summary="Request example",
            description="",
            value=MessageUpdate(
                text="Existing message",
            )
        )
    }
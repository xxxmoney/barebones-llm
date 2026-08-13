from fastapi import APIRouter

chat_route = APIRouter(prefix="/api/chat", tags=["Chat"])

def get_chats():
    # TODO

import argparse
import os
import sys
from threading import Thread
import webview
import threading
import uvicorn
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.constants.constants import FRONTEND_PORT, BACKEND_PORT
from src.models.settings import Settings
from src.routes.llm import llm_route
from src.routes.test import test_route
from src.routes.openai import openai_route
from src.routes.configuration import configuration_route
from src.routes.chat import chat_route
from src.services.persistence import Persistence

settings = Settings() # dotenv

parser = argparse.ArgumentParser()
parser.add_argument("--backend-only", type=bool, default=False)
args = parser.parse_args()

with Persistence() as persistence:
    pass

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(test_route)
app.include_router(openai_route)
app.include_router(llm_route)
app.include_router(configuration_route)
app.include_router(chat_route)

if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../dist")) # Running from exe, use the relative dist path
else:
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/dist")) # Debug, use the relative frontend project path

# On prod mount built frontend to root path
if not settings.is_debug:
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

def start_api(use_thread: bool) -> Thread | None:
    def run():
        # Switch to reload=True for live reload - from my experience caused hanging process on port
        uvicorn.run("src.main:app", host="localhost", port=BACKEND_PORT, log_level="info", reload=False)

    if use_thread:
        api_thread = threading.Thread(target=run, daemon=True)
        api_thread.start()

        return api_thread
    else:
        run()
        return None

def start_webview() -> None:
    webview.create_window(
        "barebones-llm",
        f"http://localhost:{FRONTEND_PORT if settings.is_debug else BACKEND_PORT}/",
        width=1000,
        height=700,
        min_size=(600, 400)
    )
    webview.start(debug=settings.is_debug)

def main() -> None:
    start_api(True)

    time.sleep(1)

    start_webview()

def main_backend_only() -> None:
    start_api(False)

if __name__ == "__main__":
    if args.backend_only:
        main_backend_only()
    else:
        main()


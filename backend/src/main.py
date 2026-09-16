import argparse
import json
import os
import sys
from threading import Thread
import webview
import threading
import uvicorn
import time
import logging
from logging.handlers import RotatingFileHandler
from starlette.responses import RedirectResponse
from tendo import singleton
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.constants.constants import FRONTEND_PORT, BACKEND_PORT, APP_NAME
from src.constants.path_constants import user_data_path
from src.models.settings import Settings
from src.routes.llm import llm_route
from src.routes.test import test_route
from src.routes.openai import openai_route
from src.routes.configuration import configuration_route
from src.routes.chat import chat_route
from src.services.persistence import Persistence

user_data_path.mkdir(parents=True, exist_ok=True)

settings = Settings() # dotenv

logging.basicConfig(
    level=logging.DEBUG if settings.is_debug else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - '%(message)s'",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        RotatingFileHandler(user_data_path / "app.log", maxBytes=1_000_000, backupCount=2),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

try:
    logger.debug("Checking single instance...")
    me = singleton.SingleInstance()  # Prevent multiple instances from running
    logger.info("Checked single instance")
except:
    logger.warning("App already running")
    sys.exit(f"{APP_NAME} instance already running!")

logger.debug("Parsing cli arguments...")
parser = argparse.ArgumentParser()
parser.add_argument("--backend-only", type=bool, default=False)
args = parser.parse_args()
logger.info("Parsed cli arguments: %s", json.dumps(vars(args)))

logger.debug("Setting up local db...")
with Persistence() as persistence:
    pass
logger.info("Set up local db")

# Set up FastAPI
logger.debug("Setting up FastAPI...")
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
logger.debug("Checking whether to use built frontend or frontend url based...")
if not settings.is_debug: # Prod mount built frontend to root path
    logger.debug("Prod environment, using frontend from dist, setting up...")
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "dist"))  # Running from exe, use the relative dist path
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
    logger.debug("Prod environment, using frontend from dist, set up")
elif not getattr(sys, 'frozen', False) and not hasattr(sys, '_MEIPASS'): # Debug root url redirect to running frontend url
    logger.debug("Debug environment, using frontend from url, setting up...")
    @app.get("/", include_in_schema=False)
    def root():
        return RedirectResponse(url=f"http://localhost:{FRONTEND_PORT}")
    logger.debug("Debug environment, using frontend from url, set up")
else: # Debug in exe not supported
    raise EnvironmentError("Unexpected execution")

logger.info("Set up FastAPI")

def start_api(use_thread: bool) -> Thread | None:
    def run():
        logger.debug("Starting uvicorn...")
        uvicorn.run(app, host="localhost", port=BACKEND_PORT, log_level="info", reload=False) # Switch to reload=True for live reload - from my experience caused hanging process on port
        logger.info("Started uvicorn")

    if use_thread:
        logger.debug("Starting uvicorn thread...")
        api_thread = threading.Thread(target=run, daemon=True)
        api_thread.start()
        logger.info("Started uvicorn thread")

        return api_thread
    else:
        run()
        return None

def start_webview() -> None:
    logger.debug("Starting webview...")
    webview.create_window(
        "barebones-llm",
        f"http://localhost:{FRONTEND_PORT if settings.is_debug else BACKEND_PORT}/",
        width=1000,
        height=700,
        min_size=(600, 400)
    )
    webview.start(debug=settings.is_debug)
    logger.info("Started webview")

def main() -> None:
    start_api(True)

    time.sleep(1)

    start_webview()

def main_backend_only() -> None:
    start_api(False)

if __name__ == "__main__":
    if args.backend_only:
        logger.debug("Running backend only...")
        main_backend_only()
    else:
        logger.debug("Running main...")
        main()


import argparse
from threading import Thread
import webview
import threading
import uvicorn
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants.constants import IS_DEBUG, WEBVIEW_PORT, BACKEND_PORT
from src.routes.llm import llm_route
from src.routes.test import test_route
from src.routes.openai import openai_route

parser = argparse.ArgumentParser()
parser.add_argument("--backend-only", type=bool, default=False)
args = parser.parse_args()

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

def start_api(use_thread: bool) -> Thread | None:
    def run():
        uvicorn.run("src.main:app", host="127.0.0.1", port=BACKEND_PORT, log_level="info", reload=True)

    if use_thread:
        api_thread = threading.Thread(target=run, daemon=True)
        api_thread.start()

        return api_thread
    else:
        run()
        return None

def start_webview() -> None:
    print("Starting desktop app...")

    webview.create_window(
        "Self Learning App",
        f"http://127.0.0.1:{WEBVIEW_PORT}",
        width=1000,
        height=700,
        min_size=(600, 400)
    )
    webview.start(debug=IS_DEBUG)

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


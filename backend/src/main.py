import argparse
from threading import Thread

import webview
import threading
import uvicorn
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants import IS_DEBUG
from src.routes.test import test_router

parser = argparse.ArgumentParser()
parser.add_argument("--backend-only", type=bool, default=False)
args = parser.parse_args()

print(args)

def start_fastapi(use_thread: bool) -> Thread | None:
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(test_router)

    def run():
        uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")

    if use_thread:
        api_thread = threading.Thread(target=run, daemon=True)
        api_thread.start()

        return api_thread
    else:
        run()
        return None

def start_webview() -> None:
    print("Starting desktop app...")

    # TODO: change url, this is just for development
    url = "http://localhost:5173" if IS_DEBUG else None
    webview.create_window(
        "Self Learning App",
        url,
        width=1000,
        height=700,
        min_size=(600, 400)
    )
    webview.start(debug=IS_DEBUG)

def main() -> None:
    start_fastapi(True)

    time.sleep(1)

    start_webview()

def main_backend_only() -> None:
    start_fastapi(False)

if __name__ == "__main__":
    if args.backend_only:
        main_backend_only()
    else:
        main()


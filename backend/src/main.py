from http.cookiejar import debug
import webview
import threading
import uvicorn
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants import IS_DEBUG

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test/")
def test_connection():
    return {
        "message": "Backend is running, baby!"
    }

@app.get("/api/test/sample")
def get_sample_data():
    return {
        "id": 67,
        "guid": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Sample Data",
        "description": "This is a sample data response from the backend"
    }

def start_fastapi():
    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")

def main():
    # Run the FastAPI server in a separate thread
    server_thread = threading.Thread(target=start_fastapi, daemon=True)
    server_thread.start()

    # To make sure webview boots up correctly with frontend running
    time.sleep(1)

    try:
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
    except Exception as e:
        print(f"Error while starting web view: {e}")
        #server_thread.join()

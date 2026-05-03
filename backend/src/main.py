import webview
import threading
import uvicorn
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test")
def test_connection():
    return {
        "status": "success",
        "message": "Backend is running, baby!"
    }

def start_fastapi():
    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")

def main():
    # Run the FastAPI server in a separate thread
    server_thread = threading.Thread(target=start_fastapi, daemon=True)
    server_thread.start()

    time.sleep(1)

    try:
        print("Starting desktop app...")
        webview.create_window(
            "Self Learning App",
            "http://localhost:5173", # TODO: change url, this is just for development
            width=1000,
            height=700,
            min_size=(600, 400)
        )
        webview.start()
    except Exception as e:
        print(f"Error while starting web view: {e}")
        #server_thread.join()

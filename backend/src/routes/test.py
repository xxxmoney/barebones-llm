
from fastapi import APIRouter

test_router = APIRouter(prefix="/api/test")

@test_router.get("/api/test/")
def test_connection():
    return {
        "message": "Backend is running, baby!"
    }

@test_router.get("/api/test/sample")
def get_sample_data():
    return {
        "id": 67,
        "guid": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Sample Data",
        "description": "This is a sample data response from the backend"
    }


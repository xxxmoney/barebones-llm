
from fastapi import APIRouter

test_route = APIRouter(prefix="/api/test")

@test_route.get("")
def test_connection():
    return {
        "message": "Backend is running, baby!"
    }

@test_route.get("/sample")
def get_sample_data():
    return {
        "id": 67,
        "guid": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Sample Data",
        "description": "This is a sample data response from the backend"
    }


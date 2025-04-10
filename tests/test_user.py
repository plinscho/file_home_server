import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app

# Use SQLite for testing
SQL_DB_URL = "sqlite:///./test.db"
engine = create_engine(SQL_DB_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Setup the database
@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    try:
        db = TestSessionLocal()
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

# Setup TestClient with dependency override
@pytest.fixture(scope="module")
def client(test_db):
    def override_get_db():
        try:
            yield test_db
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as client:
        yield client
    app.dependency_overrides.clear()

def test_register_user(client):
    response = client.post(
        "/users/register",
        json={"username": "test_user", "password": "1234"}
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "User created!"}

def test_register_existing_user(client):
    response = client.post(
        "/users/register",
        json={"username": "test_user", "password": "1234"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "User already exists"}

def test_login_user(client):
    response = client.post(
        "/users/login",
        json={"username": "test_user", "password": "1234"}  # Changed params to json
    )
    assert response.status_code == 200
    assert response.json()["msg"] == "Login succesfully!"

def test_login_invalid_user(client):
    response = client.post(
        "/users/login",
        json={"username": "invaliduser", "password": "testpass"}  # Changed params to json
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect credentials"}
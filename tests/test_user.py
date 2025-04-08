import pytest
from httpx import AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app

SQL_DB_URL = "sqlite:///./test.db"
engine = create_engine(SQL_DB_URL)
TestSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    try:
        yield TestSessionLocal()
    finally:
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="module")
async def client(test_db):
    # Override the dependency to use the test database
    app.dependency_overrides[get_db] = lambda: test_db

    # Use AsyncClient for testing
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.anyio
async def test_register_user(client):
    response = await client.post(
        "/users/register",
        json={"username": "test_user", "password": "1234"}
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "User created"}

@pytest.mark.anyio
async def test_register_existing_user(client):
    response = await client.post(
        "/users/register",
        json={"username": "test_user", "password": "1234"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "User already exists"}

@pytest.mark.anyio
async def test_login_user(client):
    response = await client.post(
        "/users/login",
        json={"username": "test_user", "password": "1234"}
    )
    assert response.status_code == 200
    assert response.json()["msg"] == "Login successfully!"

@pytest.mark.anyio
async def test_login_invalid_user(client):
    response = await client.post(
        "/users/login",
        json={"username": "invaliduser", "password": "testpass"}
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect credentials"}
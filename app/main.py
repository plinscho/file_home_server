from fastapi import FastAPI
from .routes import users, files
from .database import Base, engine

app = FastAPI()

app.include_router(users.router, prefix="/users")
app.include_router(files.router, prefix="/files")

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, files
from passlib.hash import bcrypt
from . import models
from .database import Base, engine, get_db
import os

DEFAULT_PWD = 1234
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path from docker compose volumes_frontend-build
frontend_path = "/app/frontend"

app.include_router(users.router, prefix="/users")
app.include_router(files.router, prefix="/files")

# run "npm run build" before to generate the files in the Dockerfile!
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.on_event("startup")
def	startup_event():
	db = next(get_db())
	db_user = db.query(models.User).filter_by(id=1).first()
	if not db_user:
		hashed_pwd = bcrypt.hash(str(DEFAULT_PWD))
		new_user = models.User(id=1, username="db_username", password=hashed_pwd)
		db.add(new_user)
		db.commit()
	files.sync_storage_db(db)



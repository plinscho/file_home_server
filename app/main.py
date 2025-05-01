from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from .routes import users, files
from passlib.hash import bcrypt
from . import models
from .database import Base, engine, get_db
import os

DEFAULT_PWD = 1234
app = FastAPI()

frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")
# run "npm run build" before to generate the files for serving them now
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

@app.get("/")
def read_index():
	return FileResponse("frontend/dist/index.html")

@app.get("/{path:path}")
def catch_all(path: str):
    return FileResponse("frontend/dist/index.html")

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

app.include_router(users.router, prefix="/api/users")
app.include_router(files.router, prefix="/api/files")


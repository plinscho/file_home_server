from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from .routes import users, files
from passlib.hash import bcrypt
from . import models
from .database import Base, engine, get_db

DEFAULT_PWD = 1234
app = FastAPI()

# https://fastapi.tiangolo.com/tutorial/static-files/#use-staticfiles
app.mount("/", StaticFiles(directory="frontend/", html=True), name="frontend")

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

app.include_router(users.router, prefix="/users")
app.include_router(files.router, prefix="/files")


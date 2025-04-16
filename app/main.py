from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from .routes import users, files
from . import models
from .database import Base, engine, get_db

DEFAULT_PWD = 1234
app = FastAPI()

@app.get("/")
def redirect():
	return RedirectResponse(url="/docs")

@app.on_event("startup")
def	startup_event():
	db = next(get_db())
	db_user = db.query(models.User).filter_by(id=1).first()
	if not db_user:
		new_user = models.User(id=1, username="db_username", password=DEFAULT_PWD)
		db.add(new_user)
		db.commit()
	files.sync_storage_db(db)

app.include_router(users.router, prefix="/users")
app.include_router(files.router, prefix="/files")


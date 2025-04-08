from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import get_db
from .. import models
from passlib.hash import bcrypt

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    password: str

@router.post('/register')
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter_by(username=user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail='User already exists')
    hashed = bcrypt.hash(user.password)
    new_user = models.User(username=user.username, password=hashed)
    db.add(new_user)
    db.commit()
    return {'msg':'User created!'}

@router.post('/login')
def login(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter_by(username=user.username).first()
    if not existing_user or not bcrypt.verify(user.password, existing_user.password):
        raise HTTPException(status_code=400, detail='Incorrect credentials')
    return {'msg': 'Login succesfully!', 'user_id': existing_user.id}


from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
import os
from datetime import datetime
from pathlib import Path

router = APIRouter()

STORAGE_PATH = Path("/app/storage")

@router.post("/upload/")
def upload_file(user_id: int, file: UploadFile=File(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Error: User not found")

    file_path = STORAGE_PATH/file.file_name
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    data = models.Data(
        user_id = user.id,
        file_name = file.file_name,
        file_path = file.file_path,
        file_type = file.file_type,
        file_size = file.file_size,
        date_upload = datetime.now()
    )
    db.add(data)
    db.commit()
    return {"msg": "File was uploaded!", "Path: ": file.file_path}


@router.get("/list/")
def list_files(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Error: User not found!")
    files = db.query(models.Data).filter_by(user_id=user.id).all()
    return files



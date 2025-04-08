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

    file_path = STORAGE_PATH / file.filename  # Correct attribute name
    with open(file_path, "wb") as f:
        content = file.file.read()
        f.write(content)
        
    data = models.Data(
        user_id = user.id,
        file_name = file.filename,  # Correct attribute name
        file_path = str(file_path),  # Use the correctly constructed path
        file_type = file.content_type,  # Correct attribute name
        file_size = len(content),  # Calculate size correctly
        date_upload = datetime.now()
    )
    db.add(data)
    db.commit()
    return {"msg": "File was uploaded!", "Path": str(file_path)}


@router.get("/list/")
def list_files(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(id=user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Error: User not found!")
    files = db.query(models.Data).filter_by(user_id=user.id).all()
    return files



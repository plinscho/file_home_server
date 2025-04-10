from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from ..database import get_db
from .. import models
import os
from datetime import datetime
from pathlib import Path

router = APIRouter()

STORAGE_PATH = Path("storage").resolve()

def sync_storage_db(db: Session):
    for root, _, files in os.walk(STORAGE_PATH):
        print(f"Explorando: {root}, Archivos: {files}")  # Depuración
        for file_name in files:
            file_path = os.path.join(root, file_name)
            existing_file = db.query(models.Data).filter_by(file_path=file_path).first()
            if not existing_file:
                new_file = models.Data(
                    user_id = 1,
                    file_name = file_name,
                    file_path = file_path,
                    file_type = file_name.split('.')[-1],
                    date_upload = None
                )
                db.add(new_file)
        db.commit()

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
def list_files(db: Session = Depends(get_db)):
    files = db.query(models.Data).all()
    return files

@router.get("/download/{file_id}")
def download_file(file_id: int, db: Session = Depends(get_db)):
    file = db.query(models.Data).filter_by(id=file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="Error. File not found!")
    return FileResponse(file.file_path, media_type="application/octet-stream", filename=file.file_name)

@router.post("/sync")
def sync_files(db: Session = Depends(get_db)):
    sync_storage_db(db)
    return {"message": "Storage syncronized with database!"}
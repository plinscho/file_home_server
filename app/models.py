from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP
from .database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class Data(Base):
    __tablename__ = 'data'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    file_name = Column(String)
    file_path = Column(String(500))
    file_type = Column(String)
    file_size = Column(Integer)
    date_upload = Column(TIMESTAMP)

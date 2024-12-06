# backend/app/models/user.py

from sqlalchemy import Column, Integer, String
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Integer, default=1)  # 1 for active, 0 for inactive
    is_superuser = Column(Integer, default=0)  # 1 for superuser, 0 for regular user

    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"

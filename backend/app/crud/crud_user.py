# backend/app/crud/crud_user.py

from sqlalchemy.orm import Session
from typing import Optional

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.hashing import get_password_hash, verify_password


class CRUDUser:
    def get_user(self, db: Session, user_id: int) -> Optional[User]:
        """
        Retrieve a user by their ID.
        """
        return db.query(User).filter(User.id == user_id).first()

    def get_user_by_username(self, db: Session, username: str) -> Optional[User]:
        """
        Retrieve a user by their username.
        """
        return db.query(User).filter(User.username == username).first()

    def create_user(self, db: Session, user: UserCreate) -> User:
        """
        Create a new user with a hashed password.
        """
        hashed_password = get_password_hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=False
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def authenticate(self, db: Session, username: str, password: str) -> Optional[User]:
        """
        Authenticate a user by verifying username and password.
        """
        user = self.get_user_by_username(db, username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


crud_user = CRUDUser()

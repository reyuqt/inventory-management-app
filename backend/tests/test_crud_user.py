# backend/tests/test_crud_user.py

import pytest
from sqlalchemy.orm import Session
from app.crud.crud_user import CRUDUser
from app.schemas.user import UserCreate, UserUpdate
from app.core.hashing import verify_password


@pytest.fixture
def user_create_data():
    return UserCreate(
        username="testuser",
        email="testuser@example.com",
        password="testpassword123"
    )

# Fixture to provide an instance of CRUDUser for testing
@pytest.fixture(scope="function")
def crud_user_instance():
    return CRUDUser()

def test_create_user(db_session: Session, crud_user_instance: CRUDUser, user_create_data: UserCreate):
    user = crud_user_instance.create_user(db=db_session, user=user_create_data)

    assert user.id is not None
    assert user.username == user_create_data.username
    assert user.email == user_create_data.email
    assert user.is_active is True
    assert user.is_superuser is False
    assert user.hashed_password != user_create_data.password  # Ensure password is hashed
    assert verify_password(user_create_data.password, user.hashed_password) is True


def test_get_user_by_username(db_session: Session, crud_user_instance: CRUDUser, user_create_data: UserCreate):
    # First, create a user
    created_user = crud_user_instance.create_user(db=db_session, user=user_create_data)

    # Retrieve the user by username
    fetched_user = crud_user_instance.get_user_by_username(db=db_session, username="testuser")

    assert fetched_user is not None
    assert fetched_user.id == created_user.id
    assert fetched_user.username == created_user.username
    assert fetched_user.email == created_user.email


def test_authenticate_user_success(db_session: Session, crud_user_instance: CRUDUser, user_create_data: UserCreate):
    # Create user
    crud_user_instance.create_user(db=db_session, user=user_create_data)

    # Attempt authentication
    user = crud_user_instance.authenticate(db=db_session, username="testuser", password="testpassword123")

    assert user is not None
    assert user.username == "testuser"


def test_authenticate_user_wrong_password(db_session: Session, crud_user_instance: CRUDUser,
                                          user_create_data: UserCreate):
    # Create user
    crud_user_instance.create_user(db=db_session, user=user_create_data)

    # Attempt authentication with wrong password
    user = crud_user_instance.authenticate(db=db_session, username="testuser", password="wrongpassword")

    assert user is None


def test_authenticate_nonexistent_user(db_session: Session, crud_user_instance: CRUDUser):
    # Attempt authentication for a user that doesn't exist
    user = crud_user_instance.authenticate(db=db_session, username="nonexistent", password="nopassword")

    assert user is None

# backend/tests/conftest.py

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.base import Base
from app.crud.crud_user import CRUDUser
from app.core.config import settings

# Use a separate test database (SQLite in-memory for simplicity)
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"  # In-memory database

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
Base.metadata.create_all(bind=engine)

@pytest.fixture(scope="session")
def db_engine():
    """Fixture for the database engine."""
    yield engine
    engine.dispose()

@pytest.fixture(scope="function")
def db_session(db_engine):
    """Fixture for a database session."""
    connection = db_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture(scope="function")
def crud_user_instance(db_session):
    """Fixture for CRUDUser instance."""
    return CRUDUser()

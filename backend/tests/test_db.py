# backend/tests/test_db.py

import pytest
from sqlalchemy.orm import Session
from app.db.base import Base
from app.db.session import engine
from conftest import TestingSessionLocal


@pytest.fixture(scope="session")
def create_tables():
    """Create database tables for testing."""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def db_session(create_tables):
    """Provide a transactional scope around a series of operations."""
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    yield session
    session.close()
    transaction.rollback()
    connection.close()


def test_user_table_exists(db_session: Session):
    inspector = db_session.bind.dialect.inspector(db_session.bind)
    tables = inspector.get_table_names()
    assert "users" in tables


def test_item_table_exists(db_session: Session):
    inspector = db_session.bind.dialect.inspector(db_session.bind)
    tables = inspector.get_table_names()
    assert "items" in tables

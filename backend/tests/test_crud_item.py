# backend/tests/test_crud_item.py

import pytest
from sqlalchemy.orm import Session
from app.crud.crud_item import CRUDItem
from app.schemas.item import ItemCreate, ItemUpdate


@pytest.fixture
def item_create_data():
    """Fixture for item creation data."""
    return ItemCreate(
        name="Test Item",
        description="A test item",
        price=19.99,
        quantity=100
    )


@pytest.fixture(scope="function")
def crud_item_instance():
    """Fixture for CRUDItem instance."""
    return CRUDItem()


def test_create_item(crud_item_instance: CRUDItem, db_session: Session, item_create_data: ItemCreate):
    item = crud_item_instance.create(db=db_session, item=item_create_data)

    assert item.id is not None
    assert item.name == item_create_data.name
    assert item.description == item_create_data.description
    assert item.price == item_create_data.price
    assert item.quantity == item_create_data.quantity
    assert bool(item.is_active) is True


def test_get_item(crud_item_instance: CRUDItem, db_session: Session, item_create_data: ItemCreate):
    item = crud_item_instance.create(db=db_session, item=item_create_data)
    fetched_item = crud_item_instance.get(db=db_session, item_id=item.id)
    assert fetched_item is not None
    assert fetched_item.id == item.id
    assert fetched_item.name == item.name


def test_get_multi_items(crud_item_instance: CRUDItem, db_session: Session, item_create_data: ItemCreate):
    # Create multiple items
    for _ in range(5):
        crud_item_instance.create(db=db_session, item=item_create_data)

    items = crud_item_instance.get_multi(db=db_session, skip=0, limit=10)
    assert len(items) == 5
    for item in items:
        assert item.name == item_create_data.name


def test_update_item(crud_item_instance: CRUDItem, db_session: Session, item_create_data: ItemCreate):
    item = crud_item_instance.create(db=db_session, item=item_create_data)
    updates = ItemUpdate(price=24.99, quantity=150)  # Wrap in ItemUpdate schema
    updated_item = crud_item_instance.update(db=db_session, db_item=item, updates=updates)

    assert updated_item.price == updates.price
    assert updated_item.quantity == updates.quantity


def test_remove_item(crud_item_instance: CRUDItem, db_session: Session, item_create_data: ItemCreate):
    item = crud_item_instance.create(db=db_session, item=item_create_data)
    removed_item = crud_item_instance.remove(db=db_session, db_item=item)
    assert removed_item is not None
    fetched_item = crud_item_instance.get(db=db_session, item_id=item.id)
    assert fetched_item is None

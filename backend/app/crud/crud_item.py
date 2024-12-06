# backend/app/crud/crud_item.py

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


class CRUDItem:
    def create(self, db: Session, item: ItemCreate) -> Item:
        db_item = Item(
            name=item.name,
            description=item.description,
            price=item.price,
            quantity=item.quantity,
            is_active=True
        )
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item

    def get(self, db: Session, item_id: int) -> Optional[Item]:
        return db.query(Item).filter(Item.id == item_id).first()

    def get_multi(self, db: Session, skip: int = 0, limit: int = 100) -> List[Item]:
        return db.query(Item).offset(skip).limit(limit).all()

    def update(self, db: Session, db_item: Item, updates: ItemUpdate) -> Item:
        update_data = updates.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
        return db_item

    def remove(self, db: Session, db_item: Item) -> Item:
        db.delete(db_item)
        db.commit()
        return db_item


crud_item = CRUDItem()

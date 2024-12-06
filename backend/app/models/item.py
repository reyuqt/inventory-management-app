# backend/app/models/item.py

from sqlalchemy import Column, Integer, String, Float, Boolean
from app.db.base import Base


class Item(Base):
    """
    SQLAlchemy model for the 'items' table.
    """

    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    def __repr__(self):
        return f"<Item(id={self.id}, name='{self.name}', price={self.price}, quantity={self.quantity}, is_active={self.is_active})>"

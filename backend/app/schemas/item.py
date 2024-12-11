# backend/app/schemas/item.py

from typing import Optional
from pydantic import BaseModel


class ItemBase(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    quantity: int = 0


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    is_active: Optional[bool] = None


class ItemInDBBase(ItemBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


class Item(ItemInDBBase):
    pass

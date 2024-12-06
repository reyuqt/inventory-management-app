from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# Shared properties
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(..., min_length=6)


# Properties to return via API
class UserRead(UserBase):
    id: int

    class Config:
        orm_mode: True


# Properties to receive via API on update (optional)
class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr]
    password: Optional[str] = Field(None, min_length=6)


# Token schemas for authentication (optional, but useful)
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None

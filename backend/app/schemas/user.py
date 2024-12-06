# backend/app/schemas/user.py

from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    """
    Base schema for user containing common attributes.
    """
    username: str = Field(..., example="johndoe")
    email: EmailStr = Field(..., example="johndoe@example.com")
    is_active: bool = Field(default=True, example=True)
    is_superuser: bool = Field(default=False, example=False)


class UserCreate(UserBase):
    """
    Schema for creating a new user. Includes password.
    """
    password: str = Field(..., min_length=8, example="strongpassword123")


class UserUpdate(BaseModel):
    """
    Schema for updating an existing user. All fields are optional.
    """
    username: Optional[str] = Field(None, example="janedoe")
    email: Optional[EmailStr] = Field(None, example="janedoe@example.com")
    password: Optional[str] = Field(None, min_length=8, example="newstrongpassword456")
    is_active: Optional[bool] = Field(None, example=True)
    is_superuser: Optional[bool] = Field(None, example=False)


class UserInDBBase(UserBase):
    """
    Schema representing the user as stored in the database.
    """
    id: int = Field(..., example=1)

    class Config:
        orm_mode = True


class User(UserInDBBase):
    """
    Schema exposed to API consumers.
    """
    pass


class UserInDB(UserInDBBase):
    """
    Schema used internally, includes hashed_password.
    """
    hashed_password: str

# backend/app/schemas/token.py

from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    """
    Schema representing the JWT access token returned upon successful authentication.
    """
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """
    Schema for extracting data from the JWT token, such as the username.
    """
    username: Optional[str] = None

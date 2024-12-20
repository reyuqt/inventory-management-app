# backend/app/core/config.py

from pydantic_settings import BaseSettings
from pydantic import Field, EmailStr
from typing import List, Optional
from dotenv import load_dotenv
import os

# Load the base .env file if it exists
load_dotenv("../../.env", override=False)

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Load environment-specific .env files
if ENVIRONMENT == "docker":
    load_dotenv("../../.env.docker", override=True)
elif ENVIRONMENT == "development":
    load_dotenv("../../.env.local", override=True)


class Settings(BaseSettings):
    # Project Information
    PROJECT_NAME: str = "Inventory Management API"
    PROJECT_VERSION: str = "1.0.0"
    ENVIRONMENT: str = Field("development", env="ENVIRONMENT")

    # Database Configuration
    DATABASE_URL: str = Field("postgresql://admin:password123@db:5432/inventory_db", env="DATABASE_URL")

    # Security Settings
    SECRET_KEY: str = Field("UVZuuakoEXXy1wil4KkXLTnbgrbqSeBj", env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS Configuration
    BACKEND_CORS_ORIGINS: List[str] = Field(
        default_factory=lambda: ["http://localhost", "http://localhost:3000"],
        env="BACKEND_CORS_ORIGINS"
    )

    # Email Configuration (Optional, useful for features like password reset)
    SMTP_HOST: Optional[str] = Field(None, env="SMTP_HOST")
    SMTP_PORT: Optional[int] = Field(None, env="SMTP_PORT")
    SMTP_USER: Optional[str] = Field(None, env="SMTP_USER")
    SMTP_PASSWORD: Optional[str] = Field(None, env="SMTP_PASSWORD")
    EMAILS_FROM_EMAIL: Optional[EmailStr] = Field(None, env="EMAILS_FROM_EMAIL")
    EMAILS_FROM_NAME: Optional[str] = Field("Inventory Management API", env="EMAILS_FROM_NAME")

    # Admin User (Optional, for initial setup)
    FIRST_SUPERUSER: EmailStr = Field("reyuqt01@gmail.com", env="FIRST_SUPERUSER")
    FIRST_SUPERUSER_PASSWORD: str = Field("admin_super_password", env="FIRST_SUPERUSER_PASSWORD")

    # Any other settings can be added here

    class Config:
        # Do not specify env_file here since it's handled manually above
        case_sensitive = True  # If you want environment variables to be case-sensitive


settings = Settings()
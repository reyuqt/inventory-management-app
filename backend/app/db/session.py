# backend/app/db/session.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Create the SQLAlchemy engine
engine = create_engine(settings.DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

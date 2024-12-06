# backend/app/db/base.py

from sqlalchemy.ext.declarative import declarative_base

# Create the base class for all ORM models
Base = declarative_base()

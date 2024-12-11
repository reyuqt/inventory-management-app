# backend/app/db/seed.py
import os
from sqlalchemy.orm import Session
from faker import Faker
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.item import Item
from app.models.user import User
from app.core.config import settings

fake = Faker()


def create_fake_users(db: Session, num_users: int = 10):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.unique.email(),
            hashed_password=fake.password(),
        )
        db.add(user)
    db.commit()


def create_fake_items(db: Session, num_items: int = 50):
    for _ in range(num_items):
        item = Item(
            name=fake.word().capitalize(),
            description=fake.sentence(nb_words=10),
            price=round(fake.random_number(digits=5, fix_len=True) / 100, 2),
            quantity=fake.random_number(1)
        )
        db.add(item)
    db.commit()


def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)

    # Create a new session
    db = SessionLocal()

    # Check if data already exists to prevent duplication
    if db.query(User).first() is None:
        create_fake_users(db, num_users=10)
        print("Seeded Users")

    if db.query(Item).first() is None:
        create_fake_items(db, num_items=50)
        print("Seeded Items")

    db.close()


if __name__ == "__main__":
    seed_database()

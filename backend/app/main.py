# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.logger import logger  # Import the centralized logger
from app.middleware.logging_middleware import LoggingMiddleware
from app.api.v1.endpoints import auth, items, users
from app.db.base import Base
from app.db.session import engine
from app.db.seed import seed_database
from app.core.config import settings
# Import models to ensure they're registered
from app.models.user import User
from app.models.item import Item


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("Application startup")
    yield  # Application runs during this time
    # Shutdown logic
    logger.info("Application shutdown")

seed_database()

# Create all tables
Base.metadata.create_all(bind=engine)
# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="API for managing inventory items.",
    contact={
        "name": "Lauren Rothstein",
        "email": "LRothstein.public@gmail.com",
    }, lifespan=lifespan
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add logging middleware
app.add_middleware(LoggingMiddleware)

# Include routers
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["auth"],
)

app.include_router(
    items.router,
    prefix="/api/v1/items",
    tags=["items"],
)

app.include_router(
    users.router,
    prefix="/api/v1/users",
    tags=["users"],
)


# Root endpoint
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Inventory Management API!"}

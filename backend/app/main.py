from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import auth, items, users
from app.db.base import Base
from app.db.session import engine
from app.core.config import settings

# Create all database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="API for managing inventory items.",
    contact={
        "name": "Lauren Rothstein",
        "email": "LRothstein.public@gmail.com",
    },
)

# Set up CORS middleware
origins = [
    "http://localhost",
    "http://localhost:3000",  # React frontend
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],    # Allows all HTTP methods
    allow_headers=["*"],    # Allows all headers
)

# Include API routers
app.include_router(
    auth.router,
    prefix="/api/v1/auth",
    tags=["auth"],
    dependencies=[],
)

app.include_router(
    items.router,
    prefix="/api/v1/items",
    tags=["items"],
    dependencies=[],
)

app.include_router(
    users.router,
    prefix="/api/v1/users",
    tags=["users"],
    dependencies=[],
)

# Root endpoint
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Inventory Management API!"}

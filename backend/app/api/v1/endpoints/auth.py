# backend/app/api/v1/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Request

from app import crud, schemas
from app.db.session import get_db
from app.core.security import create_access_token, get_current_user
from app.crud.crud_user import crud_user

router = APIRouter(
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
        request: Request,
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: Session = Depends(get_db),
):
    print("Origin:", request.headers.get("origin"))
    user = crud_user.authenticate(
        db, username=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.background_check import BackgroundCheckCreate, BackgroundCheckResponse
from app.services.background_check_service import BackgroundCheckService

router = APIRouter()


@router.post("/", response_model=BackgroundCheckResponse)
def create_background_check(
    background_check: BackgroundCheckCreate,
    db: Session = Depends(get_db)
):
    """Create a new background check"""
    service = BackgroundCheckService(db)
    return service.create_background_check(background_check)


@router.get("/", response_model=List[BackgroundCheckResponse])
def get_background_checks(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all background checks"""
    service = BackgroundCheckService(db)
    return service.get_background_checks(skip=skip, limit=limit)


@router.get("/{check_id}", response_model=BackgroundCheckResponse)
def get_background_check(
    check_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific background check"""
    service = BackgroundCheckService(db)
    background_check = service.get_background_check(check_id)
    if not background_check:
        raise HTTPException(status_code=404, detail="Background check not found")
    return background_check


@router.post("/{check_id}/start")
def start_background_check(
    check_id: int,
    db: Session = Depends(get_db)
):
    """Start a background check process"""
    service = BackgroundCheckService(db)
    success = service.start_background_check(check_id)
    if not success:
        raise HTTPException(status_code=404, detail="Background check not found")
    return {"message": "Background check started successfully"}

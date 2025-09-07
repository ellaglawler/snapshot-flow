from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas.candidate import CandidateCreate, CandidateUpdate, CandidateResponse
from app.services.candidate_service import CandidateService

router = APIRouter()


@router.post("/", response_model=CandidateResponse)
def create_candidate(
    candidate: CandidateCreate,
    db: Session = Depends(get_db)
):
    """Create a new candidate"""
    service = CandidateService(db)
    return service.create_candidate(candidate)


@router.get("/", response_model=List[CandidateResponse])
def get_candidates(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all candidates"""
    service = CandidateService(db)
    return service.get_candidates(skip=skip, limit=limit)


@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific candidate"""
    service = CandidateService(db)
    candidate = service.get_candidate(candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate


@router.put("/{candidate_id}", response_model=CandidateResponse)
def update_candidate(
    candidate_id: int,
    candidate_update: CandidateUpdate,
    db: Session = Depends(get_db)
):
    """Update a candidate"""
    service = CandidateService(db)
    candidate = service.update_candidate(candidate_id, candidate_update)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate


@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):
    """Delete a candidate"""
    service = CandidateService(db)
    success = service.delete_candidate(candidate_id)
    if not success:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return {"message": "Candidate deleted successfully"}

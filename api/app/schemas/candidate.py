from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from app.schemas.background_check import BackgroundCheckResponse


class CandidateBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    phone: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = None


class CandidateCreate(CandidateBase):
    consent_given: bool = False
    organization_id: int


class CandidateUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = None
    consent_given: Optional[bool] = None


class CandidateResponse(CandidateBase):
    id: int
    consent_given: bool
    consent_date: Optional[datetime] = None
    organization_id: int
    created_by_user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    background_checks: List[BackgroundCheckResponse] = []

    class Config:
        from_attributes = True

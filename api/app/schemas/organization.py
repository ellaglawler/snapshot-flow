from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class OrganizationBase(BaseModel):
    name: str
    domain: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    is_active: bool = True
    plan_type: str = "basic"
    max_users: int = 10
    max_candidates_per_month: int = 100


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    domain: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    website: Optional[str] = None
    is_active: Optional[bool] = None
    plan_type: Optional[str] = None
    max_users: Optional[int] = None
    max_candidates_per_month: Optional[int] = None


class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

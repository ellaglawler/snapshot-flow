from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from app.models import UserRole, UserStatus


class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.VIEWER
    status: UserStatus = UserStatus.ACTIVE


class UserCreate(UserBase):
    password: str
    organization_id: int


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    id: int
    organization_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

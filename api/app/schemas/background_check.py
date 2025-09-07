from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.models.background_check import CheckStatus
from app.schemas.check_result import CheckResultResponse


class BackgroundCheckCreate(BaseModel):
    candidate_id: int
    criminal_check: bool = False
    education_verification: bool = False
    employment_verification: bool = False
    identity_verification: bool = False
    social_media_check: bool = False


class BackgroundCheckResponse(BaseModel):
    id: int
    candidate_id: int
    created_by_user_id: int
    status: CheckStatus
    criminal_check: bool
    education_verification: bool
    employment_verification: bool
    identity_verification: bool
    social_media_check: bool
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    check_results: List[CheckResultResponse] = []

    class Config:
        from_attributes = True

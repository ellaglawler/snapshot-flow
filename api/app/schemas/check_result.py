from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from app.models.check_result import CheckType, ResultStatus


class CheckResultResponse(BaseModel):
    id: int
    background_check_id: int
    check_type: CheckType
    status: ResultStatus
    result_data: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

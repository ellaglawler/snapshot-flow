from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict, Any
from app.models import ReportStatus, ReportType


class ReportBase(BaseModel):
    title: str
    report_type: ReportType = ReportType.COMPREHENSIVE
    summary: Optional[str] = None
    findings: Optional[str] = None
    recommendations: Optional[str] = None
    report_data: Optional[str] = None


class ReportCreate(ReportBase):
    candidate_id: int
    background_check_id: int


class ReportUpdate(BaseModel):
    title: Optional[str] = None
    report_type: Optional[ReportType] = None
    status: Optional[ReportStatus] = None
    summary: Optional[str] = None
    findings: Optional[str] = None
    recommendations: Optional[str] = None
    report_data: Optional[str] = None
    is_delivered: Optional[bool] = None
    delivery_method: Optional[str] = None


class ReportResponse(ReportBase):
    id: int
    candidate_id: int
    background_check_id: int
    created_by_user_id: int
    status: ReportStatus
    is_delivered: bool
    delivered_at: Optional[datetime] = None
    delivery_method: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    generated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ReportGenerate(BaseModel):
    report_type: ReportType = ReportType.COMPREHENSIVE
    include_sections: Optional[list] = None
    delivery_method: Optional[str] = None

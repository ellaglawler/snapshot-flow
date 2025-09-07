from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.core.database import Base


class ReportStatus(str, enum.Enum):
    DRAFT = "draft"
    PENDING = "pending"
    GENERATED = "generated"
    DELIVERED = "delivered"
    ARCHIVED = "archived"


class ReportType(str, enum.Enum):
    COMPREHENSIVE = "comprehensive"
    CRIMINAL_ONLY = "criminal_only"
    EMPLOYMENT_ONLY = "employment_only"
    EDUCATION_ONLY = "education_only"
    CUSTOM = "custom"


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    background_check_id = Column(Integer, ForeignKey("background_checks.id"), nullable=False)
    created_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Report details
    title = Column(String, nullable=False)
    report_type = Column(Enum(ReportType), default=ReportType.COMPREHENSIVE)
    status = Column(Enum(ReportStatus), default=ReportStatus.DRAFT)
    
    # Content
    summary = Column(Text)
    findings = Column(Text)  # JSON string of findings
    recommendations = Column(Text)
    report_data = Column(Text)  # Full report JSON
    
    # Delivery
    is_delivered = Column(Boolean, default=False)
    delivered_at = Column(DateTime(timezone=True))
    delivery_method = Column(String)  # email, download, api
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    generated_at = Column(DateTime(timezone=True))
    
    # Relationships
    candidate = relationship("Candidate", back_populates="reports")
    background_check = relationship("BackgroundCheck", back_populates="reports")
    created_by_user = relationship("User")

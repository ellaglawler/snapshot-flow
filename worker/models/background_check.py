from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class CheckStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class BackgroundCheck(Base):
    __tablename__ = "background_checks"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    status = Column(Enum(CheckStatus), default=CheckStatus.PENDING)
    
    # Check types
    criminal_check = Column(Boolean, default=False)
    education_verification = Column(Boolean, default=False)
    employment_verification = Column(Boolean, default=False)
    identity_verification = Column(Boolean, default=False)
    social_media_check = Column(Boolean, default=False)
    
    # Timestamps
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    candidate = relationship("Candidate", back_populates="background_checks")
    check_results = relationship("CheckResult", back_populates="background_check")

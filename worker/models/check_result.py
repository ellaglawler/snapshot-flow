from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class CheckType(str, enum.Enum):
    CRIMINAL = "criminal"
    EDUCATION = "education"
    EMPLOYMENT = "employment"
    IDENTITY = "identity"
    SOCIAL_MEDIA = "social_media"


class ResultStatus(str, enum.Enum):
    PASS = "pass"
    FAIL = "fail"
    PENDING = "pending"
    ERROR = "error"


class CheckResult(Base):
    __tablename__ = "check_results"

    id = Column(Integer, primary_key=True, index=True)
    background_check_id = Column(Integer, ForeignKey("background_checks.id"), nullable=False)
    check_type = Column(Enum(CheckType), nullable=False)
    status = Column(Enum(ResultStatus), default=ResultStatus.PENDING)
    result_data = Column(Text)  # JSON string
    error_message = Column(Text)
    
    # Timestamps
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    background_check = relationship("BackgroundCheck", back_populates="check_results")

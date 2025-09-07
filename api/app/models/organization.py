from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    domain = Column(String, unique=True, index=True)  # e.g., "company.com"
    address = Column(Text)
    phone = Column(String)
    email = Column(String)
    website = Column(String)
    is_active = Column(Boolean, default=True)
    
    # Subscription/Plan info
    plan_type = Column(String, default="basic")  # basic, premium, enterprise
    max_users = Column(Integer, default=10)
    max_candidates_per_month = Column(Integer, default=100)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    users = relationship("User", back_populates="organization")
    candidates = relationship("Candidate", back_populates="organization")

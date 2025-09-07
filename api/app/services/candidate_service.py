from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.candidate import Candidate
from app.schemas.candidate import CandidateCreate, CandidateUpdate


class CandidateService:
    def __init__(self, db: Session):
        self.db = db

    def create_candidate(self, candidate: CandidateCreate) -> Candidate:
        db_candidate = Candidate(
            email=candidate.email,
            first_name=candidate.first_name,
            last_name=candidate.last_name,
            phone=candidate.phone,
            date_of_birth=candidate.date_of_birth,
            address=candidate.address,
            consent_given=candidate.consent_given,
            consent_date=datetime.utcnow() if candidate.consent_given else None
        )
        self.db.add(db_candidate)
        self.db.commit()
        self.db.refresh(db_candidate)
        return db_candidate

    def get_candidate(self, candidate_id: int) -> Optional[Candidate]:
        return self.db.query(Candidate).filter(Candidate.id == candidate_id).first()

    def get_candidates(self, skip: int = 0, limit: int = 100) -> List[Candidate]:
        return self.db.query(Candidate).offset(skip).limit(limit).all()

    def update_candidate(self, candidate_id: int, candidate_update: CandidateUpdate) -> Optional[Candidate]:
        db_candidate = self.get_candidate(candidate_id)
        if not db_candidate:
            return None

        update_data = candidate_update.dict(exclude_unset=True)
        if candidate_update.consent_given and not db_candidate.consent_given:
            update_data["consent_date"] = datetime.utcnow()

        for field, value in update_data.items():
            setattr(db_candidate, field, value)

        self.db.commit()
        self.db.refresh(db_candidate)
        return db_candidate

    def delete_candidate(self, candidate_id: int) -> bool:
        db_candidate = self.get_candidate(candidate_id)
        if not db_candidate:
            return False

        self.db.delete(db_candidate)
        self.db.commit()
        return True

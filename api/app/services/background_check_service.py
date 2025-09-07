from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.background_check import BackgroundCheck, CheckStatus
from app.models.check_result import CheckResult, CheckType, ResultStatus
from app.schemas.background_check import BackgroundCheckCreate


class BackgroundCheckService:
    def __init__(self, db: Session):
        self.db = db

    def create_background_check(self, background_check: BackgroundCheckCreate) -> BackgroundCheck:
        db_background_check = BackgroundCheck(
            candidate_id=background_check.candidate_id,
            criminal_check=background_check.criminal_check,
            education_verification=background_check.education_verification,
            employment_verification=background_check.employment_verification,
            identity_verification=background_check.identity_verification,
            social_media_check=background_check.social_media_check
        )
        self.db.add(db_background_check)
        self.db.commit()
        self.db.refresh(db_background_check)
        return db_background_check

    def get_background_check(self, check_id: int) -> Optional[BackgroundCheck]:
        return self.db.query(BackgroundCheck).filter(BackgroundCheck.id == check_id).first()

    def get_background_checks(self, skip: int = 0, limit: int = 100) -> List[BackgroundCheck]:
        return self.db.query(BackgroundCheck).offset(skip).limit(limit).all()

    def start_background_check(self, check_id: int) -> bool:
        db_background_check = self.get_background_check(check_id)
        if not db_background_check:
            return False

        # Update status to in progress
        db_background_check.status = CheckStatus.IN_PROGRESS
        db_background_check.started_at = datetime.utcnow()

        # Create check result entries for each enabled check type
        check_types = []
        if db_background_check.criminal_check:
            check_types.append(CheckType.CRIMINAL)
        if db_background_check.education_verification:
            check_types.append(CheckType.EDUCATION)
        if db_background_check.employment_verification:
            check_types.append(CheckType.EMPLOYMENT)
        if db_background_check.identity_verification:
            check_types.append(CheckType.IDENTITY)
        if db_background_check.social_media_check:
            check_types.append(CheckType.SOCIAL_MEDIA)

        for check_type in check_types:
            check_result = CheckResult(
                background_check_id=check_id,
                check_type=check_type,
                status=ResultStatus.PENDING,
                started_at=datetime.utcnow()
            )
            self.db.add(check_result)

        self.db.commit()
        return True

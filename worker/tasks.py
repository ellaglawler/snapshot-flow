from celery import current_task
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import httpx
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any

from celery_app import celery_app
from worker.models import Candidate, BackgroundCheck, CheckResult
from worker.models import CheckType, ResultStatus, CheckStatus
from worker.services.criminal_check_service import CriminalCheckService
from worker.services.education_check_service import EducationCheckService
from worker.services.employment_check_service import EmploymentCheckService
from worker.services.identity_check_service import IdentityCheckService
from worker.services.social_media_check_service import SocialMediaCheckService

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/background_check_db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@celery_app.task(bind=True)
def process_background_check(self, check_id: int):
    """Process a background check for a specific candidate"""
    db = SessionLocal()
    try:
        # Get the background check
        background_check = db.query(BackgroundCheck).filter(BackgroundCheck.id == check_id).first()
        if not background_check:
            return {"error": "Background check not found"}

        # Update status to in progress
        background_check.status = CheckStatus.IN_PROGRESS
        background_check.started_at = datetime.utcnow()
        db.commit()

        # Get candidate information
        candidate = db.query(Candidate).filter(Candidate.id == background_check.candidate_id).first()
        if not candidate:
            return {"error": "Candidate not found"}

        # Process each type of check
        results = {}
        
        if background_check.criminal_check:
            results["criminal"] = process_criminal_check.delay(check_id, candidate.id).get()
        
        if background_check.education_verification:
            results["education"] = process_education_check.delay(check_id, candidate.id).get()
        
        if background_check.employment_verification:
            results["employment"] = process_employment_check.delay(check_id, candidate.id).get()
        
        if background_check.identity_verification:
            results["identity"] = process_identity_check.delay(check_id, candidate.id).get()
        
        if background_check.social_media_check:
            results["social_media"] = process_social_media_check.delay(check_id, candidate.id).get()

        # Update background check status
        background_check.status = CheckStatus.COMPLETED
        background_check.completed_at = datetime.utcnow()
        db.commit()

        return {"status": "completed", "results": results}

    except Exception as exc:
        # Update status to failed
        background_check.status = CheckStatus.FAILED
        db.commit()
        raise self.retry(exc=exc, countdown=60, max_retries=3)
    finally:
        db.close()


@celery_app.task
def process_criminal_check(check_id: int, candidate_id: int):
    """Process criminal background check"""
    db = SessionLocal()
    try:
        service = CriminalCheckService()
        result = service.perform_check(candidate_id)
        
        # Save result to database
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.CRIMINAL,
            status=ResultStatus.PASS if result["passed"] else ResultStatus.FAIL,
            result_data=json.dumps(result),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        
        return result
    except Exception as e:
        # Save error result
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.CRIMINAL,
            status=ResultStatus.ERROR,
            error_message=str(e),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        raise
    finally:
        db.close()


@celery_app.task
def process_education_check(check_id: int, candidate_id: int):
    """Process education verification check"""
    db = SessionLocal()
    try:
        service = EducationCheckService()
        result = service.perform_check(candidate_id)
        
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.EDUCATION,
            status=ResultStatus.PASS if result["verified"] else ResultStatus.FAIL,
            result_data=json.dumps(result),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        
        return result
    except Exception as e:
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.EDUCATION,
            status=ResultStatus.ERROR,
            error_message=str(e),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        raise
    finally:
        db.close()


@celery_app.task
def process_employment_check(check_id: int, candidate_id: int):
    """Process employment verification check"""
    db = SessionLocal()
    try:
        service = EmploymentCheckService()
        result = service.perform_check(candidate_id)
        
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.EMPLOYMENT,
            status=ResultStatus.PASS if result["verified"] else ResultStatus.FAIL,
            result_data=json.dumps(result),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        
        return result
    except Exception as e:
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.EMPLOYMENT,
            status=ResultStatus.ERROR,
            error_message=str(e),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        raise
    finally:
        db.close()


@celery_app.task
def process_identity_check(check_id: int, candidate_id: int):
    """Process identity verification check"""
    db = SessionLocal()
    try:
        service = IdentityCheckService()
        result = service.perform_check(candidate_id)
        
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.IDENTITY,
            status=ResultStatus.PASS if result["verified"] else ResultStatus.FAIL,
            result_data=json.dumps(result),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        
        return result
    except Exception as e:
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.IDENTITY,
            status=ResultStatus.ERROR,
            error_message=str(e),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        raise
    finally:
        db.close()


@celery_app.task
def process_social_media_check(check_id: int, candidate_id: int):
    """Process social media check"""
    db = SessionLocal()
    try:
        service = SocialMediaCheckService()
        result = service.perform_check(candidate_id)
        
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.SOCIAL_MEDIA,
            status=ResultStatus.PASS if result["passed"] else ResultStatus.FAIL,
            result_data=json.dumps(result),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        
        return result
    except Exception as e:
        check_result = CheckResult(
            background_check_id=check_id,
            check_type=CheckType.SOCIAL_MEDIA,
            status=ResultStatus.ERROR,
            error_message=str(e),
            completed_at=datetime.utcnow()
        )
        db.add(check_result)
        db.commit()
        raise
    finally:
        db.close()


@celery_app.task
def process_pending_checks():
    """Process all pending background checks"""
    db = SessionLocal()
    try:
        pending_checks = db.query(BackgroundCheck).filter(
            BackgroundCheck.status == CheckStatus.PENDING
        ).all()
        
        for check in pending_checks:
            process_background_check.delay(check.id)
        
        return {"processed": len(pending_checks)}
    finally:
        db.close()


@celery_app.task
def cleanup_old_results():
    """Clean up old check results (older than 1 year)"""
    db = SessionLocal()
    try:
        cutoff_date = datetime.utcnow() - timedelta(days=365)
        
        old_results = db.query(CheckResult).filter(
            CheckResult.created_at < cutoff_date
        ).all()
        
        for result in old_results:
            db.delete(result)
        
        db.commit()
        return {"cleaned": len(old_results)}
    finally:
        db.close()

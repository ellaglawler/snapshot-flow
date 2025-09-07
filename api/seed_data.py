#!/usr/bin/env python3
"""
Seed development data for the background check system.
Run this script to populate the database with sample data for development.
"""

import sys
import os
from datetime import datetime, timedelta
from passlib.context import CryptContext

# Add the parent directory to the path so we can import our models
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine, Base
from app.models import (
    Organization, User, Candidate, BackgroundCheck, CheckResult, Report,
    UserRole, UserStatus, CheckStatus, CheckType, ResultStatus, 
    ReportStatus, ReportType
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_tables():
    """Create all tables"""
    Base.metadata.create_all(bind=engine)

def seed_organizations(session):
    """Create sample organizations"""
    organizations = [
        Organization(
            name="Acme Corporation",
            domain="acme.com",
            address="123 Business St, New York, NY 10001",
            phone="+1-555-0123",
            email="contact@acme.com",
            website="https://acme.com",
            is_active=True,
            plan_type="enterprise",
            max_users=100,
            max_candidates_per_month=1000
        ),
        Organization(
            name="TechStart Inc",
            domain="techstart.io",
            address="456 Innovation Ave, San Francisco, CA 94105",
            phone="+1-555-0456",
            email="hello@techstart.io",
            website="https://techstart.io",
            is_active=True,
            plan_type="premium",
            max_users=25,
            max_candidates_per_month=250
        ),
        Organization(
            name="Small Business LLC",
            domain="smallbiz.com",
            address="789 Main St, Austin, TX 78701",
            phone="+1-555-0789",
            email="info@smallbiz.com",
            website="https://smallbiz.com",
            is_active=True,
            plan_type="basic",
            max_users=5,
            max_candidates_per_month=50
        )
    ]
    
    for org in organizations:
        session.add(org)
    session.commit()
    return organizations

def seed_users(session, organizations):
    """Create sample users"""
    users = [
        # Acme Corporation users
        User(
            email="admin@acme.com",
            username="admin_acme",
            hashed_password=get_password_hash("admin123"),
            first_name="John",
            last_name="Admin",
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE,
            organization_id=organizations[0].id,
            last_login=datetime.utcnow() - timedelta(hours=2)
        ),
        User(
            email="hr@acme.com",
            username="hr_manager_acme",
            hashed_password=get_password_hash("hr123"),
            first_name="Sarah",
            last_name="Johnson",
            role=UserRole.HR_MANAGER,
            status=UserStatus.ACTIVE,
            organization_id=organizations[0].id,
            last_login=datetime.utcnow() - timedelta(hours=1)
        ),
        User(
            email="recruiter@acme.com",
            username="recruiter_acme",
            hashed_password=get_password_hash("recruit123"),
            first_name="Mike",
            last_name="Wilson",
            role=UserRole.RECRUITER,
            status=UserStatus.ACTIVE,
            organization_id=organizations[0].id,
            last_login=datetime.utcnow() - timedelta(minutes=30)
        ),
        # TechStart Inc users
        User(
            email="ceo@techstart.io",
            username="ceo_techstart",
            hashed_password=get_password_hash("ceo123"),
            first_name="Alex",
            last_name="Chen",
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE,
            organization_id=organizations[1].id,
            last_login=datetime.utcnow() - timedelta(hours=4)
        ),
        User(
            email="hr@techstart.io",
            username="hr_techstart",
            hashed_password=get_password_hash("hr123"),
            first_name="Emma",
            last_name="Davis",
            role=UserRole.HR_MANAGER,
            status=UserStatus.ACTIVE,
            organization_id=organizations[1].id,
            last_login=datetime.utcnow() - timedelta(hours=1)
        ),
        # Small Business LLC users
        User(
            email="owner@smallbiz.com",
            username="owner_smallbiz",
            hashed_password=get_password_hash("owner123"),
            first_name="Robert",
            last_name="Brown",
            role=UserRole.ADMIN,
            status=UserStatus.ACTIVE,
            organization_id=organizations[2].id,
            last_login=datetime.utcnow() - timedelta(days=1)
        )
    ]
    
    for user in users:
        session.add(user)
    session.commit()
    return users

def seed_candidates(session, organizations, users):
    """Create sample candidates"""
    candidates = [
        # Acme Corporation candidates
        Candidate(
            email="john.doe@email.com",
            first_name="John",
            last_name="Doe",
            phone="+1-555-1001",
            date_of_birth=datetime(1990, 5, 15),
            address="123 Oak St, New York, NY 10002",
            consent_given=True,
            consent_date=datetime.utcnow() - timedelta(days=5),
            organization_id=organizations[0].id,
            created_by_user_id=users[2].id  # recruiter
        ),
        Candidate(
            email="jane.smith@email.com",
            first_name="Jane",
            last_name="Smith",
            phone="+1-555-1002",
            date_of_birth=datetime(1988, 8, 22),
            address="456 Pine Ave, New York, NY 10003",
            consent_given=True,
            consent_date=datetime.utcnow() - timedelta(days=3),
            organization_id=organizations[0].id,
            created_by_user_id=users[1].id  # hr_manager
        ),
        # TechStart Inc candidates
        Candidate(
            email="alex.garcia@email.com",
            first_name="Alex",
            last_name="Garcia",
            phone="+1-555-2001",
            date_of_birth=datetime(1992, 3, 10),
            address="789 Tech Blvd, San Francisco, CA 94106",
            consent_given=True,
            consent_date=datetime.utcnow() - timedelta(days=2),
            organization_id=organizations[1].id,
            created_by_user_id=users[4].id  # hr_techstart
        ),
        Candidate(
            email="maria.rodriguez@email.com",
            first_name="Maria",
            last_name="Rodriguez",
            phone="+1-555-2002",
            date_of_birth=datetime(1985, 11, 5),
            address="321 Startup St, San Francisco, CA 94107",
            consent_given=True,
            consent_date=datetime.utcnow() - timedelta(days=1),
            organization_id=organizations[1].id,
            created_by_user_id=users[4].id  # hr_techstart
        ),
        # Small Business LLC candidates
        Candidate(
            email="david.lee@email.com",
            first_name="David",
            last_name="Lee",
            phone="+1-555-3001",
            date_of_birth=datetime(1995, 7, 18),
            address="654 Local Rd, Austin, TX 78702",
            consent_given=True,
            consent_date=datetime.utcnow() - timedelta(hours=12),
            organization_id=organizations[2].id,
            created_by_user_id=users[5].id  # owner_smallbiz
        )
    ]
    
    for candidate in candidates:
        session.add(candidate)
    session.commit()
    return candidates

def seed_background_checks(session, candidates, users):
    """Create sample background checks"""
    background_checks = [
        BackgroundCheck(
            candidate_id=candidates[0].id,
            created_by_user_id=users[2].id,  # recruiter
            status=CheckStatus.COMPLETED,
            criminal_check=True,
            education_verification=True,
            employment_verification=True,
            identity_verification=True,
            social_media_check=False,
            started_at=datetime.utcnow() - timedelta(days=5),
            completed_at=datetime.utcnow() - timedelta(days=1)
        ),
        BackgroundCheck(
            candidate_id=candidates[1].id,
            created_by_user_id=users[1].id,  # hr_manager
            status=CheckStatus.IN_PROGRESS,
            criminal_check=True,
            education_verification=True,
            employment_verification=False,
            identity_verification=True,
            social_media_check=True,
            started_at=datetime.utcnow() - timedelta(days=3)
        ),
        BackgroundCheck(
            candidate_id=candidates[2].id,
            created_by_user_id=users[4].id,  # hr_techstart
            status=CheckStatus.PENDING,
            criminal_check=True,
            education_verification=True,
            employment_verification=True,
            identity_verification=True,
            social_media_check=True
        ),
        BackgroundCheck(
            candidate_id=candidates[3].id,
            created_by_user_id=users[4].id,  # hr_techstart
            status=CheckStatus.COMPLETED,
            criminal_check=True,
            education_verification=True,
            employment_verification=True,
            identity_verification=True,
            social_media_check=True,
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(hours=6)
        ),
        BackgroundCheck(
            candidate_id=candidates[4].id,
            created_by_user_id=users[5].id,  # owner_smallbiz
            status=CheckStatus.PENDING,
            criminal_check=True,
            education_verification=False,
            employment_verification=False,
            identity_verification=True,
            social_media_check=False
        )
    ]
    
    for check in background_checks:
        session.add(check)
    session.commit()
    return background_checks

def seed_check_results(session, background_checks):
    """Create sample check results"""
    check_results = [
        # Results for first background check (completed)
        CheckResult(
            background_check_id=background_checks[0].id,
            check_type=CheckType.CRIMINAL,
            status=ResultStatus.PASS,
            result_data='{"records_found": 0, "verification_date": "2024-01-15"}',
            started_at=datetime.utcnow() - timedelta(days=5),
            completed_at=datetime.utcnow() - timedelta(days=4)
        ),
        CheckResult(
            background_check_id=background_checks[0].id,
            check_type=CheckType.EDUCATION,
            status=ResultStatus.PASS,
            result_data='{"degree_verified": true, "institution": "University of California", "graduation_year": 2012}',
            started_at=datetime.utcnow() - timedelta(days=5),
            completed_at=datetime.utcnow() - timedelta(days=4)
        ),
        CheckResult(
            background_check_id=background_checks[0].id,
            check_type=CheckType.EMPLOYMENT,
            status=ResultStatus.PASS,
            result_data='{"previous_employer": "Tech Corp", "employment_dates": "2012-2020", "position": "Software Engineer"}',
            started_at=datetime.utcnow() - timedelta(days=5),
            completed_at=datetime.utcnow() - timedelta(days=4)
        ),
        CheckResult(
            background_check_id=background_checks[0].id,
            check_type=CheckType.IDENTITY,
            status=ResultStatus.PASS,
            result_data='{"identity_verified": true, "verification_method": "government_id"}',
            started_at=datetime.utcnow() - timedelta(days=5),
            completed_at=datetime.utcnow() - timedelta(days=4)
        ),
        # Results for second background check (in progress)
        CheckResult(
            background_check_id=background_checks[1].id,
            check_type=CheckType.CRIMINAL,
            status=ResultStatus.PASS,
            result_data='{"records_found": 0, "verification_date": "2024-01-16"}',
            started_at=datetime.utcnow() - timedelta(days=3),
            completed_at=datetime.utcnow() - timedelta(days=2)
        ),
        CheckResult(
            background_check_id=background_checks[1].id,
            check_type=CheckType.EDUCATION,
            status=ResultStatus.PASS,
            result_data='{"degree_verified": true, "institution": "Stanford University", "graduation_year": 2015}',
            started_at=datetime.utcnow() - timedelta(days=3),
            completed_at=datetime.utcnow() - timedelta(days=2)
        ),
        CheckResult(
            background_check_id=background_checks[1].id,
            check_type=CheckType.IDENTITY,
            status=ResultStatus.PASS,
            result_data='{"identity_verified": true, "verification_method": "government_id"}',
            started_at=datetime.utcnow() - timedelta(days=3),
            completed_at=datetime.utcnow() - timedelta(days=2)
        ),
        CheckResult(
            background_check_id=background_checks[1].id,
            check_type=CheckType.SOCIAL_MEDIA,
            status=ResultStatus.PENDING,
            started_at=datetime.utcnow() - timedelta(days=1)
        ),
        # Results for fourth background check (completed)
        CheckResult(
            background_check_id=background_checks[3].id,
            check_type=CheckType.CRIMINAL,
            status=ResultStatus.PASS,
            result_data='{"records_found": 0, "verification_date": "2024-01-17"}',
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(days=1)
        ),
        CheckResult(
            background_check_id=background_checks[3].id,
            check_type=CheckType.EDUCATION,
            status=ResultStatus.PASS,
            result_data='{"degree_verified": true, "institution": "MIT", "graduation_year": 2018}',
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(days=1)
        ),
        CheckResult(
            background_check_id=background_checks[3].id,
            check_type=CheckType.EMPLOYMENT,
            status=ResultStatus.PASS,
            result_data='{"previous_employer": "StartupXYZ", "employment_dates": "2018-2023", "position": "Senior Developer"}',
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(days=1)
        ),
        CheckResult(
            background_check_id=background_checks[3].id,
            check_type=CheckType.IDENTITY,
            status=ResultStatus.PASS,
            result_data='{"identity_verified": true, "verification_method": "government_id"}',
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(days=1)
        ),
        CheckResult(
            background_check_id=background_checks[3].id,
            check_type=CheckType.SOCIAL_MEDIA,
            status=ResultStatus.PASS,
            result_data='{"profiles_checked": ["linkedin", "twitter"], "red_flags": 0}',
            started_at=datetime.utcnow() - timedelta(days=2),
            completed_at=datetime.utcnow() - timedelta(days=1)
        )
    ]
    
    for result in check_results:
        session.add(result)
    session.commit()
    return check_results

def seed_reports(session, candidates, background_checks, users):
    """Create sample reports"""
    reports = [
        Report(
            candidate_id=candidates[0].id,
            background_check_id=background_checks[0].id,
            created_by_user_id=users[1].id,  # hr_manager
            title="Comprehensive Background Check Report - John Doe",
            report_type=ReportType.COMPREHENSIVE,
            status=ReportStatus.GENERATED,
            summary="All background checks completed successfully. No issues found.",
            findings='{"criminal": "CLEAR", "education": "VERIFIED", "employment": "VERIFIED", "identity": "VERIFIED"}',
            recommendations="Candidate is cleared for employment.",
            report_data='{"overall_status": "APPROVED", "risk_level": "LOW"}',
            is_delivered=True,
            delivered_at=datetime.utcnow() - timedelta(hours=12),
            delivery_method="email",
            generated_at=datetime.utcnow() - timedelta(hours=12)
        ),
        Report(
            candidate_id=candidates[3].id,
            background_check_id=background_checks[3].id,
            created_by_user_id=users[4].id,  # hr_techstart
            title="Background Check Report - Maria Rodriguez",
            report_type=ReportType.COMPREHENSIVE,
            status=ReportStatus.GENERATED,
            summary="Background check completed with excellent results.",
            findings='{"criminal": "CLEAR", "education": "VERIFIED", "employment": "VERIFIED", "identity": "VERIFIED", "social_media": "CLEAR"}',
            recommendations="Highly recommended for the position.",
            report_data='{"overall_status": "APPROVED", "risk_level": "LOW", "score": 95}',
            is_delivered=False,
            generated_at=datetime.utcnow() - timedelta(hours=6)
        ),
        Report(
            candidate_id=candidates[1].id,
            background_check_id=background_checks[1].id,
            created_by_user_id=users[1].id,  # hr_manager
            title="Draft Report - Jane Smith",
            report_type=ReportType.COMPREHENSIVE,
            status=ReportStatus.DRAFT,
            summary="Background check in progress. Criminal and education checks completed.",
            findings='{"criminal": "CLEAR", "education": "VERIFIED", "employment": "PENDING", "identity": "VERIFIED", "social_media": "PENDING"}',
            recommendations="Awaiting completion of remaining checks.",
            is_delivered=False
        )
    ]
    
    for report in reports:
        session.add(report)
    session.commit()
    return reports

def main():
    """Main function to seed all data"""
    print("🌱 Starting database seeding...")
    
    # Create tables
    print("📋 Creating database tables...")
    create_tables()
    
    # Create database session
    session = SessionLocal()
    
    try:
        # Seed data
        print("🏢 Creating organizations...")
        organizations = seed_organizations(session)
        print(f"✅ Created {len(organizations)} organizations")
        
        print("👥 Creating users...")
        users = seed_users(session, organizations)
        print(f"✅ Created {len(users)} users")
        
        print("👤 Creating candidates...")
        candidates = seed_candidates(session, organizations, users)
        print(f"✅ Created {len(candidates)} candidates")
        
        print("🔍 Creating background checks...")
        background_checks = seed_background_checks(session, candidates, users)
        print(f"✅ Created {len(background_checks)} background checks")
        
        print("📊 Creating check results...")
        check_results = seed_check_results(session, background_checks)
        print(f"✅ Created {len(check_results)} check results")
        
        print("📄 Creating reports...")
        reports = seed_reports(session, candidates, background_checks, users)
        print(f"✅ Created {len(reports)} reports")
        
        print("🎉 Database seeding completed successfully!")
        print("\n📊 Summary:")
        print(f"   Organizations: {len(organizations)}")
        print(f"   Users: {len(users)}")
        print(f"   Candidates: {len(candidates)}")
        print(f"   Background Checks: {len(background_checks)}")
        print(f"   Check Results: {len(check_results)}")
        print(f"   Reports: {len(reports)}")
        
        print("\n🔑 Sample login credentials:")
        print("   Admin (Acme): admin@acme.com / admin123")
        print("   HR Manager (Acme): hr@acme.com / hr123")
        print("   Recruiter (Acme): recruiter@acme.com / recruit123")
        print("   CEO (TechStart): ceo@techstart.io / ceo123")
        print("   Owner (SmallBiz): owner@smallbiz.com / owner123")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        session.rollback()
        raise
    finally:
        session.close()

if __name__ == "__main__":
    main()

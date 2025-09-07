# Database Setup Guide

This guide will help you set up the PostgreSQL database for the Background Check System.

## Prerequisites

- Python 3.8+
- PostgreSQL 12+
- Virtual environment (recommended)

## Quick Setup

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download and install from https://www.postgresql.org/download/windows/
   ```

2. **Create the database**:
   ```bash
   createdb background_check_db
   ```

3. **Set up Python environment**:
   ```bash
   cd api
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Configure database connection**:
   Update the `DATABASE_URL` in `alembic.ini` with your PostgreSQL credentials:
   ```ini
   sqlalchemy.url = postgresql+psycopg://username:password@localhost:5432/background_check_db
   ```

5. **Run the setup script**:
   ```bash
   python setup_db.py
   ```

## Manual Setup

If you prefer to run the commands manually:

1. **Run migrations**:
   ```bash
   alembic upgrade head
   ```

2. **Seed the database**:
   ```bash
   python seed_data.py
   ```

## Database Schema

The system includes the following tables:

### Core Tables
- **organizations** - Company/tenant information
- **users** - System users (admin, HR, recruiters)
- **candidates** - Job candidates being checked

### Background Check Tables
- **background_checks** - Main background check records
- **check_results** - Individual check results (criminal, education, etc.)
- **reports** - Generated background check reports

### Key Relationships
- Users belong to Organizations
- Candidates belong to Organizations and are created by Users
- Background Checks are created for Candidates by Users
- Check Results belong to Background Checks
- Reports are generated from Background Checks

## Sample Data

The seed script creates:
- 3 organizations (Acme Corp, TechStart Inc, Small Business LLC)
- 6 users with different roles
- 5 candidates
- 5 background checks with various statuses
- Multiple check results
- 3 sample reports

## Sample Login Credentials

- **Admin (Acme)**: admin@acme.com / admin123
- **HR Manager (Acme)**: hr@acme.com / hr123
- **Recruiter (Acme)**: recruiter@acme.com / recruit123
- **CEO (TechStart)**: ceo@techstart.io / ceo123
- **Owner (SmallBiz)**: owner@smallbiz.com / owner123

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL is running: `pg_ctl status`
- Check if the database exists: `psql -l | grep background_check_db`
- Verify credentials in `alembic.ini`

### Migration Issues
- Reset migrations: `alembic downgrade base && alembic upgrade head`
- Check migration files in `alembic/versions/`

### Permission Issues
- Ensure your user has CREATE privileges on the database
- Check PostgreSQL logs for detailed error messages

## Development

For development, you can reset the database anytime:
```bash
# Drop and recreate
dropdb background_check_db
createdb background_check_db
python setup_db.py
```

## Production Considerations

- Use environment variables for database credentials
- Set up proper database backups
- Configure connection pooling
- Use SSL connections in production
- Set up monitoring and logging

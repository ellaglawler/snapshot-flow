#!/usr/bin/env python3
"""
Database setup script for the background check system.
This script will create the database tables and seed them with sample data.
"""

import os
import sys
import subprocess
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"   Error: {e.stderr}")
        return False

def main():
    """Main setup function"""
    print("🚀 Setting up database for Background Check System")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("alembic.ini"):
        print("❌ Please run this script from the api directory")
        sys.exit(1)
    
    # Activate virtual environment and run migrations
    venv_python = "venv/bin/python" if os.path.exists("venv") else "python3"
    
    # Note: This assumes PostgreSQL is running and configured
    # In a real setup, you would need to:
    # 1. Install and start PostgreSQL
    # 2. Create the database
    # 3. Update the connection string in alembic.ini
    
    print("\n📋 Database Setup Instructions:")
    print("1. Install PostgreSQL if not already installed")
    print("2. Start PostgreSQL service")
    print("3. Create database: createdb background_check_db")
    print("4. Update DATABASE_URL in alembic.ini with your credentials")
    print("5. Run: python setup_db.py")
    
    # Check if database is accessible
    print("\n🔍 Checking database connection...")
    try:
        from app.core.database import engine
        with engine.connect() as conn:
            print("✅ Database connection successful")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        print("\nPlease ensure PostgreSQL is running and the database is created.")
        print("You can create the database with: createdb background_check_db")
        return
    
    # Run migrations
    if not run_command(f"{venv_python} -m alembic upgrade head", "Running database migrations"):
        return
    
    # Seed data
    if not run_command(f"{venv_python} seed_data.py", "Seeding database with sample data"):
        return
    
    print("\n🎉 Database setup completed successfully!")
    print("\nNext steps:")
    print("1. Start the API server: python main.py")
    print("2. Start the frontend: cd ../frontend && npm run dev")
    print("3. Access the application at http://localhost:3000")

if __name__ == "__main__":
    main()

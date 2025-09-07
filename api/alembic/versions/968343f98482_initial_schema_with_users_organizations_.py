"""Initial schema with users, organizations, candidates, background checks, check results, and reports

Revision ID: 968343f98482
Revises: 
Create Date: 2025-09-07 18:17:22.173341

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '968343f98482'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create organizations table
    op.create_table('organizations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('domain', sa.String(), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('website', sa.String(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.Column('plan_type', sa.String(), nullable=True),
        sa.Column('max_users', sa.Integer(), nullable=True),
        sa.Column('max_candidates_per_month', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_organizations_id'), 'organizations', ['id'], unique=False)
    op.create_index(op.f('ix_organizations_name'), 'organizations', ['name'], unique=False)
    op.create_index(op.f('ix_organizations_domain'), 'organizations', ['domain'], unique=True)

    # Create users table
    op.create_table('users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('username', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('role', sa.Enum('ADMIN', 'HR_MANAGER', 'RECRUITER', 'VIEWER', name='userrole'), nullable=True),
        sa.Column('status', sa.Enum('ACTIVE', 'INACTIVE', 'SUSPENDED', name='userstatus'), nullable=True),
        sa.Column('organization_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=True)

    # Create candidates table
    op.create_table('candidates',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('first_name', sa.String(), nullable=False),
        sa.Column('last_name', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('date_of_birth', sa.DateTime(), nullable=True),
        sa.Column('ssn', sa.String(), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('consent_given', sa.Boolean(), nullable=True),
        sa.Column('consent_date', sa.DateTime(), nullable=True),
        sa.Column('organization_id', sa.Integer(), nullable=False),
        sa.Column('created_by_user_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['organization_id'], ['organizations.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_candidates_id'), 'candidates', ['id'], unique=False)
    op.create_index(op.f('ix_candidates_email'), 'candidates', ['email'], unique=True)

    # Create background_checks table
    op.create_table('background_checks',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('candidate_id', sa.Integer(), nullable=False),
        sa.Column('created_by_user_id', sa.Integer(), nullable=False),
        sa.Column('status', sa.Enum('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', name='checkstatus'), nullable=True),
        sa.Column('criminal_check', sa.Boolean(), nullable=True),
        sa.Column('education_verification', sa.Boolean(), nullable=True),
        sa.Column('employment_verification', sa.Boolean(), nullable=True),
        sa.Column('identity_verification', sa.Boolean(), nullable=True),
        sa.Column('social_media_check', sa.Boolean(), nullable=True),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['candidate_id'], ['candidates.id'], ),
        sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_background_checks_id'), 'background_checks', ['id'], unique=False)

    # Create check_results table
    op.create_table('check_results',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('background_check_id', sa.Integer(), nullable=False),
        sa.Column('check_type', sa.Enum('CRIMINAL', 'EDUCATION', 'EMPLOYMENT', 'IDENTITY', 'SOCIAL_MEDIA', name='checktype'), nullable=False),
        sa.Column('status', sa.Enum('PASS', 'FAIL', 'PENDING', 'ERROR', name='resultstatus'), nullable=True),
        sa.Column('result_data', sa.Text(), nullable=True),
        sa.Column('error_message', sa.Text(), nullable=True),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['background_check_id'], ['background_checks.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_check_results_id'), 'check_results', ['id'], unique=False)

    # Create reports table
    op.create_table('reports',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('candidate_id', sa.Integer(), nullable=False),
        sa.Column('background_check_id', sa.Integer(), nullable=False),
        sa.Column('created_by_user_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('report_type', sa.Enum('COMPREHENSIVE', 'CRIMINAL_ONLY', 'EMPLOYMENT_ONLY', 'EDUCATION_ONLY', 'CUSTOM', name='reporttype'), nullable=True),
        sa.Column('status', sa.Enum('DRAFT', 'PENDING', 'GENERATED', 'DELIVERED', 'ARCHIVED', name='reportstatus'), nullable=True),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('findings', sa.Text(), nullable=True),
        sa.Column('recommendations', sa.Text(), nullable=True),
        sa.Column('report_data', sa.Text(), nullable=True),
        sa.Column('is_delivered', sa.Boolean(), nullable=True),
        sa.Column('delivered_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('delivery_method', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('generated_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['background_check_id'], ['background_checks.id'], ),
        sa.ForeignKeyConstraint(['candidate_id'], ['candidates.id'], ),
        sa.ForeignKeyConstraint(['created_by_user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reports_id'), 'reports', ['id'], unique=False)


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_index(op.f('ix_reports_id'), table_name='reports')
    op.drop_table('reports')
    op.drop_index(op.f('ix_check_results_id'), table_name='check_results')
    op.drop_table('check_results')
    op.drop_index(op.f('ix_background_checks_id'), table_name='background_checks')
    op.drop_table('background_checks')
    op.drop_index(op.f('ix_candidates_email'), table_name='candidates')
    op.drop_index(op.f('ix_candidates_id'), table_name='candidates')
    op.drop_table('candidates')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_organizations_domain'), table_name='organizations')
    op.drop_index(op.f('ix_organizations_name'), table_name='organizations')
    op.drop_index(op.f('ix_organizations_id'), table_name='organizations')
    op.drop_table('organizations')
    
    # Drop enums
    op.execute('DROP TYPE IF EXISTS reportstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS reporttype CASCADE')
    op.execute('DROP TYPE IF EXISTS resultstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS checktype CASCADE')
    op.execute('DROP TYPE IF EXISTS checkstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS userstatus CASCADE')
    op.execute('DROP TYPE IF EXISTS userrole CASCADE')

from celery import Celery
from celery.schedules import crontab
import os
from dotenv import load_dotenv

load_dotenv()

# Create Celery instance
celery_app = Celery(
    "background_check_worker",
    broker=os.getenv("REDIS_URL", "redis://localhost:6379"),
    backend=os.getenv("REDIS_URL", "redis://localhost:6379"),
    include=["worker.tasks"]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Periodic tasks
celery_app.conf.beat_schedule = {
    "process-pending-checks": {
        "task": "worker.tasks.process_pending_checks",
        "schedule": crontab(minute="*/5"),  # Every 5 minutes
    },
    "cleanup-old-results": {
        "task": "worker.tasks.cleanup_old_results",
        "schedule": crontab(hour=2, minute=0),  # Daily at 2 AM
    },
}

if __name__ == "__main__":
    celery_app.start()

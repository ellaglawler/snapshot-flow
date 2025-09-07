from fastapi import APIRouter
from app.api.v1.endpoints import candidates, background_checks

api_router = APIRouter()

api_router.include_router(
    candidates.router, prefix="/candidates", tags=["candidates"]
)
api_router.include_router(
    background_checks.router, prefix="/background-checks", tags=["background-checks"]
)

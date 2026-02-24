from fastapi import APIRouter

from app.core.schemas import ApiResponse

router = APIRouter(prefix='/cron', tags=['cron'])


@router.get('/health', response_model=ApiResponse[dict])
def cron_health() -> ApiResponse[dict]:
    return ApiResponse(data={'status': 'ok'})

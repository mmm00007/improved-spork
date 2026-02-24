from fastapi import APIRouter

from app.core.schemas import ApiResponse

router = APIRouter(prefix='/analytics', tags=['analytics'])


@router.get('/health', response_model=ApiResponse[dict])
def analytics_health() -> ApiResponse[dict]:
    return ApiResponse(data={'status': 'ok'})

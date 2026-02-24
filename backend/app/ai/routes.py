from fastapi import APIRouter

from app.core.schemas import ApiResponse

router = APIRouter(prefix='/ai', tags=['ai'])


@router.get('/health', response_model=ApiResponse[dict])
def ai_health() -> ApiResponse[dict]:
    return ApiResponse(data={'status': 'ok'})

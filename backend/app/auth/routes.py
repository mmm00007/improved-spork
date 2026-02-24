from fastapi import APIRouter, Depends

from app.core.schemas import ApiResponse
from app.core.security import verify_jwt

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me", response_model=ApiResponse[dict])
def get_profile(token_payload: dict = Depends(verify_jwt)) -> ApiResponse[dict]:
    return ApiResponse(data={"user": token_payload})

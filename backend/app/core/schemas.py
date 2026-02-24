from typing import Generic, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")


class ApiError(BaseModel):
    code: str = Field(description="Stable, frontend-consumable machine error code")
    message: str = Field(description="User-displayable summary")
    details: Optional[dict] = None


class ApiResponse(BaseModel, Generic[T]):
    data: Optional[T] = None
    error: Optional[ApiError] = None

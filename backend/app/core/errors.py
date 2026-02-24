from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

from .schemas import ApiError, ApiResponse


def install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(HTTPException)
    async def http_exception_handler(_: Request, exc: HTTPException) -> JSONResponse:
        error = ApiError(code=f"http_{exc.status_code}", message=str(exc.detail))
        return JSONResponse(status_code=exc.status_code, content=ApiResponse(error=error).model_dump())

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(_: Request, exc: Exception) -> JSONResponse:
        error = ApiError(code="internal_server_error", message="Unexpected server error", details={"error": str(exc)})
        return JSONResponse(status_code=500, content=ApiResponse(error=error).model_dump())

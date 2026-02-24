import logging

from fastapi import FastAPI

from app.ai.routes import router as ai_router
from app.analytics.routes import router as analytics_router
from app.auth.routes import router as auth_router
from app.core.errors import install_error_handlers
from app.core.middleware import RequestLoggingMiddleware
from app.cron.routes import router as cron_router

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="IronTracker API", version="0.1.0")
app.add_middleware(RequestLoggingMiddleware)

install_error_handlers(app)

app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(analytics_router)
app.include_router(cron_router)


@app.get('/healthz')
def healthz() -> dict:
    return {'status': 'ok'}

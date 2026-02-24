from functools import lru_cache

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient

from .config import settings

security = HTTPBearer(auto_error=False)


@lru_cache(maxsize=1)
def get_jwks_client() -> PyJWKClient:
    return PyJWKClient(settings.supabase_jwks_url)


def verify_jwt(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(status_code=401, detail="Missing bearer token")

    token = credentials.credentials

    try:
        signing_key = get_jwks_client().get_signing_key_from_jwt(token)
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=settings.jwt_audience,
            options={"verify_exp": True},
        )
        return payload
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc

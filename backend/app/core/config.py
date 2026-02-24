from pydantic import BaseModel


class Settings(BaseModel):
    supabase_url: str = "https://example.supabase.co"
    supabase_jwks_url: str = "https://example.supabase.co/auth/v1/.well-known/jwks.json"
    jwt_audience: str = "authenticated"


settings = Settings()

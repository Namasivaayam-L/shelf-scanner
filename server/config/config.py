import os
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from slowapi import _rate_limit_exceeded_handler

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

def setup_middleware(app):
    """Setup all middleware for the FastAPI application."""
    
    # Add security headers middleware
    app.add_middleware(SecurityHeadersMiddleware)

    # Set up rate limiting
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Add Trusted Host middleware
    trusted_hosts = os.getenv("TRUSTED_HOSTS", "*").split(",")
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=trusted_hosts)

    # Add CORS middleware with environment-driven settings
    allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost,http://localhost:3000,http://localhost:5173").split(",")
    allow_credentials = os.getenv("ALLOW_CREDENTIALS", "true").lower() == "true"
    allow_methods = os.getenv("ALLOW_METHODS", "*").split(",")
    allow_headers = os.getenv("ALLOW_HEADERS", "*").split(",")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=allow_credentials,
        allow_methods=allow_methods,
        allow_headers=allow_headers,
    )

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Middleware to add security headers to responses."""
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=3153600; includeSubDomains"
        return response

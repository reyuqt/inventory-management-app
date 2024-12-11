# backend/app/middleware/logging_middleware.py

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from app.core.logger import logger
import time

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Incoming request: {request.method} {request.url}")
        start_time = time.time()

        try:
            response: Response = await call_next(request)
        except Exception as e:
            logger.error(f"Unhandled exception: {e}", exc_info=True)
            raise e

        process_time = time.time() - start_time
        logger.info(
            f"Outgoing response: {response.status_code} completed in {process_time:.4f}s"
        )
        return response

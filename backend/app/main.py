from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import create_db_and_tables, SessionLocal
import app.models
from app.api.ai import router as ai_router
from app.api.auth import router as auth_router
from app.services.auth import ensure_default_users

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/favicon.ico")
def favicon() -> Response:
    return Response(status_code=204)


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()
    db = SessionLocal()
    try:
        ensure_default_users(db)
    finally:
        db.close()


app.include_router(ai_router)
app.include_router(auth_router)

from fastapi import APIRouter

from app.schemas.ai import GenerateRequest, GenerateResponse
from app.services.gemini import generate_text

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/generate", response_model=GenerateResponse)
def generate(request: GenerateRequest) -> GenerateResponse:
    output = generate_text(request.prompt, request.model or "gemini-1.5-pro")
    return GenerateResponse(output=output)

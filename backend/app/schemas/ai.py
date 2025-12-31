from pydantic import BaseModel


class GenerateRequest(BaseModel):
    prompt: str
    model: str | None = None


class GenerateResponse(BaseModel):
    output: str | None
    provider: str = "gemini"

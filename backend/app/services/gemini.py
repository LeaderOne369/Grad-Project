from typing import Optional

import google.generativeai as genai

from app.core.config import settings

_client_ready = False


def _ensure_client() -> None:
    global _client_ready
    if _client_ready:
        return
    if settings.gemini_api_key:
        genai.configure(api_key=settings.gemini_api_key)
    _client_ready = True


def generate_text(prompt: str, model_name: str = "gemini-1.5-pro") -> Optional[str]:
    _ensure_client()
    if not settings.gemini_api_key:
        return None
    model = genai.GenerativeModel(model_name)
    response = model.generate_content(prompt)
    return response.text

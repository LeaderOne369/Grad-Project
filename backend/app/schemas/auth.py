from pydantic import BaseModel, Field, ConfigDict


class RegisterRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    username: str
    password: str
    display_name: str = Field(alias="displayName")
    role: str


class LoginRequest(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: int
    username: str
    display_name: str = Field(alias="displayName")
    role: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

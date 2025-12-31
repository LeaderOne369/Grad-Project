from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Gozu Backend"
    app_env: str = "local"
    gemini_api_key: str = ""
    database_url: str = "mysql+pymysql://root:123456@localhost:3306/gozu?charset=utf8mb4"
    jwt_secret_key: str = "change_me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 1440

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

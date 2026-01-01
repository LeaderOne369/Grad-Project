from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DEFAULT_USERS = [
    {
        "username": "creator",
        "display_name": "星图设计者",
        "role": "creator",
        "password": "123456",
    },
    {
        "username": "manufacturer",
        "display_name": "匠造制造商",
        "role": "manufacturer",
        "password": "123456",
    },
    {
        "username": "buyer",
        "display_name": "漫游购买者",
        "role": "buyer",
        "password": "123456",
    },
    {
        "username": "admin",
        "display_name": "系统管理员",
        "role": "admin",
        "password": "123456",
    },
]


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(payload: dict) -> str:
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes)
    to_encode = {**payload, "exp": expire}
    return jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()


def ensure_default_users(db: Session) -> None:
    for entry in DEFAULT_USERS:
        existing = get_user_by_username(db, entry["username"])
        if existing:
            continue
        user = User(
            username=entry["username"],
            display_name=entry["display_name"],
            role=entry["role"],
            hashed_password=hash_password(entry["password"]),
        )
        db.add(user)
    db.commit()


def register_user(db: Session, username: str, password: str, display_name: str, role: str) -> User:
    existing = get_user_by_username(db, username)
    if existing:
        raise ValueError("用户名已存在")
    user = User(
        username=username,
        display_name=display_name,
        role=role,
        hashed_password=hash_password(password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, username: str, password: str) -> User:
    user = get_user_by_username(db, username)
    if not user or not verify_password(password, user.hashed_password):
        raise ValueError("账号或密码错误")
    return user

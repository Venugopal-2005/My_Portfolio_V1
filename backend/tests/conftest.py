
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient

from app.main import app
from app.database import Base, get_db
from app.services.data_seeder import seed_database_if_empty


# Isolated in-memory SQLite database for tests
TEST_DATABASE_URL = "sqlite://"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=test_engine,
)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=test_engine)

    db = TestingSessionLocal()
    try:
        seed_database_if_empty(db)
    finally:
        db.close()

    app.dependency_overrides[get_db] = override_get_db

    yield

    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as test_client:
        yield test_client

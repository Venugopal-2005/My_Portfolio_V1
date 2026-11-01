import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.services.data_seeder import seed_database_if_empty
from app.routes import (
    profile_router,
    projects_router,
    experience_router,
    skills_router,
    certifications_router,
    achievements_router,
    contact_router,
    resume_router,
    inference_router,
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("portfolio_app")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event: Initialize DB schema and seed baseline data."""
    logger.info("Initializing database schema...")
    Base.metadata.create_all(bind=engine)
    
    logger.info("Verifying seed data...")
    db = SessionLocal()
    try:
        seed_database_if_empty(db)
    finally:
        db.close()
        
    logger.info("Portfolio API startup complete. Ready to receive requests.")
    yield
    logger.info("Shutting down Portfolio API...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Production-grade Python Full-Stack Developer & AI/ML Engineer Portfolio REST API. "
        "Provides structured endpoints for developer profile, projects, skills, experience, "
        "certifications, contact form submissions, and live ML/CV model inference."
    ),
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api
app.include_router(profile_router, prefix=settings.API_V1_STR)
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(experience_router, prefix=settings.API_V1_STR)
app.include_router(skills_router, prefix=settings.API_V1_STR)
app.include_router(certifications_router, prefix=settings.API_V1_STR)
app.include_router(achievements_router, prefix=settings.API_V1_STR)
app.include_router(contact_router, prefix=settings.API_V1_STR)
app.include_router(resume_router, prefix=settings.API_V1_STR)
app.include_router(inference_router, prefix=settings.API_V1_STR)

# Mount certificates directory if it exists for asset previews
workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
certs_path = os.path.join(workspace_root, "my certificates and achievements")
if os.path.exists(certs_path):
    app.mount("/static/certificates", StaticFiles(directory=certs_path), name="certificates")

images_path = os.path.join(workspace_root, "images")
if os.path.exists(images_path):
    app.mount("/static/images", StaticFiles(directory=images_path), name="images")


@app.get("/api/health", tags=["Health"])
def health_check():
    """System health check and diagnostic status."""
    return {
        "status": "healthy",
        "service": "Venugopal K Portfolio API",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }


@app.get("/api", tags=["General"])
def api_root():
    """API overview and directory."""
    return {
        "message": "Welcome to Venugopal K's Python Full-Stack & AI/ML Portfolio API",
        "version": settings.VERSION,
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        },
        "endpoints": [
            "/api/profile",
            "/api/projects",
            "/api/experience",
            "/api/skills",
            "/api/certifications",
            "/api/achievements",
            "/api/contact",
            "/api/resume/download",
            "/api/inference/agrixai",
            "/api/inference/kidney-stone",
            "/api/inference/safety-access",
            "/api/health"
        ]
    }


# Mount built frontend if available
frontend_dist = os.path.join(workspace_root, "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")

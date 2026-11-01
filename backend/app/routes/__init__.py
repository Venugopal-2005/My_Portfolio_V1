from app.routes.profile import router as profile_router
from app.routes.projects import router as projects_router
from app.routes.experience import router as experience_router
from app.routes.skills import router as skills_router
from app.routes.certifications import router as certifications_router
from app.routes.achievements import router as achievements_router
from app.routes.contact import router as contact_router
from app.routes.resume import router as resume_router
from app.routes.inference import router as inference_router

__all__ = [
    "profile_router",
    "projects_router",
    "experience_router",
    "skills_router",
    "certifications_router",
    "achievements_router",
    "contact_router",
    "resume_router",
    "inference_router",
]

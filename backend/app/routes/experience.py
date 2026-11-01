from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.experience import Experience
from app.schemas.experience import ExperienceResponse

router = APIRouter(prefix="/experience", tags=["Experience"])


@router.get("", response_model=List[ExperienceResponse], summary="Get professional experience and internships")
def list_experience(db: Session = Depends(get_db)):
    experiences = db.query(Experience).order_by(Experience.display_order.asc()).all()
    return experiences

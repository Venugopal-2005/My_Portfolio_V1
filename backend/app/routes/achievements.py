from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.achievement import Achievement
from app.schemas.achievement import AchievementResponse

router = APIRouter(prefix="/achievements", tags=["Achievements"])


@router.get("", response_model=List[AchievementResponse], summary="List all achievements and recognitions")
def list_achievements(db: Session = Depends(get_db)):
    achievements = db.query(Achievement).order_by(Achievement.display_order.asc()).all()
    return achievements

from typing import List, Dict
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillItem, SkillsGroupedResponse

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("", response_model=SkillsGroupedResponse, summary="Get technical skills categorized")
def list_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).order_by(Skill.category.asc(), Skill.display_order.asc()).all()
    
    categories: Dict[str, List[SkillItem]] = {}
    all_items = []
    for s in skills:
        item = SkillItem.model_validate(s)
        all_items.append(item)
        if s.category not in categories:
            categories[s.category] = []
        categories[s.category].append(item)

    return SkillsGroupedResponse(
        categories=categories,
        all_skills=all_items
    )

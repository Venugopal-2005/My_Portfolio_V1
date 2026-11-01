from typing import List, Dict
from pydantic import BaseModel, ConfigDict


class SkillItem(BaseModel):
    id: int
    name: str
    category: str
    level: str
    badge_type: str
    display_order: int

    model_config = ConfigDict(from_attributes=True)


class SkillsGroupedResponse(BaseModel):
    categories: Dict[str, List[SkillItem]]
    all_skills: List[SkillItem]

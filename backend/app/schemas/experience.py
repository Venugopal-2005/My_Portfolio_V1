from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class ExperienceResponse(BaseModel):
    id: int
    title: str
    company: str
    organization_subtitle: Optional[str] = None
    period: str
    location: Optional[str] = None
    description: Optional[str] = None
    highlights: List[str]
    tech_tags: List[str]
    display_order: int

    model_config = ConfigDict(from_attributes=True)

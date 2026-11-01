from typing import Optional
from pydantic import BaseModel, ConfigDict


class AchievementResponse(BaseModel):
    id: int
    title: str
    organization: str
    year: Optional[str] = None
    category: str
    description: Optional[str] = None
    badge: Optional[str] = None
    display_order: int

    model_config = ConfigDict(from_attributes=True)

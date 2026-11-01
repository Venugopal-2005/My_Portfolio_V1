from typing import List, Optional
from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    slug: str
    title: str
    category: str
    summary: str
    description: str
    tech_stack: List[str]
    metrics: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    architecture_details: Optional[str] = None
    featured: bool = True
    display_order: int = 0


class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class ProjectFilterParams(BaseModel):
    category: Optional[str] = None
    tech: Optional[str] = None
    search: Optional[str] = None

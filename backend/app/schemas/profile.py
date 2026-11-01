from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr


class EducationItem(BaseModel):
    degree: str
    institution: str
    period: str
    score: str
    details: Optional[str] = None


class SocialLinks(BaseModel):
    github: str
    linkedin: str
    email: EmailStr


class ProfileResponse(BaseModel):
    name: str
    title: str
    subtitle: str
    identity: str
    summary: str
    location: str
    email: EmailStr
    phone: str
    github: str
    linkedin: str
    resume_url: str
    about_text: List[str]
    education: List[EducationItem]
    focus_areas: List[Dict[str, str]]

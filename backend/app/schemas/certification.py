from typing import Optional
from pydantic import BaseModel, ConfigDict


class CertificationResponse(BaseModel):
    id: int
    title: str
    issuer: str
    issue_date: Optional[str] = None
    category: str
    credential_url: Optional[str] = None
    filename: Optional[str] = None
    display_order: int

    model_config = ConfigDict(from_attributes=True)

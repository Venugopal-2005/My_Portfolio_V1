from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, field_validator


class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Sender's full name")
    email: EmailStr = Field(..., description="Valid sender email address")
    subject: str = Field(..., min_length=3, max_length=200, description="Subject of the message")
    message: str = Field(..., min_length=10, max_length=3000, description="Detailed message content")

    @field_validator("name", "subject", "message")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Field cannot be empty or only whitespace")
        return stripped


class ContactResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime
    status: str

    model_config = {"from_attributes": True}


class ContactSubmitSuccess(BaseModel):
    success: bool
    message: str
    submission_id: int

import logging
from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate, ContactResponse, ContactSubmitSuccess

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post(
    "",
    response_model=ContactSubmitSuccess,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a contact inquiry"
)
def submit_contact_form(payload: ContactCreate, db: Session = Depends(get_db)):
    """
    Validates the contact form submission, creates a persistent record in the database,
    and returns a success confirmation.
    """
    logger.info(f"Received contact submission from {payload.name} ({payload.email})")

    submission = ContactSubmission(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        status="unread"
    )

    db.add(submission)
    db.commit()
    db.refresh(submission)

    logger.info(f"Persisted contact submission with ID: {submission.id}")

    return ContactSubmitSuccess(
        success=True,
        message=f"Thank you, {payload.name}! Your message has been received and saved. I will get back to you shortly.",
        submission_id=submission.id
    )


@router.get("", response_model=List[ContactResponse], summary="List all contact messages (Admin/Audit)")
def list_contact_submissions(db: Session = Depends(get_db)):
    """Returns stored contact messages ordered by most recent."""
    submissions = db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).all()
    return submissions

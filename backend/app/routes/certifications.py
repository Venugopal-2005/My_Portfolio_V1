
import os
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.certification import Certification
from app.schemas.certification import CertificationResponse

router = APIRouter(prefix="/certifications", tags=["Certifications"])

CERTIFICATES_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..", "..", "..",
        "my certificates and achievements"
    )
)


@router.get(
    "",
    response_model=List[CertificationResponse],
    summary="List all certifications"
)
def list_certifications(db: Session = Depends(get_db)):
    certs = (
        db.query(Certification)
        .order_by(Certification.display_order.asc())
        .all()
    )
    return certs


@router.get(
    "/{cert_id}/download",
    summary="Download or view certificate file"
)
def download_certificate(
    cert_id: int,
    inline: bool = False,
    db: Session = Depends(get_db)
):
    cert = db.query(Certification).filter(
        Certification.id == cert_id
    ).first()

    if not cert or not cert.filename:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate record not found"
        )

    file_path = os.path.join(CERTIFICATES_DIR, cert.filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Certificate document file '{cert.filename}' not found on server"
        )

    ext = os.path.splitext(cert.filename)[1].lower()

    media_types = {
        ".pdf": "application/pdf",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg"
    }

    media_type = media_types.get(
        ext,
        "application/octet-stream"
    )

    if inline:
        return FileResponse(
            path=file_path,
            media_type=media_type,
            headers={
                "Content-Disposition": f'inline; filename="{cert.filename}"'
            }
        )

    return FileResponse(
        path=file_path,
        media_type=media_type,
        filename=cert.filename
    )

import os
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

router = APIRouter(prefix="/resume", tags=["Resume"])

RESUME_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "RESUME.pdf")
)


@router.get("/download", summary="Download official Resume PDF")
def download_resume():
    """Serves the latest official PDF resume."""
    if not os.path.exists(RESUME_PATH):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume document file not found on server"
        )

    return FileResponse(
        path=RESUME_PATH,
        media_type="application/pdf",
        filename="Venugopal_K_Resume.pdf"
    )

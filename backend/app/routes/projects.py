from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=List[ProjectResponse], summary="List all projects with filtering and search")
def list_projects(
    category: Optional[str] = Query(None, description="Filter by category (e.g. 'Machine Learning', 'AI / Computer Vision', 'Python Full Stack')"),
    tech: Optional[str] = Query(None, description="Filter by technology tag (e.g. 'FastAPI', 'Python', 'YOLO', 'React')"),
    search: Optional[str] = Query(None, description="Search term in project title, summary, or description"),
    db: Session = Depends(get_db)
):
    query = db.query(Project)

    if category and category.lower() != "all":
        query = query.filter(Project.category.ilike(f"%{category}%"))

    if tech:
        query = query.filter(Project.tech_stack_json.ilike(f"%{tech}%"))

    if search:
        search_filter = or_(
            Project.title.ilike(f"%{search}%"),
            Project.summary.ilike(f"%{search}%"),
            Project.description.ilike(f"%{search}%"),
            Project.tech_stack_json.ilike(f"%{search}%")
        )
        query = query.filter(search_filter)

    projects = query.order_by(Project.display_order.asc(), Project.id.asc()).all()
    return projects


@router.get("/{slug}", response_model=ProjectResponse, summary="Get project details by slug")
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with slug '{slug}' not found"
        )
    return project

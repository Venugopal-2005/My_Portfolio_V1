import json
from sqlalchemy import Column, Integer, String, Text, Boolean
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    summary = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    tech_stack_json = Column(Text, nullable=False, default="[]")
    metrics = Column(String(200), nullable=True)
    github_url = Column(String(500), nullable=True)
    live_url = Column(String(500), nullable=True)
    architecture_details = Column(Text, nullable=True)
    featured = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)

    @property
    def tech_stack(self):
        try:
            return json.loads(self.tech_stack_json)
        except Exception:
            return []

    @tech_stack.setter
    def tech_stack(self, value):
        self.tech_stack_json = json.dumps(value)

    def __repr__(self):
        return f"<Project slug='{self.slug}' title='{self.title}'>"

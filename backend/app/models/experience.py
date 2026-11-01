import json
from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    company = Column(String(200), nullable=False)
    organization_subtitle = Column(String(200), nullable=True)
    period = Column(String(100), nullable=False)
    location = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    highlights_json = Column(Text, nullable=False, default="[]")
    tech_tags_json = Column(Text, nullable=False, default="[]")
    display_order = Column(Integer, default=0)

    @property
    def highlights(self):
        try:
            return json.loads(self.highlights_json)
        except Exception:
            return []

    @highlights.setter
    def highlights(self, value):
        self.highlights_json = json.dumps(value)

    @property
    def tech_tags(self):
        try:
            return json.loads(self.tech_tags_json)
        except Exception:
            return []

    @tech_tags.setter
    def tech_tags(self, value):
        self.tech_tags_json = json.dumps(value)

    def __repr__(self):
        return f"<Experience title='{self.title}' company='{self.company}'>"

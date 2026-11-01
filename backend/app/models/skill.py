from sqlalchemy import Column, Integer, String
from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String(100), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    level = Column(String(50), default="Advanced")
    badge_type = Column(String(50), default="primary")
    display_order = Column(Integer, default=0)

    def __repr__(self):
        return f"<Skill name='{self.name}' category='{self.category}'>"

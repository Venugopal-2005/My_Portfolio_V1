from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(250), nullable=False)
    organization = Column(String(200), nullable=False)
    year = Column(String(50), nullable=True)
    category = Column(String(100), default="Hackathon", index=True)
    description = Column(Text, nullable=True)
    badge = Column(String(100), nullable=True)
    display_order = Column(Integer, default=0)

    def __repr__(self):
        return f"<Achievement title='{self.title}' org='{self.organization}'>"

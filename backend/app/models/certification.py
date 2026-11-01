from sqlalchemy import Column, Integer, String
from app.database import Base


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(250), nullable=False)
    issuer = Column(String(200), nullable=False)
    issue_date = Column(String(100), nullable=True)
    category = Column(String(100), default="Technical", index=True)
    credential_url = Column(String(500), nullable=True)
    filename = Column(String(300), nullable=True)
    display_order = Column(Integer, default=0)

    def __repr__(self):
        return f"<Certification title='{self.title}' issuer='{self.issuer}'>"

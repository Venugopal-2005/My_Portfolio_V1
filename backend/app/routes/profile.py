from fastapi import APIRouter
from app.schemas.profile import ProfileResponse, EducationItem

router = APIRouter(prefix="/profile", tags=["Profile"])

PROFILE_DATA = ProfileResponse(
    name="Venugopal K",
    title="Python Full-Stack Developer",
    subtitle="FastAPI • React • AI/ML • Computer Vision • PostgreSQL",
    identity="PYTHON FULL-STACK DEVELOPER | AI/ML ENGINEER | COMPUTER VISION ENTHUSIAST",
    summary=(
        "Final-year Computer Science engineering student with hands-on expertise in Python full-stack engineering, "
        "high-throughput REST API development with FastAPI, relational databases (PostgreSQL/SQLite), and edge AI/computer vision systems. "
        "Experienced in building predictive machine learning models, deploying computer vision pipelines (YOLO/OCR), and engineering maintainable web applications."
    ),
    location="Chennai / Bangalore, India",
    email="venu170305@gmail.com",
    phone="+91 9480249096",
    github="https://github.com/Venugopal-2005",
    linkedin="https://www.linkedin.com/in/venugopal-k-0bba49287/",
    resume_url="/api/resume/download",
    about_text=[
        "I am a B.Tech Computer Science student at SRM Institute of Science and Technology (Kattankulathur), driven by a deep passion for Python full-stack architecture, high-performance backends, and intelligent systems.",
        "My technical foundation is rooted in Python, FastAPI, SQLAlchemy, and modern React.js frontend development. I specialize in designing scalable RESTful APIs, clean database schemas, and microservice architectures.",
        "Beyond core backend engineering, I have substantial practical experience in Artificial Intelligence and Computer Vision. I built an automated vehicle safety and OCR access system during my internship at MSPL Limited and conducted empirical research on explainable agricultural AI (AgriXAI) shortlisted for Elsevier SSRN (Top 15%).",
        "My development philosophy focuses on clean, maintainable PEP 8 Python code, type-safe validation with Pydantic, modular service abstractions, and adopting production-ready patterns."
    ],
    education=[
        EducationItem(
            degree="Bachelor of Technology in Computer Science and Engineering",
            institution="SRM Institute of Science and Technology, Chennai",
            period="Aug 2023 – Aug 2027",
            score="CGPA: 8.45 / 10",
            details="Specialized coursework in Data Structures & Algorithms, Database Management Systems, Object Oriented Programming, Operating Systems, Machine Learning, and Computer Networks."
        ),
        EducationItem(
            degree="12th Grade (Pre-University - PCMB)",
            institution="Sri Guru PU College",
            period="2021 – 2023",
            score="82.6%",
            details="Physics, Chemistry, Mathematics, Biology stream."
        ),
        EducationItem(
            degree="10th Grade (Secondary School)",
            institution="Adarsha Vidyalaya",
            period="Completed 2021",
            score="87.84%",
            details="Distinction in Mathematics and Sciences."
        )
    ],
    focus_areas=[
        {
            "title": "Python Full-Stack",
            "description": "FastAPI, SQLAlchemy, Pydantic, Uvicorn, PostgreSQL, React.js, and REST APIs."
        },
        {
            "title": "AI & Machine Learning",
            "description": "Scikit-learn, Random Forest, Extra Trees, SHAP interpretability, feature engineering, and model evaluation."
        },
        {
            "title": "Computer Vision",
            "description": "OpenCV, YOLO object detection, OCR license plate parsing, and real-time inference."
        },
        {
            "title": "Database & DevOps",
            "description": "PostgreSQL, MySQL, SQLite, Docker containerization, Git/GitHub, and Swagger/OpenAPI."
        }
    ]
)


@router.get("", response_model=ProfileResponse, summary="Get full developer profile")
def get_profile():
    """Returns Venugopal's comprehensive profile, education, branding, and contact details."""
    return PROFILE_DATA

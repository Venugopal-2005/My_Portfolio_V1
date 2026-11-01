import json
from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.skill import Skill
from app.models.experience import Experience
from app.models.certification import Certification
from app.models.achievement import Achievement


def seed_database_if_empty(db: Session):
    """Seeds the SQLite / PostgreSQL database with Venugopal's verified portfolio data if empty."""
    
    # 1. Projects
    if db.query(Project).count() == 0:
        projects = [
            Project(
                slug="agrixai",
                title="AgriXAI – Empirical Study of Crop Yield Prediction & Explainability",
                category="Machine Learning / Explainable AI",
                summary="An explainable AI agricultural intelligence platform comparing 10 machine learning models across 19,689 records, achieving 98.75% R² with Random Forest and SHAP interpretability.",
                description=(
                    "AgriXAI addresses the lack of transparency in agricultural machine learning models by providing both highly accurate yield predictions "
                    "and transparent interpretability through SHapley Additive exPlanations (SHAP). The system processes comprehensive environmental, soil, "
                    "fertilizer, and rainfall telemetry. The research paper documenting this empirical evaluation was shortlisted for Elsevier SSRN (Top 15%) at ICICC 2027."
                ),
                tech_stack=["Python", "Scikit-learn", "Random Forest", "SHAP", "Pandas", "NumPy", "FastAPI"],
                metrics="Model Result: 98.75% R² Score | Top 15% Elsevier SSRN Shortlist",
                github_url="https://github.com/Venugopal-2005",
                live_url="https://github.com/Venugopal-2005",
                architecture_details=(
                    "Data Pipeline (Pandas/NumPy) -> Feature Engineering -> Model Ensembling (10 Models Benchmark: RF, XGBoost, CatBoost, LightGBM, GradientBoosting) -> "
                    "Selected Random Forest Regressor -> SHAP TreeExplainer -> REST API (FastAPI) -> Frontend Visualizations."
                ),
                featured=True,
                display_order=1
            ),
            Project(
                slug="kidney-stone",
                title="Kidney Stone Risk Prediction Using Machine Learning",
                category="Machine Learning / Healthcare",
                summary="A diagnostic healthcare model analyzing 4,000 patient records with 23 features, achieving 94.46% diagnostic accuracy using the Extra Trees Classifier.",
                description=(
                    "Developed a predictive healthcare intelligence platform to assess the risk of nephrolithiasis (kidney stones) from non-invasive urine physicochemical markers. "
                    "Conducted thorough Exploratory Data Analysis (EDA), correlation heatmaps, feature selection, and comparative model evaluation against Logistic Regression, SVM, and Random Forest, "
                    "achieving peak diagnostic precision with Extra Trees Classifier."
                ),
                tech_stack=["Python", "Scikit-learn", "Extra Trees Classifier", "Pandas", "Matplotlib", "Seaborn"],
                metrics="Model Result: 94.46% Accuracy | 4,000 Patient Records",
                github_url="https://github.com/Venugopal-2005/Kidney-Stone-prediction-using-ML",
                live_url="https://github.com/Venugopal-2005/Kidney-Stone-prediction-using-ML",
                architecture_details=(
                    "Urine Physicochemical Data -> EDA & Missing Imputation -> Feature Selection (calc, gravity, osmo, cond) -> "
                    "Extra Trees Classifier Training -> Precision/Recall/F1 Scoring -> REST API Risk Evaluation."
                ),
                featured=True,
                display_order=2
            ),
            Project(
                slug="vehicle-safety",
                title="Smart Employee Vehicle Safety & Access Control System",
                category="AI / Computer Vision",
                summary="An automated industrial access and security system utilizing YOLO object detection for helmet compliance and OCR for vehicle license plate recognition.",
                description=(
                    "Engineered during internship at MSPL Limited (Baldota Organization). The system automatically monitors gate entrances using computer vision. "
                    "It detects approaching two-wheelers, verifies rider helmet compliance in real-time, extracts license plate numbers via Optical Character Recognition (OCR), "
                    "queries the enterprise employee database, and controls the automated barrier gate while generating auditable security incident logs."
                ),
                tech_stack=["Python", "YOLO", "OpenCV", "OCR", "Object Detection", "Edge AI"],
                metrics="Industrial Deployment: Real-time 30+ FPS Inference & Automated Gate Control",
                github_url="https://github.com/Venugopal-2005/Smart-Employee-Safety-Management",
                live_url="https://github.com/Venugopal-2005/Smart-Employee-Safety-Management",
                architecture_details=(
                    "Video Feed Input -> YOLOv8/v11 Object Detection (Vehicle & Rider) -> Head ROI Helmet Classifier -> License Plate Localization -> "
                    "OCR Preprocessing & Character Recognition -> Employee DB Match -> Gate Control Signal & Audit Trail."
                ),
                featured=True,
                display_order=3
            ),
            Project(
                slug="attendance",
                title="AI Smart Attendance Management Platform",
                category="Python Full Stack / AI",
                summary="An intelligent automated attendance management platform combining React, FastAPI, OpenCV, and facial recognition workflows for real-time tracking.",
                description=(
                    "A production-ready full-stack attendance management system with biometric verification. Combines a responsive React dashboard with a high-throughput FastAPI backend. "
                    "Processes camera streams to compute 128-dimensional facial embedding vectors, performs cosine similarity matching against registered employee profiles, logs timestamps, "
                    "and offers exportable PDF/Excel compliance reports."
                ),
                tech_stack=["Python", "FastAPI", "React", "OpenCV", "Face Recognition", "SQLite"],
                metrics="Real-time Sub-second Facial Recognition & Automated Logging",
                github_url="https://github.com/Venugopal-2005/Smart-Attendance-Management-System",
                live_url="https://github.com/Venugopal-2005/Smart-Attendance-Management-System",
                architecture_details=(
                    "Webcam Stream -> OpenCV Frame Capture -> Facial Landmark Alignment -> Deep Neural Face Embeddings -> "
                    "FastAPI Attendance Endpoint -> SQLite/PostgreSQL Database -> React Interactive Admin Dashboard."
                ),
                featured=True,
                display_order=4
            ),
            Project(
                slug="hater-speech",
                title="Hate Speech & Toxic Content Detection Pipeline",
                category="Machine Learning / NLP",
                summary="A natural language processing pipeline to classify text data, detecting toxic, profanity-laden, and hate speech with high recall.",
                description=(
                    "Developed an automated NLP text classification pipeline for content moderation on social and enterprise collaboration platforms. "
                    "Implements text cleaning, regex tokenization, stopword removal, lemmatization, and TF-IDF n-gram vectorization, trained with comparative classification algorithms."
                ),
                tech_stack=["Python", "Scikit-learn", "NLP", "Pandas", "TF-IDF"],
                metrics="NLP Classification Pipeline with Multi-Class Toxic Text Filtering",
                github_url="https://github.com/Venugopal-2005/Hater-speech-Detection",
                live_url="https://github.com/Venugopal-2005/Hater-speech-Detection",
                architecture_details=(
                    "Text Input -> Preprocessing (Tokenize, Lowercase, Remove Punctuation) -> TF-IDF Vectorizer -> Classifier Model -> Sentiment & Toxicity Confidence Output."
                ),
                featured=True,
                display_order=5
            ),
            Project(
                slug="job-scheduler",
                title="Distributed Asynchronous Job Scheduler",
                category="Backend / Microservices",
                summary="A distributed task scheduling and background processing service built with FastAPI, Celery, Redis queue, and PostgreSQL persistent storage.",
                description=(
                    "Engineered a resilient distributed job scheduling engine capable of scheduling, executing, and monitoring recurrent and delayed background jobs. "
                    "Features worker heartbeat health tracking, automated failure retries with exponential backoff, persistent job logs in PostgreSQL, and Redis caching."
                ),
                tech_stack=["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "REST APIs"],
                metrics="Distributed Fault-Tolerant Job Scheduling with Automated Retries",
                github_url="https://github.com/Venugopal-2005/Distributed-Job-Scheduler",
                live_url="https://github.com/Venugopal-2005/Distributed-Job-Scheduler",
                architecture_details=(
                    "Client API Request -> FastAPI REST Route -> Redis Task Queue -> Celery Worker Pool -> State Management & Result Persistence in PostgreSQL."
                ),
                featured=True,
                display_order=6
            ),
            Project(
                slug="digital-banking",
                title="Global Digital Banking System",
                category="Python Full Stack",
                summary="Enterprise-oriented core banking microservices featuring API gateway routing, JWT authentication, and secure fund transfer simulation.",
                description=(
                    "Architected a comprehensive digital banking platform with strict transaction integrity and ACID compliance. Features JWT token authentication, "
                    "multi-account management, fund transfer simulations, audit logging, and Docker container orchestration."
                ),
                tech_stack=["Python", "FastAPI", "React", "PostgreSQL", "Docker", "JWT"],
                metrics="ACID-Compliant Transaction Ledger & JWT Bearer Security",
                github_url="https://github.com/Venugopal-2005/global-digital-banking-microservices-springboot",
                live_url="https://github.com/Venugopal-2005/global-digital-banking-microservices-springboot",
                architecture_details=(
                    "React Banking UI -> FastAPI API Gateway -> Auth Service (JWT) -> Account & Ledger Service -> PostgreSQL Storage -> Payment Simulation."
                ),
                featured=True,
                display_order=7
            ),
            Project(
                slug="raga-roads",
                title="Raga Roads Microservices Platform",
                category="Backend / REST APIs",
                summary="A decoupled multi-service backend architecture managing artist bookings, concert venues, ticket reservation, and user identity.",
                description=(
                    "Developed a scalable microservices ecosystem designed for event management. Features decoupled services for Artist, Concert, Booking, and Authentication, "
                    "communicating through standardized REST endpoints with database isolation."
                ),
                tech_stack=["Python", "FastAPI", "REST APIs", "PostgreSQL", "Docker"],
                metrics="Microservices Architecture with Domain-Driven Design",
                github_url="https://github.com/Venugopal-2005/Raga-Roads-Microservices",
                live_url="https://github.com/Venugopal-2005/Raga-Roads-Microservices",
                architecture_details=(
                    "Client -> Reverse Proxy -> Domain Services (Artist, Concert, Booking, Auth) -> PostgreSQL Multi-schema DB."
                ),
                featured=True,
                display_order=8
            )
        ]
        for p in projects:
            db.add(p)
        db.commit()

    # 2. Skills
    if db.query(Skill).count() == 0:
        skills = [
            # Python Full Stack & Backend
            Skill(category="Python Full-Stack & Backend", name="Python 3", level="Expert", badge_type="primary", display_order=1),
            Skill(category="Python Full-Stack & Backend", name="FastAPI", level="Expert", badge_type="primary", display_order=2),
            Skill(category="Python Full-Stack & Backend", name="REST API Design", level="Expert", badge_type="primary", display_order=3),
            Skill(category="Python Full-Stack & Backend", name="Pydantic V2", level="Advanced", badge_type="primary", display_order=4),
            Skill(category="Python Full-Stack & Backend", name="SQLAlchemy ORM", level="Advanced", badge_type="primary", display_order=5),
            Skill(category="Python Full-Stack & Backend", name="Uvicorn / ASGI", level="Advanced", badge_type="primary", display_order=6),
            Skill(category="Python Full-Stack & Backend", name="JWT Authentication", level="Advanced", badge_type="primary", display_order=7),
            Skill(category="Python Full-Stack & Backend", name="Pytest & Unit Testing", level="Proficient", badge_type="primary", display_order=8),
            
            # AI & Machine Learning
            Skill(category="AI & Machine Learning", name="Machine Learning", level="Advanced", badge_type="ai", display_order=1),
            Skill(category="AI & Machine Learning", name="Scikit-learn", level="Expert", badge_type="ai", display_order=2),
            Skill(category="AI & Machine Learning", name="Pandas & NumPy", level="Expert", badge_type="ai", display_order=3),
            Skill(category="AI & Machine Learning", name="SHAP Explainability", level="Advanced", badge_type="ai", display_order=4),
            Skill(category="AI & Machine Learning", name="Random Forest & Extra Trees", level="Expert", badge_type="ai", display_order=5),
            Skill(category="AI & Machine Learning", name="Feature Engineering & EDA", level="Expert", badge_type="ai", display_order=6),
            Skill(category="AI & Machine Learning", name="Model Evaluation (R², RMSE, MAE)", level="Expert", badge_type="ai", display_order=7),
            Skill(category="AI & Machine Learning", name="Deep Learning Fundamentals", level="Proficient", badge_type="ai", display_order=8),

            # Computer Vision & Edge AI
            Skill(category="Computer Vision & Edge AI", name="Computer Vision", level="Expert", badge_type="ai", display_order=1),
            Skill(category="Computer Vision & Edge AI", name="OpenCV", level="Expert", badge_type="ai", display_order=2),
            Skill(category="Computer Vision & Edge AI", name="YOLO Object Detection", level="Expert", badge_type="ai", display_order=3),
            Skill(category="Computer Vision & Edge AI", name="OCR (Optical Character Recognition)", level="Advanced", badge_type="ai", display_order=4),
            Skill(category="Computer Vision & Edge AI", name="Face Recognition", level="Advanced", badge_type="ai", display_order=5),
            Skill(category="Computer Vision & Edge AI", name="Real-Time Video Analytics", level="Advanced", badge_type="ai", display_order=6),

            # Databases & DevOps
            Skill(category="Databases & DevOps", name="PostgreSQL", level="Advanced", badge_type="secondary", display_order=1),
            Skill(category="Databases & DevOps", name="MySQL", level="Advanced", badge_type="secondary", display_order=2),
            Skill(category="Databases & DevOps", name="SQLite", level="Advanced", badge_type="secondary", display_order=3),
            Skill(category="Databases & DevOps", name="Docker & Containerization", level="Advanced", badge_type="tool", display_order=4),
            Skill(category="Databases & DevOps", name="Git & GitHub", level="Expert", badge_type="tool", display_order=5),
            Skill(category="Databases & DevOps", name="Postman", level="Advanced", badge_type="tool", display_order=6),
            Skill(category="Databases & DevOps", name="Swagger / OpenAPI", level="Expert", badge_type="tool", display_order=7),
            Skill(category="Databases & DevOps", name="Linux Fundamentals", level="Proficient", badge_type="tool", display_order=8),

            # Frontend & Languages
            Skill(category="Frontend & Other Languages", name="React.js", level="Advanced", badge_type="secondary", display_order=1),
            Skill(category="Frontend & Other Languages", name="JavaScript (ES6+)", level="Advanced", badge_type="secondary", display_order=2),
            Skill(category="Frontend & Other Languages", name="HTML5 & CSS3", level="Expert", badge_type="secondary", display_order=3),
            Skill(category="Frontend & Other Languages", name="C++", level="Proficient", badge_type="secondary", display_order=4),
            Skill(category="Frontend & Other Languages", name="SQL", level="Advanced", badge_type="secondary", display_order=5),
            Skill(category="Frontend & Other Languages", name="Data Structures & Algorithms", level="Advanced", badge_type="secondary", display_order=6),
        ]
        for s in skills:
            db.add(s)
        db.commit()

    # 3. Experience
    if db.query(Experience).count() == 0:
        exp = Experience(
            title="Computer Vision Intern",
            company="MSPL Limited",
            organization_subtitle="Baldota Organization",
            period="Dec 2025 – Jan 2026",
            location="Hospet, Karnataka, India",
            description="Built production-grade computer vision solutions for industrial plant safety and vehicle access automation.",
            highlights_json=json.dumps([
                "Developed an AI-powered Smart Employee Vehicle Safety & Access Control System using YOLO and OCR.",
                "Implemented real-time helmet detection and automatic number plate recognition for industrial safety compliance.",
                "Built automated image processing pipelines with OpenCV and Python for reliable license plate character extraction.",
                "Contributed to enterprise computer vision systems bridging camera sensor data and gate operational automation."
            ]),
            tech_tags_json=json.dumps(["Computer Vision", "Python", "YOLO", "OpenCV", "OCR", "Edge AI", "Industrial Automation"]),
            display_order=1
        )
        db.add(exp)
        db.commit()

    # 4. Certifications
    if db.query(Certification).count() == 0:
        certs = [
            Certification(
                title="Certified Data Analyst – SAP Analytics Cloud",
                issuer="SAP",
                issue_date="Apr 2026",
                category="Data & Analytics",
                credential_url="https://www.sap.com",
                filename="SAP Analytics Cloud.png",
                display_order=1
            ),
            Certification(
                title="Introduction to Machine Learning (Elite)",
                issuer="NPTEL Online Certification",
                issue_date="Jul – Sep 2025",
                category="AI & Machine Learning",
                credential_url="https://nptel.ac.in",
                filename="Introduction to Machine Learning - NPTEL.pdf",
                display_order=2
            ),
            Certification(
                title="GenAI Powered Data Analytics",
                issuer="Tata iQ | Forage",
                issue_date="2025",
                category="AI & Machine Learning",
                credential_url="https://www.theforage.com",
                filename="Tata_Data Analyst_GenAI_completion_certificate.pdf",
                display_order=3
            ),
            Certification(
                title="Python Full Stack Certification",
                issuer="EduSkills Academy",
                issue_date="Oct 2025",
                category="Software Engineering",
                credential_url="",
                filename="EDUSKILLS certificate.pdf",
                display_order=4
            ),
            Certification(
                title="Database Management System (DBMS)",
                issuer="Scaler Topics",
                issue_date="Jul 2025",
                category="Database",
                credential_url="",
                filename="I have completed DBMS Course - Master the Fundamentals and Advanced Concepts on Scaler Topics.pdf",
                display_order=5
            ),
            Certification(
                title="Computer Vision Internship Certificate",
                issuer="MSPL Limited – Baldota Organization",
                issue_date="Jan 2026",
                category="Industry Experience",
                credential_url="",
                filename="Intern certificate MSPL.pdf",
                display_order=6
            ),
            Certification(
                title="FortiGate 7.6 Operator Self-Paced",
                issuer="Fortinet Training Institute",
                issue_date="Jan 2026",
                category="Networking & Security",
                credential_url="",
                filename="FORTINET Course Completion Certificate.pdf",
                display_order=7
            ),
            Certification(
                title="Introduction to Internet of Things & Networking Basics",
                issuer="Cisco Networking Academy",
                issue_date="Sep – Oct 2025",
                category="IoT & Systems",
                credential_url="",
                filename="Cisco - Introduction to Internet of Things.pdf",
                display_order=8
            ),
            Certification(
                title="Agile Project Management",
                issuer="HP LIFE",
                issue_date="May 2026",
                category="Methodologies",
                credential_url="",
                filename="Agile Project Management.pdf",
                display_order=9
            ),
            Certification(
                title="Principles of IoT & Python Basics",
                issuer="Skillsoft",
                issue_date="2025",
                category="IoT & Systems",
                credential_url="",
                filename="Principles of IoT & Python Basics- Skillsoft.pdf",
                display_order=10
            ),
        ]
        for c in certs:
            db.add(c)
        db.commit()

    # 5. Achievements
    if db.query(Achievement).count() == 0:
        achievements = [
            Achievement(
                title="AgriXAI Research Paper Shortlisted for Elsevier SSRN (Top 15%)",
                organization="ICICC 2027 / Elsevier SSRN",
                year="2026-2027",
                category="Research & Publications",
                description="Empirical research on crop yield prediction with Random Forest, ensemble evaluation, and SHAP interpretability selected among top 15% submissions.",
                badge="Elsevier SSRN Top 15%",
                display_order=1
            ),
            Achievement(
                title="Hacktrax Hackathon 2025",
                organization="Alexa Developers SRM, SRMIST KTR",
                year="Mar 2025",
                category="Hackathons & Competitions",
                description="Developed an innovative tech solution addressing smart campus automation during intense 24-hour sprint.",
                badge="Hackathon Finalist",
                display_order=2
            ),
            Achievement(
                title="Adobe India Hackathon 2024",
                organization="Adobe / Unstop",
                year="Oct 2024",
                category="Hackathons & Competitions",
                description="Nationwide hackathon competing in software architecture and algorithm optimization challenges.",
                badge="National Competitor",
                display_order=3
            ),
            Achievement(
                title="Hackathon Pair Programming Challenge",
                organization="Dept. of Computing Technologies, SRM",
                year="Aug 2024",
                category="Hackathons & Competitions",
                description="Collaborative algorithm design and competitive coding in rapid paired development sessions.",
                badge="Department Recognition",
                display_order=4
            ),
            Achievement(
                title="SEMICOLON 9.0 Hackathon",
                organization="Team SRM Hackathon & NWC Department",
                year="Feb 2024",
                category="Hackathons & Competitions",
                description="Engineered full-stack and algorithmic prototypes for technical problem statements.",
                badge="Hackathon Participant",
                display_order=5
            ),
            Achievement(
                title="CreaTech 2024",
                organization="Larsen & Toubro / Unstop",
                year="2024",
                category="Hackathons & Competitions",
                description="Engineering and technology ideation challenge for real-world infrastructure and software integration.",
                badge="Participant",
                display_order=6
            ),
            Achievement(
                title="Vande Mataram World Record Attempt",
                organization="Cultural Organization & Event Council",
                year="2024",
                category="Community & Extracurricular",
                description="Participated in the historic patriotic mass recital and recognized record event.",
                badge="World Record Participant",
                display_order=7
            ),
            Achievement(
                title="Elected Class Representative (CR)",
                organization="SRM Institute of Science and Technology",
                year="2023 – Present",
                category="Leadership & Service",
                description="Liaised between faculty and a batch of 70+ engineering students, organizing academic activities and coordinating schedules.",
                badge="Leadership",
                display_order=8
            )
        ]
        for a in achievements:
            db.add(a)
        db.commit()

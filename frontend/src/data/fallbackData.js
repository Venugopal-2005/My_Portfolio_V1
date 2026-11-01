export const fallbackProfile = {
  name: "Venugopal K",
  title: "Python Full-Stack Developer & AI/ML Engineer",
  tagline: "Python Full-Stack Developer • AI/ML & Computer Vision",
  bio: "Final-year Computer Science student at SRM University with hands-on experience in building production-ready Python backends with FastAPI, scalable relational databases with PostgreSQL/SQLAlchemy, and real-time computer vision & explainable machine learning models.",
  email: "venu170305@gmail.com",
  github: "https://github.com/Venugopal-2005",
  linkedin: "https://www.linkedin.com/in/venugopal-k-0bba49287/",
  education: [
    {
      institution: "SRM Institute of Science and Technology",
      degree: "B.Tech in Computer Science and Engineering",
      score: "8.45 CGPA",
      period: "2023 - 2027"
    },
    {
      institution: "Sri Guru PU College",
      degree: "12th Grade (PCMB)",
      score: "82.6%",
      period: "2021 - 2023"
    },
    {
      institution: "Adarsha Vidyalaya",
      degree: "10th Grade",
      score: "87.84%",
      period: "2020 - 2021"
    }
  ],
  focus_areas: [
    {
      title: "Python Full-Stack",
      description: "FastAPI REST APIs, SQLAlchemy ORM, Pydantic V2 validation, Uvicorn, and React frontend integration."
    },
    {
      title: "AI & Machine Learning",
      description: "Explainable AI (SHAP), ensemble learning (Random Forest, Extra Trees, XGBoost), and scikit-learn pipelines."
    },
    {
      title: "Computer Vision",
      description: "Real-time YOLO object detection, OpenCV video analytics, and Optical Character Recognition (OCR)."
    },
    {
      title: "Databases & Systems",
      description: "PostgreSQL, MySQL, SQLite schema design, Docker containerization, and Git/GitHub CI workflows."
    }
  ],
  about_text: [
    "I am a B.Tech Computer Science student at SRM Institute of Science and Technology (Kattankulathur), driven by a passion for Python full-stack engineering and intelligent systems. My technical foundation is rooted in Python, FastAPI, SQLAlchemy, and React.js, where I focus on designing production-ready REST APIs and clean database schemas.",
    "Beyond backend engineering, I have substantial practical experience in Artificial Intelligence and Computer Vision. I engineered an automated vehicle safety & OCR access control system during my internship at MSPL Limited, and conducted empirical research on explainable agricultural AI (AgriXAI) shortlisted for Elsevier SSRN (Top 15%).",
    "My development philosophy centers on writing clean, PEP 8 compliant Python code, type-safe validation with Pydantic, modular service abstractions, and adopting production-ready architectural patterns."
  ]
};

export const fallbackProjects = [
  {
    id: 1,
    slug: "agrixai",
    title: "AgriXAI – Empirical Study of Crop Yield Prediction & Explainability",
    category: "Machine Learning / Explainable AI",
    summary: "An explainable AI agricultural intelligence platform comparing 10 machine learning models across 19,689 records, achieving 98.75% R² with Random Forest and SHAP interpretability.",
    description: "AgriXAI addresses the lack of transparency in agricultural machine learning models by providing both highly accurate yield predictions and transparent interpretability through SHapley Additive exPlanations (SHAP). The system processes comprehensive environmental, soil, fertilizer, and rainfall telemetry. The research paper documenting this empirical evaluation was shortlisted for Elsevier SSRN (Top 15%) at ICICC 2027.",
    tech_stack: ["Python", "Scikit-learn", "Random Forest", "SHAP", "Pandas", "NumPy", "FastAPI"],
    metrics: "Model Result: 98.75% R² Score | Top 15% Elsevier SSRN Shortlist",
    github_url: "https://github.com/Venugopal-2005",
    live_url: "https://github.com/Venugopal-2005",
    architecture_details: "Data Pipeline (Pandas/NumPy) -> Feature Engineering -> Model Ensembling (10 Models Benchmark: RF, XGBoost, CatBoost, LightGBM, GradientBoosting) -> Selected Random Forest Regressor -> SHAP TreeExplainer -> REST API (FastAPI) -> Frontend Visualizations.",
    featured: true
  },
  {
    id: 2,
    slug: "kidney-stone",
    title: "Kidney Stone Risk Prediction Using Machine Learning",
    category: "Machine Learning / Healthcare",
    summary: "A diagnostic healthcare model analyzing 4,000 patient records with 23 features, achieving 94.46% diagnostic accuracy using the Extra Trees Classifier.",
    description: "Developed a predictive healthcare intelligence platform to assess the risk of nephrolithiasis (kidney stones) from non-invasive urine physicochemical markers. Conducted thorough Exploratory Data Analysis (EDA), correlation heatmaps, feature selection, and comparative model evaluation against Logistic Regression, SVM, and Random Forest, achieving peak diagnostic precision with Extra Trees Classifier.",
    tech_stack: ["Python", "Scikit-learn", "Extra Trees Classifier", "Pandas", "Matplotlib", "Seaborn"],
    metrics: "Model Result: 94.46% Accuracy | 4,000 Patient Records",
    github_url: "https://github.com/Venugopal-2005/Kidney-Stone-prediction-using-ML",
    live_url: "https://github.com/Venugopal-2005/Kidney-Stone-prediction-using-ML",
    architecture_details: "Urine Physicochemical Data -> EDA & Missing Imputation -> Feature Selection (calc, gravity, osmo, cond) -> Extra Trees Classifier Training -> Precision/Recall/F1 Scoring -> REST API Risk Evaluation.",
    featured: true
  },
  {
    id: 3,
    slug: "vehicle-safety",
    title: "Smart Employee Vehicle Safety & Access Control System",
    category: "AI / Computer Vision",
    summary: "An automated industrial access and security system utilizing YOLO object detection for helmet compliance and OCR for vehicle license plate recognition.",
    description: "Engineered during internship at MSPL Limited (Baldota Organization). The system automatically monitors gate entrances using computer vision. It detects approaching two-wheelers, verifies rider helmet compliance in real-time, extracts license plate numbers via Optical Character Recognition (OCR), queries the enterprise employee database, and controls the automated barrier gate while generating auditable security incident logs.",
    tech_stack: ["Python", "YOLO", "OpenCV", "OCR", "Object Detection", "Edge AI"],
    metrics: "Industrial Deployment: Real-time 30+ FPS Inference & Automated Gate Control",
    github_url: "https://github.com/Venugopal-2005/Smart-Employee-Safety-Management",
    live_url: "https://github.com/Venugopal-2005/Smart-Employee-Safety-Management",
    architecture_details: "Video Feed Input -> YOLOv8/v11 Object Detection (Vehicle & Rider) -> Head ROI Helmet Classifier -> License Plate Localization -> OCR Preprocessing & Character Recognition -> Employee DB Match -> Gate Control Signal & Audit Trail.",
    featured: true
  },
  {
    id: 4,
    slug: "attendance",
    title: "AI Smart Attendance Management Platform",
    category: "Python Full Stack / AI",
    summary: "An intelligent automated attendance management platform combining React, FastAPI, OpenCV, and facial recognition workflows for real-time tracking.",
    description: "A production-ready full-stack attendance management system with biometric verification. Combines a responsive React dashboard with a high-throughput FastAPI backend. Processes camera streams to compute 128-dimensional facial embedding vectors, performs cosine similarity matching against registered employee profiles, logs timestamps, and offers exportable PDF/Excel compliance reports.",
    tech_stack: ["Python", "FastAPI", "React", "OpenCV", "Face Recognition", "SQLite"],
    metrics: "Real-time Sub-second Facial Recognition & Automated Logging",
    github_url: "https://github.com/Venugopal-2005/Smart-Attendance-Management-System",
    live_url: "https://github.com/Venugopal-2005/Smart-Attendance-Management-System",
    architecture_details: "Webcam Stream -> OpenCV Frame Capture -> Facial Landmark Alignment -> Deep Neural Face Embeddings -> FastAPI Attendance Endpoint -> SQLite/PostgreSQL Database -> React Interactive Admin Dashboard.",
    featured: true
  },
  {
    id: 5,
    slug: "hater-speech",
    title: "Hate Speech & Toxic Content Detection Pipeline",
    category: "Machine Learning / NLP",
    summary: "A natural language processing pipeline to classify text data, detecting toxic, profanity-laden, and hate speech with high recall.",
    description: "Developed an automated NLP text classification pipeline for content moderation on social and enterprise collaboration platforms. Implements text cleaning, regex tokenization, stopword removal, lemmatization, and TF-IDF n-gram vectorization, trained with comparative classification algorithms.",
    tech_stack: ["Python", "Scikit-learn", "NLP", "Pandas", "TF-IDF"],
    metrics: "NLP Classification Pipeline with Multi-Class Toxic Text Filtering",
    github_url: "https://github.com/Venugopal-2005/Hater-speech-Detection",
    live_url: "https://github.com/Venugopal-2005/Hater-speech-Detection",
    architecture_details: "Text Input -> Preprocessing (Tokenize, Lowercase, Remove Punctuation) -> TF-IDF Vectorizer -> Classifier Model -> Sentiment & Toxicity Confidence Output.",
    featured: true
  },
  {
    id: 6,
    slug: "job-scheduler",
    title: "Distributed Asynchronous Job Scheduler",
    category: "Backend / Microservices",
    summary: "A distributed task scheduling and background processing service built with FastAPI, Celery, Redis queue, and PostgreSQL persistent storage.",
    description: "Engineered a resilient distributed job scheduling engine capable of scheduling, executing, and monitoring recurrent and delayed background jobs. Features worker heartbeat health tracking, automated failure retries with exponential backoff, persistent job logs in PostgreSQL, and Redis caching.",
    tech_stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "REST APIs"],
    metrics: "Distributed Fault-Tolerant Job Scheduling with Automated Retries",
    github_url: "https://github.com/Venugopal-2005/Distributed-Job-Scheduler",
    live_url: "https://github.com/Venugopal-2005/Distributed-Job-Scheduler",
    architecture_details: "Client API Request -> FastAPI REST Route -> Redis Task Queue -> Celery Worker Pool -> State Management & Result Persistence in PostgreSQL.",
    featured: true
  },
  {
    id: 7,
    slug: "digital-banking",
    title: "Global Digital Banking System",
    category: "Python Full Stack",
    summary: "Enterprise-oriented core banking microservices featuring API gateway routing, JWT authentication, and secure fund transfer simulation.",
    description: "Architected a comprehensive digital banking platform with strict transaction integrity and ACID compliance. Features JWT token authentication, multi-account management, fund transfer simulations, audit logging, and Docker container orchestration.",
    tech_stack: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "JWT"],
    metrics: "ACID-Compliant Transaction Ledger & JWT Bearer Security",
    github_url: "https://github.com/Venugopal-2005/global-digital-banking-microservices-springboot",
    live_url: "https://github.com/Venugopal-2005/global-digital-banking-microservices-springboot",
    architecture_details: "React Banking UI -> FastAPI API Gateway -> Auth Service (JWT) -> Account & Ledger Service -> PostgreSQL Storage -> Payment Simulation.",
    featured: true
  },
  {
    id: 8,
    slug: "raga-roads",
    title: "Raga Roads Microservices Platform",
    category: "Backend / REST APIs",
    summary: "A decoupled multi-service backend architecture managing artist bookings, concert venues, ticket reservation, and user identity.",
    description: "Developed a scalable microservices ecosystem designed for event management. Features decoupled services for Artist, Concert, Booking, and Authentication, communicating through standardized REST endpoints with database isolation.",
    tech_stack: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Docker"],
    metrics: "Microservices Architecture with Domain-Driven Design",
    github_url: "https://github.com/Venugopal-2005/Raga-Roads-Microservices",
    live_url: "https://github.com/Venugopal-2005/Raga-Roads-Microservices",
    architecture_details: "Client -> Reverse Proxy -> Domain Services (Artist, Concert, Booking, Auth) -> PostgreSQL Multi-schema DB.",
    featured: true
  }
];

export const fallbackSkills = {
  categories: {
    "Python Full-Stack & Backend": [
      { name: "Python 3", level: "Expert", badge_type: "primary" },
      { name: "FastAPI", level: "Expert", badge_type: "primary" },
      { name: "REST API Design", level: "Expert", badge_type: "primary" },
      { name: "Pydantic V2", level: "Advanced", badge_type: "primary" },
      { name: "SQLAlchemy ORM", level: "Advanced", badge_type: "primary" },
      { name: "Uvicorn / ASGI", level: "Advanced", badge_type: "primary" },
      { name: "JWT Authentication", level: "Advanced", badge_type: "primary" },
      { name: "Pytest & Unit Testing", level: "Proficient", badge_type: "primary" }
    ],
    "AI & Machine Learning": [
      { name: "Machine Learning", level: "Advanced", badge_type: "ai" },
      { name: "Scikit-learn", level: "Expert", badge_type: "ai" },
      { name: "Pandas & NumPy", level: "Expert", badge_type: "ai" },
      { name: "SHAP Explainability", level: "Advanced", badge_type: "ai" },
      { name: "Random Forest & Extra Trees", level: "Expert", badge_type: "ai" },
      { name: "Feature Engineering & EDA", level: "Expert", badge_type: "ai" },
      { name: "Model Evaluation (R², RMSE, MAE)", level: "Expert", badge_type: "ai" },
      { name: "Deep Learning Fundamentals", level: "Proficient", badge_type: "ai" }
    ],
    "Computer Vision & Edge AI": [
      { name: "Computer Vision", level: "Expert", badge_type: "ai" },
      { name: "OpenCV", level: "Expert", badge_type: "ai" },
      { name: "YOLO Object Detection", level: "Expert", badge_type: "ai" },
      { name: "OCR", level: "Advanced", badge_type: "ai" },
      { name: "Face Recognition", level: "Advanced", badge_type: "ai" },
      { name: "Real-Time Video Analytics", level: "Advanced", badge_type: "ai" }
    ],
    "Databases & DevOps": [
      { name: "PostgreSQL", level: "Advanced", badge_type: "secondary" },
      { name: "MySQL", level: "Advanced", badge_type: "secondary" },
      { name: "SQLite", level: "Advanced", badge_type: "secondary" },
      { name: "Docker", level: "Advanced", badge_type: "tool" },
      { name: "Git & GitHub", level: "Expert", badge_type: "tool" },
      { name: "Postman", level: "Advanced", badge_type: "tool" },
      { name: "Swagger / OpenAPI", level: "Expert", badge_type: "tool" },
      { name: "Linux Fundamentals", level: "Proficient", badge_type: "tool" }
    ],
    "Frontend & Other Languages": [
      { name: "React.js", level: "Advanced", badge_type: "secondary" },
      { name: "JavaScript (ES6+)", level: "Advanced", badge_type: "secondary" },
      { name: "HTML5 & CSS3", level: "Expert", badge_type: "secondary" },
      { name: "C++", level: "Proficient", badge_type: "secondary" },
      { name: "SQL", level: "Advanced", badge_type: "secondary" },
      { name: "Data Structures & Algorithms", level: "Advanced", badge_type: "secondary" }
    ]
  }
};

export const fallbackExperience = [
  {
    id: 1,
    title: "Computer Vision Intern",
    company: "MSPL Limited",
    organization_subtitle: "Baldota Organization",
    period: "Dec 2025 – Jan 2026",
    location: "Hospet, Karnataka, India",
    description: "Built production-grade computer vision solutions for industrial plant safety and vehicle access automation.",
    highlights: [
      "Developed an AI-powered Smart Employee Vehicle Safety & Access Control System using YOLO and OCR.",
      "Implemented real-time helmet detection and automatic number plate recognition for industrial safety compliance.",
      "Built automated image processing pipelines with OpenCV and Python for reliable license plate character extraction.",
      "Contributed to enterprise computer vision systems bridging camera sensor data and gate operational automation."
    ],
    tech_tags: ["Computer Vision", "Python", "YOLO", "OpenCV", "OCR", "Edge AI", "Industrial Automation"]
  }
];

export const fallbackCertifications = [
  {
    id: 1,
    title: "Certified Data Analyst – SAP Analytics Cloud",
    issuer: "SAP",
    issue_date: "Apr 2026",
    category: "Data & Analytics",
    credential_url: "https://www.sap.com",
    filename: "SAP Analytics Cloud.png"
  },
  {
    id: 2,
    title: "Introduction to Machine Learning (Elite)",
    issuer: "NPTEL Online Certification",
    issue_date: "Jul – Sep 2025",
    category: "AI & Machine Learning",
    credential_url: "https://nptel.ac.in",
    filename: "Introduction to Machine Learning - NPTEL.pdf"
  },
  {
    id: 3,
    title: "GenAI Powered Data Analytics",
    issuer: "Tata iQ | Forage",
    issue_date: "2025",
    category: "AI & Machine Learning",
    credential_url: "https://www.theforage.com",
    filename: "Tata_Data Analyst_GenAI_completion_certificate.pdf"
  },
  {
    id: 4,
    title: "Python Full Stack Certification",
    issuer: "EduSkills Academy",
    issue_date: "Oct 2025",
    category: "Software Engineering",
    credential_url: "",
    filename: "EDUSKILLS certificate.pdf"
  },
  {
    id: 5,
    title: "Database Management System (DBMS)",
    issuer: "Scaler Topics",
    issue_date: "Jul 2025",
    category: "Database",
    credential_url: "",
    filename: "I have completed DBMS Course - Master the Fundamentals and Advanced Concepts on Scaler Topics.pdf"
  },
  {
    id: 6,
    title: "Computer Vision Internship Certificate",
    issuer: "MSPL Limited – Baldota Organization",
    issue_date: "Jan 2026",
    category: "Industry Experience",
    credential_url: "",
    filename: "Intern certificate MSPL.pdf"
  },
  {
    id: 7,
    title: "FortiGate 7.6 Operator Self-Paced",
    issuer: "Fortinet Training Institute",
    issue_date: "Jan 2026",
    category: "Networking & Security",
    credential_url: "",
    filename: "FORTINET Course Completion Certificate.pdf"
  },
  {
    id: 8,
    title: "Introduction to Internet of Things & Networking Basics",
    issuer: "Cisco Networking Academy",
    issue_date: "Sep – Oct 2025",
    category: "IoT & Systems",
    credential_url: "",
    filename: "Cisco - Introduction to Internet of Things.pdf"
  },
  {
    id: 9,
    title: "Agile Project Management",
    issuer: "HP LIFE",
    issue_date: "May 2026",
    category: "Methodologies",
    credential_url: "",
    filename: "Agile Project Management.pdf"
  },
  {
    id: 10,
    title: "Principles of IoT & Python Basics",
    issuer: "Skillsoft",
    issue_date: "2025",
    category: "IoT & Systems",
    credential_url: "",
    filename: "Principles of IoT & Python Basics- Skillsoft.pdf"
  }
];

export const fallbackAchievements = [
  {
    id: 1,
    title: "AgriXAI Research Paper Shortlisted for Elsevier SSRN (Top 15%)",
    organization: "ICICC 2027 / Elsevier SSRN",
    year: "2026-2027",
    category: "Research & Publications",
    description: "Empirical research on crop yield prediction with Random Forest, ensemble evaluation, and SHAP interpretability selected among top 15% submissions.",
    badge: "Elsevier SSRN Top 15%"
  },
  {
    id: 2,
    title: "Hacktrax Hackathon 2025",
    organization: "Alexa Developers SRM, SRMIST KTR",
    year: "Mar 2025",
    category: "Hackathons & Competitions",
    description: "Developed an innovative tech solution addressing smart campus automation during intense 24-hour sprint.",
    badge: "Hackathon Finalist"
  },
  {
    id: 3,
    title: "Adobe India Hackathon 2024",
    organization: "Adobe / Unstop",
    year: "Oct 2024",
    category: "Hackathons & Competitions",
    description: "Nationwide hackathon competing in software architecture and algorithm optimization challenges.",
    badge: "National Competitor"
  },
  {
    id: 4,
    title: "Hackathon Pair Programming Challenge",
    organization: "Dept. of Computing Technologies, SRM",
    year: "Aug 2024",
    category: "Hackathons & Competitions",
    description: "Collaborative algorithm design and competitive coding in rapid paired development sessions.",
    badge: "Department Recognition"
  },
  {
    id: 5,
    title: "SEMICOLON 9.0 Hackathon",
    organization: "Team SRM Hackathon & NWC Department",
    year: "Feb 2024",
    category: "Hackathons & Competitions",
    description: "Engineered full-stack and algorithmic prototypes for technical problem statements.",
    badge: "Hackathon Participant"
  },
  {
    id: 6,
    title: "CreaTech 2024",
    organization: "Larsen & Toubro / Unstop",
    year: "2024",
    category: "Hackathons & Competitions",
    description: "Engineering and technology ideation challenge for real-world infrastructure and software integration.",
    badge: "Participant"
  },
  {
    id: 7,
    title: "Vande Mataram World Record Attempt",
    organization: "Cultural Organization & Event Council",
    year: "2024",
    category: "Community & Extracurricular",
    description: "Participated in the historic patriotic mass recital and recognized record event.",
    badge: "World Record Participant"
  },
  {
    id: 8,
    title: "Elected Class Representative (CR)",
    organization: "SRM Institute of Science and Technology",
    year: "2023 – Present",
    category: "Leadership & Service",
    description: "Liaised between faculty and a batch of 70+ engineering students, organizing academic activities and coordinating schedules.",
    badge: "Leadership"
  }
];


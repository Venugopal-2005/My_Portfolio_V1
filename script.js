/* =========================================================
   PROJECT DATA
========================================================= */
const projectsData = {
    'vehicle-safety': {
        title: 'Smart Employee Vehicle Safety & Access Control System',
        category: 'AI / Computer Vision',
        tech: ['YOLO', 'OpenCV', 'OCR', 'Python'],
        desc: 'AI-powered vehicle access and safety system using computer vision.',
        details: 'Implemented a real-world computer vision access control project. The system workflow involves vehicle/person detection, visual identification, OCR for information extraction, and automated access verification for smart gate operation.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/Smart-Employee-Safety-Management'
    },
    'attendance': {
        title: 'AI Smart Attendance Management System',
        category: 'Full Stack / AI',
        tech: ['React', 'FastAPI', 'OpenCV', 'Face Recognition'],
        desc: 'Intelligent attendance platform with automated face recognition workflows.',
        details: 'Built an intelligent attendance management platform combining frontend integration and backend APIs. Features face recognition for automated attendance, real-time logging, and streamlined administrative workflows.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/Smart-Attendance-Management-System'
    },
    'kidney-stone': {
        title: 'Kidney Stone Prediction',
        category: 'Machine Learning',
        tech: ['Python', 'Extra Trees Classifier', 'Scikit-learn'],
        desc: 'Machine learning healthcare model predicting kidney stone likelihood.',
        details: 'Developed an academic machine-learning prediction project evaluating the likelihood of kidney stones based on clinical data. Handled data preprocessing, feature analysis, and applied the Extra Trees Classifier.',
        metric: 'Model Result: 94.46% Accuracy',
        github: 'https://github.com/Venugopal-2005/Kidney-Stone-prediction-using-ML'
    },
    'agrixai': {
        title: 'AgrixAI',
        category: 'Machine Learning / Backend',
        tech: ['Python', 'XGBoost', 'CatBoost', 'SHAP', 'Flask', 'Supabase'],
        desc: 'Crop-yield prediction and explainable agricultural AI project.',
        details: 'Developed an explainable AI and agricultural analytics system utilizing ensemble models like XGBoost and LightGBM. Integrated SHAP for prediction explainability, supported by a Flask backend and Supabase data layer.',
        metric: '',
        github: 'https://github.com/Venugopal-2005'
    },
    'hater-speech': {
        title: 'Hate Speech Detection',
        category: 'Machine Learning / NLP',
        tech: ['Python', 'Machine Learning', 'NLP'],
        desc: 'A machine learning model for analyzing text data and detecting hate speech using Natural Language Processing (NLP).',
        details: 'Developed a robust machine learning pipeline to classify and detect hate speech. Implemented text preprocessing, feature extraction techniques, and natural language processing concepts to train an accurate classification model.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/Hater-speech-Detection'
    },
    'job-scheduler': {
        title: 'Distributed Job Scheduler',
        category: 'Backend / Microservices',
        tech: ['Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
        desc: 'Distributed backend system designed for scheduling and executing jobs.',
        details: 'Architected a distributed job scheduling mechanism utilizing Spring Boot. Integrated PostgreSQL for persistent storage and Redis for high-speed caching and queueing, containerized via Docker.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/Distributed-Job-Scheduler'
    },
    'raga-roads': {
        title: 'Raga Roads Microservices',
        category: 'Backend / Java',
        tech: ['Spring Boot', 'Java', 'REST APIs', 'Microservices'],
        desc: 'Microservice-oriented platform managing artist and concert domains.',
        details: 'Built a multi-service backend architecture. Designed independent domains such as Artist, Concert, Booking, and Auth services using Spring Boot and secure REST APIs.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/Raga-Roads-Microservices'
    },
    'digital-banking': {
        title: 'Global Digital Banking System',
        category: 'Java Full Stack',
        tech: ['Spring Boot', 'Microservices', 'React', 'PostgreSQL'],
        desc: 'Enterprise-style digital banking application with secure transaction simulation.',
        details: 'Developed a comprehensive full-stack banking ecosystem featuring JWT Authentication, an API Gateway, Account & User Management, and simulated Fund Transfers via a Payment Gateway Service.',
        metric: '',
        github: 'https://github.com/Venugopal-2005/global-digital-banking-microservices-springboot'
    }
};

/* =========================================================
   DOM LOADED
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburgerBtn = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelector('.menu-links');

    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        menuLinks.classList.toggle('open');
    };

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('.menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            menuLinks.classList.remove('open');
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !menuLinks.contains(e.target) && menuLinks.classList.contains('open')) {
            hamburgerBtn.classList.remove('active');
            menuLinks.classList.remove('open');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuLinks.classList.contains('open')) {
            hamburgerBtn.classList.remove('active');
            menuLinks.classList.remove('open');
        }
    });

    // --- Scroll Reveal (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback or immediate reveal for reduced motion
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // --- Active Nav State & Sticky Header ---
    const sections = document.querySelectorAll('.section-container');
    const navItems = document.querySelectorAll('#desktop-nav .nav-links a:not(.nav-cta)');
    const desktopNav = document.getElementById('desktop-nav');
    const mobileNav = document.getElementById('hamburger-nav');
    const backToTopBtn = document.getElementById('back-to-top');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        // Determine active section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // Update nav links
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Sticky Navbar styling
        if (scrollY > 50) {
            desktopNav.classList.add('scrolled');
            mobileNav.classList.add('scrolled');
        } else {
            desktopNav.classList.remove('scrolled');
            mobileNav.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Scroll Progress Bar
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollY / height) * 100;
        if(progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }
    });

    // Back to top click handler
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    
    // Expose open function globally so inline onclick handlers work
    window.openProjectModal = (projectId) => {
        const project = projectsData[projectId];
        if (!project || !modal) return;

        // Populate Modal
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-desc').textContent = project.desc;
        document.getElementById('modal-details').textContent = project.details;
        
        // Handle Metric
        const metricEl = document.getElementById('modal-metric');
        if (project.metric) {
            metricEl.textContent = project.metric;
            metricEl.style.display = 'block';
        } else {
            metricEl.style.display = 'none';
        }

        // Handle Tech Tags
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techContainer.appendChild(span);
        });

        // Handle GitHub Link
        document.getElementById('modal-github').href = project.github;

        // Show Modal
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        if(modal) {
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if(modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close modal on backdrop click
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });
    }

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });

});
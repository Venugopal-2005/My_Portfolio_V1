import React, { useState, useEffect } from 'react';
import { Briefcase, ExternalLink, Github, Filter, Search, X, ArrowRight, Tag } from 'lucide-react';

export default function Projects({ projects }) {
  const [filtered, setFiltered] = useState(projects || []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setFiltered(projects || []);
  }, [projects]);

  const categories = ['All', ...new Set((projects || []).map(p => p.category.split(' / ')[0]))];

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    applyFilters(cat, searchQuery);
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    applyFilters(activeCategory, q);
  };

  const applyFilters = (cat, q) => {
    let result = projects || [];
    if (cat !== 'All') {
      result = result.filter(p => p.category.includes(cat));
    }
    if (q.trim()) {
      const lq = q.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(lq) ||
        p.summary.toLowerCase().includes(lq) ||
        p.tech_stack.some(t => t.toLowerCase().includes(lq))
      );
    }
    setFiltered(result);
  };

  const techColors = {
    'Python': '#badge-primary',
    'FastAPI': 'primary',
    'Machine Learning': 'ai',
    'YOLO': 'ai',
    'OpenCV': 'ai',
    'React': 'tech',
    'PostgreSQL': 'tech',
    'Docker': 'warning',
    'SHAP': 'ai',
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">PORTFOLIO</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Production-quality Python Full-Stack, AI/ML, and Computer Vision applications
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px', maxWidth: '360px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.35rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                background: 'var(--bg-alt)',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'var(--transition)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={activeCategory === cat ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <p>No projects match your search. Try a different keyword.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(project => (
              <div
                key={project.slug}
                className="card"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => setSelectedProject(project)}
              >
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className="section-tag" style={{ marginBottom: '0.5rem' }}>{project.category}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--secondary)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>
                  {project.summary}
                </p>
                {project.metrics && (
                  <div
                    style={{
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#1d4ed8',
                      marginBottom: '1rem',
                    }}
                  >
                    ✦ {project.metrics}
                  </div>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {project.tech_stack.slice(0, 4).map(tech => (
                    <span key={tech} className="badge">{tech}</span>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <span className="badge">+{project.tech_stack.length - 4}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, gap: '0.3rem' }}>
                  View Details <ArrowRight size={15} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://github.com/Venugopal-2005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <Github size={18} />
            Explore More on GitHub
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={18} />
            </button>
            <span className="section-tag">{selectedProject.category}</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              {selectedProject.title}
            </h2>
            {selectedProject.metrics && (
              <div style={{
                background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)',
                padding: '0.6rem 1rem', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 600, color: '#1d4ed8'
              }}>
                ✦ {selectedProject.metrics}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {selectedProject.tech_stack.map(t => (
                <span key={t} className="badge badge-primary">{t}</span>
              ))}
            </div>
            <hr style={{ borderColor: 'var(--border)', marginBottom: '1.5rem' }} />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              {selectedProject.description}
            </p>
            {selectedProject.architecture_details && (
              <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                  Architecture Pipeline
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: 1.7 }}>
                  {selectedProject.architecture_details}
                </p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {selectedProject.github_url && (
                <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Github size={18} />
                  View Repository
                </a>
              )}
              {selectedProject.live_url && selectedProject.live_url !== selectedProject.github_url && (
                <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

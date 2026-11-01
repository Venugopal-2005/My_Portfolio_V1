import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Sparkles } from 'lucide-react';

export default function Hero({ profile }) {
  return (
    <section
      id="hero"
      style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
        {/* Left Column: Text */}
        <div style={{ maxWidth: '620px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.25rem',
              border: '1px solid #bfdbfe',
            }}
          >
            <Sparkles size={16} />
            <span>Python Full-Stack &amp; AI/ML Engineer</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--secondary)',
              lineHeight: 1.15,
              marginBottom: '0.75rem',
            }}
          >
            Hi, I'm <span style={{ color: 'var(--primary)' }}>Venugopal K</span>
          </h1>

          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            Python Full-Stack Developer &bull; AI/ML &amp; Computer Vision
          </h2>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Final-year Computer Science student at SRM University with hands-on experience in building production-ready Python backends with FastAPI, scalable relational databases with PostgreSQL/SQLAlchemy, and real-time computer vision &amp; explainable machine learning models.
          </p>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <a href="#projects" className="btn btn-primary">
              View My Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="./RESUME.pdf"
              download="Venugopal_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Download size={18} />
              Download Resume (PDF)
            </a>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect:
            </span>
            <a
              href="https://github.com/Venugopal-2005"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-alt)';
                e.currentTarget.style.color = 'var(--secondary)';
              }}
            >
              <Github size={19} />
            </a>
            <a
              href="https://www.linkedin.com/in/venugopal-k-0bba49287/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0077b5',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0077b5';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-alt)';
                e.currentTarget.style.color = '#0077b5';
              }}
            >
              <Linkedin size={19} />
            </a>
            <a
              href="mailto:venu170305@gmail.com"
              aria-label="Email"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--primary)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-alt)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
            >
              <Mail size={19} />
            </a>
          </div>
        </div>

        {/* Right Column: Visual Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              position: 'relative',
              width: '320px',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Glowing background ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb, #8b5cf6, #3b82f6)',
                opacity: 0.25,
                filter: 'blur(20px)',
              }}
            />
            {/* Inner Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '3px dashed rgba(37, 99, 235, 0.4)',
                animation: 'spin 30s linear infinite',
              }}
            />
            {/* Profile Picture */}
            <div
              style={{
                position: 'relative',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: 'var(--shadow-xl)',
                backgroundColor: '#ffffff',
              }}
            >
              <img
                src="/images/profile-pic.jpg"
                alt="Venugopal K"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/static/images/profile-pic.jpg';
                }}
              />
            </div>

            {/* Float badge 1 */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '-20px',
                backgroundColor: '#ffffff',
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
              FastAPI &bull; Python Full-Stack
            </div>

            {/* Float badge 2 */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '-15px',
                backgroundColor: '#ffffff',
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--primary)',
              }}
            >
              <Code2 size={16} />
              AI/ML &bull; YOLO CV
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

import React from 'react';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">CAREER</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">Real-world industry contributions and hands-on engineering work</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              style={{
                position: 'relative',
                paddingLeft: '2rem',
                marginBottom: idx < experiences.length - 1 ? '3rem' : 0,
              }}
            >
              {/* Timeline line */}
              {idx < experiences.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '6px',
                    top: '28px',
                    bottom: '-3rem',
                    width: '2px',
                    background: 'linear-gradient(180deg, var(--primary), transparent)',
                  }}
                />
              )}
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '10px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 3px rgba(37,99,235,0.2)',
                }}
              />

              <div className="card" style={{ cursor: 'default' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.15rem' }}>
                      {exp.title}
                    </h3>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {exp.company}
                      {exp.organization_subtitle && (
                        <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> — {exp.organization_subtitle}</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    {exp.period && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <Calendar size={14} />
                        {exp.period}
                      </div>
                    )}
                    {exp.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <MapPin size={14} />
                        {exp.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul style={{ listStyle: 'none', marginBottom: '1rem' }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', marginBottom: '0.6rem', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '3px' }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Tags */}
                {exp.tech_tags && exp.tech_tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {exp.tech_tags.map(tag => (
                      <span key={tag} className="badge badge-primary">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

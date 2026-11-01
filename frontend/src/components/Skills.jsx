import React from 'react';
import { Code2, Brain, Eye, Database, Globe } from 'lucide-react';

const categoryIcons = {
  'Python Full-Stack & Backend': Code2,
  'AI & Machine Learning': Brain,
  'Computer Vision & Edge AI': Eye,
  'Databases & DevOps': Database,
  'Frontend & Other Languages': Globe,
};

const categoryColors = {
  'Python Full-Stack & Backend': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'AI & Machine Learning': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
  'Computer Vision & Edge AI': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Databases & DevOps': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Frontend & Other Languages': { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
};

export default function Skills({ skillsData }) {
  if (!skillsData || !skillsData.categories) return null;
  const { categories } = skillsData;

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">EXPERTISE</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Python-first full-stack engineering, AI/ML, computer vision, and modern DevOps</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {Object.entries(categories).map(([categoryName, skills]) => {
            const Icon = categoryIcons[categoryName] || Code2;
            const colors = categoryColors[categoryName] || { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };

            return (
              <div
                key={categoryName}
                className="card"
                style={{ cursor: 'default', borderTop: `3px solid ${colors.border.replace('b', '9')}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.text,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)' }}>
                    {categoryName}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.map(skill => (
                    <span
                      key={skill.id}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        backgroundColor: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                        transition: 'var(--transition)',
                        cursor: 'default',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

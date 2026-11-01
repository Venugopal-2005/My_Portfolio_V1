import React from 'react';
import { Trophy, Star, Users, Lightbulb, Zap } from 'lucide-react';

const categoryIcons = {
  'Research & Publications': Star,
  'Hackathons & Competitions': Trophy,
  'Community & Extracurricular': Users,
  'Leadership & Service': Lightbulb,
  'Industry Experience': Zap,
};

const categoryColors = {
  'Research & Publications': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
  'Hackathons & Competitions': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
  'Community & Extracurricular': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  'Leadership & Service': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  'Industry Experience': { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' },
};

const extracurricular = [
  '🚴 Swachhata Hi Seva Cyclothon',
  '🚴 Awareness Cycle Rally',
  '🌱 Tree Plantation Activities',
  '🩸 Blood Donation Camp',
  '🇮🇳 Vande Mataram World Record',
  '🎭 2nd Prize – Dance Competition',
  '👑 Class Representative (CR)',
  '🤝 Community Connect Program',
  '🎤 Singing & Drama',
  '🥋 Karate',
  '🏸 Badminton',
  '📚 DSA Discipline Club',
];

export default function Achievements({ achievements }) {
  if (!achievements) return null;

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">RECOGNITION</span>
          <h2 className="section-title">Achievements &amp; Recognitions</h2>
          <p className="section-subtitle">Research publications, hackathon participation, leadership, and community contributions</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '3.5rem' }}>
          {achievements.map(item => {
            const Icon = categoryIcons[item.category] || Trophy;
            const colors = categoryColors[item.category] || categoryColors['Industry Experience'];
            return (
              <div
                key={item.id}
                className="card"
                style={{ cursor: 'default', borderLeft: `4px solid ${colors.border.replace('b', '9')}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '38px', height: '38px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: colors.text, flexShrink: 0,
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}`, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                    {item.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.35rem', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {item.organization}
                  {item.year && <span style={{ color: 'var(--text-light)', fontWeight: 400, marginLeft: '0.5rem' }}>• {item.year}</span>}
                </p>
                {item.description && (
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                )}
                {item.badge && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span className="badge" style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}>
                      ✦ {item.badge}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra-Curricular */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '1.5rem' }}>
            Extra-Curricular &amp; Community
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {extracurricular.map((item, i) => (
              <span
                key={i}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-alt)',
                  border: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  transition: 'var(--transition)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#eff6ff';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-alt)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

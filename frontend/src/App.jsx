import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import LiveDemos from './components/LiveDemos';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';
import {
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackExperience,
  fallbackCertifications,
  fallbackAchievements
} from './data/fallbackData';

const API_BASE = '/api';

function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', gap: '1rem',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--primary)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Loading portfolio data...</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ErrorBanner({ message }) {
  return (
    <div style={{
      padding: '1rem 1.5rem',
      background: '#fffbeb',
      border: '1px solid #fef08a',
      borderRadius: 'var(--radius-md)',
      color: '#a16207',
      fontSize: '0.875rem',
      margin: '1rem',
      textAlign: 'center',
    }}>
      ⚠️ Backend API not connected. Showing static content. Start the FastAPI server to enable full functionality.
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'transparent' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, var(--primary), var(--accent))', transition: 'width 0.1s linear' }} />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
        width: '44px', height: '44px', borderRadius: '50%',
        backgroundColor: 'var(--primary)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'var(--shadow-lg)', cursor: 'pointer', border: 'none',
        fontSize: '1.2rem', transition: 'var(--transition)',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [data, setData] = useState({
    profile: fallbackProfile,
    projects: fallbackProjects,
    skills: fallbackSkills,
    experience: fallbackExperience,
    certifications: fallbackCertifications,
    achievements: fallbackAchievements,
  });

  useEffect(() => {
    async function fetchAll() {
      try {
        const [profileRes, projectsRes, skillsRes, expRes, certsRes, achRes] = await Promise.all([
          fetch(`${API_BASE}/profile`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${API_BASE}/projects`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${API_BASE}/skills`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${API_BASE}/experience`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${API_BASE}/certifications`).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch(`${API_BASE}/achievements`).then(r => r.ok ? r.json() : null).catch(() => null),
        ]);
        setData({
          profile: profileRes || fallbackProfile,
          projects: (projectsRes && projectsRes.length > 0) ? projectsRes : fallbackProjects,
          skills: skillsRes || fallbackSkills,
          experience: (expRes && expRes.length > 0) ? expRes : fallbackExperience,
          certifications: (certsRes && certsRes.length > 0) ? certsRes : fallbackCertifications,
          achievements: (achRes && achRes.length > 0) ? achRes : fallbackAchievements,
        });
      } catch (err) {
        console.warn('Backend API offline, displaying fallback data:', err);
        setApiError(false); // Graceful fallback
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      {apiError && <ErrorBanner />}

      {/* About section embedded in Hero */}
      <Hero profile={data.profile} />

      {/* About extended text if present */}
      {data.profile?.about_text && (
        <section id="about" className="section section-alt">
          <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div className="section-header">
              <span className="section-tag">INTRODUCTION</span>
              <h2 className="section-title">About Me</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {(data.profile.focus_areas || []).map((area, i) => (
                <div key={i} className="card" style={{ cursor: 'default' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>{area.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{area.description}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {data.profile.about_text.map((para, i) => (
                <p key={i} style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <Skills skillsData={data.skills} />
      <Experience experiences={data.experience} />
      <Projects projects={data.projects} />
      <LiveDemos />
      <Certifications certifications={data.certifications} />
      <Achievements achievements={data.achievements} />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Live Demos', href: '#demos' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const apiLinks = [
    { name: 'API Documentation', href: '/docs', external: true },
    { name: 'Health Check', href: '/api/health', external: true },
    { name: 'Projects API', href: '/api/projects', external: true },
    { name: 'Skills API', href: '/api/skills', external: true },
    { name: 'Download Resume', href: '/api/resume/download', external: true },
  ];

  return (
    <footer style={{ background: 'var(--secondary)', color: 'rgba(255,255,255,0.8)', padding: '4rem 0 2rem' }}>
      <div className="container">
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#fff' }}>
                VK.
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>Venugopal K</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', maxWidth: '260px' }}>
              Python Full-Stack Developer | AI/ML Engineer | Computer Vision Enthusiast
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: Github, href: 'https://github.com/Venugopal-2005', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/venugopal-k-0bba49287/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:venu170305@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)', transition: 'var(--transition)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>Navigation</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
              {quickLinks.map(link => (
                <a key={link.name} href={link.href} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', transition: 'var(--transition)' }}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.65)')}
                >{link.name}</a>
              ))}
            </div>
          </div>

          {/* API Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>FastAPI Backend</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {apiLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', transition: 'var(--transition)' }}
                  onMouseEnter={e => (e.target.style.color = '#fff')}
                  onMouseLeave={e => (e.target.style.color = 'rgba(255,255,255,0.65)')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>
            © 2026 Venugopal K. All rights reserved.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={13} style={{ color: '#ef4444' }} /> using Python + FastAPI + React.js
          </p>
        </div>
      </div>
    </footer>
  );
}

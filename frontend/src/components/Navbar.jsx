import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Live Demos', href: '#demos' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Achievements', href: '#achievements' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'var(--transition)',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem' }}>
          <span
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'var(--secondary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            VK<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--secondary)', lineHeight: 1.1 }}>Venugopal K</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.05em' }}>PYTHON FULL-STACK</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary btn-sm"
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            <Send size={15} />
            Let's Connect
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-nav-toggle"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--border)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Send size={16} />
            Let's Connect
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

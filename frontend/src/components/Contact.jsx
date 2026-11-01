import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, AlertTriangle, Loader, Phone } from 'lucide-react';

const API_BASE = '/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionId, setSubmissionId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        const details = err?.detail?.[0]?.msg || err?.detail || 'Submission failed. Please try again.';
        throw new Error(details);
      }
      const data = await res.json();
      setSubmissionId(data.submission_id);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    background: 'var(--bg-alt)',
    color: 'var(--text-main)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font-sans)',
  };
  const labelStyle = { fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' };

  const contactLinks = [
    { icon: Mail, label: 'Email', value: 'venu170305@gmail.com', href: 'mailto:venu170305@gmail.com', color: 'var(--primary)' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect Professionally', href: 'https://www.linkedin.com/in/venugopal-k-0bba49287/', color: '#0077b5' },
    { icon: Github, label: 'GitHub', value: 'github.com/Venugopal-2005', href: 'https://github.com/Venugopal-2005', color: '#333' },
    { icon: Phone, label: 'Phone', value: '+91 9480249096', href: 'tel:+919480249096', color: 'var(--success)' },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">WHAT'S NEXT</span>
          <h2 className="section-title">Let's Build Something Great</h2>
          <p className="section-subtitle">
            Open to software engineering roles, internships, and collaborative projects in Python, AI/ML, and backend development.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', maxWidth: '960px', margin: '0 auto' }}>
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--secondary)' }}>Get In Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-alt)',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-alt)'; }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-main)' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--secondary)' }}>Send a Message</h3>

            {status === 'success' && (
              <div style={{ padding: '1.25rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <CheckCircle2 size={20} style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#166534' }}>Message delivered successfully!</div>
                  <div style={{ fontSize: '0.85rem', color: '#15803d' }}>Submission ID: #{submissionId} — I'll get back to you soon!</div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', marginBottom: '1rem', color: '#b91c1c', fontSize: '0.875rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Sarah Connor"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" style={labelStyle}>Subject *</label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Full-Stack Python Role Opportunity"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <div>
                <label htmlFor="contact-message" style={labelStyle}>Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hi Venugopal, I came across your portfolio and would love to discuss..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{ alignSelf: 'flex-start' }}
              >
                {status === 'loading' ? (
                  <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <Send size={18} />
                )}
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}

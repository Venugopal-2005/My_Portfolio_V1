```jsx
import React, { useState } from 'react';
import {
  Award,
  Download,
  Eye,
  FileText,
  Image as ImageIcon,
  X
} from 'lucide-react';

export default function Certifications({ certifications }) {
  const [previewItem, setPreviewItem] = useState(null);

  if (!certifications || certifications.length === 0) return null;

  const categoryColors = {
    'AI & Machine Learning': { bg: '#fdf4ff', text: '#a21caf', border: '#f5d0fe' },
    'Data & Analytics': { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
    'Software Engineering': { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    'Database': { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
    'Industry Experience': { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' },
    'Networking & Security': { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca' },
    'IoT & Systems': { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd' },
    'Methodologies': { bg: '#fefce8', text: '#a16207', border: '#fef08a' },
  };

  const isImage = (filename) =>
    filename && /\.(jpg|jpeg|png)$/i.test(filename);

  // Download certificate using the backend endpoint.
  const handleDownload = (cert) => {
    if (!cert.id) return;

    window.open(
      `/api/certifications/${cert.id}/download`,
      '_blank'
    );
  };

  // Preview images in the existing modal and open PDFs inline.
  const handlePreview = (cert) => {
    if (!cert.id) return;

    const certificateUrl =
      `/api/certifications/${cert.id}/download?inline=true`;

    if (isImage(cert.filename)) {
      setPreviewItem({
        type: 'image',
        url: certificateUrl,
        title: cert.title,
      });
    } else {
      window.open(certificateUrl, '_blank');
    }
  };

  return (
    <section id="certificates" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">CREDENTIALS</span>
          <h2 className="section-title">Certifications &amp; Courses</h2>
          <p className="section-subtitle">
            Professional certifications, academic achievements, and continuous learning milestones
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {certifications.map(cert => {
            const colors =
              categoryColors[cert.category] ||
              categoryColors['Industry Experience'];

            return (
              <div
                key={cert.id}
                className="card"
                style={{
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                {/* Icon and category */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
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
                      <Award size={18} />
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: colors.text,
                        backgroundColor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Title and Issuer */}
                <div>
                  <h3
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--secondary)',
                      lineHeight: 1.4,
                      marginBottom: '0.25rem'
                    }}
                  >
                    {cert.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {cert.issuer}
                    {cert.issue_date && (
                      <span
                        style={{
                          marginLeft: '0.5rem',
                          color: 'var(--text-light)'
                        }}
                      >
                        • {cert.issue_date}
                      </span>
                    )}
                  </p>
                </div>

                {/* Actions */}
                {cert.filename && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: 'auto'
                    }}
                  >
                    <button
                      onClick={() => handlePreview(cert)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                      disabled={!cert.id}
                    >
                      {isImage(cert.filename) ? (
                        <ImageIcon size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                      {isImage(cert.filename) ? 'View' : 'Open'}
                    </button>

                    <button
                      onClick={() => handleDownload(cert)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                      disabled={!cert.id}
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewItem && (
        <div
          className="modal-overlay"
          onClick={() => setPreviewItem(null)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setPreviewItem(null)}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <p
              style={{
                padding: '1rem 3rem 0.5rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--secondary)'
              }}
            >
              {previewItem.title}
            </p>

            <img
              src={previewItem.url}
              alt={previewItem.title}
              style={{
                maxWidth: '85vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = '';
                e.target.alt = 'Image not available';
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
```
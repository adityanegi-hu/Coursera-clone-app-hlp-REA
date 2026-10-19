import React from 'react';
import { Award, CheckCircle, Download, Share2, X, ShieldCheck } from 'lucide-react';

export default function CertificateModal({ course, userState, onClose }) {
  if (!course) return null;

  const certData = userState.certificates.find((c) => c.courseId === course.id) || {
    issueDate: 'October 2026',
    verificationHash: 'COURSERA-VERIFIED-89F12A',
    grade: '98.5%'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cds-modal-overlay">
      <div style={{ maxWidth: '840px', width: '100%', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
        {/* Top Control Bar */}
        <div style={{ background: 'var(--cds-navy)', color: '#ffffff', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <ShieldCheck size={20} color="#00e676" />
            <span>Official Coursera Verified Certificate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#ffffff',
                color: 'var(--cds-navy)',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '0.4rem 0.8rem',
                borderRadius: '4px'
              }}
            >
              <Download size={14} />
              <span>Download PDF / Print</span>
            </button>
            <button onClick={onClose} style={{ color: '#ffffff', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div style={{ padding: '2.5rem' }}>
          <div className="cds-cert-container">
            <div className="cds-cert-seal">
              <Award size={38} />
            </div>

            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--cds-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem' }}>
              {course.partner}
            </div>

            <h1 className="cds-cert-title">Certificate of Completion</h1>
            <p className="cds-cert-subtitle">This is to certify that</p>

            <div className="cds-cert-name">{userState.name}</div>

            <p style={{ color: 'var(--cds-text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              has successfully completed with distinction
            </p>

            <div className="cds-cert-course">{course.title}</div>

            <p style={{ maxWidth: '520px', margin: '0 auto 2.5rem auto', color: 'var(--cds-text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              an online non-credit course authorized by {course.partner} and offered through Coursera. Grade Achieved: <strong>{certData.grade}</strong>.
            </p>

            {/* Signature & Verification Block */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--cds-border-light)' }}>
              <div>
                <div style={{ fontFamily: 'cursive', fontSize: '1.6rem', color: 'var(--cds-navy)', marginBottom: '0.25rem' }}>
                  {course.instructor.name}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cds-text-main)' }}>{course.instructor.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--cds-text-muted)' }}>{course.instructor.title.split('|')[0]}</div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--cds-text-muted)' }}>
                <div>Issued: <strong>{certData.issueDate}</strong></div>
                <div style={{ marginTop: '0.2rem' }}>
                  Verify at: <span style={{ color: 'var(--cds-primary)', fontFamily: 'monospace' }}>coursera.org/verify/{certData.verificationHash}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

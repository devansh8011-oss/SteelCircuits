import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';

export default function CertificationsSection() {
  const { certifications, achievements = [] } = PORTFOLIO_DATA;

  return (
    <section id="certifications" style={{ background: '#f8fafc' }}>
      <div className="section-wrapper" style={{ maxWidth: '900px' }}>

        <div style={{ textCenter: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag">
            <Award size={14} />
            <span>HONORS & CREDENTIALS</span>
          </div>
          <h2 className="section-heading">
            Certifications & Achievements
          </h2>
        </div>

        <div className="light-card cert-card-box">
          {certifications.map((cert, idx) => (
            <div key={`cert-${idx}`} className="cert-item">
              <div className="cert-icon">
                <CheckCircle2 size={22} color="#0ea5e9" />
              </div>
              <div>
                <h3 className="cert-title">{cert.title}</h3>
              </div>
            </div>
          ))}

          {achievements.map((ach, idx) => (
            <div key={`ach-${idx}`} className="cert-item">
              <div className="cert-icon" style={{ background: '#fef3c7' }}>
                <Trophy size={22} color="#f59e0b" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="cert-title">{ach.title}</h3>
              </div>
              <a
                href={ach.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 'auto',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                  color: '#ffffff',
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                  whiteSpace: 'nowrap'
                }}
              >
                {ach.linkLabel}
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

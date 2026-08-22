import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Zap, Camera, User } from 'lucide-react';

export default function AboutSection() {
  const { personal, stats, aboutTags } = PORTFOLIO_DATA;
  const { aboutTitle, aboutBio } = personal;

  return (
    <section id="about" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="section-wrapper">
        <div className="light-card about-grid">
          
          {/* Left Column: Bio & Info */}
          <div>
            <div className="section-tag">
              <Cpu size={14} />
              <span>ROBOTICS & EMBEDDED HARDWARE</span>
            </div>

            <h2 className="section-heading" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              {aboutTitle}
            </h2>

            <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '1.25rem' }}>
              {aboutBio}
            </p>

            <div className="about-tags-row">
              {aboutTags.map((tag, idx) => (
                <span key={idx} className="about-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Curved Photo Placeholder Card */}
          <div>
            <div 
              style={{ 
                position: 'relative', 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)', 
                border: '1px solid #cbd5e1', 
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                textAlign: 'center'
              }}
            >
              {/* Floating Badge (20+ Projects) */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  left: '16px', 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #e2e8f0', 
                  borderRadius: '9999px', 
                  padding: '6px 14px', 
                  fontSize: '0.75rem', 
                  fontWeight: '700', 
                  color: '#0f172a', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontFamily: 'Orbitron'
                }}
              >
                <Zap size={14} color="#f59e0b" fill="#f59e0b" />
                <span>20+ Projects</span>
              </div>

              {/* Center Photo Upload Placeholder Icon */}
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: '#ffffff', 
                  border: '2px dashed #0ea5e9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#0ea5e9',
                  marginBottom: '1rem',
                  boxShadow: '0 6px 16px rgba(14, 165, 233, 0.15)'
                }}
              >
                <User size={38} />
              </div>

              <div style={{ fontFamily: 'Orbitron', fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                DEVANSH GROVER
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'monospace' }}>
                Profile Photo Placeholder
              </div>

              <div 
                style={{ 
                  marginTop: '1.25rem', 
                  fontSize: '0.7rem', 
                  fontFamily: 'Orbitron', 
                  fontWeight: '700', 
                  color: '#0ea5e9',
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Camera size={13} />
                <span>UPLOAD PHOTO HERE</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

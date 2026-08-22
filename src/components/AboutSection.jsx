import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Zap } from 'lucide-react';

// Counts up from 0 to the numeric part of `value` (e.g. "20+") the first time
// it scrolls into view, then keeps the suffix (e.g. "+").
function CountUp({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setDisplay(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1200;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

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
                  <div className="stat-value"><CountUp value={stat.value} /></div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid #cbd5e1',
                background: '#f1f5f9',
                minHeight: '360px'
              }}
            >
              {/* Profile photo — upload your image to public/profile.jpg */}
              <img
                src="/profile.jpg"
                alt={personal.name}
                style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover', display: 'block' }}
              />

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

              {/* Name banner over the bottom of the photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem',
                  background: 'linear-gradient(to top, rgba(15,23,42,0.85), rgba(15,23,42,0))'
                }}
              >
                <div style={{ fontFamily: 'Orbitron', fontWeight: '800', fontSize: '1rem', color: '#ffffff', letterSpacing: '0.03em' }}>
                  DEVANSH GROVER
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', fontFamily: 'monospace', marginTop: '2px' }}>
                  Robotics & Embedded Systems Builder
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Phone, Sparkles } from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function CTAContactSection({ onOpenContact }) {
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer id="contact" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', paddingTop: '4.5rem', paddingBottom: '3rem' }}>
      <div className="section-wrapper" style={{ padding: 0 }}>
        
        {/* Main CTA Card Box */}
        <div className="cta-banner">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f2fe', border: '1px solid #bae6fd', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontFamily: 'Orbitron', fontWeight: '700', color: '#0284c7', marginBottom: '1.25rem' }}>
            <Sparkles size={14} />
            <span>LET'S COLLABORATE</span>
          </div>

          <h2 style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', fontWeight: '800', lineHeight: '1.15', marginBottom: '1rem', color: '#0f172a' }}>
            Ready to Build Next-Gen AI & Robotics Systems?
          </h2>

          <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '640px', marginBottom: '2rem' }}>
            Whether you need custom ESP32 IoT hardware, ROS robotics algorithms, or AI integration — let's connect.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Opens the contact form modal (sends straight to Gmail via FormSubmit) */}
            <button type="button" onClick={onOpenContact} className="btn-gradient" style={{ border: 'none' }}>
              <Mail size={16} />
              <span>CONTACT DEVANSH ↗</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation & Contact Credentials */}
        <div className="footer-grid">
          <div>
            <div className="footer-brand">{personal.name}</div>
            <p className="footer-sub">
              {personal.titleTag} — Robotics & Embedded Systems Builder behind {personal.brandName}. Engineering autonomous robotics, intelligent hardware, and AI applications.
            </p>
          </div>

          <div>
            <div className="footer-heading">NAVIGATION</div>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects & Systems</a></li>
              <li><a href="#playground">AI Twin Playground</a></li>
              <li><a href="#certifications">Certifications</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">CONTACT CREDENTIALS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontFamily: 'monospace', fontSize: '0.88rem', color: '#334155' }}>
              <a href={`mailto:${personal.email}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none' }}>
                <Mail size={16} color="#0ea5e9" />
                <span>{personal.email}</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                <Phone size={16} color="#0ea5e9" />
                <span>{personal.phone}</span>
              </div>
              <a href={personal.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none' }}>
                <GithubIcon style={{ color: '#0ea5e9' }} />
                <span>github.com/devansh8011-oss</span>
              </a>
              <a href={personal.instagram} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none' }}>
                <InstagramIcon style={{ color: '#0ea5e9' }} />
                <span>@devansh999ai</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Devansh Grover · SteelCircuits. All rights reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href={personal.github} target="_blank" rel="noreferrer" style={{ color: '#64748b', display: 'flex' }} aria-label="GitHub">
              <GithubIcon width="18" height="18" />
            </a>
            <a href={personal.instagram} target="_blank" rel="noreferrer" style={{ color: '#64748b', display: 'flex' }} aria-label="Instagram">
              <InstagramIcon width="18" height="18" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

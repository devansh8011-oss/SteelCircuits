import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Bot, Mail } from 'lucide-react';

export default function Navbar({ onOpenAITwin, onOpenContact }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="nav-container">

        {/* Brand Name & Subtitle */}
        <a href="#home" className="nav-brand">
          <span className="nav-brand-name">
            {PORTFOLIO_DATA.personal.name}
          </span>
          <span className="nav-brand-sub">
            {PORTFOLIO_DATA.personal.titleTag}
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <button onClick={() => scrollTo('home')} className="nav-link">
            HOME
          </button>
          <button onClick={() => scrollTo('projects')} className="nav-link">
            PROJECTS
          </button>
          <button onClick={() => scrollTo('certifications')} className="nav-link">
            CERTIFICATIONS
          </button>
        </nav>

        {/* Right Side Actions: Contact + AI Twin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onOpenContact} className="btn-outline">
            <Mail size={16} />
            <span>CONTACT</span>
          </button>
          <button onClick={onOpenAITwin} className="btn-gradient btn-fluid">
            <Bot size={18} />
            <span>AI TWIN</span>
          </button>
        </div>

      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Bot, Mail, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAITwin, onOpenContact }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
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

        {/* Desktop Navigation Links */}
        <nav className="nav-menu">
          <button onClick={() => scrollTo('home')} className="nav-link">HOME</button>
          <button onClick={() => scrollTo('projects')} className="nav-link">PROJECTS</button>
          <button onClick={() => scrollTo('certifications')} className="nav-link">CERTIFICATIONS</button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="nav-actions">
          <button onClick={onOpenContact} className="btn-outline">
            <Mail size={16} />
            <span>CONTACT</span>
          </button>
          <button onClick={onOpenAITwin} className="btn-gradient btn-fluid">
            <Bot size={18} />
            <span>AI TWIN</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {menuOpen && (
        <div className="nav-mobile-panel">
          <button onClick={() => scrollTo('home')} className="nav-link">HOME</button>
          <button onClick={() => scrollTo('projects')} className="nav-link">PROJECTS</button>
          <button onClick={() => scrollTo('certifications')} className="nav-link">CERTIFICATIONS</button>
          <button
            onClick={() => { setMenuOpen(false); onOpenContact(); }}
            className="btn-outline"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Mail size={16} />
            <span>CONTACT</span>
          </button>
          <button
            onClick={() => { setMenuOpen(false); onOpenAITwin(); }}
            className="btn-gradient btn-fluid"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Bot size={18} />
            <span>AI TWIN</span>
          </button>
        </div>
      )}
    </header>
  );
}

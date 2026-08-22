import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Bot, ArrowUpRight, Move, Sparkles } from 'lucide-react';

export default function Hero({ onOpenAITwin }) {
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const disciplines = PORTFOLIO_DATA.rotatingDisciplines;

  useEffect(() => {
    const currentFullText = disciplines[disciplineIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setDisciplineIndex((prev) => (prev + 1) % disciplines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, disciplineIndex, disciplines]);

  return (
    <section id="home" className="hero-container">
      
      {/* Left Column: Headline & Controls */}
      <div>
        <div className="hero-badge">
          <span className="dot-pulse"></span>
          <span>Available for Opportunities</span>
        </div>

        <h1 className="hero-title font-orbitron">
          Engineering <br />
          <span className="text-gradient">
            {displayText}
          </span>
          <span className="cursor-blink"></span>
        </h1>

        {/* Updated Subtitle: Removed "and decentralized Web3 systems" */}
        <p className="hero-sub">
          Building autonomous robotics and intelligent IoT hardware.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button onClick={onOpenAITwin} className="btn-gradient btn-fluid">
            <Bot size={20} />
            <span>CHAT WITH AI TWIN</span>
          </button>

          <a href="#contact" className="btn-outline">
            <span>CONTACT DEVANSH</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Right Column: Interactive 3D Robot Card */}
      <div>
        <div className="light-card robot-card">
          <div className="robot-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Move size={15} color="#0ea5e9" />
              <span>Interactive 3D Robot · Drag to Move</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
              <span className="dot-pulse" style={{ background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
              <span>LIVE 3D</span>
            </div>
          </div>

          <div className="robot-frame">
            <iframe
              src="https://my.spline.design/nexbotrobotcharacterconcept-z1ImevieWLidB4QDWTRDxLSr/"
              title="Interactive 3D Robot"
              loading="lazy"
            ></iframe>
          </div>

          <div className="robot-card-footer">
            <span>STEELCIRCUITS ROBOTICS LAB</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0ea5e9' }}>
              <Sparkles size={12} />
              <span>3D SHADER V2.0</span>
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}

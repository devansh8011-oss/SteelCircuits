import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import AITwinPlayground from './components/AITwinPlayground';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import CTAContactSection from './components/CTAContactSection';
import AITwinWidget from './components/AITwinWidget';
import ContactModal from './components/ContactModal';

export default function App() {
  const [isAITwinOpen, setIsAITwinOpen] = useState(false);
  const [aiTwinCentered, setAiTwinCentered] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Opened from the navbar "AI TWIN" button or the hero "CHAT WITH AI TWIN"
  // button -> show the chat as a centered dialogue box.
  const openAITwinCentered = () => {
    setAiTwinCentered(true);
    setIsAITwinOpen(true);
  };

  const openContact = () => setIsContactOpen(true);

  // Scroll-reveal: fade/slide blocks in as they enter the viewport and out as
  // they leave. Classes are added by JS so the site stays fully visible if JS
  // is disabled (progressive enhancement).
  useEffect(() => {
    const selector =
      '.light-card, .section-tag, .section-heading, .hero-badge, .hero-title, .hero-sub, .hero-cta-group, .cta-banner, .projects-header-row';
    const els = Array.from(document.querySelectorAll(selector));
    if (!('IntersectionObserver' in window) || els.length === 0) return;

    els.forEach((el) => el.classList.add('reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-in');
          else entry.target.classList.remove('reveal-in');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      {/* Sticky Header Navbar */}
      <Navbar onOpenAITwin={openAITwinCentered} onOpenContact={openContact} />

      {/* Main Content Layout */}
      <main>
        <Hero onOpenAITwin={openAITwinCentered} />
        <AboutSection />
        <AITwinPlayground />
        <ProjectsSection />
        <CertificationsSection />
        <CTAContactSection onOpenContact={openContact} />
      </main>

      {/* AI Twin chat: centered dialogue (nav/hero) OR bottom-right corner popup (floating button) */}
      <AITwinWidget
        isOpen={isAITwinOpen}
        setIsOpen={setIsAITwinOpen}
        centered={aiTwinCentered}
        setCentered={setAiTwinCentered}
      />

      {/* Contact form popup (navbar Contact button + footer button) */}
      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

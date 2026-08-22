import React, { useState } from 'react';
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

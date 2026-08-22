import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { LayoutGrid, X, ArrowUpRight, CheckCircle2, PlayCircle, Cpu } from 'lucide-react';

export default function ProjectsSection() {
  const { projects, projectCategories } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === activeCategory);

  const thumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <section id="projects" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="section-wrapper">

        <div className="projects-header-row">
          <div>
            <div className="section-tag">
              <LayoutGrid size={14} />
              <span>ENGINEERING PORTFOLIO</span>
            </div>
            <h2 className="section-heading">Featured Systems & Projects</h2>
          </div>

          <div className="categories-flex">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="light-card project-card"
              onClick={() => setSelectedProject(project)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                {/* Video thumbnail header */}
                <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '1rem 1rem 0 0', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img
                    src={thumb(project.youtubeId)}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '0.68rem', fontFamily: 'Orbitron', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px' }}>
                    {project.category}
                  </div>
                  {/* Play glyph */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <PlayCircle size={54} color="#ffffff" style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))', opacity: 0.92 }} />
                  </div>
                  {/* Open arrow */}
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(14,165,233,0.35)' }}>
                    <ArrowUpRight size={18} color="#ffffff" />
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-title text-gradient">{project.title}</h3>
                  <p
                    className="project-summary"
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {project.desc}
                  </p>
                </div>
              </div>

              <div className="project-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={14} />
                  <span>{project.category}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>VIEW DETAILS & DEMO</span>
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5vh 1rem', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', overflowY: 'auto' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#ffffff', borderRadius: '1.5rem', maxWidth: '720px', width: '100%', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.4)', position: 'relative', border: '1px solid #e2e8f0' }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
              style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10, background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '50%', padding: '7px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex' }}
            >
              <X size={18} color="#0f172a" />
            </button>

            {/* Embedded YouTube player */}
            <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#f1f5f9' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedProject.youtubeId}`}
                title={selectedProject.title}
                style={{ border: 'none', display: 'block' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: '#0ea5e9', marginBottom: '0.5rem' }}>
                {selectedProject.category} · PROJECT SHOWCASE
              </div>
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', lineHeight: 1.15 }}>
                {selectedProject.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedProject.desc}
              </p>

              {/* Overview */}
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '0.9rem', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#b45309', marginBottom: '0.5rem' }}>
                  OVERVIEW
                </div>
                <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.65 }}>{selectedProject.overview}</p>
              </div>

              {/* How It Works */}
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.9rem', padding: '1.1rem 1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#1d4ed8', marginBottom: '0.5rem' }}>
                  HOW IT WORKS
                </div>
                <p style={{ color: '#334155', fontSize: '0.92rem', lineHeight: 1.65 }}>{selectedProject.working}</p>
              </div>

              {/* Key Components */}
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: '#0f172a', marginBottom: '0.75rem' }}>
                KEY COMPONENTS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.6rem' }}>
                {selectedProject.components.map((c, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.6rem', padding: '0.6rem 0.8rem' }}>
                    <CheckCircle2 size={16} color="#0ea5e9" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

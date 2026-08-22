import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactModal({ open, onClose }) {
  const { personal } = PORTFOLIO_DATA;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Close on Escape key + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New portfolio message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '5vh 1rem', overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff', borderRadius: '1.5rem', width: '100%', maxWidth: '560px',
          padding: '2.5rem', position: 'relative',
          boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.35)',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none',
            border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex',
          }}
        >
          <X size={22} />
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
            }}>
              <CheckCircle2 size={38} color="#16a34a" />
            </div>
            <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              Message sent!
            </h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Thanks for reaching out — your message is on its way to my inbox. I'll get back to you soon.
            </p>
            <button onClick={onClose} className="btn-gradient" style={{ border: 'none' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#0ea5e9', marginBottom: '0.5rem' }}>
              DIRECT CONTACT
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: '0.6rem' }}>
              Let's turn concepts into reality
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Messages sent here go straight to <strong style={{ color: '#0f172a' }}>{personal.email}</strong>.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>YOUR NAME</label>
              <input
                className="playground-input" name="name" value={form.name} onChange={handleChange}
                placeholder="e.g. Alex Morgan" required
              />

              <label style={labelStyle}>YOUR EMAIL</label>
              <input
                className="playground-input" type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="e.g. alex@company.com" required
              />

              <label style={labelStyle}>MESSAGE</label>
              <textarea
                className="playground-input" name="message" value={form.message} onChange={handleChange}
                placeholder="Share details about your project or technical challenge..." rows={4}
                style={{ resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }} required
              />

              {status === 'error' && (
                <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Something went wrong sending your message. Please try again, or email {personal.email} directly.
                </p>
              )}

              <button
                type="submit" className="btn-gradient" disabled={status === 'sending'}
                style={{ border: 'none', width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.75 : 1 }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>SEND MESSAGE TO DEVANSH</span>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontFamily: 'Orbitron, monospace',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  color: '#334155',
  marginBottom: '0.5rem',
};

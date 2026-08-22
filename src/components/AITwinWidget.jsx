import React, { useState, useRef, useEffect } from 'react';
import { queryAITwin } from '../services/aiTwinApi';
import { Bot, X, Mic, ArrowUp, Loader2 } from 'lucide-react';

const GREETING =
  "Hello! I'm Devansh's AI Twin. Ask me anything about his robotics projects, embedded systems, computer vision, or n8n automation workflows.";

export default function AITwinWidget({ isOpen, setIsOpen, centered = false, setCentered }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Lock page scroll while the centered dialogue is open + close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    let prev;
    if (centered) {
      prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      if (centered) document.body.style.overflow = prev;
    };
  }, [isOpen, centered, setIsOpen]);

  const send = async (textToSend) => {
    const query = (textToSend ?? input).trim();
    if (!query || loading) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: query }]);
    setInput('');
    setLoading(true);

    try {
      const reply = await queryAITwin(query);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'bot', text: "⚠️ Couldn't reach the AI Twin server right now. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const toggleCorner = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setCentered && setCentered(false);
      setIsOpen(true);
    }
  };

  const panelBox = {
    background: '#ffffff',
    borderRadius: '1.25rem',
    boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.35)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const cornerStyle = {
    position: 'fixed', bottom: '100px', right: '24px', zIndex: 1000,
    width: 'min(calc(100vw - 32px), 400px)', height: 'min(76vh, 580px)',
    ...panelBox,
  };

  const centeredStyle = {
    width: 'min(calc(100vw - 32px), 520px)', height: 'min(82vh, 640px)',
    ...panelBox,
  };

  // Shared chat UI (header, messages, input) used by both presentations.
  const panelInner = (
    <>
      {/* Header */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #eef2f7', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 800, fontSize: '1rem', color: '#0f172a', lineHeight: 1.1 }}>
              AI Twin Chat
            </div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontWeight: 700, fontSize: '0.66rem', letterSpacing: '0.12em', color: '#0ea5e9', marginTop: '2px' }}>
              AI NEURONS ACTIVE
            </div>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
          <X size={22} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                maxWidth: '85%', padding: '0.75rem 1rem', borderRadius: '1rem',
                fontSize: '0.9rem', lineHeight: 1.55,
                ...(m.sender === 'user'
                  ? { background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', color: '#ffffff', borderBottomRightRadius: '4px' }
                  : { background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', borderBottomLeftRadius: '4px' }),
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
            <Loader2 size={16} className="spin" color="#0ea5e9" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '0.9rem', borderTop: '1px solid #eef2f7', background: '#ffffff' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '1rem', background: '#f8fafc', padding: '0.75rem 0.9rem' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask AI Twin anything..."
            style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', background: 'transparent', fontSize: '0.9rem', color: '#0f172a', fontFamily: 'inherit', maxHeight: '96px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>Shift + Enter for new line</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mic size={18} color="#94a3b8" />
              <button
                onClick={() => send()}
                disabled={loading}
                aria-label="Send message"
                style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', cursor: input.trim() ? 'pointer' : 'default', background: input.trim() ? 'linear-gradient(135deg, #0ea5e9, #6366f1)' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <ArrowUp size={18} color="#ffffff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Persistent floating launcher — always bottom-right, opens the CORNER popup */}
      <button
        onClick={toggleCorner}
        aria-label={isOpen ? 'Close AI Twin Chat' : 'Open AI Twin Chat'}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1001,
          width: '60px', height: '60px', borderRadius: '50%', background: '#0d1b2a',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 12px 28px rgba(2, 6, 23, 0.35)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isOpen ? <X size={26} color="#38bdf8" /> : <Bot size={28} color="#38bdf8" />}
      </button>

      {/* Chat panel: centered dialogue (nav/hero) OR bottom-right corner popup (floating button) */}
      {isOpen && (
        centered ? (
          <div
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <div onClick={(e) => e.stopPropagation()} style={centeredStyle}>
              {panelInner}
            </div>
          </div>
        ) : (
          <div style={cornerStyle}>
            {panelInner}
          </div>
        )
      )}
    </>
  );
}

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { queryAITwin } from '../services/aiTwinApi';
import { Bot, Send, ShieldCheck, Cpu, Loader2 } from 'lucide-react';

export default function AITwinPlayground() {
  const [inputQuery, setInputQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasQueried, setHasQueried] = useState(false);

  const chips = PORTFOLIO_DATA.playgroundChips;

  const handleChipClick = (chipText) => {
    const cleanPrompt = chipText.replace(/^\+\s*/, '');
    setInputQuery(cleanPrompt);
    runInference(cleanPrompt);
  };

  const runInference = async (queryToRun) => {
    const query = queryToRun || inputQuery;
    if (!query.trim() || loading) return;

    setLoading(true);
    setHasQueried(true);
    setResponse('');

    try {
      const replyText = await queryAITwin(query);
      setResponse(replyText);
    } catch (err) {
      setResponse("Sorry, unable to connect to Devansh's AI Twin at the moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" style={{ background: '#f8fafc' }}>
      <div className="section-wrapper">
        <div className="light-card playground-card">
          
          <div className="playground-header">
            <div>
              <h2 className="section-heading" style={{ fontSize: '1.8rem', margin: 0 }}>
                AI Twin Live Playground
              </h2>
              <div style={{ display: 'flex', itemsCenter: 'center', gap: '6px', marginTop: '4px' }}>
                <span className="dot-pulse"></span>
                <span style={{ fontFamily: 'Orbitron', fontSize: '0.72rem', fontWeight: '700', color: '#0ea5e9' }}>
                  AI NEURONS ACTIVE
                </span>
              </div>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', color: '#475569', fontFamily: 'Orbitron' }}>
              <ShieldCheck size={16} color="#0ea5e9" />
              <span>Clean Output</span>
            </div>
          </div>

          <div className="playground-chips">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="chip-btn"
              >
                {chip}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runInference()}
            placeholder="Ask about AI, IoT, Robotics, Web3..."
            className="playground-input"
          />

          {hasQueried && (
            <div className="playground-screen">
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', marginBottom: '8px', borderBottom: '1px solid #e2e8f0', fontSize: '0.72rem', color: '#0284c7', fontFamily: 'Orbitron' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bot size={16} />
                  <span>DEVANSH'S AI TWIN INFERENCE ENGINE</span>
                </span>
                <span>STATUS: {loading ? 'STREAMING...' : 'READY'}</span>
              </div>

              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', padding: '10px 0' }}>
                  <Loader2 size={18} className="animate-spin" color="#0284c7" />
                  <span>Processing neural response vectors...</span>
                </div>
              ) : (
                <div style={{ color: '#334155', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {response}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
              <Cpu size={16} color="#0ea5e9" />
              <span>Press Enter to stream response</span>
            </div>

            <button
              onClick={() => runInference()}
              disabled={loading}
              className="btn-gradient"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              <span>RUN INFERENCE</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

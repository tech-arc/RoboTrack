import React, { useState } from 'react';
import { X, Copy, Check, Code2, Terminal, Sparkles } from 'lucide-react';
import { ARDUINO_SOURCE_CODE, STATE_TO_CODE_LINES } from '../../data/arduinoSource';

export default function ArduinoCodeModal({ isOpen, onClose, currentState = 'FORWARD' }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ARDUINO_SOURCE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeRange = STATE_TO_CODE_LINES[currentState] || STATE_TO_CODE_LINES.FORWARD;
  const lines = ARDUINO_SOURCE_CODE.split('\n');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem',
    }}>
      <div className="glass-panel-elevated" style={{
        maxWidth: '900px',
        width: '100%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid var(--border-accent)',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Terminal color="#38bdf8" size={22} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                  LineFollower_L298N.ino
                </span>
                <span className="badge badge-emerald font-mono">Arduino C++</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Real-Time Execution Synced with Robot Physics
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Code'}
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Live Execution Status Banner */}
        <div style={{
          padding: '0.6rem 1.5rem',
          backgroundColor: 'rgba(56, 189, 248, 0.08)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="#38bdf8" />
            <span style={{ color: '#cbd5e1' }}>
              Current Subroutine Executing: <strong style={{ color: '#38bdf8' }}>{currentState}</strong>
            </span>
          </div>
          <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>
            Active Lines: {activeRange.start}–{activeRange.end} &amp; {activeRange.funcStart}–{activeRange.funcEnd}
          </span>
        </div>

        {/* Code Editor Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#070a12',
          padding: '1rem 0',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.82rem',
          lineHeight: '1.6',
        }}>
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isDecisionActive = lineNum >= activeRange.start && lineNum <= activeRange.end;
            const isFuncActive = lineNum >= activeRange.funcStart && lineNum <= activeRange.funcEnd;
            const isHighlighted = isDecisionActive || isFuncActive;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  backgroundColor: isHighlighted ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  borderLeft: isHighlighted ? '3px solid #38bdf8' : '3px solid transparent',
                  padding: '0 1rem',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Line number */}
                <span style={{
                  width: '38px',
                  color: isHighlighted ? '#38bdf8' : '#475569',
                  textAlign: 'right',
                  paddingRight: '1rem',
                  userSelect: 'none',
                  flexShrink: 0,
                  fontWeight: isHighlighted ? 700 : 400,
                }}>
                  {lineNum}
                </span>

                {/* Code line */}
                <span style={{
                  color: isHighlighted 
                    ? '#ffffff' 
                    : line.trim().startsWith('//') 
                    ? '#64748b' 
                    : line.includes('digitalWrite') || line.includes('analogWrite') || line.includes('pinMode')
                    ? '#38bdf8'
                    : line.includes('const int') || line.includes('void') || line.includes('if') || line.includes('else')
                    ? '#a855f7'
                    : line.includes('HIGH') || line.includes('LOW') || line.includes('INPUT') || line.includes('OUTPUT')
                    ? '#eab308'
                    : '#cbd5e1',
                  fontWeight: isHighlighted ? 600 : 400,
                  whiteSpace: 'pre-wrap',
                }}>
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

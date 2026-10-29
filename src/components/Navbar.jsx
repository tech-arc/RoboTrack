import React from 'react';
import { 
  Bot, 
  Wrench, 
  Play, 
  Cpu, 
  Maximize, 
  Minimize, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export default function Navbar({ 
  currentMode = 'assembly', 
  onSelectMode, 
  wiringCompletion = 0 
}) {
  const isFullyWired = wiringCompletion === 100;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header style={{
      height: '60px',
      backgroundColor: 'rgba(11, 15, 25, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.25rem',
      zIndex: 50,
      userSelect: 'none',
    }}>
      {/* Brand & Project Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--glow-cyan)',
        }}>
          <Bot size={22} color="#38bdf8" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              RoboTrack <span style={{ color: '#38bdf8' }}>IoT</span>
            </h1>
            <span className="badge badge-cyan font-mono" style={{ fontSize: '0.65rem' }}>
              SIMULATOR v2.4
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
            Arduino Uno • L298N Dual H-Bridge • TCRT5000 IR System
          </p>
        </div>
      </div>

      {/* Main Mode Switcher Segmented Control */}
      <div className="glass-panel" style={{
        display: 'flex',
        padding: '3px',
        borderRadius: '10px',
        border: '1px solid var(--border-medium)',
      }}>
        <button
          onClick={() => onSelectMode('assembly')}
          className="btn btn-sm"
          style={{
            backgroundColor: currentMode === 'assembly' ? '#0284c7' : 'transparent',
            color: currentMode === 'assembly' ? '#ffffff' : '#94a3b8',
            boxShadow: currentMode === 'assembly' ? '0 2px 10px rgba(2, 132, 199, 0.5)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <Wrench size={15} />
          <span>Assembly &amp; Wiring Mode</span>
          {isFullyWired ? (
            <CheckCircle2 size={14} color="#34d399" />
          ) : (
            <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>({wiringCompletion}%)</span>
          )}
        </button>

        <button
          onClick={() => onSelectMode('simulation')}
          className="btn btn-sm"
          style={{
            backgroundColor: currentMode === 'simulation' ? '#059669' : 'transparent',
            color: currentMode === 'simulation' ? '#ffffff' : '#94a3b8',
            boxShadow: currentMode === 'simulation' ? '0 2px 10px rgba(5, 150, 105, 0.5)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
          }}
        >
          <Play size={15} fill={currentMode === 'simulation' ? 'currentColor' : 'none'} />
          <span>Live Simulation Mode</span>
        </button>
      </div>

      {/* Right Utility Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleFullscreen}
          className="btn btn-secondary btn-sm"
          title="Toggle Fullscreen presentation mode"
          style={{ padding: '0.45rem 0.65rem' }}
        >
          <Maximize size={15} />
        </button>
      </div>
    </header>
  );
}

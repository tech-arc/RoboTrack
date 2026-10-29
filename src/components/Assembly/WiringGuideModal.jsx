import React from 'react';
import { X, CheckCircle, AlertTriangle, Cpu, Zap, Radio } from 'lucide-react';
import { REQUIRED_CIRCUITS } from '../../data/pinConnections';

export default function WiringGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem',
    }}>
      <div className="glass-panel-elevated" style={{
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        border: '1px solid var(--border-accent)',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cpu className="text-accent" style={{ color: '#38bdf8' }} size={28} />
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                Hardware Schematic & Circuit Reference Guide
              </h2>
              <p style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                Complete pinout mapping for Arduino Uno, L298N Motor Driver, and Dual TCRT5000 IR Sensors
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Critical Hardware Note */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          marginBottom: '1.5rem'
        }}>
          <AlertTriangle color="#f59e0b" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>
            <strong style={{ color: '#fbbf24' }}>Critical Engineering Note (Common Ground):</strong>
            {" "}The Arduino GND and the L298N Driver GND must be physically connected together. Without a shared common ground reference, the logic signals (IN1-IN4, PWM) will float, causing erratic motor twitching or total failure to respond.
          </div>
        </div>

        {/* Pinout Table */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
          textAlign: 'left',
          marginBottom: '1.5rem'
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-medium)', color: '#94a3b8' }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Subsystem</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Source Pin</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Target Pin</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Signal Type</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Functional Role</th>
            </tr>
          </thead>
          <tbody>
            {REQUIRED_CIRCUITS.map((circ, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#f8fafc' }}>
                  {circ.name}
                </td>
                <td style={{ padding: '0.6rem 0.5rem', fontFamily: 'monospace', color: '#38bdf8' }}>
                  {circ.from.toUpperCase()}
                </td>
                <td style={{ padding: '0.6rem 0.5rem', fontFamily: 'monospace', color: '#34d399' }}>
                  {circ.to.toUpperCase()}
                </td>
                <td style={{ padding: '0.6rem 0.5rem' }}>
                  <span className={`badge ${circ.id.includes('gnd') ? 'badge-rose' : circ.id.includes('vcc') || circ.id.includes('bat') ? 'badge-amber' : 'badge-cyan'}`}>
                    {circ.id.includes('gnd') ? 'GND' : circ.id.includes('vcc') || circ.id.includes('bat') ? 'POWER' : 'LOGIC'}
                  </span>
                </td>
                <td style={{ padding: '0.6rem 0.5rem', color: '#94a3b8' }}>
                  {circ.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button onClick={onClose} className="btn btn-primary">
            Understood & Return to Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

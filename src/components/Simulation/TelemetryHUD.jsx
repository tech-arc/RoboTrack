import React from 'react';
import { Activity, Gauge, Compass, Radio, Code2 } from 'lucide-react';

export default function TelemetryHUD({ telemetry = {}, onOpenCodeModal }) {
  const {
    state = 'FORWARD',
    leftSensor = false,
    rightSensor = false,
    leftAnalog = 0.1,
    rightAnalog = 0.1,
    motorLeft = 0,
    motorRight = 0,
    posX = 450,
    posY = 120,
    angleDeg = 0,
  } = telemetry;

  const getStateColor = (s) => {
    switch (s) {
      case 'FORWARD': return { bg: 'badge-emerald', label: 'FORWARD', text: '#34d399' };
      case 'TURN_LEFT': return { bg: 'badge-amber', label: 'PIVOT LEFT', text: '#fbbf24' };
      case 'TURN_RIGHT': return { bg: 'badge-cyan', label: 'PIVOT RIGHT', text: '#38bdf8' };
      case 'INTERSECTION': return { bg: 'badge-rose', label: 'CROSS JUNCTION', text: '#fb7185' };
      default: return { bg: 'badge-cyan', label: s, text: '#38bdf8' };
    }
  };

  const stateInfo = getStateColor(state);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* State & Decision Banner */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Activity size={14} color="#38bdf8" />
            CONTROLLER STATE
          </span>
          <span className={`badge ${stateInfo.bg}`}>
            {stateInfo.label}
          </span>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
          {state === 'FORWARD' && 'Both IR sensors detect white. Maintaining straight drive.'}
          {state === 'TURN_LEFT' && 'Left IR detects black line. Veered right; pivoting left.'}
          {state === 'TURN_RIGHT' && 'Right IR detects black line. Veered left; pivoting right.'}
          {state === 'INTERSECTION' && 'Both IR sensors detect black line. Crossing junction.'}
        </div>
      </div>

      {/* TCRT5000 Dual IR Sensor Real-Time Readout */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Radio size={14} color="#10b981" />
            OPTICAL SENSORS (TCRT5000)
          </span>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Digital & Analog</span>
        </div>

        {/* Left Sensor Row */}
        <div style={{ marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
            <span style={{ color: '#cbd5e1' }}>Left IR (Pin D2)</span>
            <span style={{ 
              fontWeight: 700, 
              color: leftSensor ? '#ef4444' : '#10b981', 
              fontFamily: 'monospace' 
            }}>
              {leftSensor ? '1 (BLACK LINE)' : '0 (WHITE)'}
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.round(leftAnalog * 100)}%`, 
              backgroundColor: leftSensor ? '#ef4444' : '#38bdf8',
              transition: 'width 0.1s ease',
            }} />
          </div>
        </div>

        {/* Right Sensor Row */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
            <span style={{ color: '#cbd5e1' }}>Right IR (Pin D3)</span>
            <span style={{ 
              fontWeight: 700, 
              color: rightSensor ? '#ef4444' : '#10b981', 
              fontFamily: 'monospace' 
            }}>
              {rightSensor ? '1 (BLACK LINE)' : '0 (WHITE)'}
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.round(rightAnalog * 100)}%`, 
              backgroundColor: rightSensor ? '#ef4444' : '#38bdf8',
              transition: 'width 0.1s ease',
            }} />
          </div>
        </div>
      </div>

      {/* L298N Motor Driver Actuator Speeds */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Gauge size={14} color="#f59e0b" />
            L298N MOTOR PWM CHANNELS
          </span>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>H-Bridge</span>
        </div>

        {/* Left Motor PWM */}
        <div style={{ marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
            <span style={{ color: '#cbd5e1' }}>Left Motor (ENA/D5)</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600, color: motorLeft < 0 ? '#fb7185' : '#34d399' }}>
              {motorLeft < 0 ? 'REV ' : 'FWD '} {Math.round(Math.abs(motorLeft) * 75)} PWM
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.min(100, Math.round((Math.abs(motorLeft) / 4) * 100))}%`, 
              backgroundColor: motorLeft < 0 ? '#f43f5e' : '#10b981',
              transition: 'width 0.1s ease',
            }} />
          </div>
        </div>

        {/* Right Motor PWM */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.25rem' }}>
            <span style={{ color: '#cbd5e1' }}>Right Motor (ENB/D10)</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600, color: motorRight < 0 ? '#fb7185' : '#34d399' }}>
              {motorRight < 0 ? 'REV ' : 'FWD '} {Math.round(Math.abs(motorRight) * 75)} PWM
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: `${Math.min(100, Math.round((Math.abs(motorRight) / 4) * 100))}%`, 
              backgroundColor: motorRight < 0 ? '#f43f5e' : '#10b981',
              transition: 'width 0.1s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Odometry & Kinematics */}
      <div className="glass-panel" style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Compass size={14} color="#a855f7" />
            ROBOT ODOMETRY
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>POS X</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: '#f8fafc' }}>{posX}px</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>POS Y</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: '#f8fafc' }}>{posY}px</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>HEADING</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: '#38bdf8' }}>{angleDeg}°</div>
          </div>
        </div>
      </div>

      {/* Arduino Code Real-Time Link CTA */}
      <button 
        onClick={onOpenCodeModal}
        className="btn btn-secondary"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        <Code2 size={16} color="#38bdf8" />
        <span>Inspect Synchronized Arduino C++</span>
      </button>
    </div>
  );
}

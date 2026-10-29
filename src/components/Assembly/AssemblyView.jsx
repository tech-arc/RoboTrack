import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Wand2, 
  BookOpen, 
  Play, 
  Sparkles,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

import ArduinoUnoSVG from './ComponentSVGs/ArduinoUnoSVG';
import L298NDriverSVG from './ComponentSVGs/L298NDriverSVG';
import IRSensorSVG from './ComponentSVGs/IRSensorSVG';
import DCMotorSVG from './ComponentSVGs/DCMotorSVG';
import BatteryPackSVG from './ComponentSVGs/BatteryPackSVG';
import WiringCanvas from './WiringCanvas';
import WiringGuideModal from './WiringGuideModal';

import { COMPONENTS_DATA, REQUIRED_CIRCUITS, WIRE_COLORS, isCircuitMatch } from '../../data/pinConnections';
import { soundEngine } from '../../utils/soundEngine';

export default function AssemblyView({ onSwitchToSimulation, wiringState, setWiringState }) {
  const [components] = useState(COMPONENTS_DATA);
  const [activePin, setActivePin] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedColor, setSelectedColor] = useState(WIRE_COLORS[0].hex);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'specs'

  const workbenchRef = useRef(null);

  const { wires = [] } = wiringState;

  // Track mouse coordinates over the workbench
  const handleMouseMove = (e) => {
    if (!workbenchRef.current) return;
    const rect = workbenchRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Absolute coordinate lookup for pins
  const getPinAbsolutePos = useCallback((pinId) => {
    for (const compKey in components) {
      const comp = components[compKey];
      const foundPin = comp.pins.find((p) => p.id === pinId);
      if (foundPin) {
        return {
          x: comp.initialPos.x + foundPin.x,
          y: comp.initialPos.y + foundPin.y,
        };
      }
    }
    return null;
  }, [components]);

  // Handle pin click to start or complete wire
  const handlePinClick = (pin, compId) => {
    soundEngine.playPinClick();

    if (!activePin) {
      // Start wire
      setActivePin({ ...pin, compId });
    } else {
      // Trying to connect to self
      if (activePin.id === pin.id) {
        setActivePin(null);
        return;
      }

      // Check if wire already exists between these pins
      const alreadyConnected = wires.some(
        (w) => (w.fromPinId === activePin.id && w.toPinId === pin.id) ||
               (w.fromPinId === pin.id && w.toPinId === activePin.id)
      );

      if (!alreadyConnected) {
        const newWire = {
          id: `wire_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          fromPinId: activePin.id,
          toPinId: pin.id,
          color: selectedColor,
        };

        const updatedWires = [...wires, newWire];
        setWiringState(prev => ({ ...prev, wires: updatedWires }));

        // Check if all circuits are now complete
        const completedCount = REQUIRED_CIRCUITS.filter(circ => 
          updatedWires.some(wire => isCircuitMatch(wire, circ))
        ).length;

        if (completedCount === REQUIRED_CIRCUITS.length) {
          soundEngine.playSuccessChime();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }

      setActivePin(null);
    }
  };

  // Delete specific wire
  const handleDeleteWire = (wireId) => {
    setWiringState(prev => ({
      ...prev,
      wires: prev.wires.filter(w => w.id !== wireId)
    }));
  };

  // Clear all wires
  const handleClearAll = () => {
    if (window.confirm('Clear all jumper wire connections?')) {
      setWiringState(prev => ({ ...prev, wires: [] }));
      setActivePin(null);
    }
  };

  // Auto-Wire all required connections for quick demonstration
  const handleAutoWire = () => {
    const autoWires = REQUIRED_CIRCUITS.map((circ, idx) => ({
      id: `auto_wire_${idx}`,
      fromPinId: circ.from,
      toPinId: circ.to,
      color: circ.color,
    }));

    setWiringState(prev => ({ ...prev, wires: autoWires }));
    soundEngine.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Connected Pin IDs set
  const connectedPinIds = new Set();
  wires.forEach(w => {
    connectedPinIds.add(w.fromPinId);
    connectedPinIds.add(w.toPinId);
  });

  // Calculate completion percentage
  const completedCircuits = REQUIRED_CIRCUITS.filter(circ => 
    wires.some(wire => isCircuitMatch(wire, circ))
  );
  const completionPercentage = Math.round((completedCircuits.length / REQUIRED_CIRCUITS.length) * 100);
  const isFullyWired = completionPercentage === 100;

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Central Interactive Workbench Area */}
      <div 
        ref={workbenchRef}
        onMouseMove={handleMouseMove}
        onClick={() => { if (activePin) setActivePin(null); }}
        className="blueprint-grid-bg"
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'auto',
          backgroundColor: '#070a12',
          minWidth: '1020px',
          minHeight: '620px',
        }}
      >
        {/* Floating Top Control Palette */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 20,
          pointerEvents: 'auto',
        }}>
          {/* Color Picker & Mode Info */}
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>Wire Color:</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {WIRE_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.hex)}
                  title={c.name}
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: selectedColor === c.hex ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: selectedColor === c.hex ? `0 0 10px ${c.hex}` : 'none',
                    cursor: 'pointer',
                    transform: selectedColor === c.hex ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.15s ease',
                  }}
                />
              ))}
            </div>

            {activePin && (
              <span className="badge badge-amber" style={{ marginLeft: '0.5rem', animation: 'pulse 1s infinite' }}>
                Connecting from {activePin.name} (Click target pin)
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0.8rem' }}>
            <button 
              onClick={handleAutoWire}
              className="btn btn-secondary btn-sm"
              title="Automatically connect all jumper wires"
            >
              <Wand2 size={15} color="#38bdf8" />
              Auto-Wire All
            </button>
            <button 
              onClick={handleClearAll}
              className="btn btn-outline-danger btn-sm"
              title="Remove all wires"
            >
              <RotateCcw size={15} />
              Reset Wires
            </button>
            <button 
              onClick={() => setIsGuideOpen(true)}
              className="btn btn-secondary btn-sm"
              title="View circuit schematic guide"
            >
              <BookOpen size={15} color="#10b981" />
              Pinout Guide
            </button>
          </div>
        </div>

        {/* SVG Wiring Layer */}
        <WiringCanvas
          wires={wires}
          activePin={activePin}
          mousePos={mousePos}
          getPinAbsolutePos={getPinAbsolutePos}
          onDeleteWire={handleDeleteWire}
          selectedColor={selectedColor}
        />

        {/* Physical Components on Bench */}
        {/* 1. Arduino Uno */}
        <div style={{ position: 'absolute', left: components.arduino.initialPos.x, top: components.arduino.initialPos.y, zIndex: 10 }}>
          <ArduinoUnoSVG
            pins={components.arduino.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 2. L298N Motor Driver */}
        <div style={{ position: 'absolute', left: components.l298n.initialPos.x, top: components.l298n.initialPos.y, zIndex: 10 }}>
          <L298NDriverSVG
            pins={components.l298n.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 3. Left IR Sensor */}
        <div style={{ position: 'absolute', left: components.ir_left.initialPos.x, top: components.ir_left.initialPos.y, zIndex: 10 }}>
          <IRSensorSVG
            label="LEFT IR SENSOR"
            pins={components.ir_left.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 4. Right IR Sensor */}
        <div style={{ position: 'absolute', left: components.ir_right.initialPos.x, top: components.ir_right.initialPos.y, zIndex: 10 }}>
          <IRSensorSVG
            label="RIGHT IR SENSOR"
            pins={components.ir_right.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 5. Left Motor & Wheel */}
        <div style={{ position: 'absolute', left: components.motor_left.initialPos.x, top: components.motor_left.initialPos.y, zIndex: 10 }}>
          <DCMotorSVG
            label="LEFT MOTOR + WHEEL"
            side="left"
            pins={components.motor_left.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 6. Right Motor & Wheel */}
        <div style={{ position: 'absolute', left: components.motor_right.initialPos.x, top: components.motor_right.initialPos.y, zIndex: 10 }}>
          <DCMotorSVG
            label="RIGHT MOTOR + WHEEL"
            side="right"
            pins={components.motor_right.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>

        {/* 7. Battery Pack */}
        <div style={{ position: 'absolute', left: components.battery.initialPos.x, top: components.battery.initialPos.y, zIndex: 10 }}>
          <BatteryPackSVG
            pins={components.battery.pins}
            onPinClick={handlePinClick}
            onPinHover={setHoveredPin}
            hoveredPin={hoveredPin}
            activePin={activePin}
            connectedPinIds={connectedPinIds}
          />
        </div>
      </div>

      {/* Right Sidebar: Circuit Health & Connection Checklist */}
      <div className="glass-panel" style={{
        width: '340px',
        borderLeft: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 25,
        backgroundColor: 'var(--bg-secondary)',
      }}>
        {/* Completion Progress Header */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
              Circuit Integrity
            </span>
            <span className={`badge ${isFullyWired ? 'badge-emerald' : 'badge-cyan'}`}>
              {completionPercentage}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${completionPercentage}%`, 
                backgroundColor: isFullyWired ? '#10b981' : '#38bdf8',
                transition: 'width 0.4s ease',
                boxShadow: isFullyWired ? '0 0 10px #10b981' : '0 0 10px #38bdf8'
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
            <span>{completedCircuits.length} of {REQUIRED_CIRCUITS.length} circuits linked</span>
            <span>{wires.length} wires placed</span>
          </div>

          {/* Test in Simulation Mode CTA Button */}
          <button 
            onClick={onSwitchToSimulation}
            className={`btn ${isFullyWired ? 'btn-success' : 'btn-primary'}`}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <Play size={16} fill="currentColor" />
            {isFullyWired ? 'Launch Live Simulation' : 'Test in Simulation'}
          </button>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveTab('checklist')}
            style={{
              flex: 1,
              padding: '0.6rem',
              fontSize: '0.775rem',
              fontWeight: 600,
              color: activeTab === 'checklist' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'checklist' ? '2px solid #38bdf8' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Connection Checklist
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              flex: 1,
              padding: '0.6rem',
              fontSize: '0.775rem',
              fontWeight: 600,
              color: activeTab === 'specs' ? '#38bdf8' : '#94a3b8',
              borderBottom: activeTab === 'specs' ? '2px solid #38bdf8' : 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Hardware Specs
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {activeTab === 'checklist' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {REQUIRED_CIRCUITS.map((circ) => {
                const isDone = wires.some(wire => isCircuitMatch(wire, circ));

                return (
                  <div 
                    key={circ.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.06)'}`,
                    }}
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                    ) : (
                      <Circle size={16} color="#64748b" style={{ flexShrink: 0 }} />
                    )}
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isDone ? '#f8fafc' : '#cbd5e1' }}>
                        {circ.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: isDone ? '#34d399' : '#64748b', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {circ.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <strong style={{ color: '#38bdf8' }}>Microcontroller:</strong> ATmega328P @ 16MHz, 5V Logic, 32KB Flash, 2KB SRAM.
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <strong style={{ color: '#f87171' }}>Motor Driver:</strong> L298N Dual Full-Bridge, 2A peak current per channel, PWM speed capability.
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <strong style={{ color: '#34d399' }}>Optical Sensors:</strong> TCRT5000 IR reflective pairs with onboard LM393 comparators and sensitivity trimpots.
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <strong style={{ color: '#fbbf24' }}>Power Architecture:</strong> 7.4V nominal 2S Li-ion battery powers motors via L298N with logic regulated to 5V.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schematic Guide Modal */}
      <WiringGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}

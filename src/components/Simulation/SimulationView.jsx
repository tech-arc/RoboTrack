import React, { useState } from 'react';
import { AlertCircle, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import SimulationCanvas from './SimulationCanvas';
import SimulationControls from './SimulationControls';
import TelemetryHUD from './TelemetryHUD';
import ArduinoCodeModal from '../CodeViewer/ArduinoCodeModal';
import { soundEngine } from '../../utils/soundEngine';

export default function SimulationView({ 
  onSwitchToAssembly, 
  wiringState,
  isFullyWired = false 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTrackId, setSelectedTrackId] = useState('oval');
  const [baseSpeed, setBaseSpeed] = useState(2.2);
  const [sensorSpacing, setSensorSpacing] = useState(32);
  const [algorithm, setAlgorithm] = useState('bang_bang');
  const [isMuted, setIsMuted] = useState(true);
  const [showDebugOverlays, setShowDebugOverlays] = useState(true);
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [paintBrushSize, setPaintBrushSize] = useState(28);
  const [customTrackPaths, setCustomTrackPaths] = useState([]);
  const [resetCount, setResetCount] = useState(0);
  const [telemetry, setTelemetry] = useState({
    state: 'FORWARD',
    leftSensor: false,
    rightSensor: false,
    leftAnalog: 0.05,
    rightAnalog: 0.05,
    motorLeft: 2.2,
    motorRight: 2.2,
    posX: 525,
    posY: 117,
    angleDeg: 0,
  });

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Toggle audio engine
  const handleToggleMute = () => {
    const unmuted = soundEngine.toggleMute();
    setIsMuted(!unmuted);
  };

  // Reset bot position
  const handleResetBot = () => {
    setResetCount(c => c + 1);
  };

  // Clear hand-drawn lines
  const handleClearCustomTrack = () => {
    setCustomTrackPaths([]);
  };

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Left/Center Main Simulation Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: '1rem', gap: '0.85rem' }}>
        
        {/* Warning banner if wiring is incomplete */}
        {!isFullyWired && (
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.825rem',
            color: '#fbbf24',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              <span>
                Circuit wiring incomplete ({wiringState.wires?.length || 0} wires connected). Running in <strong>Test Bench Simulation Mode</strong>.
              </span>
            </div>
            <button 
              onClick={onSwitchToAssembly}
              className="btn btn-secondary btn-sm"
              style={{ color: '#ffffff', borderColor: 'rgba(245, 158, 11, 0.4)' }}
            >
              <Wrench size={14} />
              Finish Wiring First
            </button>
          </div>
        )}

        {/* 60FPS Interactive Physics Canvas */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 0 }}>
          <SimulationCanvas
            selectedTrackId={selectedTrackId}
            algorithm={algorithm}
            baseSpeed={baseSpeed}
            sensorSpacing={sensorSpacing}
            isPlaying={isPlaying}
            onTelemetryUpdate={setTelemetry}
            isDrawMode={isDrawMode}
            paintBrushSize={paintBrushSize}
            customTrackPaths={customTrackPaths}
            setCustomTrackPaths={setCustomTrackPaths}
            showDebugOverlays={showDebugOverlays}
            resetCount={resetCount}
          />
        </div>

        {/* Bottom Playback & Track Controls Bar */}
        <SimulationControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onResetBot={handleResetBot}
          selectedTrackId={selectedTrackId}
          setSelectedTrackId={setSelectedTrackId}
          baseSpeed={baseSpeed}
          setBaseSpeed={setBaseSpeed}
          sensorSpacing={sensorSpacing}
          setSensorSpacing={setSensorSpacing}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          showDebugOverlays={showDebugOverlays}
          setShowDebugOverlays={setShowDebugOverlays}
          isDrawMode={isDrawMode}
          setIsDrawMode={setIsDrawMode}
          onClearCustomTrack={handleClearCustomTrack}
          paintBrushSize={paintBrushSize}
          setPaintBrushSize={setPaintBrushSize}
        />
      </div>

      {/* Right Telemetry & Logic HUD Panel */}
      <div style={{
        width: '360px',
        backgroundColor: 'var(--bg-secondary)',
        borderLeft: '1px solid var(--border-subtle)',
        padding: '1rem',
        overflowY: 'auto',
      }}>
        <TelemetryHUD
          telemetry={telemetry}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
        />
      </div>

      {/* Synchronized Arduino C++ Code Modal */}
      <ArduinoCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        currentState={telemetry.state}
      />
    </div>
  );
}

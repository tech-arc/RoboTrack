import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Eye, 
  PenTool, 
  Trash2,
  Route
} from 'lucide-react';
import { TRACK_PRESETS } from '../../data/trackPresets';

export default function SimulationControls({
  isPlaying,
  setIsPlaying,
  onResetBot,
  selectedTrackId,
  setSelectedTrackId,
  baseSpeed,
  setBaseSpeed,
  sensorSpacing,
  setSensorSpacing,
  algorithm,
  setAlgorithm,
  isMuted,
  onToggleMute,
  showDebugOverlays,
  setShowDebugOverlays,
  isDrawMode,
  setIsDrawMode,
  onClearCustomTrack,
  paintBrushSize,
  setPaintBrushSize,
}) {
  return (
    <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Primary Playback & Track Presets Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Play / Pause / Reset Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
            style={{ minWidth: '100px' }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            {isPlaying ? 'Pause' : 'Run Bot'}
          </button>

          <button
            onClick={onResetBot}
            className="btn btn-secondary"
            title="Reset robot to track start"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            onClick={onToggleMute}
            className="btn btn-secondary"
            title={isMuted ? 'Unmute motor audio' : 'Mute motor audio'}
          >
            {isMuted ? <VolumeX size={16} color="#94a3b8" /> : <Volume2 size={16} color="#38bdf8" />}
          </button>

          <button
            onClick={() => setShowDebugOverlays(!showDebugOverlays)}
            className="btn btn-secondary"
            title="Toggle sensor beams & trajectory trail"
            style={{ color: showDebugOverlays ? '#38bdf8' : '#94a3b8' }}
          >
            <Eye size={16} />
            Debug
          </button>
        </div>

        {/* Track Selector Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Route size={14} color="#38bdf8" />
            Arena Track:
          </span>
          {TRACK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedTrackId(preset.id);
                setIsDrawMode(preset.id === 'custom');
              }}
              className="btn btn-sm"
              style={{
                backgroundColor: selectedTrackId === preset.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedTrackId === preset.id ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                color: selectedTrackId === preset.id ? '#ffffff' : '#94a3b8',
                fontWeight: selectedTrackId === preset.id ? 700 : 500,
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Second Row: Sliders & Parameter Controls */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        paddingTop: '0.5rem', 
        borderTop: '1px solid var(--border-subtle)' 
      }}>
        {/* Speed Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
            <span style={{ color: '#cbd5e1' }}>Motor Base Speed</span>
            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: 700 }}>
              {Math.round(baseSpeed * 40)} PWM ({baseSpeed.toFixed(1)} px/f)
            </span>
          </div>
          <input
            type="range"
            min="1.0"
            max="4.5"
            step="0.1"
            value={baseSpeed}
            onChange={(e) => setBaseSpeed(parseFloat(e.target.value))}
          />
        </div>

        {/* IR Sensor Spacing Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
            <span style={{ color: '#cbd5e1' }}>Sensor Beam Spacing</span>
            <span style={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 700 }}>
              {sensorSpacing} mm
            </span>
          </div>
          <input
            type="range"
            min="18"
            max="44"
            step="1"
            value={sensorSpacing}
            onChange={(e) => setSensorSpacing(parseInt(e.target.value))}
          />
        </div>

        {/* Algorithm Switcher */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
            Control Algorithm
          </div>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setAlgorithm('bang_bang')}
              className="btn btn-sm"
              style={{
                flex: 1,
                backgroundColor: algorithm === 'bang_bang' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
                border: algorithm === 'bang_bang' ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                color: algorithm === 'bang_bang' ? '#ffffff' : '#94a3b8',
              }}
            >
              2-Sensor Logic
            </button>
            <button
              onClick={() => setAlgorithm('pid')}
              className="btn btn-sm"
              style={{
                flex: 1,
                backgroundColor: algorithm === 'pid' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.04)',
                border: algorithm === 'pid' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                color: algorithm === 'pid' ? '#ffffff' : '#94a3b8',
              }}
            >
              PID Continuous
            </button>
          </div>
        </div>

        {/* Custom Track Drawing Tools (Visible only when in custom draw mode) */}
        {selectedTrackId === 'custom' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#cbd5e1' }}>Tape Width</span>
                <span style={{ fontFamily: 'monospace', color: '#eab308' }}>{paintBrushSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="44"
                step="2"
                value={paintBrushSize}
                onChange={(e) => setPaintBrushSize(parseInt(e.target.value))}
              />
            </div>
            <button
              onClick={onClearCustomTrack}
              className="btn btn-outline-danger btn-sm"
              style={{ marginTop: '14px' }}
              title="Clear hand-drawn track"
            >
              <Trash2 size={15} />
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

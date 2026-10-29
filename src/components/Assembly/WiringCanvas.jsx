import React from 'react';

/**
 * Calculates a smooth Bézier curve representing a flexible electronic jumper wire.
 */
function getWirePath(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);

  // Natural wire slack / droop based on distance
  const sag = Math.min(dist * 0.35, 80);

  // Control points
  const cp1x = x1;
  const cp1y = y1 + (y2 >= y1 ? sag : -sag * 0.5);
  const cp2x = x2;
  const cp2y = y2 + (y2 >= y1 ? sag : -sag * 0.5);

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
}

export default function WiringCanvas({ 
  wires = [], 
  activePin, 
  mousePos, 
  getPinAbsolutePos, 
  onDeleteWire,
  selectedColor = '#ef4444'
}) {
  return (
    <svg 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 5 
      }}
    >
      <defs>
        <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Render Established Wires */}
      {wires.map((wire) => {
        const p1 = getPinAbsolutePos(wire.fromPinId);
        const p2 = getPinAbsolutePos(wire.toPinId);
        if (!p1 || !p2) return null;

        const pathStr = getWirePath(p1.x, p1.y, p2.x, p2.y);

        return (
          <g key={wire.id} style={{ pointerEvents: 'auto' }} className="wire-group">
            {/* Background shadow for thickness & depth */}
            <path
              d={pathStr}
              fill="none"
              stroke="#0f172a"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Colored core wire */}
            <path
              d={pathStr}
              fill="none"
              stroke={wire.color}
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#wire-glow)"
              style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Remove this jumper wire connection?')) {
                  onDeleteWire(wire.id);
                }
              }}
            >
              <title>{`Wire: ${wire.fromPinId} ↔ ${wire.toPinId} (Click to remove)`}</title>
            </path>
            {/* Terminal end caps */}
            <circle cx={p1.x} cy={p1.y} r="3" fill="#ffffff" />
            <circle cx={p2.x} cy={p2.y} r="3" fill="#ffffff" />
          </g>
        );
      })}

      {/* Active in-progress wire following mouse cursor */}
      {activePin && mousePos && (() => {
        const p1 = getPinAbsolutePos(activePin.id);
        if (!p1) return null;
        const pathStr = getWirePath(p1.x, p1.y, mousePos.x, mousePos.y);

        return (
          <g style={{ pointerEvents: 'none' }}>
            <path
              d={pathStr}
              fill="none"
              stroke={selectedColor}
              strokeWidth="3"
              strokeDasharray="6,4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx={p1.x} cy={p1.y} r="4" fill={selectedColor} />
            <circle cx={mousePos.x} cy={mousePos.y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          </g>
        );
      })()}
    </svg>
  );
}

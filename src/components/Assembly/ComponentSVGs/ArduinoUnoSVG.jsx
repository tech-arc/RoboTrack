import React from 'react';

export default function ArduinoUnoSVG({ pins = [], onPinClick, onPinHover, hoveredPin, activePin, connectedPinIds = new Set() }) {
  return (
    <div style={{ position: 'relative', width: '290px', height: '220px', userSelect: 'none' }}>
      <svg width="290" height="220" viewBox="0 0 290 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* PCB Board Base with rounded corners and Arduino teal-blue tone */}
        <rect x="10" y="10" width="270" height="200" rx="10" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
        
        {/* Mounting Holes */}
        <circle cx="25" cy="30" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="265" cy="30" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="265" cy="190" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="75" cy="190" r="4.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* USB Type-B Port */}
        <rect x="0" y="35" width="38" height="42" rx="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
        <rect x="4" y="44" width="28" height="24" rx="2" fill="#334155" />

        {/* DC Barrel Jack */}
        <rect x="0" y="125" width="46" height="40" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        <circle cx="20" cy="145" r="7" fill="#0f172a" />
        <circle cx="20" cy="145" r="2.5" fill="#cbd5e1" />

        {/* 16MHz Crystal Oscillator */}
        <rect x="75" y="80" width="20" height="10" rx="4" fill="#94a3b8" stroke="#64748b" />
        <text x="77" y="87" fontSize="5" fill="#1e293b" fontFamily="sans-serif">16.0</text>

        {/* Reset Button */}
        <rect x="48" y="24" width="16" height="16" rx="3" fill="#e2e8f0" stroke="#94a3b8" />
        <circle cx="56" cy="32" r="4.5" fill="#ef4444" />

        {/* ATmega328P DIP IC Socket & Chip */}
        <rect x="130" y="90" width="130" height="34" rx="3" fill="#111827" stroke="#374151" strokeWidth="1.5" />
        <text x="145" y="111" fontSize="9" fontWeight="700" fill="#9ca3af" letterSpacing="1" fontFamily="monospace">ATmega328P-PU</text>
        {/* IC Notch */}
        <circle cx="130" cy="107" r="4" fill="#374151" />

        {/* Top Digital Pin Header Housing */}
        <rect x="120" y="10" width="160" height="18" fill="#111827" stroke="#374151" rx="2" />
        {/* Bottom Power & Analog Pin Header Housing */}
        <rect x="120" y="192" width="160" height="18" fill="#111827" stroke="#374151" rx="2" />

        {/* Silkscreen text */}
        <text x="75" y="55" fontSize="11" fontWeight="800" fill="#ffffff" fontFamily="sans-serif">ARDUINO</text>
        <text x="75" y="67" fontSize="9" fontWeight="600" fill="#bae6fd" fontFamily="sans-serif">UNO R3</text>

        {/* Pin labels */}
        <text x="130" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D2</text>
        <text x="148" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D3</text>
        <text x="184" y="34" fontSize="6.5" fill="#facc15" textAnchor="middle" fontFamily="monospace">D5~</text>
        <text x="202" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D6</text>
        <text x="220" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D7</text>
        <text x="238" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D8</text>
        <text x="256" y="34" fontSize="6.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">D9</text>
        <text x="274" y="34" fontSize="6.5" fill="#facc15" textAnchor="middle" fontFamily="monospace">D10~</text>

        <text x="155" y="188" fontSize="6.5" fill="#f87171" textAnchor="middle" fontFamily="monospace">5V</text>
        <text x="173" y="188" fontSize="6.5" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>
        <text x="191" y="188" fontSize="6.5" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>
        <text x="209" y="188" fontSize="6.5" fill="#fb923c" textAnchor="middle" fontFamily="monospace">VIN</text>

        {/* Built-in LEDs */}
        <rect x="75" y="125" width="4" height="6" fill="#22c55e" rx="1" />
        <text x="82" y="130" fontSize="5.5" fill="#ffffff" fontFamily="sans-serif">ON</text>
        <rect x="75" y="140" width="4" height="6" fill="#eab308" rx="1" />
        <text x="82" y="145" fontSize="5.5" fill="#ffffff" fontFamily="sans-serif">L (D13)</text>
      </svg>

      {/* Interactive Pin Click Targets */}
      {pins.map((pin) => {
        const isHovered = hoveredPin?.id === pin.id;
        const isActive = activePin?.id === pin.id;
        const isConnected = connectedPinIds.has(pin.id);

        return (
          <div
            key={pin.id}
            onClick={(e) => {
              e.stopPropagation();
              onPinClick(pin, 'arduino');
            }}
            onMouseEnter={() => onPinHover(pin)}
            onMouseLeave={() => onPinHover(null)}
            title={`${pin.name} - ${pin.description}`}
            style={{
              position: 'absolute',
              left: `${pin.x - 7}px`,
              top: `${pin.y - 7}px`,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isConnected ? '#10b981' : isActive ? '#38bdf8' : isHovered ? '#f59e0b' : '#334155',
              border: `2px solid ${isActive ? '#ffffff' : isHovered ? '#fef08a' : '#64748b'}`,
              boxShadow: isHovered || isActive ? '0 0 10px #38bdf8' : 'none',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'transform 0.15s ease',
              transform: isHovered || isActive ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        );
      })}
    </div>
  );
}

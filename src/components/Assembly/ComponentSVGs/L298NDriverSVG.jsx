import React from 'react';

export default function L298NDriverSVG({ pins = [], onPinClick, onPinHover, hoveredPin, activePin, connectedPinIds = new Set() }) {
  return (
    <div style={{ position: 'relative', width: '250px', height: '230px', userSelect: 'none' }}>
      <svg width="250" height="230" viewBox="0 0 250 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* PCB Board Base (Deep Red) */}
        <rect x="10" y="10" width="230" height="210" rx="8" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2.5" />

        {/* Mounting Holes */}
        <circle cx="24" cy="24" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="226" cy="24" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="226" cy="206" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="24" cy="206" r="4" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Big Black Aluminum Heatsink */}
        <rect x="75" y="30" width="100" height="60" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        {/* Heatsink Fins */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={85 + i * 13} y1="32" x2={85 + i * 13} y2="88" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        ))}
        {/* Center mounting screw */}
        <circle cx="125" cy="60" r="5" fill="#475569" stroke="#94a3b8" />

        {/* Big Filter Capacitor */}
        <circle cx="55" cy="140" r="14" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <path d="M47 132 A 14 14 0 0 1 63 132" stroke="#cbd5e1" strokeWidth="2" fill="none" />

        {/* 78M05 5V Voltage Regulator IC */}
        <rect x="85" y="105" width="22" height="18" fill="#0f172a" rx="1" />
        <rect x="87" y="102" width="18" height="3" fill="#94a3b8" />

        {/* Left Motor Terminal Block (Blue Screw Terminals OUT1, OUT2) */}
        <rect x="8" y="65" width="24" height="60" rx="3" fill="#2563eb" stroke="#1d4ed8" />
        <circle cx="20" cy="80" r="4.5" fill="#e2e8f0" stroke="#64748b" />
        <line x1="17" y1="80" x2="23" y2="80" stroke="#334155" strokeWidth="1.5" />
        <circle cx="20" cy="110" r="4.5" fill="#e2e8f0" stroke="#64748b" />
        <line x1="17" y1="110" x2="23" y2="110" stroke="#334155" strokeWidth="1.5" />

        {/* Right Motor Terminal Block (Blue Screw Terminals OUT3, OUT4) */}
        <rect x="218" y="65" width="24" height="60" rx="3" fill="#2563eb" stroke="#1d4ed8" />
        <circle cx="230" cy="80" r="4.5" fill="#e2e8f0" stroke="#64748b" />
        <line x1="227" y1="80" x2="233" y2="80" stroke="#334155" strokeWidth="1.5" />
        <circle cx="230" cy="110" r="4.5" fill="#e2e8f0" stroke="#64748b" />
        <line x1="227" y1="110" x2="233" y2="110" stroke="#334155" strokeWidth="1.5" />

        {/* Bottom Power Terminal Block (12V, GND, 5V) */}
        <rect x="170" y="195" width="68" height="26" rx="3" fill="#2563eb" stroke="#1d4ed8" />
        <circle cx="185" cy="208" r="4" fill="#e2e8f0" stroke="#64748b" />
        <line x1="182" y1="208" x2="188" y2="208" stroke="#334155" strokeWidth="1.2" />
        <circle cx="204" cy="208" r="4" fill="#e2e8f0" stroke="#64748b" />
        <line x1="201" y1="208" x2="207" y2="208" stroke="#334155" strokeWidth="1.2" />
        <circle cx="223" cy="208" r="4" fill="#e2e8f0" stroke="#64748b" />
        <line x1="220" y1="208" x2="226" y2="208" stroke="#334155" strokeWidth="1.2" />

        {/* Bottom Logic Pins Header (ENA, IN1, IN2, IN3, IN4, ENB) */}
        <rect x="32" y="200" width="120" height="20" fill="#0f172a" stroke="#334155" rx="2" />

        {/* Labels */}
        <text x="125" y="24" fontSize="11" fontWeight="800" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">L298N DRIVER</text>
        
        {/* Out labels */}
        <text x="36" y="83" fontSize="7" fill="#ffffff" fontWeight="700" fontFamily="monospace">OUT1</text>
        <text x="36" y="113" fontSize="7" fill="#ffffff" fontWeight="700" fontFamily="monospace">OUT2</text>
        <text x="214" y="83" fontSize="7" fill="#ffffff" fontWeight="700" textAnchor="end" fontFamily="monospace">OUT3</text>
        <text x="214" y="113" fontSize="7" fill="#ffffff" fontWeight="700" textAnchor="end" fontFamily="monospace">OUT4</text>

        {/* Power terminal labels */}
        <text x="185" y="190" fontSize="6.5" fill="#f87171" textAnchor="middle" fontFamily="monospace">12V</text>
        <text x="204" y="190" fontSize="6.5" fill="#cbd5e1" textAnchor="middle" fontFamily="monospace">GND</text>
        <text x="223" y="190" fontSize="6.5" fill="#f87171" textAnchor="middle" fontFamily="monospace">5V</text>

        {/* Logic labels */}
        <text x="42" y="194" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace">ENA</text>
        <text x="62" y="194" fontSize="6" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">IN1</text>
        <text x="82" y="194" fontSize="6" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">IN2</text>
        <text x="102" y="194" fontSize="6" fill="#c084fc" textAnchor="middle" fontFamily="monospace">IN3</text>
        <text x="122" y="194" fontSize="6" fill="#c084fc" textAnchor="middle" fontFamily="monospace">IN4</text>
        <text x="142" y="194" fontSize="6" fill="#facc15" textAnchor="middle" fontFamily="monospace">ENB</text>

        {/* Power LED Indicator */}
        <circle cx="150" cy="130" r="3" fill="#22c55e" />
        <text x="156" y="133" fontSize="5.5" fill="#ffffff" fontFamily="sans-serif">PWR</text>
      </svg>

      {/* Pin Click Targets */}
      {pins.map((pin) => {
        const isHovered = hoveredPin?.id === pin.id;
        const isActive = activePin?.id === pin.id;
        const isConnected = connectedPinIds.has(pin.id);

        return (
          <div
            key={pin.id}
            onClick={(e) => {
              e.stopPropagation();
              onPinClick(pin, 'l298n');
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
              backgroundColor: isConnected ? '#10b981' : isActive ? '#38bdf8' : isHovered ? '#f59e0b' : '#1e293b',
              border: `2px solid ${isActive ? '#ffffff' : isHovered ? '#fef08a' : '#94a3b8'}`,
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

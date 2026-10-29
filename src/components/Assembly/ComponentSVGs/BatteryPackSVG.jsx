import React from 'react';

export default function BatteryPackSVG({ 
  pins = [], 
  onPinClick, 
  onPinHover, 
  hoveredPin, 
  activePin, 
  connectedPinIds = new Set() 
}) {
  return (
    <div style={{ position: 'relative', width: '220px', height: '110px', userSelect: 'none' }}>
      <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Battery Tray Housing (Black ABS) */}
        <rect x="10" y="30" width="200" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2.5" />

        {/* 18650 Cell 1 (Cyan/Blue wrap) */}
        <rect x="25" y="38" width="75" height="54" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
        <rect x="20" y="55" width="5" height="20" rx="2" fill="#cbd5e1" />
        <text x="62" y="68" fontSize="7" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">18650 3.7V</text>

        {/* 18650 Cell 2 (Cyan/Blue wrap) */}
        <rect x="120" y="38" width="75" height="54" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
        <rect x="195" y="55" width="5" height="20" rx="2" fill="#cbd5e1" />
        <text x="157" y="68" fontSize="7" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">18650 3.7V</text>

        {/* Output Wire Pigtails */}
        <path d="M60 30 L60 15" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        <path d="M160 30 L160 15" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

        {/* Labels */}
        <text x="60" y="10" fontSize="7.5" fontWeight="800" fill="#ef4444" textAnchor="middle" fontFamily="sans-serif">+ 7.4V (VMS)</text>
        <text x="160" y="10" fontSize="7.5" fontWeight="800" fill="#94a3b8" textAnchor="middle" fontFamily="sans-serif">- GND</text>

        {/* Title */}
        <text x="110" y="103" fontSize="8" fontWeight="700" fill="#64748b" textAnchor="middle" fontFamily="sans-serif">
          2S LI-ION BATTERY PACK
        </text>
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
              onPinClick(pin, 'battery');
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

import React from 'react';

export default function DCMotorSVG({ 
  label = "BO DC MOTOR", 
  side = "left", 
  pins = [], 
  onPinClick, 
  onPinHover, 
  hoveredPin, 
  activePin, 
  connectedPinIds = new Set() 
}) {
  return (
    <div style={{ position: 'relative', width: '170px', height: '110px', userSelect: 'none' }}>
      <svg width="170" height="110" viewBox="0 0 170 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* BO Gearbox Housing (Yellow Plastic) */}
        <rect x="15" y="20" width="75" height="50" rx="6" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
        
        {/* Metal Motor Can Cylinder */}
        <rect x="15" y="28" width="45" height="34" rx="3" fill="#cbd5e1" stroke="#94a3b8" />
        <rect x="5" y="36" width="10" height="18" fill="#64748b" rx="2" />

        {/* Gearbox Axle Shaft */}
        <rect x="85" y="40" width="14" height="10" fill="#94a3b8" />

        {/* Yellow Wheel Rim with Black Rubber Tread */}
        <rect x="98" y="10" width="60" height="70" rx="10" fill="#020617" stroke="#334155" strokeWidth="2" />
        <rect x="104" y="16" width="48" height="58" rx="8" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Wheel Hub */}
        <circle cx="128" cy="45" r="9" fill="#020617" />
        <circle cx="128" cy="45" r="4" fill="#cbd5e1" />

        {/* Rubber Treads on Tire */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="154" y1={18 + i * 12} x2="158" y2={18 + i * 12} stroke="#334155" strokeWidth="2.5" />
        ))}

        {/* Solder Tabs at bottom */}
        <rect x="22" y="70" width="16" height="12" fill="#94a3b8" stroke="#64748b" rx="1" />
        <rect x="57" y="70" width="16" height="12" fill="#94a3b8" stroke="#64748b" rx="1" />

        {/* Terminal Labels */}
        <text x="30" y="80" fontSize="7" fontWeight="700" fill="#ef4444" textAnchor="middle" fontFamily="monospace">+</text>
        <text x="65" y="80" fontSize="7" fontWeight="700" fill="#0f172a" textAnchor="middle" fontFamily="monospace">-</text>

        {/* Component Title */}
        <text x="50" y="14" fontSize="8" fontWeight="700" fill="#f8fafc" textAnchor="middle" fontFamily="sans-serif">
          {label}
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
              onPinClick(pin, side === 'left' ? 'motor_left' : 'motor_right');
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

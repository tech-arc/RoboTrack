import React from 'react';

export default function IRSensorSVG({ 
  label = "IR SENSOR", 
  pins = [], 
  onPinClick, 
  onPinHover, 
  hoveredPin, 
  activePin, 
  connectedPinIds = new Set() 
}) {
  return (
    <div style={{ position: 'relative', width: '140px', height: '190px', userSelect: 'none' }}>
      <svg width="140" height="190" viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* PCB Board (Dark blue-grey) */}
        <rect x="8" y="8" width="124" height="174" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

        {/* Optical Sensor Housing at the top (TCRT5000 Pair) */}
        <rect x="25" y="16" width="90" height="34" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        {/* IR Phototransistor (Black Filter Lens) */}
        <circle cx="50" cy="33" r="10" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="50" cy="33" r="5" fill="#1e1b4b" opacity="0.8" />

        {/* IR Emitting Diode (Clear Blue Lens) */}
        <circle cx="90" cy="33" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="90" cy="33" r="5" fill="#e0f2fe" opacity="0.9" />

        {/* Label */}
        <text x="70" y="65" fontSize="8.5" fontWeight="800" fill="#38bdf8" textAnchor="middle" fontFamily="sans-serif">
          {label}
        </text>
        <text x="70" y="76" fontSize="6.5" fill="#64748b" textAnchor="middle" fontFamily="sans-serif">
          TCRT5000 / LM393
        </text>

        {/* Sensitivity Trimmer Potentiometer (Blue Square with Brass Screw) */}
        <rect x="45" y="84" width="28" height="28" rx="3" fill="#2563eb" stroke="#1d4ed8" />
        <circle cx="59" cy="98" r="8" fill="#eab308" stroke="#ca8a04" />
        <line x1="53" y1="98" x2="65" y2="98" stroke="#854d0e" strokeWidth="1.5" />

        {/* LM393 Comparator IC */}
        <rect x="82" y="86" width="36" height="24" rx="2" fill="#18181b" stroke="#3f3f46" />
        <text x="85" y="101" fontSize="6" fontWeight="700" fill="#a1a1aa" fontFamily="monospace">LM393</text>

        {/* Status Indicator LEDs */}
        {/* Power LED (Red) */}
        <rect x="30" y="124" width="6" height="10" rx="1.5" fill="#ef4444" />
        <text x="40" y="132" fontSize="5.5" fill="#94a3b8" fontFamily="sans-serif">PWR</text>

        {/* Output Detect LED (Green) */}
        <rect x="85" y="124" width="6" height="10" rx="1.5" fill="#10b981" />
        <text x="95" y="132" fontSize="5.5" fill="#94a3b8" fontFamily="sans-serif">OUT</text>

        {/* Bottom 4-Pin Header Block */}
        <rect x="18" y="160" width="104" height="18" fill="#18181b" stroke="#334155" rx="2" />
        <text x="28" y="156" fontSize="6" fill="#f87171" textAnchor="middle" fontFamily="monospace">VCC</text>
        <text x="56" y="156" fontSize="6" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>
        <text x="84" y="156" fontSize="6" fill="#34d399" textAnchor="middle" fontFamily="monospace">DO</text>
        <text x="112" y="156" fontSize="6" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">AO</text>
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
              onPinClick(pin, label.toLowerCase().includes('left') ? 'ir_left' : 'ir_right');
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

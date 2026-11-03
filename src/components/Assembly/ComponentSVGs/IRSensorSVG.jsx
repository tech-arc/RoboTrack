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
      <svg 
        width="140" 
        height="190" 
        viewBox="0 0 140 190" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.45))' }}
      >
        <defs>
          {/* Cobalt Blue PCB Gradient */}
          <linearGradient id="irPcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="25%" stopColor="#1e40af" />
            <stop offset="75%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Copper trace glow on sensor */}
          <linearGradient id="irTraceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
          </linearGradient>

          {/* Clear Transparent IR Transmitter Bulb Lens */}
          <radialGradient id="clearLedGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.45" />
            <stop offset="90%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.5" />
          </radialGradient>

          {/* Dark IR Receiver Phototransistor Bulb Lens */}
          <radialGradient id="darkLedGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#581c87" stopOpacity="0.8" />
            <stop offset="20%" stopColor="#3b0764" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="85%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* Trimmer Potentiometer Brass Screw Dial */}
          <radialGradient id="trimpotScrew" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#eab308" />
            <stop offset="85%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          {/* Gold Pin Header */}
          <linearGradient id="irGoldPin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Header Strip Texture */}
          <linearGradient id="irHeaderBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
        </defs>

        {/* 1. PCB Base Board (Classic Blue FC-51 Sensor Outline) */}
        <rect 
          x="12" 
          y="22" 
          width="116" 
          height="148" 
          rx="6" 
          fill="url(#irPcbGrad)" 
          stroke="#60a5fa" 
          strokeWidth="1.2" 
          strokeOpacity="0.4" 
        />

        {/* Silkscreen Decorative Border Outline */}
        <rect 
          x="15" 
          y="25" 
          width="110" 
          height="142" 
          rx="4.5" 
          fill="none" 
          stroke="rgba(255,255,255,0.18)" 
          strokeWidth="0.8" 
        />

        {/* Copper Routing Traces */}
        <g stroke="url(#irTraceGrad)" strokeWidth="1.2" fill="none">
          <path d="M 45 40 L 45 60 L 52 70" />
          <path d="M 95 40 L 95 60 L 88 70" />
          <path d="M 40 115 L 40 145 L 30 160" />
          <path d="M 60 115 L 60 145 L 56 160" />
          <path d="M 85 115 L 85 145 L 84 160" />
          <path d="M 105 115 L 105 145 L 112 160" />
        </g>

        {/* 2. Optical Sensor Transceiver Pair (TCRT5000 / FC-51 at top) */}
        {/* Left: Water-Clear Transparent IR Emitter LED Bulb */}
        <g id="ir-emitter" transform="translate(45, 14)">
          {/* Bulb base collar ring */}
          <ellipse cx="0" cy="18" rx="10" ry="3.5" fill="#93c5fd" stroke="#3b82f6" strokeWidth="0.8" />
          {/* Dome Profile */}
          <path
            d="
              M -9 18
              L -9 9
              C -9 1 -7 -6 0 -6
              C 7 -6 9 1 9 9
              L 9 18
              Z
            "
            fill="url(#clearLedGrad)"
            stroke="#93c5fd"
            strokeWidth="0.8"
          />
          {/* Internal Metal Anvil & Post (Lead frame inside clear glass) */}
          <path d="M -3 14 L -3 5 L 2 5 L 3 9 L 1 14 Z" fill="#cbd5e1" opacity="0.85" />
          <line x1="2" y1="14" x2="2" y2="2" stroke="#94a3b8" strokeWidth="0.8" />
          {/* Specular Highlight Arc */}
          <path d="M -6 6 C -6 -1 -3 -3 0 -3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.9" />
          {/* PCB Through-hole Solder Rings */}
          <circle cx="-4" cy="24" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="4" cy="24" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
        </g>

        {/* Right: Black/Deep-Violet IR Phototransistor Receiver Bulb */}
        <g id="ir-receiver" transform="translate(95, 14)">
          <ellipse cx="0" cy="18" rx="10" ry="3.5" fill="#1e1b4b" stroke="#3b0764" strokeWidth="0.8" />
          <path
            d="
              M -9 18
              L -9 9
              C -9 1 -7 -6 0 -6
              C 7 -6 9 1 9 9
              L 9 18
              Z
            "
            fill="url(#darkLedGrad)"
            stroke="#581c87"
            strokeWidth="0.8"
          />
          {/* Specular Highlight Arc */}
          <path d="M -6 6 C -6 -1 -3 -3 0 -3" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
          <circle cx="3" cy="8" r="1.5" fill="#a855f7" opacity="0.6" />
          {/* PCB Through-hole Solder Rings */}
          <circle cx="-4" cy="24" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="4" cy="24" r="2.2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
        </g>

        {/* 3. Center M3 Plated Mounting Screwhole with Annular Pad */}
        <circle cx="70" cy="46" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="70" cy="46" r="4" fill="#020617" />
        {/* Ground Vias around hole */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          return (
            <circle key={i} cx={70 + Math.cos(r) * 8.5} cy={46 + Math.sin(r) * 8.5} r="0.7" fill="#94a3b8" />
          );
        })}

        {/* Component Silkscreen Outline Box */}
        <rect x="22" y="66" width="96" height="52" rx="3" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

        {/* 4. Blue 3362 Cermet Trimmer Potentiometer (Sensitivity Adjuster) */}
        <g id="trimpot" transform="translate(30, 72)">
          {/* Blue Plastic Body */}
          <rect x="0" y="0" width="28" height="28" rx="2.5" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.2" />
          <rect x="1" y="1" width="26" height="26" rx="2" fill="none" stroke="#60a5fa" strokeWidth="0.6" strokeOpacity="0.4" />
          {/* Brass Center Rotor Disc */}
          <circle cx="14" cy="14" r="9" fill="url(#trimpotScrew)" stroke="#a16207" strokeWidth="0.8" />
          {/* Cross Screwdriver Drive Slot */}
          <line x1="7.5" y1="14" x2="20.5" y2="14" stroke="#713f12" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="14" y1="7.5" x2="14" y2="20.5" stroke="#713f12" strokeWidth="1.6" strokeLinecap="round" />
          {/* Calibration Adjustment Arrow */}
          <path d="M 5 24 A 11 11 0 0 1 23 24" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <polygon points="23,23 25,25 22,26" fill="#ffffff" />
        </g>

        {/* 5. LM393 Dual Comparator IC (SOP-8 SMD Package) */}
        <g id="lm393-ic" transform="translate(74, 73)">
          {/* 8 Gull-Wing Leads (4 on top, 4 on bottom) with Solder Fillets */}
          {[4, 11, 18, 25].map((x, i) => (
            <React.Fragment key={i}>
              {/* Top lead */}
              <rect x={x} y="-3.5" width="2.4" height="4.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.4" />
              <circle cx={x + 1.2} cy="-2.5" r="1.2" fill="#94a3b8" />
              {/* Bottom lead */}
              <rect x={x} y="25" width="2.4" height="4.5" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.4" />
              <circle cx={x + 1.2} cy="27.5" r="1.2" fill="#94a3b8" />
            </React.Fragment>
          ))}
          {/* Molded Plastic Body */}
          <rect x="0" y="0" width="32" height="26" rx="2" fill="#18181b" stroke="#27272a" strokeWidth="1" />
          {/* Beveled Top Slope */}
          <rect x="2" y="2" width="28" height="3" fill="#27272a" />
          {/* Pin 1 Index Dot */}
          <circle cx="5" cy="8" r="1.2" fill="#3f3f46" />
          {/* Laser-Etched Text */}
          <text x="16" y="15" fontSize="5.5" fontWeight="800" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">LM393</text>
          <text x="16" y="21" fontSize="4.2" fontWeight="600" fill="#71717a" textAnchor="middle" fontFamily="monospace">TI 19K</text>
        </g>

        {/* 6. Surface-Mount Resistors & Capacitors */}
        {/* SMD Resistors */}
        <g transform="translate(32, 105)">
          <rect x="0" y="0" width="9" height="5" rx="0.8" fill="#18181b" stroke="#27272a" />
          <rect x="0" y="0" width="2" height="5" fill="#cbd5e1" />
          <rect x="7" y="0" width="2" height="5" fill="#cbd5e1" />
          <text x="4.5" y="3.8" fontSize="2.8" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">103</text>
        </g>
        <g transform="translate(46, 105)">
          <rect x="0" y="0" width="9" height="5" rx="0.8" fill="#18181b" stroke="#27272a" />
          <rect x="0" y="0" width="2" height="5" fill="#cbd5e1" />
          <rect x="7" y="0" width="2" height="5" fill="#cbd5e1" />
          <text x="4.5" y="3.8" fontSize="2.8" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">102</text>
        </g>

        {/* SMD Ceramic Filter Capacitor */}
        <g transform="translate(60, 105)">
          <rect x="0" y="0" width="8" height="5" rx="0.8" fill="#b45309" stroke="#92400e" />
          <rect x="0" y="0" width="1.8" height="5" fill="#cbd5e1" />
          <rect x="6.2" y="0" width="1.8" height="5" fill="#cbd5e1" />
        </g>

        {/* 7. Indicator LEDs (PWR Red, OUT Green) */}
        {/* Power LED (Red) */}
        <g id="pwr-led" transform="translate(28, 122)">
          <rect x="0" y="0" width="10" height="6" rx="1.5" fill="#ef4444" stroke="#dc2626" strokeWidth="0.6" />
          <rect x="2" y="1" width="6" height="4" rx="0.8" fill="#fca5a5" opacity="0.85" />
          <text x="14" y="5.2" fontSize="5.5" fontWeight="800" fill="#ffffff" fontFamily="sans-serif">PWR</text>
        </g>

        {/* Output Detect LED (Green) */}
        <g id="out-led" transform="translate(78, 122)">
          <rect x="0" y="0" width="10" height="6" rx="1.5" fill="#10b981" stroke="#059669" strokeWidth="0.6" />
          <rect x="2" y="1" width="6" height="4" rx="0.8" fill="#86efac" opacity="0.85" />
          <text x="92" y="5.2" fontSize="5.5" fontWeight="800" fill="#ffffff" fontFamily="sans-serif">OUT</text>
        </g>

        {/* 8. Board Silkscreen Model & Labels */}
        <text x="70" y="60" fontSize="7" fontWeight="900" fill="#60a5fa" textAnchor="middle" letterSpacing="0.6" fontFamily="sans-serif">
          {label}
        </text>
        <text x="70" y="137" fontSize="5.5" fontWeight="700" fill="#93c5fd" textAnchor="middle" letterSpacing="0.8" fontFamily="monospace">
          FC-51 / TCRT5000
        </text>

        {/* 9. Bottom 4-Pin Male Header Strip (Gold Plated Right-Angle Pins) */}
        <g id="ir-header-strip">
          {/* Black Molded Base Block */}
          <rect x="18" y="152" width="104" height="15" rx="1.8" fill="url(#irHeaderBase)" stroke="#3f3f46" strokeWidth="0.8" />
          
          {/* 4 Pin Socket Divisions with Gold Square Pins */}
          {[
            { x: 28, label: 'VCC', color: '#fca5a5' },
            { x: 56, label: 'GND', color: '#cbd5e1' },
            { x: 84, label: 'DO', color: '#86efac' },
            { x: 112, label: 'AO', color: '#93c5fd' },
          ].map((pinInfo, i) => (
            <g key={i}>
              {/* Molded square pocket */}
              <rect x={pinInfo.x - 5} y="154" width="10" height="11" rx="1" fill="#09090b" stroke="#27272a" strokeWidth="0.5" />
              {/* Gold Pin Post extending into snapping coordinate at y=175 */}
              <rect x={pinInfo.x - 2} y="157" width="4" height="18" rx="0.8" fill="url(#irGoldPin)" stroke="#a16207" strokeWidth="0.4" />
              {/* Silkscreen Pin Name */}
              <text x={pinInfo.x} y="148" fontSize="6.2" fontWeight="800" fill={pinInfo.color} textAnchor="middle" fontFamily="monospace">
                {pinInfo.label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Interactive Pin Click Targets (Preserved snapping logic & coordinates) */}
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

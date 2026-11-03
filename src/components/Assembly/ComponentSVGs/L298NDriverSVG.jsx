import React from 'react';

export default function L298NDriverSVG({ 
  pins = [], 
  onPinClick, 
  onPinHover, 
  hoveredPin, 
  activePin, 
  connectedPinIds = new Set() 
}) {
  return (
    <div style={{ position: 'relative', width: '250px', height: '230px', userSelect: 'none' }}>
      <svg 
        width="250" 
        height="230" 
        viewBox="0 0 250 230" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.45))' }}
      >
        <defs>
          {/* PCB Red Solder Mask Gradient */}
          <linearGradient id="l298PcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="40%" stopColor="#991b1b" />
            <stop offset="85%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>

          {/* Copper trace glow on red PCB */}
          <linearGradient id="redTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.08" />
          </linearGradient>

          {/* Black Anodized Aluminum Heatsink Extrusion */}
          <linearGradient id="heatsinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="15%" stopColor="#1e293b" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Heatsink Fin Top Highlights */}
          <linearGradient id="finRidgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Blue Screw Terminal Plastic */}
          <linearGradient id="terminalBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Terminal Screw Head (Zinc/Steel) */}
          <radialGradient id="screwHeadGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>

          {/* Electrolytic Capacitor Top Disc */}
          <radialGradient id="l298CapTop" cx="40%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="90%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          {/* Gold Pin Headers */}
          <linearGradient id="l298GoldPin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Yellow Jumper Shunts */}
          <linearGradient id="jumperYellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* 1. PCB Main Base Board (Iconic Red L298N Board with rounded corners) */}
        <rect 
          x="10" 
          y="10" 
          width="230" 
          height="210" 
          rx="8" 
          fill="url(#l298PcbGrad)" 
          stroke="#f87171" 
          strokeWidth="1.2" 
          strokeOpacity="0.4" 
        />

        {/* Inner Silkscreen Decorative Border */}
        <rect 
          x="13" 
          y="13" 
          width="224" 
          height="204" 
          rx="6" 
          fill="none" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="0.8" 
        />

        {/* PCB Copper Routing Traces */}
        <g stroke="url(#redTraceGrad)" strokeWidth="1.4" fill="none" opacity="0.8">
          <path d="M 30 75 L 50 75 L 65 60 L 75 60" />
          <path d="M 30 115 L 55 115 L 75 95" />
          <path d="M 220 75 L 200 75 L 185 60 L 175 60" />
          <path d="M 220 115 L 195 115 L 175 95" />
          <path d="M 52 160 L 52 180 L 70 195 L 90 195" />
          <path d="M 95 125 L 95 160 L 115 175 L 140 175" />
          <path d="M 185 195 L 185 170 L 160 140 L 135 140" />
          <path d="M 208 195 L 208 165 L 190 145" />
          <path d="M 230 195 L 230 150 L 210 130" />
        </g>

        {/* 4 Plated Mounting Screwholes with Silver Solder Ring */}
        {[
          { cx: 24, cy: 24 },
          { cx: 226, cy: 24 },
          { cx: 226, cy: 206 },
          { cx: 24, cy: 206 },
        ].map((h, i) => (
          <g key={i}>
            <circle cx={h.cx} cy={h.cy} r="6" fill="none" stroke="#fca5a5" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
            <circle cx={h.cx} cy={h.cy} r="4.8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.6" />
            <circle cx={h.cx} cy={h.cy} r="3" fill="#020617" />
          </g>
        ))}

        {/* 2. Massive Black Anodized Extruded Aluminum Heatsink */}
        <g id="heatsink">
          {/* Main Heatsink Base Extrusion */}
          <rect x="74" y="26" width="102" height="66" rx="3" fill="url(#heatsinkGrad)" stroke="#090d16" strokeWidth="1.5" />
          
          {/* 7 Vertical Cooling Fins with Realistic 3D Profile */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 79 + i * 14;
            return (
              <g key={i}>
                {/* Deep trench shadow */}
                <rect x={x - 1} y="28" width="8" height="62" fill="#020617" opacity="0.8" />
                {/* Fin Ridge Highlight */}
                <rect x={x + 1} y="27" width="4.5" height="64" rx="1.5" fill="url(#finRidgeGrad)" />
                <line x1={x + 3.2} y1="28" x2={x + 3.2} y2="90" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" />
              </g>
            );
          })}

          {/* Center M3 Mounting Bolt & Washer securing L298 IC against heatsink */}
          <circle cx="125" cy="56" r="6" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="125" cy="56" r="4.2" fill="url(#screwHeadGrad)" />
          {/* Cross / Hex Slot */}
          <line x1="122" y1="56" x2="128" y2="56" stroke="#1e293b" strokeWidth="1.2" />
          <line x1="125" y1="53" x2="125" y2="59" stroke="#1e293b" strokeWidth="1.2" />

          {/* L298 Multiwatt-15 Staggered Power IC Pins (soldered beneath heatsink) */}
          <g transform="translate(85, 93)">
            {Array.from({ length: 15 }).map((_, idx) => (
              <rect
                key={idx}
                x={idx * 5.4}
                y={idx % 2 === 0 ? 0 : 3}
                width="2.2"
                height="5"
                rx="0.5"
                fill="#cbd5e1"
                stroke="#64748b"
                strokeWidth="0.4"
              />
            ))}
          </g>
        </g>

        {/* 3. 8x Flyback Clamping Diodes (1N4007 / SS14 Protection Diodes) */}
        {/* Left Bank of 4 Diodes */}
        {[70, 84, 98, 112].map((y, idx) => (
          <g key={`d-left-${idx}`} transform={`translate(44, ${y})`}>
            {/* Axial Leads */}
            <line x1="-3" y1="4" x2="17" y2="4" stroke="#cbd5e1" strokeWidth="1.2" />
            {/* Black Diode Body */}
            <rect x="0" y="1" width="14" height="6" rx="2" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
            {/* Bright Silver Cathode Band */}
            <rect x="2" y="1" width="3" height="6" fill="#e2e8f0" />
          </g>
        ))}

        {/* Right Bank of 4 Diodes */}
        {[70, 84, 98, 112].map((y, idx) => (
          <g key={`d-right-${idx}`} transform={`translate(192, ${y})`}>
            <line x1="-3" y1="4" x2="17" y2="4" stroke="#cbd5e1" strokeWidth="1.2" />
            <rect x="0" y="1" width="14" height="6" rx="2" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
            <rect x="9" y="1" width="3" height="6" fill="#e2e8f0" />
          </g>
        ))}

        {/* 4. Large Electrolytic Filter Capacitor (Lower Left) */}
        <g id="filter-capacitor" transform="translate(52, 148)">
          {/* Black Can Body with drop shadow */}
          <circle cx="0" cy="0" r="14.5" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          {/* Aluminum Top Disc */}
          <circle cx="0" cy="0" r="13" fill="url(#l298CapTop)" />
          {/* White Negative Polarity Stripe */}
          <path d="M -11 -7 A 13 13 0 0 1 -11 7 Z" fill="#ffffff" />
          <text x="-9" y="2.5" fontSize="7" fontWeight="900" fill="#0f172a" textAnchor="middle">-</text>
          {/* Pressure Relief Vent Score Marks (Stamping) */}
          <line x1="-5" y1="0" x2="7" y2="0" stroke="#64748b" strokeWidth="1" />
          <line x1="1" y1="-6" x2="1" y2="6" stroke="#64748b" strokeWidth="1" />
        </g>

        {/* 5. 78M05 5V Linear Voltage Regulator (TO-252 Package) */}
        <g id="regulator" transform="translate(86, 112)">
          {/* Solder Heat Tab */}
          <rect x="2" y="-3" width="18" height="4" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />
          {/* Molded Epoxy Package */}
          <rect x="0" y="0" width="22" height="16" rx="1.5" fill="#18181b" stroke="#27272a" />
          <text x="11" y="10" fontSize="4.8" fontWeight="800" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">78M05</text>
          {/* 3 Output Leads */}
          <rect x="2" y="16" width="3" height="4" fill="#cbd5e1" />
          <rect x="9.5" y="16" width="3" height="4" fill="#cbd5e1" />
          <rect x="17" y="16" width="3" height="4" fill="#cbd5e1" />
        </g>

        {/* 5V Regulator Enable 2-Pin Jumper */}
        <g id="regulator-jumper" transform="translate(116, 114)">
          <rect x="0" y="0" width="10" height="14" rx="2" fill="url(#jumperYellowGrad)" stroke="#a16207" strokeWidth="0.8" />
          <line x1="2" y1="7" x2="8" y2="7" stroke="#713f12" strokeWidth="1" />
          <text x="5" y="20" fontSize="4.5" fill="#fecaca" textAnchor="middle" fontFamily="sans-serif">5V_EN</text>
        </g>

        {/* 6. Left Motor Terminal Block (OUT1, OUT2 Blue Screw Terminals) */}
        <g id="terminal-out1-out2">
          {/* Molded Blue Housing */}
          <rect x="6" y="64" width="28" height="62" rx="3.5" fill="url(#terminalBlueGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
          {/* Dividing mold seam */}
          <line x1="6" y1="95" x2="34" y2="95" stroke="#1d4ed8" strokeWidth="1.2" />
          {/* Interlocking dovetail side tabs */}
          <rect x="4" y="78" width="3" height="8" fill="#1d4ed8" rx="1" />
          <rect x="4" y="108" width="3" height="8" fill="#1d4ed8" rx="1" />

          {/* OUT1 Screw Well centered at (20, 80) */}
          <circle cx="20" cy="80" r="7" fill="#1e3a8a" />
          <circle cx="20" cy="80" r="5.5" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="16" y1="80" x2="24" y2="80" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

          {/* OUT2 Screw Well centered at (20, 110) */}
          <circle cx="20" cy="110" r="7" fill="#1e3a8a" />
          <circle cx="20" cy="110" r="5.5" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="16" y1="110" x2="24" y2="110" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 7. Right Motor Terminal Block (OUT3, OUT4 Blue Screw Terminals) */}
        <g id="terminal-out3-out4">
          <rect x="216" y="64" width="28" height="62" rx="3.5" fill="url(#terminalBlueGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
          <line x1="216" y1="95" x2="244" y2="95" stroke="#1d4ed8" strokeWidth="1.2" />
          <rect x="243" y="78" width="3" height="8" fill="#1d4ed8" rx="1" />
          <rect x="243" y="108" width="3" height="8" fill="#1d4ed8" rx="1" />

          {/* OUT3 Screw Well centered at (230, 80) */}
          <circle cx="230" cy="80" r="7" fill="#1e3a8a" />
          <circle cx="230" cy="80" r="5.5" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="226" y1="80" x2="234" y2="80" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

          {/* OUT4 Screw Well centered at (230, 110) */}
          <circle cx="230" cy="110" r="7" fill="#1e3a8a" />
          <circle cx="230" cy="110" r="5.5" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="226" y1="110" x2="234" y2="110" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 8. Power Terminal Block (12V, GND, 5V Blue 3-Position Terminal) */}
        <g id="terminal-power">
          <rect x="172" y="198" width="70" height="26" rx="3.5" fill="url(#terminalBlueGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
          {/* Dividing lines between the 3 positions */}
          <line x1="196" y1="198" x2="196" y2="224" stroke="#1d4ed8" strokeWidth="1.2" />
          <line x1="219" y1="198" x2="219" y2="224" stroke="#1d4ed8" strokeWidth="1.2" />

          {/* 12V Screw centered at (185, 215) */}
          <circle cx="185" cy="215" r="5.8" fill="#1e3a8a" />
          <circle cx="185" cy="215" r="4.6" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="182" y1="215" x2="188" y2="215" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" />

          {/* GND Screw centered at (208, 215) */}
          <circle cx="208" cy="215" r="5.8" fill="#1e3a8a" />
          <circle cx="208" cy="215" r="4.6" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="205" y1="215" x2="211" y2="215" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" />

          {/* 5V Screw centered at (230, 215) */}
          <circle cx="230" cy="215" r="5.8" fill="#1e3a8a" />
          <circle cx="230" cy="215" r="4.6" fill="url(#screwHeadGrad)" stroke="#475569" strokeWidth="0.6" />
          <line x1="227" y1="215" x2="233" y2="215" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" />
        </g>

        {/* 9. Logic Input 6-Pin Male Header Block (ENA, IN1, IN2, IN3, IN4, ENB) */}
        <g id="logic-header">
          {/* Molded Black Header Strip */}
          <rect x="32" y="204" width="122" height="20" rx="2" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          
          {/* 6 Square Header Cavities with Gold Pins */}
          {[
            { x: 42, label: 'ENA' },
            { x: 62, label: 'IN1' },
            { x: 82, label: 'IN2' },
            { x: 102, label: 'IN3' },
            { x: 122, label: 'IN4' },
            { x: 142, label: 'ENB' }
          ].map((pinInfo, i) => (
            <g key={i}>
              <rect x={pinInfo.x - 4} y="209" width="8" height="12" rx="1" fill="#09090b" stroke="#27272a" strokeWidth="0.6" />
              {/* Gold Pin Post */}
              <rect x={pinInfo.x - 2} y="211" width="4" height="4" fill="url(#l298GoldPin)" stroke="#a16207" strokeWidth="0.4" />
            </g>
          ))}

          {/* Removable Enable Jumpers (Visual indicators on ENA and ENB) */}
          <rect x="37" y="202" width="10" height="8" rx="1.5" fill="url(#jumperYellowGrad)" stroke="#a16207" strokeWidth="0.6" />
          <rect x="137" y="202" width="10" height="8" rx="1.5" fill="url(#jumperYellowGrad)" stroke="#a16207" strokeWidth="0.6" />
        </g>

        {/* 10. Status Indicator LED (Power) */}
        <g transform="translate(150, 134)">
          <circle cx="0" cy="0" r="3.5" fill="#22c55e" stroke="#16a34a" strokeWidth="0.8" />
          <circle cx="-1" cy="-1" r="1.2" fill="#86efac" />
          <text x="6" y="2.5" fontSize="5.5" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">PWR</text>
        </g>

        {/* 11. Crisp Silkscreen Typography & Markings */}
        {/* Main Board Title */}
        <text x="125" y="21" fontSize="10.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.8" fontFamily="sans-serif">
          L298N DUAL H-BRIDGE
        </text>

        {/* Motor Output Labels */}
        <text x="38" y="83" fontSize="7.5" fontWeight="800" fill="#ffffff" fontFamily="monospace">OUT1</text>
        <text x="38" y="113" fontSize="7.5" fontWeight="800" fill="#ffffff" fontFamily="monospace">OUT2</text>
        <text x="212" y="83" fontSize="7.5" fontWeight="800" fill="#ffffff" textAnchor="end" fontFamily="monospace">OUT3</text>
        <text x="212" y="113" fontSize="7.5" fontWeight="800" fill="#ffffff" textAnchor="end" fontFamily="monospace">OUT4</text>

        {/* Power Terminal Labels */}
        <text x="185" y="193" fontSize="6.5" fontWeight="800" fill="#fca5a5" textAnchor="middle" fontFamily="monospace">+12V</text>
        <text x="208" y="193" fontSize="6.5" fontWeight="800" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace">GND</text>
        <text x="230" y="193" fontSize="6.5" fontWeight="800" fill="#fca5a5" textAnchor="middle" fontFamily="monospace">+5V</text>

        {/* Logic Header Labels */}
        <text x="42" y="198" fontSize="6.2" fontWeight="800" fill="#facc15" textAnchor="middle" fontFamily="monospace">ENA</text>
        <text x="62" y="198" fontSize="6.2" fontWeight="800" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">IN1</text>
        <text x="82" y="198" fontSize="6.2" fontWeight="800" fill="#93c5fd" textAnchor="middle" fontFamily="monospace">IN2</text>
        <text x="102" y="198" fontSize="6.2" fontWeight="800" fill="#c084fc" textAnchor="middle" fontFamily="monospace">IN3</text>
        <text x="122" y="198" fontSize="6.2" fontWeight="800" fill="#c084fc" textAnchor="middle" fontFamily="monospace">IN4</text>
        <text x="142" y="198" fontSize="6.2" fontWeight="800" fill="#facc15" textAnchor="middle" fontFamily="monospace">ENB</text>
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

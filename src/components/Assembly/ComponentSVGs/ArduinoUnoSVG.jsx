import React from 'react';

export default function ArduinoUnoSVG({ 
  pins = [], 
  onPinClick, 
  onPinHover, 
  hoveredPin, 
  activePin, 
  connectedPinIds = new Set() 
}) {
  return (
    <div style={{ position: 'relative', width: '290px', height: '220px', userSelect: 'none' }}>
      <svg 
        width="290" 
        height="220" 
        viewBox="0 0 290 220" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.45))' }}
      >
        <defs>
          {/* PCB Base Gradient */}
          <linearGradient id="unoPcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="30%" stopColor="#0369a1" />
            <stop offset="85%" stopColor="#075985" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* PCB Trace Copper subtle glow */}
          <linearGradient id="unoTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>

          {/* Brushed Metal USB & Components */}
          <linearGradient id="brushedMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Metallic Silver for Can Capacitors */}
          <radialGradient id="canCapTop" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#cbd5e1" />
            <stop offset="90%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          {/* Gold Pin Gradient */}
          <linearGradient id="goldPinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Red Tactile Button */}
          <radialGradient id="redBtnGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          {/* IC Chip Body */}
          <linearGradient id="dipIcBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="12%" stopColor="#18181b" />
            <stop offset="85%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>

          {/* Female Header Plastic Texture */}
          <linearGradient id="headerStripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="15%" stopColor="#171717" />
            <stop offset="85%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>
        </defs>

        {/* 1. PCB Main Board Contour (Realistic Arduino Uno shape with authentic cutouts & notch) */}
        <path
          d="
            M 20 10
            L 272 10
            Q 282 10 282 20
            L 282 58
            L 288 64
            L 288 152
            L 282 158
            L 282 200
            Q 282 210 272 210
            L 20 210
            Q 10 210 10 200
            L 10 20
            Q 10 10 20 10
            Z
          "
          fill="url(#unoPcbGrad)"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* PCB Solder-mask Decorative Edge Inset */}
        <path
          d="
            M 22 13
            L 270 13
            L 270 56
            L 285 62
            L 285 154
            L 270 160
            L 270 207
            L 22 207
            Z
          "
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
        />

        {/* Realistic PCB Trace Artwork (Simulated copper routing paths) */}
        <g stroke="url(#unoTraceGrad)" strokeWidth="1.2" fill="none" opacity="0.7">
          <path d="M 50 40 L 70 40 L 80 50 L 105 50" />
          <path d="M 50 65 L 75 65 L 85 75 L 120 75" />
          <path d="M 105 92 L 120 92 L 125 97" />
          <path d="M 105 105 L 125 105" />
          <path d="M 105 115 L 115 115 L 125 110" />
          <path d="M 90 145 L 110 145 L 120 155 L 140 155" />
          <path d="M 75 160 L 95 160 L 105 170 L 140 170" />
          <path d="M 130 30 L 130 50 L 138 58 L 138 88" />
          <path d="M 148 30 L 148 55 L 142 61 L 142 88" />
          <path d="M 184 30 L 184 65 L 160 88" />
          <path d="M 202 30 L 202 70 L 180 88" />
          <path d="M 220 30 L 220 75 L 195 88" />
          <path d="M 238 30 L 238 80 L 210 88" />
          <path d="M 256 30 L 256 88" />
          <path d="M 274 30 L 274 65 L 265 74 L 265 88" />
          <path d="M 155 190 L 155 145 L 160 126" />
          <path d="M 173 190 L 173 150 L 175 126" />
          <path d="M 191 190 L 191 145 L 190 126" />
          <path d="M 209 190 L 209 155 L 205 126" />
        </g>

        {/* 4 Plated Mounting Screwholes with Annular Rings & Ground Vias */}
        {[
          { cx: 25, cy: 30 },
          { cx: 265, cy: 30 },
          { cx: 265, cy: 190 },
          { cx: 75, cy: 190 },
        ].map((hole, i) => (
          <g key={i}>
            <circle cx={hole.cx} cy={hole.cy} r="6.5" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
            <circle cx={hole.cx} cy={hole.cy} r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.8" />
            <circle cx={hole.cx} cy={hole.cy} r="3" fill="#020617" />
            {/* Ground via dots around hole pad */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <circle
                  key={j}
                  cx={hole.cx + Math.cos(rad) * 8}
                  cy={hole.cy + Math.sin(rad) * 8}
                  r="0.8"
                  fill="#94a3b8"
                />
              );
            })}
          </g>
        ))}

        {/* 2. Metal USB Type-B Port Housing (Left edge) */}
        <g id="usb-port">
          {/* Main Shielded Metal Can */}
          <rect x="2" y="34" width="40" height="42" rx="3" fill="url(#brushedMetal)" stroke="#64748b" strokeWidth="1.2" />
          {/* Beveled Top Stamping Frame */}
          <rect x="6" y="38" width="32" height="34" rx="2" fill="#475569" stroke="#334155" strokeWidth="1" />
          {/* USB Interior Cavity */}
          <rect x="10" y="42" width="24" height="26" rx="2" fill="#0f172a" />
          {/* Inner Plastic Tongue / Guide */}
          <path d="M 14 48 L 30 48 L 28 58 L 16 58 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
          {/* 4 Gold Spring Contact Leaves */}
          {[16, 20, 24, 28].map((xPos, idx) => (
            <line key={idx} x1={xPos} y1="50" x2={xPos} y2="56" stroke="url(#goldPinGrad)" strokeWidth="1.4" strokeLinecap="round" />
          ))}
          {/* Top/Side Grounding Embossed Spring Tabs */}
          <rect x="17" y="35" width="10" height="2" fill="#94a3b8" />
          <rect x="17" y="73" width="10" height="2" fill="#64748b" />
          {/* PCB Through-hole Solder Tabs */}
          <rect x="41" y="44" width="3" height="6" fill="#cbd5e1" rx="1" />
          <rect x="41" y="60" width="3" height="6" fill="#cbd5e1" rx="1" />
        </g>

        {/* 3. DC Barrel Power Jack (Bottom Left) */}
        <g id="dc-jack">
          {/* Heavy Black Plastic Molded Body */}
          <rect x="0" y="124" width="46" height="44" rx="3" fill="#09090b" stroke="#27272a" strokeWidth="1.5" />
          <rect x="3" y="127" width="40" height="38" rx="2" fill="#18181b" />
          {/* Mold seams and ribs */}
          <line x1="14" y1="125" x2="14" y2="167" stroke="#27272a" strokeWidth="1" />
          <line x1="28" y1="125" x2="28" y2="167" stroke="#27272a" strokeWidth="1" />
          {/* Cylindrical Opening */}
          <rect x="0" y="132" width="12" height="28" rx="3" fill="#020617" />
          <ellipse cx="12" cy="146" rx="8" ry="12" fill="#09090b" stroke="#27272a" />
          <ellipse cx="12" cy="146" rx="6" ry="9" fill="#020617" />
          {/* Center Brass Contact Pin */}
          <ellipse cx="13" cy="146" rx="2.5" ry="3.5" fill="url(#goldPinGrad)" />
          {/* Rear Solder Pin Pad */}
          <rect x="45" y="142" width="4" height="8" rx="1" fill="#94a3b8" />
        </g>

        {/* 4. Reset Tactile Button (Top left) */}
        <g id="reset-button">
          {/* Metal housing */}
          <rect x="48" y="24" width="18" height="18" rx="2.5" fill="url(#brushedMetal)" stroke="#64748b" strokeWidth="0.8" />
          {/* 4 Corner Solder Legs */}
          <rect x="46" y="25" width="2" height="3" fill="#cbd5e1" />
          <rect x="46" y="37" width="2" height="3" fill="#cbd5e1" />
          <rect x="66" y="25" width="2" height="3" fill="#cbd5e1" />
          <rect x="66" y="37" width="2" height="3" fill="#cbd5e1" />
          {/* Inner Well */}
          <circle cx="57" cy="33" r="6" fill="#18181b" />
          {/* Red Plunger Button */}
          <circle cx="57" cy="33" r="4.5" fill="url(#redBtnGrad)" />
          <circle cx="55.5" cy="31.5" r="1.5" fill="#fca5a5" opacity="0.6" />
          {/* Label */}
          <text x="57" y="48" fontSize="5.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">RESET</text>
        </g>

        {/* 5. 16.000 MHz Crystal Oscillator (Oval Silver Can) */}
        <g id="crystal">
          <rect x="74" y="80" width="22" height="11" rx="5.5" fill="url(#brushedMetal)" stroke="#64748b" strokeWidth="0.8" />
          {/* Embossed Text */}
          <text x="85" y="87.5" fontSize="4.8" fontWeight="700" fill="#334155" textAnchor="middle" fontFamily="monospace">SPK 16.0</text>
          {/* Solder Tabs */}
          <line x1="72" y1="85.5" x2="74" y2="85.5" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="96" y1="85.5" x2="98" y2="85.5" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>

        {/* 6. Dual Aluminum Electrolytic Capacitors (Silver Can tops with vent scores) */}
        {/* Cap 1 (near reset) */}
        <g id="cap-1" transform="translate(56, 70)">
          <circle cx="0" cy="0" r="8.5" fill="url(#canCapTop)" stroke="#475569" strokeWidth="1" />
          {/* Negative Terminal Black Crescent / Bar */}
          <path d="M -7 -4 A 8 8 0 0 1 -7 4 Z" fill="#0f172a" />
          <text x="-6" y="2" fontSize="5" fontWeight="900" fill="#ffffff" textAnchor="middle">-</text>
          {/* Vent Stamping Cross */}
          <line x1="-3" y1="0" x2="4" y2="0" stroke="#64748b" strokeWidth="0.8" />
          <line x1="0.5" y1="-3.5" x2="0.5" y2="3.5" stroke="#64748b" strokeWidth="0.8" />
        </g>

        {/* Cap 2 (near power jack) */}
        <g id="cap-2" transform="translate(56, 110)">
          <circle cx="0" cy="0" r="8.5" fill="url(#canCapTop)" stroke="#475569" strokeWidth="1" />
          <path d="M -7 -4 A 8 8 0 0 1 -7 4 Z" fill="#0f172a" />
          <text x="-6" y="2" fontSize="5" fontWeight="900" fill="#ffffff" textAnchor="middle">-</text>
          <line x1="-3" y1="0" x2="4" y2="0" stroke="#64748b" strokeWidth="0.8" />
          <line x1="0.5" y1="-3.5" x2="0.5" y2="3.5" stroke="#64748b" strokeWidth="0.8" />
        </g>

        {/* 7. Voltage Regulator (AMS1117-5.0 SOT-223) */}
        <g id="voltage-regulator">
          {/* Copper Heat Sink Solder Tab */}
          <rect x="74" y="100" width="14" height="6" rx="1" fill="#94a3b8" stroke="#64748b" strokeWidth="0.5" />
          {/* Black Epoxy Body */}
          <rect x="72" y="105" width="18" height="14" rx="1.5" fill="#18181b" stroke="#27272a" />
          <text x="81" y="114" fontSize="4.2" fontWeight="700" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">1117-5V</text>
          {/* 3 Leads */}
          <rect x="73" y="119" width="3" height="4" fill="#cbd5e1" />
          <rect x="79.5" y="119" width="3" height="4" fill="#cbd5e1" />
          <rect x="86" y="119" width="3" height="4" fill="#cbd5e1" />
        </g>

        {/* 8. ATmega16U2 (USB Interface IC) */}
        <g id="atmega16u2">
          <rect x="82" y="44" width="16" height="16" rx="1.5" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
          <circle cx="85" cy="47" r="1" fill="#71717a" />
          <text x="90" y="53" fontSize="3.8" fontWeight="700" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">MEGA</text>
          <text x="90" y="57" fontSize="3.5" fontWeight="700" fill="#a1a1aa" textAnchor="middle" fontFamily="monospace">16U2</text>
          {/* Pins on 4 sides */}
          {[-5, -2, 1, 4].map((offset, i) => (
            <React.Fragment key={i}>
              <line x1={90 + offset} y1="41" x2={90 + offset} y2="44" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1={90 + offset} y1="60" x2={90 + offset} y2="63" stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="79" y1={52 + offset} x2="82" y2={52 + offset} stroke="#cbd5e1" strokeWidth="0.8" />
              <line x1="98" y1={52 + offset} x2="101" y2={52 + offset} stroke="#cbd5e1" strokeWidth="0.8" />
            </React.Fragment>
          ))}
        </g>

        {/* 9. ATmega328P DIP-28 Microcontroller & Socket */}
        <g id="atmega328p-socket">
          {/* IC Socket Outline with Center Recess */}
          <rect x="125" y="87" width="144" height="42" rx="3" fill="#121214" stroke="#3f3f46" strokeWidth="1.2" />
          <rect x="135" y="94" width="124" height="28" rx="1.5" fill="#09090b" />
          
          {/* Socket Semi-circular Notch on Left */}
          <path d="M 125 102 A 6 6 0 0 1 125 114 Z" fill="#27272a" stroke="#3f3f46" strokeWidth="0.8" />
          
          {/* Socket Dual-Wipe Contact Pins (14 pairs along top & bottom) */}
          {Array.from({ length: 14 }).map((_, i) => {
            const x = 132 + i * 9.5;
            return (
              <React.Fragment key={i}>
                {/* Top pins */}
                <rect x={x - 1.2} y="88" width="2.4" height="4" fill="#cbd5e1" />
                <circle cx={x} cy={90} r="1" fill="#475569" />
                {/* Bottom pins */}
                <rect x={x - 1.2} y="117" width="2.4" height="4" fill="#cbd5e1" />
                <circle cx={x} cy={119} r="1" fill="#475569" />
              </React.Fragment>
            );
          })}

          {/* ATmega328P DIP IC Body */}
          <rect x="128" y="92" width="138" height="32" rx="2" fill="url(#dipIcBody)" stroke="#27272a" strokeWidth="1" />
          {/* IC Orientation Notch */}
          <path d="M 128 103 A 5 5 0 0 1 128 113 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="0.8" />
          {/* Pin 1 Index Dot */}
          <circle cx="135" cy="118" r="1.5" fill="#3f3f46" />

          {/* Laser-Etched IC Markings */}
          <text x="195" y="105" fontSize="6.5" fontWeight="800" fill="#a1a1aa" textAnchor="middle" letterSpacing="0.8" fontFamily="monospace">
            ATMEL
          </text>
          <text x="195" y="114" fontSize="8" fontWeight="800" fill="#e4e4e7" textAnchor="middle" letterSpacing="1" fontFamily="monospace">
            ATMEGA328P-PU
          </text>
          <text x="195" y="121" fontSize="5" fontWeight="600" fill="#71717a" textAnchor="middle" letterSpacing="0.5" fontFamily="monospace">
            2135 PHILIPPINES
          </text>
        </g>

        {/* 10. ICSP 2x3 Male Header Pins */}
        <g id="icsp-header" transform="translate(254, 98)">
          <rect x="0" y="0" width="18" height="12" rx="1.5" fill="#18181b" stroke="#3f3f46" />
          {[0, 1, 2].map((col) => (
            <React.Fragment key={col}>
              <rect x={2.5 + col * 5} y="2" width="2.8" height="2.8" fill="url(#goldPinGrad)" stroke="#a16207" strokeWidth="0.4" />
              <rect x={2.5 + col * 5} y="7" width="2.8" height="2.8" fill="url(#goldPinGrad)" stroke="#a16207" strokeWidth="0.4" />
            </React.Fragment>
          ))}
          <text x="9" y="18" fontSize="4.5" fill="#cbd5e1" textAnchor="middle" fontFamily="sans-serif">ICSP</text>
        </g>

        {/* 11. Built-in SMD Indicator LEDs (ON, L, TX, RX) */}
        {/* Power ON LED (Green) */}
        <g transform="translate(74, 134)">
          <rect x="0" y="0" width="5" height="7" rx="1.2" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
          <rect x="1" y="1" width="3" height="5" rx="0.8" fill="#86efac" opacity="0.8" />
          <text x="8" y="6" fontSize="5.5" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">ON</text>
        </g>

        {/* Pin 13 "L" LED (Yellow/Amber) */}
        <g transform="translate(74, 148)">
          <rect x="0" y="0" width="5" height="7" rx="1.2" fill="#eab308" stroke="#ca8a04" strokeWidth="0.5" />
          <rect x="1" y="1" width="3" height="5" rx="0.8" fill="#fef08a" opacity="0.8" />
          <text x="8" y="6" fontSize="5.5" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">L</text>
        </g>

        {/* TX & RX LEDs */}
        <g transform="translate(74, 60)">
          <rect x="0" y="0" width="4" height="5" rx="1" fill="#eab308" />
          <text x="6" y="4.5" fontSize="4.5" fill="#e2e8f0" fontFamily="sans-serif">TX</text>
          <rect x="0" y="8" width="4" height="5" rx="1" fill="#eab308" />
          <text x="6" y="12.5" fontSize="4.5" fill="#e2e8f0" fontFamily="sans-serif">RX</text>
        </g>

        {/* 12. Official Silkscreen Logo & Board Branding */}
        <g id="arduino-branding">
          {/* Arduino Infinity Logo */}
          <g transform="translate(142, 54)">
            <path
              d="M 12 0 C 18 0 22 5 26 8 C 30 5 34 0 40 0 C 47 0 52 5 52 11 C 52 17 47 22 40 22 C 34 22 30 17 26 14 C 22 17 18 22 12 22 C 5 22 0 17 0 11 C 0 5 5 0 12 0 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.8"
            />
            {/* Inner + and - symbols */}
            <line x1="8" y1="11" x2="16" y2="11" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="36" y1="11" x2="44" y2="11" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="40" y1="7" x2="40" y2="15" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          </g>

          {/* Arduino Script typography */}
          <text x="200" y="62" fontSize="13" fontWeight="900" fill="#ffffff" letterSpacing="0.5" fontFamily="sans-serif">
            Arduino
          </text>
          <text x="200" y="75" fontSize="12" fontWeight="900" fill="none" stroke="#ffffff" strokeWidth="0.8" letterSpacing="1.5" fontFamily="sans-serif">
            UNO
          </text>
        </g>

        {/* 13. Top Digital Pin Female Header Strip (Realistic 10-pin + 8-pin black sockets) */}
        <g id="top-female-headers">
          {/* Header block housing */}
          <rect x="122" y="8" width="162" height="20" rx="2" fill="url(#headerStripGrad)" stroke="#404040" strokeWidth="1" />
          
          {/* Individual Square Socket Holes with Metallic Contacts Inside */}
          {[
            // D2..D10 matching exact pin coordinates
            130, 148, 166, 184, 202, 220, 238, 256, 274
          ].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="14" width="8" height="8" rx="1.2" fill="#050505" stroke="#262626" strokeWidth="0.8" />
              <rect x={x - 2} y="16" width="4" height="4" rx="0.5" fill="#000000" />
              {/* Shiny metal spring contact leaf visible inside socket */}
              <circle cx={x} cy={18} r="1" fill="#cbd5e1" opacity="0.75" />
            </g>
          ))}
          {/* Additional GND pin hole at top right (ard_gnd_top) */}
          <rect x="280" y="31" width="8" height="8" rx="1.2" fill="#050505" stroke="#262626" strokeWidth="0.8" />
          <circle cx="284" cy="35" r="1" fill="#cbd5e1" opacity="0.75" />

          {/* Top Header Silkscreen Labels */}
          <text x="130" y="34" fontSize="6.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">D2</text>
          <text x="148" y="34" fontSize="6.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">D3~</text>
          <text x="166" y="34" fontSize="6.5" fontWeight="700" fill="#cbd5e1" textAnchor="middle" fontFamily="monospace">D4</text>
          <text x="184" y="34" fontSize="6.5" fontWeight="800" fill="#facc15" textAnchor="middle" fontFamily="monospace">D5~</text>
          <text x="202" y="34" fontSize="6.5" fontWeight="800" fill="#60a5fa" textAnchor="middle" fontFamily="monospace">D6~</text>
          <text x="220" y="34" fontSize="6.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">D7</text>
          <text x="238" y="34" fontSize="6.5" fontWeight="700" fill="#ffffff" textAnchor="middle" fontFamily="monospace">D8</text>
          <text x="256" y="34" fontSize="6.5" fontWeight="800" fill="#c084fc" textAnchor="middle" fontFamily="monospace">D9~</text>
          <text x="274" y="34" fontSize="6.5" fontWeight="800" fill="#facc15" textAnchor="middle" fontFamily="monospace">D10~</text>
          <text x="284" y="46" fontSize="5.5" fontWeight="700" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>

          {/* Section Silkscreen Header */}
          <text x="195" y="44" fontSize="6" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="0.8" fontFamily="sans-serif">
            DIGITAL (PWM~)
          </text>
        </g>

        {/* 14. Bottom Power & Analog Female Header Strip */}
        <g id="bottom-female-headers">
          <rect x="122" y="195" width="162" height="20" rx="2" fill="url(#headerStripGrad)" stroke="#404040" strokeWidth="1" />
          
          {/* Socket holes matching 5V, GND, GND, VIN coordinates */}
          {[137, 155, 173, 191, 209, 227, 245, 263].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="201" width="8" height="8" rx="1.2" fill="#050505" stroke="#262626" strokeWidth="0.8" />
              <rect x={x - 2} y="203" width="4" height="4" rx="0.5" fill="#000000" />
              <circle cx={x} cy={205} r="1" fill="#cbd5e1" opacity="0.75" />
            </g>
          ))}

          {/* Bottom Header Silkscreen Labels */}
          <text x="137" y="190" fontSize="6.5" fontWeight="700" fill="#cbd5e1" textAnchor="middle" fontFamily="monospace">3.3V</text>
          <text x="155" y="190" fontSize="6.5" fontWeight="800" fill="#f87171" textAnchor="middle" fontFamily="monospace">5V</text>
          <text x="173" y="190" fontSize="6.5" fontWeight="800" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>
          <text x="191" y="190" fontSize="6.5" fontWeight="800" fill="#94a3b8" textAnchor="middle" fontFamily="monospace">GND</text>
          <text x="209" y="190" fontSize="6.5" fontWeight="800" fill="#fb923c" textAnchor="middle" fontFamily="monospace">VIN</text>

          <text x="173" y="180" fontSize="6" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="0.8" fontFamily="sans-serif">
            POWER
          </text>
        </g>
      </svg>

      {/* Interactive Pin Click Targets (Unchanged logic & exact coordinates) */}
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

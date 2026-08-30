import React from 'react';

export const CadProbe = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      
      {/* Background CAD Blueprint Elements */}
      <g strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
        <line x1="40" y1="200" x2="560" y2="200" />
        <line x1="300" y1="40" x2="300" y2="360" />
        <circle cx="300" cy="200" r="140" />
        <circle cx="300" cy="200" r="90" />
      </g>
      
      <g transform="rotate(-25 300 200)">
        
        {/* Technical Guidelines */}
        <g strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2">
          {/* Center axis */}
          <line x1="50" y1="200" x2="550" y2="200" />
        </g>

        {/* 0. Lanyard Ring at base */}
        <ellipse cx="94" cy="200" rx="3" ry="8" strokeWidth="0.8" opacity="0.6" />
        <ellipse cx="96" cy="200" rx="3" ry="8" strokeWidth="0.8" opacity="0.6" />

        {/* 1. Handle */}
        <path d="M 100 186 L 200 186 L 200 214 L 100 214 Z" fill="white" stroke="none" />
        <path d="M 100 186 L 200 186" />
        <path d="M 100 214 L 200 214" />
        <path d="M 100 214 A 5 14 0 0 1 100 186" />
        <ellipse cx="200" cy="200" rx="5" ry="14" fill="white" />
        
        {/* Handle Knurling & Grooves */}
        <g strokeWidth="0.5" opacity="0.4">
          {[...Array(20)].map((_, i) => (
            <path key={`k-${i}`} d={`M ${105 + i*4.5} 186 A 3 14 0 0 1 ${105 + i*4.5} 214`} />
          ))}
          {/* Horizontal Grip Grooves */}
          <line x1="105" y1="192" x2="195" y2="192" />
          <line x1="105" y1="208" x2="195" y2="208" />
        </g>

        {/* 2. Hand Guard */}
        <path d="M 205 160 L 212 160 L 212 240 L 205 240 Z" fill="white" stroke="none" />
        <path d="M 205 160 L 212 160" />
        <path d="M 205 240 L 212 240" />
        <path d="M 205 240 A 12 40 0 0 1 205 160" />
        <ellipse cx="212" cy="200" rx="12" ry="40" fill="white" />
        
        {/* Hand Guard Ridges */}
        <ellipse cx="212" cy="200" rx="9" ry="32" strokeWidth="0.5" opacity="0.5" />
        <ellipse cx="212" cy="200" rx="6" ry="24" strokeWidth="0.5" opacity="0.5" />
        
        {/* Fasteners on Hand Guard */}
        <circle cx="210" cy="170" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="210" cy="185" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="210" cy="215" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="210" cy="230" r="1.5" fill="currentColor" stroke="none" opacity="0.6" />

        {/* 3. Shaft 1 */}
        <path d="M 212 192 L 310 192 L 310 208 L 212 208 Z" fill="white" stroke="none" />
        <path d="M 212 192 L 310 192" />
        <path d="M 212 208 L 310 208" />
        <ellipse cx="310" cy="200" rx="4" ry="8" fill="white" />
        
        {/* Internal spring detail on Shaft 1 */}
        <g strokeWidth="0.5" opacity="0.2">
          {[...Array(10)].map((_, i) => (
            <path key={`s-${i}`} d={`M ${230 + i*6} 192 L ${233 + i*6} 208`} />
          ))}
        </g>
        
        {/* 4. Collar 1 (Hexagonal Nut Design) */}
        <path d="M 310 188 L 330 188 L 330 212 L 310 212 Z" fill="white" stroke="none" />
        <path d="M 310 188 L 330 188" />
        <path d="M 310 212 L 330 212" />
        <path d="M 310 212 L 308 200 L 310 188" />
        <path d="M 330 212 L 332 200 L 330 188" />
        <line x1="310" y1="194" x2="330" y2="194" strokeWidth="0.5" />
        <line x1="310" y1="206" x2="330" y2="206" strokeWidth="0.5" />
        <ellipse cx="330" cy="200" rx="3" ry="12" fill="white" stroke="none" />
        
        {/* 5. Shaft 2 */}
        <path d="M 330 194 L 420 194 L 420 206 L 330 206 Z" fill="white" stroke="none" />
        <path d="M 330 194 L 420 194" />
        <path d="M 330 206 L 420 206" />
        <ellipse cx="420" cy="200" rx="3" ry="6" fill="white" />
        <line x1="330" y1="200" x2="420" y2="200" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 2" />

        {/* 6. Collar 2 (Hexagonal Nut Design) */}
        <path d="M 420 190 L 435 190 L 435 210 L 420 210 Z" fill="white" stroke="none" />
        <path d="M 420 190 L 435 190" />
        <path d="M 420 210 L 435 210" />
        <path d="M 420 210 L 418 200 L 420 190" />
        <path d="M 435 210 L 437 200 L 435 190" />
        <line x1="420" y1="195" x2="435" y2="195" strokeWidth="0.5" />
        <line x1="420" y1="205" x2="435" y2="205" strokeWidth="0.5" />
        <ellipse cx="435" cy="200" rx="2" ry="10" fill="white" stroke="none" />

        {/* 7. Shaft 3 */}
        <path d="M 435 196 L 510 196 L 510 204 L 435 204 Z" fill="white" stroke="none" />
        <path d="M 435 196 L 510 196" />
        <path d="M 435 204 L 510 204" />
        <ellipse cx="510" cy="200" rx="2" ry="4" fill="white" />

        {/* 8. Tip Base (Tactical Grooved) */}
        <path d="M 510 194 L 525 194 L 525 206 L 510 206 Z" fill="white" stroke="none" />
        <path d="M 510 194 L 525 194" />
        <path d="M 510 206 L 525 206" />
        <path d="M 510 206 A 3 6 0 0 1 510 194" />
        <ellipse cx="525" cy="200" rx="3" ry="6" fill="white" />
        <line x1="515" y1="194" x2="515" y2="206" strokeWidth="0.5" opacity="0.6" />
        <line x1="520" y1="194" x2="520" y2="206" strokeWidth="0.5" opacity="0.6" />

        {/* 9. Tip Cone */}
        <path d="M 525 196 L 575 200 L 525 204 Z" fill="white" stroke="none" />
        <path d="M 525 196 L 575 200 L 525 204" />
        <ellipse cx="525" cy="200" rx="2" ry="4" fill="white" stroke="none" />
        {/* Tip highlight */}
        <path d="M 525 198 L 565 200" strokeWidth="0.5" opacity="0.4" />

        {/* Precision Crosshairs & Action Lines */}
        <g strokeWidth="0.5" opacity="0.6">
          <line x1="585" y1="200" x2="605" y2="200" />
          <line x1="595" y1="190" x2="595" y2="210" />
          <circle cx="595" cy="200" r="4" />
          <line x1="575" y1="200" x2="585" y2="200" strokeDasharray="2 2" />
        </g>
        
        <text x="560" y="225" fill="currentColor" opacity="0.5" fontSize="8" fontFamily="monospace">Ø 8</text>
        <line x1="545" y1="205" x2="555" y2="220" strokeWidth="0.5" opacity="0.5" />
      </g>
    </g>
  </svg>
);

export const CadMirror = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      
      {/* Background CAD Blueprint Elements */}
      <g strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4">
        <line x1="50" y1="200" x2="550" y2="200" />
        <line x1="320" y1="50" x2="320" y2="350" />
        <circle cx="320" cy="200" r="140" />
      </g>
      <text x="320" y="370" fill="currentColor" opacity="0.5" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">TACTICAL INSPECTION MIRROR V2.0</text>
      
      {/* Dimension Lines */}
      <g strokeWidth="0.5" opacity="0.5">
        <line x1="280" y1="130" x2="360" y2="130" />
        <line x1="280" y1="125" x2="280" y2="135" />
        <line x1="360" y1="125" x2="360" y2="135" />
        <text x="320" y="125" fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">Ø 180</text>
      </g>

      {/* Lower Pole Section */}
      <path d="M 140 330 L 250 270" />
      <path d="M 130 310 L 240 250" />
      <path d="M 140 330 A 10 10 0 0 1 130 310" />
      
      {/* Heavy Knurled Grip (Cross-hatched) */}
      <path d="M 160 320 L 220 285" strokeWidth="0.5" />
      <path d="M 155 310 L 215 275" strokeWidth="0.5" />
      <g strokeWidth="0.5" opacity="0.6">
        {/* Forward slashes */}
        {[...Array(14)].map((_, i) => (
          <line key={`k1-${i}`} x1={152 + i*5} y1={310 - i*2.7} x2={165 + i*5} y2={325 - i*2.7} />
        ))}
        {/* Backward slashes for cross-hatch */}
        {[...Array(14)].map((_, i) => (
          <line key={`k2-${i}`} x1={155 + i*5} y1={322 - i*2.7} x2={162 + i*5} y2={308 - i*2.7} />
        ))}
      </g>
      
      {/* Electronics / Switch Module on Lower Pole */}
      <path d="M 215 274 L 235 263 L 230 253 L 210 264 Z" fill="white" />
      <ellipse cx="223" cy="263" rx="3" ry="1.5" transform="rotate(-30 223 263)" fill="currentColor" opacity="0.3" stroke="none" />
      <ellipse cx="228" cy="260" rx="3" ry="1.5" transform="rotate(-30 228 260)" fill="currentColor" opacity="0.3" stroke="none" />
      <line x1="228" y1="260" x2="232" y2="257" strokeWidth="0.5" />
      
      {/* Coiled Wire Wrapping around Lower Pole */}
      <path d="M 212 268 C 215 280 230 270 232 260 C 235 270 245 265 248 255" fill="none" strokeWidth="0.8" opacity="0.6" />
      
      {/* Middle Lock Nut (Telescopic Joint 1) */}
      <path d="M 245 275 L 260 265 L 255 250 L 240 260 Z" fill="white" />
      <line x1="248" y1="273" x2="258" y2="263" strokeWidth="0.5" />
      <line x1="244" y1="265" x2="254" y2="255" strokeWidth="0.5" />
      <line x1="246" y1="269" x2="256" y2="259" strokeWidth="0.5" />
      
      {/* Swivel Ball Joint (connecting pole to mirror) */}
      <circle cx="280" cy="235" r="8" fill="white" />
      <path d="M 275 230 A 8 8 0 0 1 285 240" strokeWidth="0.5" />
      <path d="M 272 235 Q 280 245 288 235" strokeWidth="0.5" />
      
      {/* Upper Pole Section */}
      <path d="M 390 180 L 510 115" />
      <path d="M 380 160 L 500 95" />
      <path d="M 510 115 A 10 10 0 0 0 500 95" />
      <path d="M 480 130 L 470 110" strokeWidth="0.5" />
      <path d="M 490 125 L 480 105" strokeWidth="0.5" />
      
      {/* Upper Lock Nut (Telescopic Joint 2) */}
      <path d="M 370 190 L 385 182 L 375 165 L 360 173 Z" fill="white" />
      <line x1="365" y1="187" x2="375" y2="170" strokeWidth="0.5" />
      <line x1="368" y1="185" x2="378" y2="168" strokeWidth="0.5" />
      
      {/* Coiled Wire Wrapping around Upper Pole */}
      <path d="M 375 185 C 385 195 395 185 390 175 C 395 185 405 180 405 170 C 410 180 415 175 415 165" fill="none" strokeWidth="0.8" opacity="0.6" />
      
      {/* Wire Routing (from switch to light module, hovering over joint) */}
      <path d="M 235 263 Q 270 280 320 270 T 395 245" strokeWidth="0.8" opacity="0.6" strokeDasharray="2 3" fill="none" />
      
      {/* White background block for the mirror to hide lines behind it */}
      <ellipse cx="320" cy="200" rx="90" ry="55" fill="white" stroke="none" />
      <path d="M 230 200 C 230 240 270 260 320 260 C 370 260 410 240 410 200 L 410 220 C 410 260 370 280 320 280 C 270 280 230 260 230 220 Z" fill="white" stroke="none" />
      
      {/* Mirror Head Frame Thickness (Stepped Bezel) */}
      <path d="M 230 200 C 230 240 270 260 320 260 C 370 260 410 240 410 200" />
      <path d="M 230 220 C 230 260 270 280 320 280 C 370 280 410 260 410 220" />
      <path d="M 230 210 C 230 250 270 270 320 270 C 370 270 410 250 410 210" strokeWidth="0.5" opacity="0.5" />
      <path d="M 230 200 L 230 220" />
      <path d="M 410 200 L 410 220" />
      
      {/* Top Surface of Mirror Frame */}
      <ellipse cx="320" cy="200" rx="90" ry="55" />
      
      {/* Inner Mirror Glass */}
      <ellipse cx="320" cy="200" rx="78" ry="46" strokeWidth="1" />
      {/* Glass Bevel Detail */}
      <ellipse cx="320" cy="200" rx="74" ry="42" strokeWidth="0.5" opacity="0.4" />
      
      {/* Mirror Reflection / Grid Overlay */}
      <g strokeWidth="0.5" opacity="0.15">
        {[...Array(6)].map((_, i) => (
          <ellipse key={`mg-${i}`} cx="320" cy="200" rx={74 - i*10} ry={42 - i*6} />
        ))}
      </g>
      
      {/* Bezel Screws */}
      <circle cx="320" cy="151" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="320" cy="249" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="236" cy="200" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="404" cy="200" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="260" cy="165" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="380" cy="165" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="260" cy="235" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      <circle cx="380" cy="235" r="1.5" fill="currentColor" opacity="0.6" stroke="none" />
      
      {/* Subtly Curved Glass Glare Reflections */}
      <path d="M 275 185 L 295 170" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <path d="M 280 195 L 325 160" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M 305 200 L 335 175" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      
      {/* Attachment Block / LED Module on Right Side */}
      <path d="M 395 245 L 435 265 L 455 250 L 415 230 Z" fill="white" />
      <path d="M 435 265 L 435 280 L 455 265 L 455 250 Z" fill="white" />
      <path d="M 415 230 L 415 245" />
      
      {/* Internal Lens and LEDs */}
      <ellipse cx="435" cy="258" rx="10" ry="5" transform="rotate(-30 435 258)" strokeWidth="0.5" />
      <circle cx="432" cy="256" r="1.5" fill="currentColor" opacity="0.5" stroke="none" />
      <circle cx="437" cy="259" r="1.5" fill="currentColor" opacity="0.5" stroke="none" />
      <circle cx="434" cy="261" r="1.5" fill="currentColor" opacity="0.5" stroke="none" />
      
      {/* Hinge Details on Block */}
      <ellipse cx="430" cy="272" rx="4" ry="2" />
      <ellipse cx="450" cy="258" rx="4" ry="2" />
      <path d="M 405 240 L 420 250" strokeWidth="0.5" />
      <path d="M 410 236 L 425 246" strokeWidth="0.5" />
      
      {/* LED Lens Ridges / Heat Sink Fins */}
      <path d="M 417 253 L 427 246" strokeWidth="0.5" opacity="0.6" />
      <path d="M 421 256 L 431 249" strokeWidth="0.5" opacity="0.6" />
      <path d="M 425 259 L 435 252" strokeWidth="0.5" opacity="0.6" />
      <path d="M 429 262 L 439 255" strokeWidth="0.5" opacity="0.6" />
      <path d="M 433 265 L 443 258" strokeWidth="0.5" opacity="0.6" />
      
      {/* Final Cable tie / Fastener */}
      <rect x="400" y="240" width="4" height="2" transform="rotate(30 400 240)" fill="currentColor" opacity="0.6" />
    </g>
  </svg>
);

export const CadKit = () => {
  // Isometric projection helper function
  // Origin (0,0,0) is the front-bottom corner.
  // U is length (right), V is depth (left), Z is height (up).
  const px = (u: number, v: number) => 250 + u - v;
  const py = (u: number, v: number, z: number) => 330 - 0.5 * u - 0.5 * v - z;
  const pt = (u: number, v: number, z: number) => `${px(u,v)},${py(u,v,z)}`;

  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Background CAD Blueprint Grid (Flat on the ground) */}
        <g strokeWidth="0.5" opacity="0.2">
          {/* Ground Grid Lines */}
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={`grid-${i}`}>
              <line x1={px(i*30 - 30, -30)} y1={py(i*30 - 30, -30, 0)} x2={px(i*30 - 30, 200)} y2={py(i*30 - 30, 200, 0)} />
              <line x1={px(-30, i*30 - 30)} y1={py(-30, i*30 - 30, 0)} x2={px(300, i*30 - 30)} y2={py(300, i*30 - 30, 0)} />
            </React.Fragment>
          ))}
          <circle cx={px(130, 80)} cy={py(130, 80, 0)} r="120" strokeDasharray="4 4" />
        </g>

        {/* --- Dimensions --- */}
        <g strokeWidth="0.5" opacity="0.5">
          {/* Length Dimension */}
          <line x1={px(0, -20)} y1={py(0, -20, 0)} x2={px(260, -20)} y2={py(260, -20, 0)} />
          <line x1={px(0, -15)} y1={py(0, -15, 0)} x2={px(0, -25)} y2={py(0, -25, 0)} />
          <line x1={px(260, -15)} y1={py(260, -15, 0)} x2={px(260, -25)} y2={py(260, -25, 0)} />
          <text x={px(130, -25)} y={py(130, -25, 0)} fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="middle">850</text>
          
          {/* Width Dimension */}
          <line x1={px(280, 0)} y1={py(280, 0, 0)} x2={px(280, 160)} y2={py(280, 160, 0)} />
          <line x1={px(275, 0)} y1={py(275, 0, 0)} x2={px(285, 0)} y2={py(285, 0, 0)} />
          <line x1={px(275, 160)} y1={py(275, 160, 0)} x2={px(285, 160)} y2={py(285, 160, 0)} />
          <text x={px(290, 80)} y={py(290, 80, 0)} fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="start">350</text>

          {/* Height Dimension */}
          <line x1={px(0, 180)} y1={py(0, 180, 0)} x2={px(0, 180)} y2={py(0, 180, 50)} />
          <line x1={px(-5, 180)} y1={py(-5, 180, 0)} x2={px(5, 180)} y2={py(5, 180, 0)} />
          <line x1={px(-5, 180)} y1={py(-5, 180, 50)} x2={px(5, 180)} y2={py(5, 180, 50)} />
          <text x={px(-10, 180)} y={py(-10, 180, 25)} fill="currentColor" fontSize="8" fontFamily="monospace" textAnchor="end">160</text>
        </g>

        {/* --- Internal X-Ray Tools (Foam Cutouts) --- */}
        <g strokeWidth="0.8" opacity="0.6" strokeDasharray="2 2">
          {/* Probe Cutout */}
          <path d={`M ${pt(20, 130, 10)} L ${pt(240, 130, 10)} L ${pt(240, 140, 10)} L ${pt(20, 140, 10)} Z`} />
          <line x1={px(20, 135)} y1={py(20, 135, 10)} x2={px(240, 135)} y2={py(240, 135, 10)} strokeDasharray="1 3" />
          
          {/* Mirror Cutout */}
          <ellipse cx={px(200, 60)} cy={py(200, 60, 10)} rx="30" ry="15" />
          <path d={`M ${pt(175, 55, 10)} L ${pt(30, 55, 10)} L ${pt(30, 65, 10)} L ${pt(175, 65, 10)} Z`} />
          
          {/* Tool Compartment */}
          <path d={`M ${pt(20, 20, 10)} L ${pt(120, 20, 10)} L ${pt(120, 45, 10)} L ${pt(20, 45, 10)} Z`} />
        </g>

        {/* --- Hidden Back Edges --- */}
        <g strokeWidth="0.8" opacity="0.3" strokeDasharray="2 2">
          <line x1={px(0, 160)} y1={py(0, 160, 0)} x2={px(260, 160)} y2={py(260, 160, 0)} />
          <line x1={px(260, 0)} y1={py(260, 0, 0)} x2={px(260, 160)} y2={py(260, 160, 0)} />
          <line x1={px(260, 160)} y1={py(260, 160, 0)} x2={px(260, 160)} y2={py(260, 160, 50)} />
        </g>

        {/* --- Solid Case Shell --- */}
        <g strokeWidth="1.5">
          {/* Left Face */}
          <path d={`M ${pt(0, 0, 0)} L ${pt(0, 160, 0)} L ${pt(0, 160, 50)} L ${pt(0, 0, 50)} Z`} fill="white" fillOpacity="0.1" />
          
          {/* Front Face */}
          <path d={`M ${pt(0, 0, 0)} L ${pt(260, 0, 0)} L ${pt(260, 0, 50)} L ${pt(0, 0, 50)} Z`} fill="white" fillOpacity="0.1" />
          
          {/* Top Face (Lid) */}
          <path d={`M ${pt(0, 0, 50)} L ${pt(260, 0, 50)} L ${pt(260, 160, 50)} L ${pt(0, 160, 50)} Z`} fill="white" fillOpacity="0.4" />
        </g>

        {/* Lid Split Line */}
        <line x1={px(0, 0)} y1={py(0, 0, 35)} x2={px(260, 0)} y2={py(260, 0, 35)} strokeWidth="0.8" opacity="0.7" />
        <line x1={px(0, 0)} y1={py(0, 0, 35)} x2={px(0, 160)} y2={py(0, 160, 35)} strokeWidth="0.8" opacity="0.7" />

        {/* --- Top Face Structural Ribs --- */}
        <g strokeWidth="1" opacity="0.8">
          <path d={`M ${pt(20, 20, 50)} L ${pt(80, 20, 50)} L ${pt(80, 140, 50)} L ${pt(20, 140, 50)} Z`} />
          <path d={`M ${pt(100, 20, 50)} L ${pt(160, 20, 50)} L ${pt(160, 140, 50)} L ${pt(100, 140, 50)} Z`} />
          <path d={`M ${pt(180, 20, 50)} L ${pt(240, 20, 50)} L ${pt(240, 140, 50)} L ${pt(180, 140, 50)} Z`} />
          
          {/* Inner Rib details */}
          <line x1={px(50, 20)} y1={py(50, 20, 50)} x2={px(50, 140)} y2={py(50, 140, 50)} strokeWidth="0.5" opacity="0.4" />
          <line x1={px(130, 20)} y1={py(130, 20, 50)} x2={px(130, 140)} y2={py(130, 140, 50)} strokeWidth="0.5" opacity="0.4" />
          <line x1={px(210, 20)} y1={py(210, 20, 50)} x2={px(210, 140)} y2={py(210, 140, 50)} strokeWidth="0.5" opacity="0.4" />
        </g>

        {/* --- Front Face Latches & Handle --- */}
        <g strokeWidth="1">
          {/* Latch 1 */}
          <path d={`M ${pt(50, 0, 20)} L ${pt(80, 0, 20)} L ${pt(80, 0, 45)} L ${pt(50, 0, 45)} Z`} fill="white" />
          <line x1={px(55, 0)} y1={py(55, 0, 35)} x2={px(75, 0)} y2={py(75, 0, 35)} strokeWidth="0.5" />
          <line x1={px(65, 0)} y1={py(65, 0, 20)} x2={px(65, 0)} y2={py(65, 0, 45)} strokeWidth="0.5" opacity="0.5" />
          
          {/* Latch 2 */}
          <path d={`M ${pt(180, 0, 20)} L ${pt(210, 0, 20)} L ${pt(210, 0, 45)} L ${pt(180, 0, 45)} Z`} fill="white" />
          <line x1={px(185, 0)} y1={py(185, 0, 35)} x2={px(205, 0)} y2={py(205, 0, 35)} strokeWidth="0.5" />
          <line x1={px(195, 0)} y1={py(195, 0, 20)} x2={px(195, 0)} y2={py(195, 0, 45)} strokeWidth="0.5" opacity="0.5" />

          {/* Center Handle */}
          <path d={`M ${pt(110, -15, 25)} L ${pt(150, -15, 25)} L ${pt(150, -15, 35)} L ${pt(110, -15, 35)} Z`} fill="white" />
          {/* Handle Attachments */}
          <path d={`M ${pt(110, 0, 25)} L ${pt(110, -15, 25)} L ${pt(110, -15, 35)} L ${pt(110, 0, 35)}`} fill="none" />
          <path d={`M ${pt(150, 0, 25)} L ${pt(150, -15, 25)} L ${pt(150, -15, 35)} L ${pt(150, 0, 35)}`} fill="none" />
          {/* Handle Grip Details */}
          {[...Array(5)].map((_, i) => (
             <line key={`hg-${i}`} x1={px(115 + i*7, -15)} y1={py(115 + i*7, -15, 25)} x2={px(115 + i*7, -15)} y2={py(115 + i*7, -15, 35)} strokeWidth="0.5" opacity="0.5" />
          ))}
        </g>

        {/* --- Side Face Profile --- */}
        <g strokeWidth="0.5" opacity="0.6">
           {/* Side Ribs */}
           <path d={`M ${pt(0, 20, 10)} L ${pt(0, 20, 40)} L ${pt(0, 40, 40)} L ${pt(0, 40, 10)} Z`} />
           <path d={`M ${pt(0, 60, 10)} L ${pt(0, 60, 40)} L ${pt(0, 80, 40)} L ${pt(0, 80, 10)} Z`} />
           <path d={`M ${pt(0, 100, 10)} L ${pt(0, 100, 40)} L ${pt(0, 120, 40)} L ${pt(0, 120, 10)} Z`} />
        </g>
        
        {/* Technical Annotations (Numbers only) */}
        <g strokeWidth="0.5" opacity="0.7">
          <circle cx={px(65, 0)} cy={py(65, 0, 40)} r="2" fill="currentColor" />
          <circle cx={px(195, 0)} cy={py(195, 0, 40)} r="2" fill="currentColor" />
          
          <text x={px(65, -30)} y={py(65, -30, 0)} fill="currentColor" fontSize="8" fontFamily="monospace">01</text>
          <line x1={px(65, -25)} y1={py(65, -25, 0)} x2={px(65, 0)} y2={py(65, 0, 40)} strokeDasharray="1 2" />
          
          <text x={px(195, -30)} y={py(195, -30, 0)} fill="currentColor" fontSize="8" fontFamily="monospace">02</text>
          <line x1={px(195, -25)} y1={py(195, -25, 0)} x2={px(195, 0)} y2={py(195, 0, 40)} strokeDasharray="1 2" />
        </g>

      </g>
    </svg>
  );
};

export const CadNet = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {/* Sleek Launcher Body */}
      <rect x="180" y="180" width="140" height="40" rx="4" />
      
      {/* Ergonomic Grip */}
      <path d="M210 220 L195 280 L225 280 L240 220 Z" />
      <path d="M245 220 L245 240 L230 240" />
      
      {/* Conical Barrel */}
      <path d="M320 185 L420 150 L420 250 L320 215 Z" />
      
      {/* Elegant Mesh Lines */}
      <path d="M420 160 L480 120 M420 200 L500 200 M420 240 L480 280" strokeDasharray="3 4" opacity="0.7" />
      <path d="M435 140 Q480 200 435 260" strokeDasharray="3 4" opacity="0.7" />
      <path d="M465 125 Q515 200 465 275" strokeDasharray="3 4" opacity="0.7" />
      
      {/* Minimalist Construction Lines */}
      <line x1="140" y1="320" x2="520" y2="320" strokeDasharray="4 4" strokeWidth="0.5" opacity="0.4" />
      <text x="330" y="340" fill="currentColor" opacity="0.4" fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">KINETIC NET LAUNCHER</text>
    </g>
  </svg>
);

export const CadTool = () => (
  <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
    <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      {/* Sleek Multitool Handles */}
      <rect x="230" y="160" width="40" height="140" rx="6" />
      <rect x="300" y="160" width="40" height="140" rx="6" />
      
      {/* Precision Hinge */}
      <circle cx="285" cy="150" r="12" />
      <circle cx="285" cy="150" r="4" />
      <path d="M250 160 L285 150 L320 160" />
      
      {/* Needle-Nose Jaws */}
      <path d="M275 138 L260 60 L280 60 L285 138" />
      <path d="M295 138 L310 60 L290 60 L285 138" />
      
      {/* Minimalist Grip Textures */}
      {[...Array(6)].map((_, i) => (
        <line key={`t1-${i}`} x1="240" y1={190 + i*16} x2="260" y2={190 + i*16} />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={`t2-${i}`} x1="310" y1={190 + i*16} x2="330" y2={190 + i*16} />
      ))}
      
      {/* Construction Lines */}
      <line x1="200" y1="330" x2="370" y2="330" strokeDasharray="4 4" strokeWidth="0.5" opacity="0.4" />
      <text x="285" y="350" fill="currentColor" opacity="0.4" fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">PRECISION MULTI-TOOL</text>
    </g>
  </svg>
);

export const CadProduction = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-75">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Base */}
      <rect x="80" y="200" width="80" height="20" rx="2" />
      <path d="M90 200 L110 160 L130 160 L150 200" />
      {/* Main Arm */}
      <circle cx="120" cy="160" r="12" />
      <path d="M120 160 L200 80" strokeWidth="6" stroke="currentColor" fill="none" opacity="0.2"/>
      <path d="M115 155 L195 75" />
      <path d="M125 165 L205 85" />
      {/* Joint 2 */}
      <circle cx="200" cy="80" r="10" />
      {/* Secondary Arm */}
      <path d="M200 80 L250 140" strokeWidth="4" stroke="currentColor" fill="none" opacity="0.2"/>
      <path d="M195 85 L245 145" />
      <path d="M205 75 L255 135" />
      {/* Tool head */}
      <circle cx="250" cy="140" r="6" />
      <rect x="240" y="146" width="20" height="25" rx="1" />
      <path d="M245 171 L250 185 L255 171" />
      {/* Workpiece */}
      <rect x="220" y="215" width="80" height="15" />
      <rect x="230" y="205" width="60" height="10" />
      <circle cx="250" cy="205" r="3" />
      {/* Construction lines */}
      <line x1="60" y1="245" x2="340" y2="245" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <line x1="250" y1="185" x2="250" y2="200" strokeDasharray="2 2" strokeWidth="1" stroke="currentColor" opacity="0.6" />
      <circle cx="250" cy="200" r="2" fill="currentColor" opacity="0.6" />
      <text x="200" y="260" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">PRECISION ASSEMBLY / ISO 9001</text>
    </g>
  </svg>
);

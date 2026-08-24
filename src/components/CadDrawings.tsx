import React from 'react';

export const CadProbe = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Handle */}
      <rect x="50" y="140" width="80" height="20" rx="2" />
      <line x1="60" y1="140" x2="60" y2="160" />
      <line x1="70" y1="140" x2="70" y2="160" />
      <line x1="80" y1="140" x2="80" y2="160" />
      <line x1="90" y1="140" x2="90" y2="160" />
      <line x1="100" y1="140" x2="100" y2="160" />
      <line x1="110" y1="140" x2="110" y2="160" />
      {/* Shaft */}
      <rect x="130" y="146" width="180" height="8" />
      <line x1="150" y1="146" x2="150" y2="154" />
      <line x1="200" y1="146" x2="200" y2="154" />
      <line x1="250" y1="146" x2="250" y2="154" />
      {/* Tip */}
      <path d="M310 146 L350 150 L310 154 Z" />
      {/* Measurement/Construction lines */}
      <line x1="50" y1="180" x2="350" y2="180" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <line x1="50" y1="175" x2="50" y2="185" strokeWidth="1" opacity="0.4" />
      <line x1="350" y1="175" x2="350" y2="185" strokeWidth="1" opacity="0.4" />
      <text x="200" y="195" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">L=1200mm / STANDARD</text>
    </g>
  </svg>
);

export const CadMirror = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Shaft */}
      <rect x="100" y="146" width="140" height="8" />
      <rect x="60" y="144" width="40" height="12" rx="1" />
      {/* Joint */}
      <circle cx="250" cy="150" r="6" />
      <path d="M250 150 L280 120" />
      {/* Mirror */}
      <ellipse cx="295" cy="105" rx="25" ry="40" transform="rotate(45 295 105)" />
      <ellipse cx="295" cy="105" rx="20" ry="32" transform="rotate(45 295 105)" />
      {/* Flashlight attachment */}
      <rect x="230" y="130" width="20" height="8" rx="1" transform="rotate(-30 230 130)" />
      <path d="M250 118 L265 110" strokeDasharray="2 2" />
      {/* Construction lines */}
      <line x1="100" y1="180" x2="320" y2="180" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <text x="210" y="195" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">TELESCOPIC EXTENSION / 360° ROTATION</text>
    </g>
  </svg>
);

export const CadKit = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Case Outline */}
      <rect x="100" y="90" width="200" height="120" rx="8" />
      <rect x="106" y="96" width="188" height="108" rx="4" />
      {/* Handle */}
      <path d="M160 90 L160 75 C160 70 165 65 170 65 L230 65 C235 65 240 70 240 75 L240 90" />
      {/* Latches */}
      <rect x="130" y="85" width="20" height="10" rx="1" />
      <rect x="250" y="85" width="20" height="10" rx="1" />
      {/* Ribs */}
      <line x1="120" y1="110" x2="280" y2="110" />
      <line x1="120" y1="130" x2="280" y2="130" />
      <line x1="120" y1="150" x2="280" y2="150" />
      <line x1="120" y1="170" x2="280" y2="170" />
      {/* Construction lines */}
      <line x1="90" y1="230" x2="310" y2="230" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <text x="200" y="245" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">IP67 TACTICAL ENCLOSURE</text>
    </g>
  </svg>
);

export const CadNet = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Body */}
      <rect x="120" y="130" width="100" height="30" rx="2" />
      {/* Handle/Grip */}
      <path d="M140 160 L130 200 L150 200 L160 160 Z" />
      {/* Trigger */}
      <path d="M165 160 L165 175 L155 175" />
      <circle cx="155" cy="170" r="2" />
      {/* Barrel / Cone */}
      <path d="M220 135 L280 110 L280 180 L220 155 Z" />
      {/* Net lines emanating */}
      <path d="M280 120 L320 90 M280 145 L340 145 M280 170 L320 200" strokeDasharray="2 4" />
      <path d="M290 105 Q320 145 290 185" strokeDasharray="2 4" />
      <path d="M310 95 Q350 145 310 195" strokeDasharray="2 4" />
      {/* Construction lines */}
      <line x1="100" y1="230" x2="340" y2="230" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <text x="220" y="245" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">KINETIC DEPLOYMENT SYSTEM</text>
    </g>
  </svg>
);

export const CadTool = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Main Body */}
      <rect x="160" y="100" width="30" height="100" rx="4" />
      <rect x="210" y="100" width="30" height="100" rx="4" />
      {/* Hinge */}
      <circle cx="200" cy="95" r="8" />
      <path d="M175 100 L200 95 L225 100" />
      {/* Pliers / Jaws */}
      <path d="M192 88 L185 50 L198 50 L200 87" />
      <path d="M208 88 L215 50 L202 50 L200 87" />
      {/* Grip details */}
      <line x1="165" y1="120" x2="185" y2="120" />
      <line x1="165" y1="140" x2="185" y2="140" />
      <line x1="165" y1="160" x2="185" y2="160" />
      <line x1="165" y1="180" x2="185" y2="180" />
      <line x1="215" y1="120" x2="235" y2="120" />
      <line x1="215" y1="140" x2="235" y2="140" />
      <line x1="215" y1="160" x2="235" y2="160" />
      <line x1="215" y1="180" x2="235" y2="180" />
      {/* Construction lines */}
      <line x1="140" y1="230" x2="260" y2="230" strokeDasharray="4 4" strokeWidth="1" stroke="currentColor" opacity="0.4" />
      <text x="200" y="245" fill="currentColor" opacity="0.4" fontSize="10" fontFamily="monospace" textAnchor="middle">MULTI-FUNCTION APPARATUS</text>
    </g>
  </svg>
);

export const CadProduction = () => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-dark-navy/60 group-hover:text-primary-blue transition-colors duration-500">
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

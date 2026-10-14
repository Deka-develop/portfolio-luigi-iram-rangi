/**
 * Contemporary Dayak & Borneo Geometric Vector Motifs
 * Crafted for Luigi Iram Rangi / Ddev Studio
 * Authentic cultural computing: geometric precision inspired by Dayak woodcarving, shields & weaving.
 */

// Modern Geometric Dayak Shield Emblem
export function DayakShieldEmblem({ className = "w-8 h-8", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Hexagonal Shield Contour */}
      <polygon
        points="24,2 44,12 44,36 24,46 4,36 4,12"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Inner Concentric Diamond */}
      <polygon
        points="24,8 38,24 24,40 10,24"
        stroke={color}
        strokeWidth="1.25"
        strokeDasharray="2 2"
        opacity="0.8"
      />
      {/* Center 8-pointed Borneo Star Core */}
      <path
        d="M24 14 L26.5 21.5 L34 24 L26.5 26.5 L24 34 L21.5 26.5 L14 24 L21.5 21.5 Z"
        fill={color}
      />
      {/* Subtle Cardinal Dots */}
      <circle cx="24" cy="5" r="1.25" fill={color} />
      <circle cx="41" cy="24" r="1.25" fill={color} />
      <circle cx="24" cy="43" r="1.25" fill={color} />
      <circle cx="7" cy="24" r="1.25" fill={color} />
    </svg>
  );
}

// Interlocking Geometric Dayak Hairline Border Ribbon
export function DayakBorderRibbon({ className = "w-full h-3", color = "currentColor", opacity = 0.25 }) {
  return (
    <div className={`overflow-hidden select-none ${className}`} style={{ opacity }}>
      <svg
        width="100%"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
        className="w-full h-full block"
      >
        <defs>
          <pattern id="dayak-interlock" width="32" height="12" patternUnits="userSpaceOnUse">
            {/* Diamond chain with stepped chevron teeth */}
            <path
              d="M0 6 L8 0 L16 6 L8 12 Z M16 6 L24 0 L32 6 L24 12 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.8"
            />
            <path
              d="M8 6 L12 3 L16 6 L12 9 Z M24 6 L28 3 L32 6 L28 9 Z"
              fill={color}
              opacity="0.4"
            />
            <circle cx="8" cy="6" r="0.75" fill={color} />
            <circle cx="24" cy="6" r="0.75" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill="url(#dayak-interlock)" />
      </svg>
    </div>
  );
}

// Contemporary Dayak Cultural Seal / Stamp
export function DayakCulturalSeal({ className = "w-24 h-24", animated = true }) {
  return (
    <div className={`relative ${className} select-none`}>
      <div className={`absolute inset-0 rounded-full border border-ink/30 ${animated ? 'animate-[spin_24s_linear_infinite]' : ''}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path id="seal-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="font-mono" fontSize="7.8" fontWeight="700" letterSpacing="2.8" fill="#141413">
            <textPath href="#seal-ring">DDEV • CULTURAL COMPUTING • BORNEO •</textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <DayakShieldEmblem className="w-9 h-9 text-ochre" color="#D97706" />
      </div>
    </div>
  );
}

// Geometric Corner Accent for Archival Cards
export function DayakCornerAccent({ position = "top-left", className = "w-4 h-4", color = "currentColor" }) {
  const rotation = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position] || "rotate-0";

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotation}`}
    >
      <path d="M0 0 L16 0 L16 3 L3 3 L3 16 L0 16 Z" fill={color} />
      <rect x="5" y="5" width="2" height="2" fill={color} />
    </svg>
  );
}

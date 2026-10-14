/**
 * Contemporary Dayak & Borneo Geometric Vector Motifs
 * Crafted for Luigi Iram Rangi / Ddev Studio
 * Authentic cultural computing: geometric precision inspired by Dayak woodcarving, shields & weaving.
 */

// Minimalist Geometric Monogram Logo (Zero AI Cliché)
export function DayakShieldEmblem({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Clean Obsidian Rounded Squircle */}
      <rect width="48" height="48" rx="12" fill="#111111" />
      
      {/* Minimalist Geometric "L" */}
      <path
        d="M 12 12 L 17 12 L 17 31.5 L 25.5 31.5 L 25.5 36 L 12 36 Z"
        fill="#EDEEF0"
      />

      {/* Minimalist Modern "R" */}
      <path
        d="M 24 12 L 32.5 12 C 36 12 38 14.1 38 17.2 C 38 19.8 36.2 21.8 33.5 22.3 L 38.5 36 L 33 36 L 28.8 24 L 24 24 L 24 36 L 19.5 36 L 19.5 12 L 24 12 Z M 24 16 L 24 20.2 L 32 20.2 C 33.2 20.2 34 19.3 34 18.1 C 34 16.9 33.2 16 32 16 Z"
        fill="#EDEEF0"
      />

      {/* Electric Violet Accent Dot */}
      <circle cx="37.5" cy="10.5" r="2.8" fill="#684AFF" />
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

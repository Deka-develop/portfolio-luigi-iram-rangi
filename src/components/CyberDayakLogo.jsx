export default function CyberDayakLogo({ 
  className = "w-8 h-8", 
  showGlow = true,
  animated = false 
}) {
  return (
    <svg 
      className={`${className} shrink-0 select-none ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cyber Dayak Monogram IR - Luigi Iram Rangi"
    >
      <defs>
        {/* Cyber Cyan to Electric Blue Gradient */}
        <linearGradient id="cyberLogoCyanBlue" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Shield Border Gradient */}
        <linearGradient id="cyberLogoBorderGrad" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="1" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
        </linearGradient>

        {/* Deep Tech Dark Shield Backdrop */}
        <linearGradient id="cyberLogoDarkBg" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#081426" />
          <stop offset="50%" stopColor="#030813" />
          <stop offset="100%" stopColor="#02040a" />
        </linearGradient>

        {/* Soft Neon Glow Filter */}
        {showGlow && (
          <filter id="cyberLogoGlow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* 1. Dayak Talawang Shield Body */}
      <path 
        d="M 32 2 L 52 15 L 54 32 L 52 49 L 32 62 L 12 49 L 10 32 L 12 15 Z" 
        fill="url(#cyberLogoDarkBg)" 
        stroke="url(#cyberLogoBorderGrad)" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />

      {/* 2. Traditional Dayak Circuit Spine & Spear Accents */}
      <path 
        d="M 32 3 L 32 13 M 32 51 L 32 61" 
        stroke="#00F0FF" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        opacity="0.9" 
      />
      <polygon points="32,7 34.5,10 32,13 29.5,10" fill="#00F0FF" />
      <polygon points="32,51 34.5,54 32,57 29.5,54" fill="#00F0FF" />
      <circle cx="10" cy="32" r="1.5" fill="#00F0FF" />
      <circle cx="54" cy="32" r="1.5" fill="#00F0FF" />

      {/* 3. Stylized 'IR' (Iram Rangi) Monogram */}
      <g filter={showGlow ? "url(#cyberLogoGlow)" : undefined}>
        {/* Letter 'I' (Left) */}
        <path 
          d="M 18 19 L 26 19 L 26 23 L 23.5 23 L 23.5 41 L 26 41 L 26 45 L 18 45 L 18 41 L 20.5 41 L 20.5 23 L 18 23 Z" 
          fill="url(#cyberLogoCyanBlue)" 
        />

        {/* Letter 'R' (Right) */}
        <path 
          d="M 28 19 L 40 19 C 44.5 19 47 21.5 47 25.5 C 47 28.8 44.8 30.8 41.5 31.3 L 47 45 L 41.8 45 L 37 32.5 L 33 32.5 L 33 45 L 28 45 Z M 33 23 L 33 28.5 L 39.2 28.5 C 41.2 28.5 42.2 27.5 42.2 25.8 C 42.2 24.1 41.2 23 39.2 23 Z" 
          fill="url(#cyberLogoCyanBlue)" 
        />
      </g>
    </svg>
  );
}

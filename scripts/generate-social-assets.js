import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// 1. Generate 512x512 Square Logo PNG
const squareLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0a192f" />
      <stop offset="60%" stop-color="#05070e" />
      <stop offset="100%" stop-color="#020307" />
    </radialGradient>

    <!-- Ambient Neon Halo -->
    <radialGradient id="neonHalo" cx="50%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.25" />
      <stop offset="60%" stop-color="#3b82f6" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="cyberCyanBlue" x1="150" y1="120" x2="360" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>

    <linearGradient id="shieldBorderGrad" x1="256" y1="30" x2="256" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>

    <linearGradient id="shieldDarkBg" x1="256" y1="30" x2="256" y2="480" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0d1b2e" />
      <stop offset="50%" stop-color="#050a14" />
      <stop offset="100%" stop-color="#020409" />
    </linearGradient>

    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="512" height="512" rx="96" fill="url(#bgGlow)" />
  <circle cx="256" cy="256" r="220" fill="url(#neonHalo)" />

  <!-- Outer Ring Accent -->
  <circle cx="256" cy="256" r="230" stroke="#00f0ff" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="8 8" />

  <g transform="translate(256, 256) scale(6.2) translate(-32, -32)">
    <!-- 1. Dayak Talawang Shield Body -->
    <path 
      d="M 32 2 L 52 15 L 54 32 L 52 49 L 32 62 L 12 49 L 10 32 L 12 15 Z" 
      fill="url(#shieldDarkBg)" 
      stroke="url(#shieldBorderGrad)" 
      stroke-width="2" 
      stroke-linejoin="round"
      filter="url(#shieldGlow)"
    />

    <!-- 2. Traditional Dayak Circuit Spine & Geometric Spear Accents -->
    <path 
      d="M 32 3 L 32 13 M 32 51 L 32 61" 
      stroke="#00F0FF" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      opacity="0.9" 
    />
    <polygon points="32,7 34.5,10 32,13 29.5,10" fill="#00F0FF" />
    <polygon points="32,51 34.5,54 32,57 29.5,54" fill="#00F0FF" />
    <circle cx="10" cy="32" r="1.5" fill="#00F0FF" />
    <circle cx="54" cy="32" r="1.5" fill="#00F0FF" />

    <!-- 3. Stylized 'IR' (Iram Rangi) Monogram -->
    <g filter="url(#neonGlow)">
      <!-- Letter 'I' (Left) -->
      <path 
        d="M 18 19 L 26 19 L 26 23 L 23.5 23 L 23.5 41 L 26 41 L 26 45 L 18 45 L 18 41 L 20.5 41 L 20.5 23 L 18 23 Z" 
        fill="url(#cyberCyanBlue)" 
      />

      <!-- Letter 'R' (Right) -->
      <path 
        d="M 28 19 L 40 19 C 44.5 19 47 21.5 47 25.5 C 47 28.8 44.8 30.8 41.5 31.3 L 47 45 L 41.8 45 L 37 32.5 L 33 32.5 L 33 45 L 28 45 Z M 33 23 L 33 28.5 L 39.2 28.5 C 41.2 28.5 42.2 27.5 42.2 25.8 C 42.2 24.1 41.2 23 39.2 23 Z" 
        fill="url(#cyberCyanBlue)" 
      />
    </g>
  </g>
</svg>
`;

// 2. Generate 1200x630 Open Graph Social Card
const ogCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <defs>
    <!-- Background Gradient -->
    <rect id="bgRect" width="1200" height="630" fill="#05070d" />
    
    <radialGradient id="ogGlowCyan" cx="20%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.18" />
      <stop offset="70%" stop-color="#00f0ff" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="ogGlowPurple" cx="80%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.15" />
      <stop offset="70%" stop-color="#6366f1" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="cyberCyanBlue" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>

    <linearGradient id="shieldBorderGrad" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>

    <linearGradient id="shieldDarkBg" x1="32" y1="2" x2="32" y2="62" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0d1f38" />
      <stop offset="50%" stop-color="#060c18" />
      <stop offset="100%" stop-color="#03050c" />
    </linearGradient>

    <linearGradient id="textGrad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>

    <filter id="neonGlow">
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="shieldGlow">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- 1. Background Layer -->
  <rect width="1200" height="630" fill="#05070e" />
  <rect width="1200" height="630" fill="url(#ogGlowCyan)" />
  <rect width="1200" height="630" fill="url(#ogGlowPurple)" />

  <!-- Tech Grid Overlay -->
  <g stroke="rgba(255, 255, 255, 0.04)" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Frame Border -->
  <rect x="24" y="24" width="1152" height="582" rx="28" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none" />
  <rect x="25" y="25" width="1150" height="580" rx="27" stroke="rgba(0,240,255,0.15)" stroke-width="1" fill="none" />

  <!-- 2. Left Side: Cyber Dayak Talawang Shield Monogram -->
  <g transform="translate(140, 165) scale(4.8)">
    <circle cx="32" cy="32" r="38" fill="rgba(0, 240, 255, 0.08)" filter="url(#shieldGlow)" />
    <!-- Dayak Talawang Shield Body -->
    <path 
      d="M 32 2 L 52 15 L 54 32 L 52 49 L 32 62 L 12 49 L 10 32 L 12 15 Z" 
      fill="url(#shieldDarkBg)" 
      stroke="url(#shieldBorderGrad)" 
      stroke-width="2" 
      stroke-linejoin="round"
      filter="url(#shieldGlow)"
    />

    <!-- Traditional Dayak Circuit Spine -->
    <path 
      d="M 32 3 L 32 13 M 32 51 L 32 61" 
      stroke="#00F0FF" 
      stroke-width="1.8" 
      stroke-linecap="round" 
      opacity="0.9" 
    />
    <polygon points="32,7 34.5,10 32,13 29.5,10" fill="#00F0FF" />
    <polygon points="32,51 34.5,54 32,57 29.5,54" fill="#00F0FF" />
    <circle cx="10" cy="32" r="1.5" fill="#00F0FF" />
    <circle cx="54" cy="32" r="1.5" fill="#00F0FF" />

    <!-- 'IR' Monogram -->
    <g filter="url(#neonGlow)">
      <path 
        d="M 18 19 L 26 19 L 26 23 L 23.5 23 L 23.5 41 L 26 41 L 26 45 L 18 45 L 18 41 L 20.5 41 L 20.5 23 L 18 23 Z" 
        fill="url(#cyberCyanBlue)" 
      />
      <path 
        d="M 28 19 L 40 19 C 44.5 19 47 21.5 47 25.5 C 47 28.8 44.8 30.8 41.5 31.3 L 47 45 L 41.8 45 L 37 32.5 L 33 32.5 L 33 45 L 28 45 Z M 33 23 L 33 28.5 L 39.2 28.5 C 41.2 28.5 42.2 27.5 42.2 25.8 C 42.2 24.1 41.2 23 39.2 23 Z" 
        fill="url(#cyberCyanBlue)" 
      />
    </g>
  </g>

  <!-- 3. Right Side: Portfolio Typography & Badges -->
  <g transform="translate(480, 140)">
    <!-- Top Pill Badge -->
    <rect x="0" y="0" width="370" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(0,240,255,0.35)" />
    <circle cx="20" cy="17" r="4.5" fill="#10b981" />
    <circle cx="20" cy="17" r="8" stroke="#10b981" stroke-width="1.5" stroke-opacity="0.4" />
    <text x="36" y="22" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" fill="#38BDF8" letter-spacing="2">
      FOUNDER OF DDEV • DAYAK DEVELOPER
    </text>

    <!-- Main Headline -->
    <text x="0" y="105" font-family="'Outfit', sans-serif" font-size="64" font-weight="900" fill="#FFFFFF" letter-spacing="-1">
      LUIGI IRAM <tspan fill="#00F0FF">RANGI</tspan>
    </text>

    <!-- Subtitle -->
    <text x="0" y="160" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="600" fill="#E2E8F0">
      Creative Developer &amp; Founder of Ddev
    </text>

    <text x="0" y="198" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#94A3B8">
      High-Velocity Web Architecture • WebGL 3D • Borneo Globe Hub
    </text>

    <!-- Metrics Badges Bar -->
    <g transform="translate(0, 235)">
      <!-- Badge 1: WebGL -->
      <rect x="0" y="0" width="165" height="42" rx="12" fill="rgba(0, 240, 255, 0.08)" stroke="rgba(0, 240, 255, 0.3)" />
      <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#00F0FF">
        ⚡ 120 FPS WebGL
      </text>

      <!-- Badge 2: Core Vitals -->
      <rect x="180" y="0" width="175" height="42" rx="12" fill="rgba(56, 189, 248, 0.08)" stroke="rgba(56, 189, 248, 0.3)" />
      <text x="198" y="26" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38BDF8">
        ✓ 100/100 Vitals
      </text>

      <!-- Badge 3: Borneo Globe -->
      <rect x="370" y="0" width="195" height="42" rx="12" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.3)" />
      <text x="388" y="26" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#10B981">
        ✦ Borneo Globe Hub
      </text>
    </g>

    <!-- Bottom URL Watermark -->
    <g transform="translate(0, 320)">
      <text x="0" y="18" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" fill="#64748B" letter-spacing="1">
        deka-develop.github.io/portfolio-luigi-iram-rangi
      </text>
    </g>
  </g>
</svg>
`;

async function run() {
  console.log('Generating social preview images...');
  
  // 1. og-image.png (1200x630, high quality, under 200KB for WhatsApp)
  await sharp(Buffer.from(ogCardSvg))
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  // 2. logo.png (512x512)
  await sharp(Buffer.from(squareLogoSvg))
    .png({ quality: 90, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created public/logo.png (512x512)');

  // 3. apple-touch-icon.png (180x180)
  await sharp(Buffer.from(squareLogoSvg))
    .resize(180, 180)
    .png({ quality: 90 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png (180x180)');
}

run().catch(console.error);

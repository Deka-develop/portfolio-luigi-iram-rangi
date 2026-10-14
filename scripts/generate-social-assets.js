import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// 1. Minimalist Geometric 512x512 Logo (Zero AI Cliché)
const squareLogoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <!-- Solid Obsidian Squircle -->
  <rect width="512" height="512" rx="128" fill="#111111" />
  
  <g transform="translate(256, 256) scale(6.4) translate(-32, -32)">
    <!-- Minimalist Geometric Monogram "L" -->
    <path
      d="M 16 16 L 22.5 16 L 22.5 42 L 34 42 L 34 48 L 16 48 Z"
      fill="#EDEEF0"
    />

    <!-- Minimalist Modern "R" -->
    <path
      d="M 32 16 L 43.5 16 C 48 16 51 18.8 51 23 C 51 26.5 48.5 29.2 45 29.8 L 51.5 48 L 44.5 48 L 38.8 32 L 32 32 L 32 48 L 26 48 L 26 16 L 32 16 Z M 32 21.5 L 32 27 L 42.5 27 C 44.2 27 45.2 25.8 45.2 24.2 C 45.2 22.5 44.2 21.5 42.5 21.5 Z"
      fill="#EDEEF0"
    />

    <!-- Signature Electric Violet Accent Dot -->
    <circle cx="50" cy="14" r="3.5" fill="#684AFF" />
  </g>
</svg>
`;

// 2. High-End Studio 1200x630 Open Graph Card
const ogCardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" fill="none">
  <!-- Studio Light Grey Background -->
  <rect width="1200" height="630" fill="#EDEEF0" />
  
  <!-- Subtle Border Inset -->
  <rect x="24" y="24" width="1152" height="582" rx="32" fill="none" stroke="#111111" stroke-opacity="0.08" stroke-width="2" />

  <!-- Top Metadata Bar -->
  <g transform="translate(80, 80)">
    <circle cx="6" cy="6" r="6" fill="#684AFF" />
    <text x="24" y="10" font-family="'Geist Mono', monospace" font-size="14" font-weight="700" fill="#111111" opacity="0.6" letter-spacing="3">
      EDISI 2026 // DDEV CULTURAL COMPUTING
    </text>
    <text x="880" y="10" font-family="'Geist Mono', monospace" font-size="14" font-weight="600" fill="#111111" opacity="0.4" letter-spacing="2">
      0°01′S 109°20′E
    </text>
  </g>

  <!-- Left Monumental Typography -->
  <g transform="translate(80, 180)">
    <text x="0" y="70" font-family="'Geist', sans-serif" font-size="82" font-weight="900" fill="#111111" letter-spacing="-3">
      LUIGI IRAM RANGI
    </text>
    <text x="0" y="145" font-family="'Geist', sans-serif" font-size="44" font-weight="700" fill="#684AFF" letter-spacing="-1">
      Creative Developer &amp; WebGL Specialist
    </text>
    <text x="0" y="195" font-family="'Geist', sans-serif" font-size="22" font-weight="400" fill="#111111" opacity="0.6">
      Founder of Ddev • High-Performance Web &amp; 3D Interactive Systems from Borneo
    </text>
  </g>

  <!-- Bottom Metric Badges -->
  <g transform="translate(80, 480)">
    <rect x="0" y="0" width="170" height="46" rx="23" fill="#111111" />
    <text x="24" y="28" font-family="'Geist Mono', monospace" font-size="13" font-weight="700" fill="#EDEEF0" letter-spacing="1">
      120+ SYSTEMS
    </text>

    <rect x="185" y="0" width="180" height="46" rx="23" fill="#FFFFFF" stroke="#111111" stroke-opacity="0.1" />
    <text x="209" y="28" font-family="'Geist Mono', monospace" font-size="13" font-weight="700" fill="#684AFF" letter-spacing="1">
      THREE.JS WEBGL
    </text>

    <rect x="380" y="0" width="190" height="46" rx="23" fill="#FFFFFF" stroke="#111111" stroke-opacity="0.1" />
    <text x="404" y="28" font-family="'Geist Mono', monospace" font-size="13" font-weight="700" fill="#10B981" letter-spacing="1">
      100/100 VITALS
    </text>
  </g>

  <!-- Right Logo Mark Icon -->
  <g transform="translate(880, 220)">
    <rect width="220" height="220" rx="55" fill="#111111" />
    <g transform="translate(110, 110) scale(2.8) translate(-32, -32)">
      <path d="M 16 16 L 22.5 16 L 22.5 42 L 34 42 L 34 48 L 16 48 Z" fill="#EDEEF0" />
      <path d="M 32 16 L 43.5 16 C 48 16 51 18.8 51 23 C 51 26.5 48.5 29.2 45 29.8 L 51.5 48 L 44.5 48 L 38.8 32 L 32 32 L 32 48 L 26 48 L 26 16 L 32 16 Z M 32 21.5 L 32 27 L 42.5 27 C 44.2 27 45.2 25.8 45.2 24.2 C 45.2 22.5 44.2 21.5 42.5 21.5 Z" fill="#EDEEF0" />
      <circle cx="50" cy="14" r="3.5" fill="#684AFF" />
    </g>
  </g>
</svg>
`;

async function run() {
  console.log('Generating clean, simple logo and social assets...');
  
  // 1. og-image.png (1200x630)
  await sharp(Buffer.from(ogCardSvg))
    .png({ quality: 92, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created public/og-image.png (1200x630)');

  // 2. logo.png (512x512)
  await sharp(Buffer.from(squareLogoSvg))
    .png({ quality: 92, compressionLevel: 8 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created public/logo.png (512x512)');

  // 3. apple-touch-icon.png (180x180)
  await sharp(Buffer.from(squareLogoSvg))
    .resize(180, 180)
    .png({ quality: 92 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png (180x180)');

  // 4. favicon-32x32.png and favicon-16x16.png
  const png32 = await sharp(Buffer.from(squareLogoSvg)).resize(32, 32).png().toBuffer();
  await sharp(Buffer.from(squareLogoSvg)).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
  await sharp(png32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Created public/favicon-32x32.png & favicon-16x16.png');

  // 5. favicon.ico (Standard ICO wrapper containing 32x32 PNG)
  const icoHeader = Buffer.from([
    0x00, 0x00, // Reserved, must be 0
    0x01, 0x00, // Image type: 1 = ICO
    0x01, 0x00  // Number of images = 1
  ]);
  const icoDirectory = Buffer.alloc(16);
  icoDirectory.writeUInt8(32, 0); // Width: 32
  icoDirectory.writeUInt8(32, 1); // Height: 32
  icoDirectory.writeUInt8(0, 2);  // Color count: 0 (no palette)
  icoDirectory.writeUInt8(0, 3);  // Reserved: 0
  icoDirectory.writeUInt16LE(1, 4); // Color planes: 1
  icoDirectory.writeUInt16LE(32, 6); // Bits per pixel: 32
  icoDirectory.writeUInt32LE(png32.length, 8); // Image size in bytes
  icoDirectory.writeUInt32LE(22, 12); // Image offset in file: 6 + 16 = 22

  const icoBuffer = Buffer.concat([icoHeader, icoDirectory, png32]);
  await fs.promises.writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created public/favicon.ico (Multi-compatible 32x32 ICO)');
}

run().catch(console.error);

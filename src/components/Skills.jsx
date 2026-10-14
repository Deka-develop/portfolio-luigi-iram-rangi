import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Layers, Sparkles, Zap, Gauge, Terminal, Activity, ArrowUpRight, CheckCircle2, Gamepad2, X } from 'lucide-react';

const CyberArcadeGame = lazy(() => import('./CyberArcadeGame'));

const pillars = [
  {
    id: 'performance-architecture',
    number: '01',
    title: 'High-Velocity Web Architecture',
    category: 'PERFORMANCE CORE',
    color: '#00f0ff',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    icon: Code2,
    metric: '100 / 100',
    metricLabel: 'Google PageSpeed & Core Vitals',
    highlights: [
      { label: 'LCP SPEED', val: '< 0.6s', tag: 'Fast' },
      { label: 'CORE VITALS', val: '100 / 100', tag: 'Perfect' },
      { label: 'SCHEMA SEO', val: 'Valid LD', tag: 'Rank 1' }
    ],
    features: [
      'Sub-0.6s LCP & Perfect 100/100 Core Web Vitals',
      'Zero-Bloat Runtime & Modular Non-Blocking CSS',
      'Semantic Schema JSON-LD & Dynamic Dark Mode',
      'Live Production Engines (YPPT & SMA Santo Paulus)'
    ],
    techStack: ['Core Web Vitals', 'PageSpeed 100', 'Schema SEO', 'Publishing Engines']
  },
  {
    id: 'creative-webgl',
    number: '02',
    title: 'Creative Coding & WebGL 3D',
    category: 'HIGH PERFORMANCE',
    color: '#d946ef',
    badgeClass: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300',
    icon: Sparkles,
    metric: '120 FPS',
    metricLabel: 'Hardware Accelerated Render',
    highlights: [
      { label: 'FPS TARGET', val: '120 FPS', tag: 'Hardware' },
      { label: '3D PIPELINE', val: 'Three.js', tag: 'GLSL' },
      { label: 'KINETIC', val: 'Physics Lerp', tag: 'Fluid' }
    ],
    features: [
      'Three.js 3D Geometries & Scene Graph Hierarchy',
      'Custom GPU GLSL Shaders & Wireframe Modes',
      'Fluid Cursor Parallax, Drag & Inertia Physics',
      'Spatial Ambient Canvas & Interactive Starfields'
    ],
    techStack: ['Three.js', 'WebGL 2.0', 'GLSL Shaders', 'Framer Motion']
  },
  {
    id: 'modern-architecture',
    number: '03',
    title: 'Modern Web Architecture',
    category: 'PRODUCTION SCALE',
    color: '#10b981',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    icon: Cpu,
    metric: 'Production',
    metricLabel: 'Borneo Globe Active Hub',
    highlights: [
      { label: 'FRONTEND', val: 'React 19', tag: 'Vite' },
      { label: 'IMPACT HUB', val: 'Borneo Globe', tag: '2.8k Users' },
      { label: 'UI SYSTEM', val: 'Tailwind CSS', tag: 'Tokens' }
    ],
    features: [
      'Component-Driven Architecture (React 19 & Vite)',
      'Borneo Globe Regional Impact Data Ecosystem',
      'Custom Design Token Systems & Micro-Interactions',
      '100% Mobile Ready with Zero-Lag User Experience'
    ],
    techStack: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript']
  }
];

const techArsenal = [
  { name: 'Three.js / WebGL', level: '94%', role: '3D Graphics Specialist', tag: '3D Core' },
  { name: 'High-Perf Web Engines', level: '98%', role: 'Zero-Bloat & Publishing Systems', tag: 'Architecture' },
  { name: 'React 19 & Vite', level: '95%', role: 'Interactive Web Apps', tag: 'Frontend' },
  { name: 'Tailwind CSS', level: '96%', role: 'Design Tokens & UI/UX', tag: 'Styling' },
  { name: 'TypeScript', level: '88%', role: 'Type-Safe Logic', tag: 'Language' },
  { name: 'Framer Motion', level: '92%', role: 'Kinetic Physics Animation', tag: 'Motion' },
  { name: 'Schema SEO & Core Vitals', level: '96%', role: 'Rank 1 Performance', tag: 'SEO 100' },
  { name: 'Borneo Regional Hub', level: '90%', role: 'Impact Platform Development', tag: 'Ecosystem' }
];

export default function Skills() {
  const [activePillar, setActivePillar] = useState(0);
  const [viewMode, setViewMode] = useState('specs'); // 'specs' | 'game'
  const [showGameBanner, setShowGameBanner] = useState(true);

  return (
    <section className="w-full h-full min-h-screen bg-transparent flex flex-col justify-center pt-20 md:pt-24 pb-6 relative overflow-hidden select-none">
      
      {/* Background Kinetic Watermark & Ambient Glows */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[18vw] font-display font-black text-white/[0.015] pointer-events-none select-none leading-none z-0 whitespace-nowrap">
        EXPERTISE
      </div>
      <div className="absolute top-1/3 -left-28 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-center gap-4 md:gap-5 my-auto">
        
        {/* Section Header with Specs vs Semi-Game Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-3.5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/80 text-[11px] font-mono font-semibold tracking-widest uppercase">
                03 / Core Competencies & Tech Arsenal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight leading-none">
              ENGINEERED FOR <span className="text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text">VELOCITY & DEPTH.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Interactive Switcher with Persistent Floating Guide */}
            <div className="relative">
              <div className="flex items-center p-1 rounded-2xl bg-neutral-950/80 border border-white/15 backdrop-blur-md shadow-lg">
                <button
                  onClick={() => setViewMode('specs')}
                  aria-label="Lihat Matrix & Spesifikasi Keahlian"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'specs'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                      : 'text-white/75 hover:text-white hover:bg-white/10'
                  }`}
                  title="Lihat Matrix & Spesifikasi Keahlian"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Specs Matrix</span>
                </button>
                <button
                  onClick={() => setViewMode('game')}
                  aria-label="Mainkan Mini Game Cyber Arcade Interaktif"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer group ${
                    viewMode === 'game'
                      ? 'bg-fuchsia-500/25 text-fuchsia-300 border border-fuchsia-500/40 font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                      : 'text-fuchsia-400/90 hover:text-fuchsia-300 hover:bg-fuchsia-500/10'
                  }`}
                  title="Mainkan Mini Game Cyber Arcade Interaktif"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-400 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Play Cyber Arcade</span>
                  {viewMode !== 'game' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping ml-0.5" />
                  )}
                </button>
              </div>

              {/* Kolom Panduan Melayang (Hanya Desktop, Tidak Muncul di Mobile agar Tidak Menutupi Layar) */}
              <AnimatePresence>
                {viewMode === 'specs' && showGameBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:flex absolute bottom-full right-0 mb-3 w-80 z-30 p-3.5 rounded-2xl bg-neutral-950/95 border border-fuchsia-500/50 backdrop-blur-2xl shadow-[0_15px_40px_rgba(217,70,239,0.25),0_0_20px_rgba(0,0,0,0.9)] flex-col gap-2.5"
                  >
                    {/* Glowing Pointer Arrow */}
                    <div className="absolute -bottom-1.5 right-8 sm:right-12 w-3 h-3 bg-neutral-950 border-b border-r border-fuchsia-500/60 rotate-45" />

                    {/* Header with Close Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-fuchsia-300">
                          Interactive Arcade Mode
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-[9px] font-mono text-fuchsia-300 font-semibold uppercase tracking-wider">
                          Live Game
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowGameBanner(false);
                          }}
                          aria-label="Tutup notifikasi game"
                          className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer"
                          title="Tutup pemberitahuan"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/80 font-sans leading-relaxed">
                      🎮 <strong className="text-white">Bisa dimainkan!</strong> Anda dapat memainkan game laser shooter 120 FPS langsung di section ini untuk membidik keahlian teknologi & membersihkan bug.
                    </p>

                    {/* Action CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono text-cyan-300">
                        ⚡ 120 FPS WebGL
                      </span>
                      <button
                        onClick={() => {
                          setViewMode('game');
                          setShowGameBanner(false);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-black text-xs font-mono font-bold shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:scale-105 transition-all cursor-pointer"
                      >
                        <Gamepad2 className="w-3.5 h-3.5" />
                        <span>Coba Mainkan →</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-neutral-900/80 border border-white/10 text-xs font-mono text-white/70 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <div className="flex items-center gap-1.5">
                <span className="text-white/70">ENGINE:</span>
                <span className="text-cyan-300 font-bold">120 FPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive View: Specs Matrix OR Cyber Arcade Mini-Game */}
        <AnimatePresence mode="wait">
          {viewMode === 'game' ? (
            <motion.div
              key="arcade-game"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Suspense fallback={<div className="w-full h-80 flex items-center justify-center text-xs font-mono text-cyan-400">LOADING ARCADE ENGINE...</div>}>
                <CyberArcadeGame onExit={() => setViewMode('specs')} />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="specs-matrix"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4 md:gap-5"
            >
              {/* 3 Main Interactive Competency Pillars */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isHovered = activePillar === idx;
                  return (
                    <motion.div
                      key={pillar.id}
                      onMouseEnter={() => setActivePillar(idx)}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className={`relative rounded-2xl sm:rounded-3xl border p-4 sm:p-5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? 'bg-neutral-950/85 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
                          : 'bg-neutral-950/50 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Top Subtle Shimmer Line */}
                      <div 
                        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                      />

                      <div>
                        {/* Card Top Bar */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-8 h-8 rounded-xl flex items-center justify-center border shadow-md"
                              style={{ 
                                backgroundColor: `${pillar.color}15`, 
                                borderColor: `${pillar.color}40`,
                                color: pillar.color 
                              }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-mono font-bold text-white/70">
                              {pillar.number}
                            </span>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider border ${pillar.badgeClass}`}>
                            {pillar.category}
                          </span>
                        </div>

                        {/* Title & Metric Gauge */}
                        <div className="mb-2.5">
                          <h3 className="text-base sm:text-lg font-display font-bold text-white mb-1.5 leading-tight">
                            {pillar.title}
                          </h3>
                          
                          {/* Live Metric Banner */}
                          <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-white/75">
                              {pillar.metricLabel}
                            </span>
                            <span 
                              className="text-xs font-mono font-bold"
                              style={{ color: pillar.color }}
                            >
                              {pillar.metric}
                            </span>
                          </div>
                        </div>

                        {/* Animated Micro-Stats Row */}
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                          {pillar.highlights.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className="p-1.5 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between text-center group-hover:border-white/20 transition-all"
                            >
                              <span className="text-[9px] font-mono text-white/50 truncate uppercase">{h.label}</span>
                              <span className="text-xs font-display font-black tracking-tight" style={{ color: pillar.color }}>
                                {h.val}
                              </span>
                              <span className="text-[8px] font-mono px-1 rounded bg-white/5 text-white/70 mx-auto mt-0.5">
                                {h.tag}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Bullet Highlights */}
                        <div className="flex flex-col gap-1.5 mb-3 pt-2.5 border-t border-white/10">
                          {pillar.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-[11px] font-mono text-white/80 group/feat">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/feat:scale-110" style={{ color: pillar.color }} />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        {pillar.techStack.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/10 text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive Tech Arsenal Grid Bar */}
              <div className="rounded-2xl bg-neutral-950/60 border border-white/10 backdrop-blur-xl p-3.5 sm:p-4">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-white/80 uppercase">
                      Active Technology Matrix & Proficiency
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/70 hidden sm:inline-block">
                    DDEV WORKSPACE & BORNEO GLOBE
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {techArsenal.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-400/40 transition-all flex flex-col justify-between cursor-default"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[9px] font-mono px-1 rounded bg-white/5 text-white/75 group-hover:text-cyan-300">
                            {item.tag}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-cyan-400">
                            {item.level}
                          </span>
                        </div>
                        <div className="text-[11px] font-display font-bold text-white group-hover:text-cyan-200 transition-colors truncate">
                          {item.name}
                        </div>
                      </div>
                      
                      <div className="mt-1">
                        <div className="text-[9px] font-mono text-white/70 truncate">
                          {item.role}
                        </div>
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.level }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.04 }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}

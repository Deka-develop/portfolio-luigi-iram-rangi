import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Layers, Sparkles, Zap, Gauge, Terminal, Activity, ArrowUpRight, CheckCircle2, Gamepad2, X } from 'lucide-react';
import CyberArcadeGame from './CyberArcadeGame';

const pillars = [
  {
    id: 'template-engineering',
    number: '01',
    title: 'Ddev Template Engineering',
    category: 'FLAGSHIP SPECIALTY',
    color: '#00f0ff',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    icon: Code2,
    metric: '100 / 100',
    metricLabel: 'Google PageSpeed Score',
    description: 'Arsitektur native XML Blogger & engine template performa tinggi: Skor PageSpeed 100/100, valid Schema.org semantik, optimasi Google AdSense siap pakai, dan pemuatan instan.',
    features: [
      'Native XML Architecture & Clean Logic',
      'Perfect 100/100 Core Web Vitals',
      'Dynamic Dark/Light Mode & AdSense Ready',
      '120+ Templates Created in Ddev Studio'
    ],
    techStack: ['Native XML', 'PageSpeed 100', 'SEO Schema', 'AdSense Ready']
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
    description: 'Membangun pengalaman visual 3D interaktif Three.js, visual partikel, animasi fisika lerp, audio-reaktif, serta interaksi mikro yang hidup dan responsif pada 120 FPS.',
    features: [
      'Three.js 3D Geometries & Scene Graph',
      'Custom GLSL Shaders & Wireframe Modes',
      'Fluid Cursor Parallax & Inertia Drag',
      'Spatial Ambient Canvas & Starfields'
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
    description: 'Pengembangan web app modern berbasis React, Vite, Next.js, dan Tailwind CSS dengan arsitektur modular, integrasi visual data regional, dan skalabilitas jangka panjang.',
    features: [
      'Component-Driven Architecture (React & Vite)',
      'Borneo Globe Regional Environmental Hub',
      'Tailwind CSS Custom Design Systems',
      'Ultra-Fast Zero-Lag User Experience'
    ],
    techStack: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript']
  }
];

const techArsenal = [
  { name: 'Three.js / WebGL', level: '94%', role: '3D Graphics Specialist', tag: '3D Core' },
  { name: 'Blogger XML Engine', level: '98%', role: 'Template Architecture', tag: 'Flagship' },
  { name: 'React & Vite', level: '95%', role: 'Interactive Web Apps', tag: 'Frontend' },
  { name: 'Tailwind CSS', level: '96%', role: 'Design Tokens & UI/UX', tag: 'Styling' },
  { name: 'TypeScript', level: '88%', role: 'Type-Safe Logic', tag: 'Language' },
  { name: 'Framer Motion', level: '92%', role: 'Kinetic Physics Animation', tag: 'Motion' },
  { name: 'Schema SEO & Core Vitals', level: '96%', role: 'Rank 1 Performance', tag: 'SEO 100' },
  { name: 'Borneo Regional Data', level: '90%', role: 'Impact Platform Development', tag: 'Ecosystem' }
];

export default function Skills() {
  const [activePillar, setActivePillar] = useState(0);
  const [viewMode, setViewMode] = useState('specs'); // 'specs' | 'game'

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

              {/* Kolom Panduan Melayang Permanen Ditaruh Di Atas (Tidak Menutupi Card) */}
              <AnimatePresence>
                {viewMode === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: [0, -5, 0], 
                      scale: 1 
                    }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.25 }
                    }}
                    className="absolute bottom-full right-0 mb-3 w-72 sm:w-84 z-30 p-3.5 rounded-2xl bg-neutral-950/95 border border-fuchsia-500/50 backdrop-blur-2xl shadow-[0_15px_40px_rgba(217,70,239,0.25),0_0_20px_rgba(0,0,0,0.9)] flex flex-col gap-2.5"
                  >
                    {/* Glowing Pointer Arrow pointed down to the Play Cyber Arcade button */}
                    <div className="absolute -bottom-1.5 right-8 sm:right-12 w-3 h-3 bg-neutral-950 border-b border-r border-fuchsia-500/60 rotate-45" />

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping" />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-fuchsia-300">
                          Interactive Arcade Mode
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-[9px] font-mono text-fuchsia-300 font-semibold uppercase tracking-wider">
                        Live Game
                      </span>
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
                        onClick={() => setViewMode('game')}
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
              <CyberArcadeGame onExit={() => setViewMode('specs')} />
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

                        <p className="text-xs text-white/75 font-light leading-relaxed mb-3 line-clamp-2">
                          {pillar.description}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="flex flex-col gap-1.5 mb-3 pt-2.5 border-t border-white/10">
                          {pillar.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-2 text-[11px] font-mono text-white/70">
                              <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
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
                      <div className="text-[9px] font-mono text-white/70 truncate mt-0.5">
                        {item.role}
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

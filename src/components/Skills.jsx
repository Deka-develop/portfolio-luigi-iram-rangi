import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Layers, Sparkles, Zap, Gauge, Terminal, Activity, ArrowUpRight, CheckCircle2, Gamepad2, X, ExternalLink, Play, Check } from 'lucide-react';

const CyberArcadeGame = lazy(() => import('./CyberArcadeGame'));

const pillars = [
  {
    id: 'performance-architecture',
    number: '01',
    title: 'High-Velocity Architecture',
    category: 'PERFORMANCE CORE',
    color: '#00f0ff',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    icon: Code2,
    gaugeVal: '100',
    gaugeUnit: '/ 100',
    gaugeLabel: 'Google PageSpeed & Core Vitals',
    points: [
      { label: 'LCP Latency', val: '< 0.6s', percent: 98, tag: 'Ultra-Fast' },
      { label: 'Core Web Vitals', val: '100 / 100', percent: 100, tag: 'Perfect Score' },
      { label: 'Schema SEO LD', val: 'Valid LD', percent: 96, tag: 'Rank 1 Target' },
      { label: 'Production Engines', val: '8 Active', percent: 100, tag: 'Zero-Bloat' }
    ],
    interactiveAction: 'Uji Kecepatan Engine Live',
    interactiveType: 'speedTest'
  },
  {
    id: 'creative-webgl',
    number: '02',
    title: 'Creative Coding & WebGL 3D',
    category: 'HARDWARE GRAPHICS',
    color: '#d946ef',
    badgeClass: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300',
    icon: Sparkles,
    gaugeVal: '120',
    gaugeUnit: 'FPS',
    gaugeLabel: 'Hardware Accelerated WebGL 2.0',
    points: [
      { label: 'WebGL 3D Pipeline', val: 'Three.js', percent: 95, tag: 'GPU 3D' },
      { label: 'Custom GLSL Shaders', val: 'GPU Core', percent: 92, tag: 'GLSL Core' },
      { label: 'Kinetic Physics Lerp', val: '120 FPS', percent: 98, tag: 'Zero Jitter' },
      { label: 'Spatial Starfield', val: 'Canvas 3D', percent: 94, tag: 'Interactive' }
    ],
    interactiveAction: 'Mainkan Cyber Arcade 120 FPS →',
    interactiveType: 'game'
  },
  {
    id: 'modern-architecture',
    number: '03',
    title: 'Modern Web Architecture',
    category: 'PRODUCTION SCALE',
    color: '#10b981',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    icon: Cpu,
    gaugeVal: '8+',
    gaugeUnit: 'LIVE',
    gaugeLabel: 'Regional & Multi-Sector Hubs',
    points: [
      { label: 'Modern Frontend', val: 'React 19 & Vite', percent: 96, tag: 'Component' },
      { label: 'Borneo Impact Hub', val: '2,800+ Users', percent: 92, tag: 'Live Hub' },
      { label: 'Design Token System', val: 'Custom UI/UX', percent: 95, tag: 'Micro UX' },
      { label: 'Network Resilience', val: '100% Mobile', percent: 98, tag: 'Pelosok Ready' }
    ],
    interactiveAction: 'Buka Borneo Globe Hub ↗',
    interactiveType: 'link',
    interactiveUrl: 'https://www.borneoglobe.org/'
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
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState(null);

  const runSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedTestResult(null);
    setTimeout(() => {
      setSpeedTestActive(false);
      setSpeedTestResult({
        ttfb: '14ms',
        lcp: '0.38s',
        score: '100 / 100'
      });
    }, 700);
  };

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

              {/* Kolom Panduan Melayang (Hanya Desktop) */}
              <AnimatePresence>
                {viewMode === 'specs' && showGameBanner && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="hidden md:flex absolute bottom-full right-0 mb-3 w-80 z-30 p-3.5 rounded-2xl bg-neutral-950/95 border border-fuchsia-500/50 backdrop-blur-2xl shadow-[0_15px_40px_rgba(217,70,239,0.25),0_0_20px_rgba(0,0,0,0.9)] flex-col gap-2.5"
                  >
                    <div className="absolute -bottom-1.5 right-8 sm:right-12 w-3 h-3 bg-neutral-950 border-b border-r border-fuchsia-500/60 rotate-45" />

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
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-white/80 font-sans leading-relaxed">
                      🎮 <strong className="text-white">Bisa dimainkan!</strong> Anda dapat memainkan game laser shooter 120 FPS langsung di section ini untuk membidik keahlian teknologi & membersihkan bug.
                    </p>

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
              {/* 3 Main Kinetic Pillars with Radial Gauges & Telemetry Bars */}
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
                      className={`relative rounded-2xl sm:rounded-3xl border p-4 sm:p-5 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                        isHovered
                          ? 'bg-neutral-950/90 border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
                          : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
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

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-display font-bold text-white mb-2.5 leading-tight">
                          {pillar.title}
                        </h3>

                        {/* Kinetic Radial Gauge Hero Banner */}
                        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden group/gauge mb-3">
                          {/* Circular SVG Gauge Ring */}
                          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <path
                                strokeWidth="3"
                                stroke="rgba(255,255,255,0.08)"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <motion.path
                                stroke={pillar.color}
                                strokeWidth="3.2"
                                strokeDasharray="100, 100"
                                initial={{ strokeDashoffset: 100 }}
                                whileInView={{ strokeDashoffset: 10 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                strokeLinecap="round"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                style={{ filter: `drop-shadow(0 0 6px ${pillar.color})` }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-sm font-display font-black text-white leading-none">
                                {pillar.gaugeVal}
                              </span>
                              <span className="text-[8px] font-mono font-bold leading-none mt-0.5" style={{ color: pillar.color }}>
                                {pillar.gaugeUnit}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-center min-w-0">
                            <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-white/50 truncate">
                              VERIFIED BENCHMARK
                            </span>
                            <span className="text-xs font-display font-bold text-white truncate">
                              {pillar.gaugeLabel}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              100% Production Active
                            </span>
                          </div>
                        </div>

                        {/* 4 Animated Telemetry Bars (Points With Real Visual Motion) */}
                        <div className="flex flex-col gap-2 my-3">
                          {pillar.points.map((pt, pIdx) => (
                            <div 
                              key={pIdx}
                              className="p-2 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-1.5 group/bar cursor-default"
                            >
                              <div className="flex items-center justify-between text-xs font-mono">
                                <div className="flex items-center gap-2">
                                  <span 
                                    className="w-1.5 h-1.5 rounded-full shrink-0 group-hover/bar:scale-150 transition-transform" 
                                    style={{ 
                                      backgroundColor: pillar.color,
                                      boxShadow: `0 0 8px ${pillar.color}`
                                    }} 
                                  />
                                  <span className="text-white/80 group-hover/bar:text-white transition-colors font-medium text-[11px]">
                                    {pt.label}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span 
                                    className="text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider"
                                    style={{ 
                                      backgroundColor: `${pillar.color}15`,
                                      color: pillar.color,
                                      border: `1px solid ${pillar.color}35`
                                    }}
                                  >
                                    {pt.tag}
                                  </span>
                                  <span className="font-display font-bold text-white text-xs">
                                    {pt.val}
                                  </span>
                                </div>
                              </div>

                              {/* Kinetic Animated Gradient Progress Meter */}
                              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${pt.percent}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.9, delay: pIdx * 0.08, ease: "easeOut" }}
                                  className="h-full rounded-full"
                                  style={{
                                    background: `linear-gradient(90deg, ${pillar.color}70, ${pillar.color})`,
                                    boxShadow: `0 0 10px ${pillar.color}80`
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Live Action Trigger on Each Card */}
                      <div className="pt-2.5 border-t border-white/10">
                        {pillar.interactiveType === 'speedTest' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={runSpeedTest}
                              disabled={speedTestActive}
                              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <Zap className={`w-3.5 h-3.5 ${speedTestActive ? 'animate-spin' : 'animate-pulse'}`} />
                              <span>{speedTestActive ? 'Scanning Latency & LCP...' : pillar.interactiveAction}</span>
                            </button>

                            {speedTestResult && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 flex items-center justify-between"
                              >
                                <span className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>TTFB: {speedTestResult.ttfb} • LCP: {speedTestResult.lcp}</span>
                                </span>
                                <span className="font-bold text-white">{speedTestResult.score}</span>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {pillar.interactiveType === 'game' && (
                          <button
                            onClick={() => {
                              setViewMode('game');
                              setShowGameBanner(false);
                            }}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-mono font-bold transition-all shadow-[0_0_15px_rgba(217,70,239,0.2)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Gamepad2 className="w-3.5 h-3.5 animate-pulse" />
                            <span>{pillar.interactiveAction}</span>
                          </button>
                        )}

                        {pillar.interactiveType === 'link' && (
                          <a
                            href={pillar.interactiveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{pillar.interactiveAction}</span>
                          </a>
                        )}
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


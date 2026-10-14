import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Zap } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

const CyberArcadeGame = lazy(() => import('./CyberArcadeGame'));

const pillars = [
  {
    id: 'performance-architecture',
    number: '01',
    title: 'High-Velocity Architecture',
    category: 'Performance Core',
    gaugeVal: '100',
    gaugeUnit: '/100',
    gaugeLabel: 'Google PageSpeed & Core Vitals',
    accent: '#10B981',
    points: [
      { label: 'LCP Latency', val: '< 0.6s', percent: 98, tag: 'Ultra-Fast' },
      { label: 'Core Web Vitals', val: '100 / 100', percent: 100, tag: 'Perfect Score' },
      { label: 'Schema SEO LD', val: 'Valid LD', percent: 96, tag: 'Rank 1 Target' },
      { label: 'Production Systems', val: '120+ Built', percent: 100, tag: 'Zero-Bloat' }
    ],
    interactiveAction: 'Uji Kecepatan Engine Live',
    interactiveType: 'speedTest'
  },
  {
    id: 'creative-webgl',
    number: '02',
    title: 'Creative Coding & WebGL 3D',
    category: 'Hardware Graphics',
    gaugeVal: '120',
    gaugeUnit: 'FPS',
    gaugeLabel: 'Hardware Accelerated WebGL 2.0',
    accent: '#684AFF',
    points: [
      { label: 'WebGL 3D Pipeline', val: 'Three.js R186', percent: 96, tag: 'GPU 3D' },
      { label: 'Custom GLSL Shaders', val: 'GPU Core', percent: 92, tag: 'GLSL Core' },
      { label: 'Kinetic Physics Lerp', val: '120 FPS', percent: 98, tag: 'Zero Jitter' },
      { label: 'Spatial 3D Canvases', val: 'Interactive', percent: 95, tag: 'Spatial' }
    ],
    interactiveAction: 'Mainkan Cyber Arcade 120 FPS →',
    interactiveType: 'game'
  },
  {
    id: 'modern-architecture',
    number: '03',
    title: 'Borneo Digital Ecosystem',
    category: 'Production Scale',
    gaugeVal: '2.8k+',
    gaugeUnit: 'USERS',
    gaugeLabel: 'Regional & Multi-Sector Hubs',
    accent: '#D97706',
    points: [
      { label: 'Modern Frontend', val: 'React 19 & Vite', percent: 96, tag: 'Component' },
      { label: 'Borneo Impact Hub', val: '2,800+ Users', percent: 94, tag: 'Live Hub' },
      { label: 'Design Token System', val: 'Custom UI/UX', percent: 95, tag: 'Micro UX' },
      { label: 'Network Resilience', val: '100% Mobile', percent: 98, tag: 'Pelosok Ready' }
    ],
    interactiveAction: 'Buka Borneo Globe Hub ↗',
    interactiveType: 'link',
    interactiveUrl: 'https://www.borneoglobe.org/'
  }
];

const techArsenal = [
  { name: 'Three.js / WebGL', level: '96%', role: '3D Graphics Specialist', tag: '3D Core' },
  { name: 'High-Perf Web Systems', level: '98%', role: 'Zero-Bloat & Publishing Engines', tag: 'Architecture' },
  { name: 'React 19 & Vite', level: '95%', role: 'Interactive Web Apps', tag: 'Frontend' },
  { name: 'Tailwind CSS', level: '96%', role: 'Design Tokens & UI/UX', tag: 'Styling' },
  { name: 'TypeScript & JavaScript', level: '92%', role: 'Type-Safe Logic & GLSL', tag: 'Language' },
  { name: 'Framer Motion', level: '94%', role: 'Kinetic Physics Animation', tag: 'Motion' },
  { name: 'Schema SEO & Vitals', level: '98%', role: '100/100 Core Vitals Benchmark', tag: 'SEO 100' },
  { name: 'Borneo Regional Hub', level: '92%', role: 'Impact Platform Engineering', tag: 'Ecosystem' }
];

export default function Skills() {
  const [viewMode, setViewMode] = useState('specs'); // 'specs' | 'game'
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState(null);

  const runSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedTestResult(null);
    setTimeout(() => {
      setSpeedTestActive(false);
      setSpeedTestResult({ ttfb: '14ms', lcp: '0.36s', score: '100 / 100' });
    }, 1100);
  };

  return (
    <section className="relative w-full bg-[#EDEEF0] text-[#111111] px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-24 md:pb-32 select-none border-b border-[#111111]/10">
      
      {/* Metadata Bar */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between mb-8 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#111111]/50">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
          <DayakShieldEmblem className="w-3.5 h-3.5 text-[#10B981]" color="#10B981" />
          Kapabilitas Rekayasa
        </div>
        <span>Standar Arsitektur Web &amp; 3D</span>
      </div>

      {/* Bespoke Header */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20">
        <div>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
            Standar Arsitektur &amp; Kualitas<span className="text-[#684AFF]">.</span>
          </h2>
          <p className="text-[#111111]/60 text-sm md:text-base max-w-xl leading-relaxed mt-4">
            Komitmen absolut pada kode ultra-ringan tanpa bloatware, grafika WebGL 3D interaktif 120 FPS, dan platform digital berdaya tahan tinggi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'specs' ? 'game' : 'specs')}
            className="px-5 py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#684AFF] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Gamepad2 className="w-4 h-4 text-[#D97706]" />
            <span>{viewMode === 'specs' ? 'Buka Mini Arcade 3D' : 'Lihat Spesifikasi Teknis'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === 'game' ? (
            <motion.div
              key="arcade"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-[28px] md:rounded-[36px] bg-[#111111] p-6 md:p-10 border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                    Ddev Cyber Arcade // Hardware Accelerated 120 FPS
                  </span>
                </div>
                <button
                  onClick={() => setViewMode('specs')}
                  className="px-4 py-1.5 rounded-full bg-white/10 text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  Tutup Arcade
                </button>
              </div>

              <Suspense
                fallback={
                  <div className="w-full h-[450px] flex items-center justify-center text-white/40 font-mono text-xs">
                    Memuat game canvas...
                  </div>
                }
              >
                <CyberArcadeGame onExit={() => setViewMode('specs')} />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="specs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-12 md:gap-16"
            >
              {/* 3 Main Capability Pillars */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="rounded-[28px] md:rounded-[32px] bg-white border border-[#111111]/10 p-6 md:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[#684AFF]/30 transition-all duration-500 group"
                  >
                    <div>
                      {/* Top Pill & Number */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/40">
                          /{pillar.number}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold"
                          style={{
                            backgroundColor: `${pillar.accent}15`,
                            color: pillar.accent
                          }}
                        >
                          {pillar.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight mb-6 leading-tight group-hover:text-[#684AFF] transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Big Gauge Display */}
                      <div className="flex items-baseline gap-1.5 py-4 border-y border-[#111111]/8 mb-6">
                        <span className="text-4xl sm:text-5xl font-black text-[#111111] tracking-tight">
                          {pillar.gaugeVal}
                        </span>
                        <span className="text-base font-bold text-[#684AFF]">{pillar.gaugeUnit}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#111111]/40 ml-auto text-right">
                          {pillar.gaugeLabel}
                        </span>
                      </div>

                      {/* Metrics List */}
                      <ul className="flex flex-col gap-3">
                        {pillar.points.map((pt) => (
                          <li key={pt.label} className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-[#111111]/60">{pt.label}</span>
                              <span className="font-bold text-[#111111]">{pt.val}</span>
                            </div>
                            <div className="w-full h-1 bg-[#111111]/5 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${pt.percent}%`,
                                  backgroundColor: pillar.accent
                                }}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Action Button */}
                    <div className="mt-8 pt-4 border-t border-[#111111]/8">
                      {pillar.interactiveType === 'speedTest' ? (
                        <div>
                          <button
                            onClick={runSpeedTest}
                            disabled={speedTestActive}
                            className="w-full py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#10B981] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            <Zap className="w-3.5 h-3.5 text-[#10B981]" />
                            <span>{speedTestActive ? 'Menjalankan Audit...' : pillar.interactiveAction}</span>
                          </button>
                          {speedTestResult && (
                            <div className="mt-3 p-3 rounded-[14px] bg-[#10B981]/10 border border-[#10B981]/20 text-center font-mono text-xs text-[#0D5C3A]">
                              Skor Vitals: <strong>{speedTestResult.score}</strong> • LCP: {speedTestResult.lcp} • TTFB: {speedTestResult.ttfb}
                            </div>
                          )}
                        </div>
                      ) : pillar.interactiveType === 'game' ? (
                        <button
                          onClick={() => setViewMode('game')}
                          className="w-full py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#684AFF] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <Gamepad2 className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>{pillar.interactiveAction}</span>
                        </button>
                      ) : (
                        <a
                          href={pillar.interactiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#D97706] transition-colors flex items-center justify-center gap-2"
                        >
                          <span>{pillar.interactiveAction}</span>
                        </a>
                      )}
                    </div>

                  </div>
                ))}
              </div>

              {/* Tech Arsenal Pill Grid */}
              <div className="rounded-[28px] md:rounded-[36px] bg-white border border-[#111111]/10 p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/40 block mb-1">
                      Full Technology Radar
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight">
                      Tech Arsenal &amp; Frameworks
                    </h3>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#684AFF] font-bold">
                    Zero-Bloat Production Tested
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {techArsenal.map((tech) => (
                    <div
                      key={tech.name}
                      className="p-4 rounded-[18px] bg-[#EDEEF0]/60 border border-[#111111]/8 hover:border-[#684AFF]/40 hover:bg-white transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#684AFF] font-bold">
                          {tech.tag}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#111111]">{tech.level}</span>
                      </div>
                      <h4 className="font-bold text-base text-[#111111] tracking-tight mb-1">{tech.name}</h4>
                      <p className="text-xs text-[#111111]/50 leading-relaxed">{tech.role}</p>
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

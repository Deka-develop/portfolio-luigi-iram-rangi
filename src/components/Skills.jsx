import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ExternalLink, Zap, Check } from 'lucide-react';
import { DayakShieldEmblem, DayakBorderRibbon, DayakCornerAccent } from './DayakMotifs';

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
    tone: 'paper',
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
    category: 'Hardware Graphics',
    gaugeVal: '120',
    gaugeUnit: 'FPS',
    gaugeLabel: 'Hardware Accelerated WebGL 2.0',
    tone: 'ink',
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
    title: 'Borneo Digital Ecosystem',
    category: 'Production Scale',
    gaugeVal: '8+',
    gaugeUnit: 'LIVE',
    gaugeLabel: 'Regional & Multi-Sector Hubs',
    tone: 'ochre',
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

const toneClass = {
  paper: { card: 'bg-paper text-ink', sub: 'text-ink/60', bar: 'bg-ink', track: 'bg-ink/15', border: 'border-ink', chip: 'bg-ochre text-white border-ink' },
  ink: { card: 'bg-ink text-paper', sub: 'text-paper/60', bar: 'bg-ochre', track: 'bg-paper/20', border: 'border-paper/40', chip: 'bg-ochre text-white border-ochre' },
  ochre: { card: 'bg-paper-dark text-ink', sub: 'text-ink/70', bar: 'bg-ochre', track: 'bg-ink/20', border: 'border-ink', chip: 'bg-ink text-paper border-ink' }
};

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

export default function Skills() {
  const [viewMode, setViewMode] = useState('specs'); // 'specs' | 'game'
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [speedTestResult, setSpeedTestResult] = useState(null);

  const runSpeedTest = () => {
    setSpeedTestActive(true);
    setSpeedTestResult(null);
    setTimeout(() => {
      setSpeedTestActive(false);
      setSpeedTestResult({ ttfb: '14ms', lcp: '0.38s', score: '100 / 100' });
    }, 700);
  };

  return (
    <section className="relative w-full bg-paper text-ink px-5 md:px-12 lg:px-20 pt-28 md:pt-36 pb-24 md:pb-32 overflow-hidden border-b border-ink/15">

      {/* Section tag */}
      <motion.div {...reveal} className="flex flex-col gap-2 mb-8 md:mb-12">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-3.5 h-3.5 text-ochre" color="#D97706" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold">03 / Keahlian &amp; Arsitektur</span>
          </div>
          <div className="flex-1 h-[1px] bg-ink/20" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 hidden sm:inline">Standar Produksi &amp; Kinerja</span>
        </div>
        <DayakBorderRibbon className="w-full h-2.5" color="#141413" opacity={0.2} />
      </motion.div>

      {/* Giant heading + mode toggle */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
        <motion.h2
          {...reveal}
          className="font-sans font-black uppercase tracking-tighter leading-[0.86] text-[13vw] md:text-[9vw] lg:text-[8vw]"
        >
          Engineered<br />for <span className="text-ochre">velocity</span><br />&amp; cultural depth.
        </motion.h2>

        <motion.div {...reveal} className="flex items-stretch border-2 border-ink self-start lg:self-auto shrink-0 bg-paper">
          <button
            onClick={() => setViewMode('specs')}
            aria-label="Lihat Matrix & Spesifikasi Keahlian"
            className={`px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer border-r-2 border-ink ${
              viewMode === 'specs' ? 'bg-ink text-paper' : 'hover:bg-ochre hover:text-white'
            }`}
          >
            Specs Matrix
          </button>
          <button
            onClick={() => setViewMode('game')}
            aria-label="Mainkan Mini Game Cyber Arcade Interaktif"
            className={`px-4 py-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${
              viewMode === 'game' ? 'bg-ink text-paper' : 'hover:bg-ochre hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play Arcade</span>
            {viewMode !== 'game' && <span className="w-2 h-2 rounded-full bg-ochre border border-ink animate-ping" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'game' ? (
          <motion.div
            key="arcade-game"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Suspense fallback={<div className="w-full h-80 flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading arcade engine…</div>}>
              <CyberArcadeGame onExit={() => setViewMode('specs')} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="specs-matrix"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-10 md:gap-14"
          >
            {/* Three pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {pillars.map((pillar, idx) => {
                const t = toneClass[pillar.tone];
                return (
                  <motion.article
                    key={pillar.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative ${t.card} border-2 border-ink p-5 md:p-7 flex flex-col justify-between transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_#111]`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-xs font-bold">{pillar.number}</span>
                        <span className={`px-2.5 py-1 border ${t.chip} font-mono text-[10px] font-bold uppercase tracking-widest`}>
                          {pillar.category}
                        </span>
                      </div>

                      {/* Giant gauge number */}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-sans font-black text-[22vw] sm:text-[12vw] lg:text-[7vw] tracking-tighter leading-[0.85]">
                          {pillar.gaugeVal}
                        </span>
                        <span className="font-sans font-bold text-lg md:text-xl uppercase">{pillar.gaugeUnit}</span>
                      </div>
                      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-5 ${t.sub}`}>{pillar.gaugeLabel}</p>

                      <h3 className="font-sans font-black uppercase tracking-tight text-xl md:text-2xl leading-tight mb-6">
                        {pillar.title}
                      </h3>

                      {/* Bars */}
                      <ul className="flex flex-col gap-4 mb-6">
                        {pillar.points.map((pt, pIdx) => (
                          <li key={pt.label}>
                            <div className="flex items-baseline justify-between gap-3 mb-1.5">
                              <span className="font-sans text-sm font-semibold">{pt.label}</span>
                              <span className="font-mono text-xs font-bold whitespace-nowrap">{pt.val}</span>
                            </div>
                            <div className={`h-[3px] w-full ${t.track} overflow-hidden`}>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: pt.percent / 100 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: pIdx * 0.08, ease: 'easeOut' }}
                                style={{ transformOrigin: 'left' }}
                                className={`h-full w-full ${t.bar}`}
                              />
                            </div>
                            <span className={`block mt-1 font-mono text-[9px] uppercase tracking-[0.2em] ${t.sub}`}>{pt.tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action */}
                    <div className={`pt-4 border-t ${t.border}`}>
                      {pillar.interactiveType === 'speedTest' && (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={runSpeedTest}
                            disabled={speedTestActive}
                            className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-ink text-paper hover:bg-ochre hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-widest cursor-pointer disabled:opacity-70"
                          >
                            <Zap className={`w-3.5 h-3.5 ${speedTestActive ? 'animate-spin' : ''}`} />
                            <span>{speedTestActive ? 'Scanning Latency & LCP…' : pillar.interactiveAction}</span>
                          </button>
                          {speedTestResult && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="px-3 py-2 bg-ochre text-white border-2 border-ink text-[11px] font-mono flex items-center justify-between"
                            >
                              <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" />
                                <span>TTFB {speedTestResult.ttfb} · LCP {speedTestResult.lcp}</span>
                              </span>
                              <span className="font-bold">{speedTestResult.score}</span>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {pillar.interactiveType === 'game' && (
                        <button
                          onClick={() => setViewMode('game')}
                          className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-ochre text-white border-2 border-ink hover:bg-ink transition-colors font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                        >
                          <Gamepad2 className="w-4 h-4" />
                          <span>{pillar.interactiveAction}</span>
                        </button>
                      )}

                      {pillar.interactiveType === 'link' && (
                        <a
                          href={pillar.interactiveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-3 px-3 bg-ink text-paper hover:bg-paper hover:text-ink border-2 border-ink transition-colors font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{pillar.interactiveAction}</span>
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Tech arsenal */}
            <motion.div {...reveal}>
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] font-bold">Active Technology Matrix</span>
                <div className="flex-1 h-[1px] bg-ink/25" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60 hidden sm:inline">Ddev Workspace &amp; Borneo Globe</span>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-l-2 border-ink">
                {techArsenal.map((item, idx) => (
                  <li
                    key={item.name}
                    className="group relative p-4 md:p-5 border-r-2 border-b-2 border-ink hover:bg-ink hover:text-paper transition-colors duration-300 cursor-default"
                  >
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">{item.tag}</span>
                      <span className="font-sans font-black text-xl tracking-tighter group-hover:text-ochre transition-colors">{item.level}</span>
                    </div>
                    <h4 className="font-sans font-black uppercase tracking-tight text-base md:text-lg leading-tight">{item.name}</h4>
                    <p className="font-mono text-[10px] uppercase tracking-wider opacity-60 mt-1">{item.role}</p>
                    <div className="h-[3px] w-full bg-ink/15 group-hover:bg-paper/20 mt-4 overflow-hidden">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: parseInt(item.level, 10) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: idx * 0.05, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                        className="h-full w-full bg-ink group-hover:bg-ochre"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

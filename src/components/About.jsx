import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Shield, Terminal, Award, Layers, Zap, Globe, CheckCircle2 } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    phase: 'High-Velocity Web Engines',
    title: 'Zero-Bloat Web Engineering',
    badge: '120+ Web Engines',
    color: '#f59e0b',
    borderClass: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    points: ['120+ Web Systems Built', '100/100 PageSpeed Benchmark', 'Valid Schema SEO', 'Sub-0.6s LCP Speed']
  },
  {
    year: '2024',
    phase: 'Creative WebGL & GLSL',
    title: 'Ddev Studio Lab & 3D Shaders',
    badge: '120 FPS WebGL',
    color: '#d946ef',
    borderClass: 'border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10',
    points: ['Three.js 3D Geometries', 'Custom GLSL GPU Shaders', 'Kinetic Lerp Physics', 'Neon Cyber & Dayak Fusion']
  },
  {
    year: '2025',
    phase: 'Borneo Globe Active Hub',
    title: 'Regional Impact Ecosystem',
    badge: 'Regional Scale',
    color: '#10b981',
    borderClass: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    points: ['borneoglobe.org Platform', '2,800+ Beneficiaries', 'Eco Data Monitoring', 'Global Research Partners']
  }
];

const quickStats = [
  { icon: Zap, label: 'SPECIALTY', val: 'WebGL 3D & 120 FPS', color: '#00f0ff' },
  { icon: Terminal, label: 'ARCHITECTURE', val: '100/100 PageSpeed', color: '#38bdf8' },
  { icon: Layers, label: 'ECOSYSTEM', val: 'Ddev Founder', color: '#d946ef' },
  { icon: Compass, label: 'ACTIVE IMPACT', val: 'Borneo Globe Hub', color: '#10b981' }
];

const About = () => {
  const [activeMilestone, setActiveMilestone] = useState(2); // Default to current 2025
  const current = milestones[activeMilestone];

  return (
    <section className="w-full h-full min-h-screen bg-transparent flex flex-col justify-center relative overflow-hidden py-16 md:py-0 select-none">
      
      {/* Huge background typography */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[22vw] font-display font-black text-white/[0.02] pointer-events-none select-none leading-none z-0 whitespace-nowrap">
        DDEV
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex flex-col justify-center">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Heading & Pontianak Equator Beacon */}
          <div className="w-full lg:w-[38%] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white/70 text-xs font-mono font-semibold tracking-widest uppercase">01 / About Me & Ddev</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-display font-black text-white leading-[0.88] tracking-tighter uppercase mb-5">
                BORNEO ROOTED.<br/>
                CODE CRAFTED.<br/>
                <span className="text-transparent stroke-text">FUTURE</span><br/>
                FOCUSED.
              </h2>
            </div>

            {/* Interactive Dayak Cyber Equator Beacon */}
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-cyan-500/20 backdrop-blur-md flex items-center justify-between gap-3 shadow-lg group hover:border-cyan-400/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:rotate-45 transition-transform duration-500">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 block font-semibold">
                    0°00'00" EQUATOR LINE
                  </span>
                  <span className="text-xs font-mono text-white/70">
                    Pontianak, West Borneo
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
            </div>
          </div>

          {/* Right Column: Direct Identity, Animated Points, Dual Cards & Trajectory */}
          <div className="w-full lg:w-[62%] flex flex-col gap-4 mt-1 lg:mt-2">
            
            {/* Direct Identity & 4 Animated Quick-Point Cards */}
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-white tracking-tight">
                  LUIGI IRAM RANGI
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                  Creative Technologist • Dayak Developer
                </span>
              </div>

              {/* 4 Animated Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {quickStats.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 backdrop-blur-md transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-white/50 tracking-wider uppercase">{item.label}</span>
                        <Icon className="w-3 h-3" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs font-display font-bold tracking-tight truncate" style={{ color: item.color }}>
                        {item.val}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Dual Ecosystem Cards (Point-Based, Zero Fluff) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-lg sm:text-xl font-display font-black text-white">Ddev Studio</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                      Founder
                    </span>
                  </div>
                  <span className="text-cyan-400 text-[10px] uppercase tracking-widest block mb-2 font-mono font-semibold">
                    Creative Tech & Web Lab
                  </span>

                  {/* Animated Bullet Points */}
                  <div className="flex flex-col gap-1.5">
                    {[
                      'Interactive 3D WebGL & Custom GLSL Shaders',
                      'Skor 100/100 Core Web Vitals & Sub-0.6s LCP',
                      'SMA Santo Paulus & Panca Palma Platforms',
                      '120+ Web Systems & Token Design Architecture'
                    ].map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[11px] font-mono text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_6px_#22d3ee]" />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-emerald-500/25 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-400/40 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-lg sm:text-xl font-display font-black text-white">Borneo Globe</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  </div>
                  <a 
                    href="https://www.borneoglobe.org/" 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Kunjungi situs Borneo Globe"
                    className="text-emerald-400 hover:text-white text-[10px] uppercase tracking-widest block mb-2 font-mono font-semibold transition-colors pointer-events-auto"
                  >
                    Active Role • borneoglobe.org ↗
                  </a>

                  {/* Animated Bullet Points */}
                  <div className="flex flex-col gap-1.5">
                    {[
                      'Platform Pemantauan Lingkungan Pulau Borneo',
                      '2,800+ Penerima Manfaat Program Digital',
                      'Jembatan Riset & Kemitraan Konservasi Global',
                      '100% Mobile Ready & Resisten Koneksi Pelosok'
                    ].map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-[11px] font-mono text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_#34d399]" />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Technical Evolution Trajectory (Points-driven) */}
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/80 uppercase">
                    Evolution Trajectory
                  </span>
                </div>

                {/* Milestone Year Pills */}
                <div className="flex items-center gap-1.5 p-0.5 rounded-xl bg-black/60 border border-white/10">
                  {milestones.map((m, idx) => (
                    <button
                      key={m.year}
                      onClick={() => setActiveMilestone(idx)}
                      aria-label={`Lihat milestone tahun ${m.year}: ${m.phase}`}
                      className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                        activeMilestone === idx
                          ? 'bg-white text-black shadow-md scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {m.year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Milestone Points Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.year}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-white">
                        {current.title}
                      </span>
                      <span className={`px-2 py-0.2 rounded text-[9px] font-mono uppercase tracking-wider border ${current.borderClass}`}>
                        {current.phase}
                      </span>
                    </div>

                    {/* Animated Points Grid */}
                    <div className="grid grid-cols-2 gap-1">
                      {current.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1.5 text-[11px] font-mono text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: current.color }} />
                          <span className="truncate">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <span 
                    className="shrink-0 self-start sm:self-center px-2.5 py-1 rounded-xl text-xs font-mono font-bold border shadow-md"
                    style={{ 
                      color: current.color, 
                      borderColor: `${current.color}40`,
                      backgroundColor: `${current.color}15`
                    }}
                  >
                    {current.badge}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

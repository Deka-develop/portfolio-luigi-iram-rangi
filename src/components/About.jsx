import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Shield, Terminal, ArrowUpRight, Award, Layers, Zap } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    phase: 'Blogger XML Architecture',
    title: 'High-Velocity Template Engineering',
    desc: 'Merekayasa 120+ template native XML Blogger berkecepatan 100/100 PageSpeed, Schema SEO valid, dan monetisasi AdSense siap pakai.',
    badge: '120+ Templates',
    color: '#f59e0b',
    borderClass: 'border-amber-500/30 text-amber-300 bg-amber-500/10'
  },
  {
    year: '2024',
    phase: 'Creative WebGL & GLSL',
    title: 'Ddev Studio Lab & 3D Shaders',
    desc: 'Mengeksplorasi Three.js, animasi fisika lerp, dan kustom GLSL shader yang memadukan estetika neon cyber dengan filosofi Dayak.',
    badge: '120 FPS WebGL',
    color: '#d946ef',
    borderClass: 'border-fuchsia-500/30 text-fuchsia-300 bg-fuchsia-500/10'
  },
  {
    year: '2025',
    phase: 'Borneo Globe Active Hub',
    title: 'Regional Impact Ecosystem',
    desc: 'Membangun ekosistem platform digital resmi Borneo Globe (borneoglobe.org) untuk pemantauan lingkungan dan kemitraan pulau Kalimantan.',
    badge: 'Regional Scale',
    color: '#10b981',
    borderClass: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
  }
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
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Pontianak Equator Beacon */}
          <div className="w-full lg:w-[40%] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white/70 text-xs font-mono font-semibold tracking-widest uppercase">01 / About Me & Ddev</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[4.6rem] font-display font-black text-white leading-[0.88] tracking-tighter uppercase mb-5">
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
                    Pontianak, Kalimantan Barat
                  </span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
            </div>
          </div>

          {/* Right Column: Bio Narrative, Dual Ecosystem Cards & Trajectory Timeline */}
          <div className="w-full lg:w-[60%] flex flex-col gap-5 mt-1 lg:mt-3">
            <p className="text-lg sm:text-xl lg:text-[1.65rem] text-white/90 font-display font-medium leading-[1.22] tracking-tight">
              Saya adalah <span className="text-white font-bold underline decoration-cyan-400 decoration-2 underline-offset-4">Luigi Iram Rangi</span>, Creative Developer & Founder dari <span className="text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text font-bold">Ddev (Dayak Developer)</span>, serta saat ini berkontribusi aktif untuk{' '}
              <a 
                href="https://www.borneoglobe.org/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-300 hover:text-white underline decoration-cyan-400 decoration-2 underline-offset-4 transition-colors pointer-events-auto"
              >
                Borneo Globe
              </a>
              . Menggabungkan arsitektur web modern, WebGL 3D, dan dedikasi inovasi dari tanah Borneo untuk panggung global.
            </p>
            
            {/* Dual Ecosystem Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors">
                <span className="text-2xl sm:text-3xl font-display font-black text-white block mb-0.5">Ddev Studio</span>
                <span className="text-cyan-400 text-xs uppercase tracking-widest block mb-1.5 font-mono font-semibold">Founder & Architect</span>
                <p className="text-white/60 font-light text-xs leading-relaxed">
                  Ekosistem web studio mandiri: memproduksi template Blogger premium (Nebula Pro, Integrita), arsitektur kustom berkinerja tinggi, dan solusi digital modern.
                </p>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-2xl sm:text-3xl font-display font-black text-white block">Borneo Globe</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                </div>
                <a 
                  href="https://www.borneoglobe.org/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 hover:text-white text-xs uppercase tracking-widest block mb-1.5 font-mono font-semibold transition-colors pointer-events-auto"
                >
                  Active Role • borneoglobe.org ↗
                </a>
                <p className="text-white/60 font-light text-xs leading-relaxed">
                  Bekerja membangun dan mengelola ekosistem digital untuk inisiatif pemantauan lingkungan dan kemitraan pulau Kalimantan di <span className="text-white font-medium">Borneo Globe</span>.
                </p>
              </div>
            </div>

            {/* Interactive Technical Evolution Trajectory */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-950/70 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-white/80 uppercase">
                    Technical Evolution Trajectory
                  </span>
                </div>

                {/* Milestone Year Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                  {milestones.map((m, idx) => (
                    <button
                      key={m.year}
                      onClick={() => setActiveMilestone(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeMilestone === idx
                          ? 'bg-white text-black shadow-md scale-105'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {m.year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Milestone Card Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.year}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-white">
                        {current.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border ${current.borderClass}`}>
                        {current.phase}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {current.desc}
                    </p>
                  </div>

                  <span 
                    className="shrink-0 self-start sm:self-center px-3 py-1.5 rounded-xl text-xs font-mono font-bold border shadow-md"
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

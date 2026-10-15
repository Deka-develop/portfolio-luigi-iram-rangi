import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

const Dayak3DCanvas = lazy(() => import('./Dayak3DCanvas'));

export default function Hero({ setActiveSection, onNavigateToProjects, onNavigateToMilestone }) {
  return (
    <section id="intro-hero" className="relative min-h-screen w-full flex flex-col justify-between pt-20 md:pt-24 pb-6 px-5 sm:px-8 md:px-14 bg-[#EDEEF0] text-[#111111] z-10">
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Radial Studio Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] bg-gradient-to-r from-[#684AFF]/8 via-[#D97706]/6 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Top Editorial Archival Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full flex items-center justify-between text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-[#111111]/50 border-b border-[#111111]/10 pb-3"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF] animate-pulse" />
          <span className="font-bold text-[#111111]">DDEV STUDIO // CULTURAL COMPUTING</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>0°01′S 109°20′E</span>
          <span className="text-[#111111]">PONTIANAK, KALBAR</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>TERBUKA UNTUK KOLABORASI PILIHAN</span>
        </div>
      </motion.div>

      {/* Center Stage: Spatial 3D WebGL Kinetic Sculpture & Monumental Typography */}
      <div className="relative z-10 w-full my-auto py-2 md:py-4 flex flex-col items-center justify-center">
        
        {/* Top Badges / Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-2.5"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] shadow-sm">
            <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
            Founder of Ddev • Dayak Developer
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-black/10 text-[#111111]/70 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF]" />
            Creative Dev &amp; WebGL 3D
          </span>
        </motion.div>

        {/* Monumental Hero Headline with Depth */}
        <div className="relative w-full text-center flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-[#111111] uppercase tracking-[-0.04em] leading-[0.88] select-none text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[100px] xl:text-[116px]"
          >
            <span>LUIGI </span>
            <span className="text-[#684AFF]">IRAM</span>
            <span className="text-[#111111]/20">.</span>
          </motion.h1>

          {/* 3D WebGL Kinetic Sculpture Viewport */}
          <div className="w-full max-w-[800px] h-[280px] sm:h-[320px] md:h-[380px] lg:h-[400px] relative -my-5 sm:-my-7 md:-my-9 z-20">
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                  <DayakShieldEmblem className="w-10 h-10 text-[#684AFF] animate-pulse mb-3" color="#684AFF" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#111111]/40">
                    Initializing WebGL 3D Engine...
                  </span>
                </div>
              }
            >
              <Dayak3DCanvas />
            </Suspense>
          </div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-[#111111] uppercase tracking-[-0.04em] leading-[0.88] select-none text-[10vw] sm:text-[8.5vw] md:text-[7vw] lg:text-[76px] xl:text-[88px] mt-1 sm:mt-2"
          >
            <span className="text-[#111111]/30">CULTURAL </span>
            <span className="text-[#111111]">COMPUTING</span>
          </motion.h2>
        </div>

        {/* Narrative & Action Callouts */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl text-center mt-3 md:mt-4 flex flex-col items-center gap-3.5"
        >
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#111111]/70 leading-relaxed max-w-lg font-normal">
            Merajut akar budaya <strong className="text-[#111111] font-semibold">Dayak &amp; Borneo</strong> dengan rekayasa web modern, visual 3D interaktif Three.js, serta ekosistem digital skala regional yang berkinerja tinggi.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onNavigateToProjects) {
                  onNavigateToProjects();
                } else {
                  setActiveSection?.(1);
                }
              }}
              className="px-5 py-2.5 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs font-bold uppercase tracking-[0.12em] hover:bg-[#684AFF] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
            >
              <span>Eksplorasi Karya Terpilih</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </button>

            <button
              onClick={() => {
                if (onNavigateToMilestone) {
                  onNavigateToMilestone();
                } else {
                  setActiveSection?.(1);
                }
              }}
              className="px-5 py-2.5 rounded-full bg-white text-[#111111] border border-black/10 font-sans text-xs font-bold uppercase tracking-[0.12em] hover:border-[#684AFF] hover:text-[#684AFF] transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
            >
              <span>Telusuri Milestone 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Animated Scroll Down Indicator for Introduction Story */}
          <button
            onClick={() => {
              const el = document.getElementById('intro-manifesto');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Gulir ke cerita perkenalan dan filosofi"
            className="mt-0.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-[#684AFF]/10 text-[#111111]/70 hover:text-[#684AFF] font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
          >
            <span>Eksplorasi Cerita &amp; Filosofi</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform animate-bounce" aria-hidden="true" />
          </button>
        </motion.div>

      </div>

      {/* Bottom Studio Info Bar */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between border-t border-[#111111]/10 pt-3 mt-4 gap-2 text-[10px] md:text-[11px] font-mono tracking-[0.16em] uppercase text-[#111111]/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>Status: Aktif Membangun Proyek Terpilih</span>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-[#111111]/60">
          <span>120+ Sistem Web</span>
          <span>•</span>
          <span>100/100 Core Vitals</span>
          <span>•</span>
          <span>WebGL Three.js R186</span>
        </div>

        <div className="flex items-center gap-2">
          <span>Ddev Studio</span>
          <span className="text-[#684AFF] font-bold">/</span>
          <span>Pontianak, Kalimantan Barat</span>
        </div>
      </div>

    </section>
  );
}

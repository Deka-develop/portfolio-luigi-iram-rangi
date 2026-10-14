import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

const Dayak3DCanvas = lazy(() => import('./Dayak3DCanvas'));

export default function Hero({ setActiveSection, onNavigateToProjects, onNavigateToMilestone }) {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-8 px-6 md:px-12 lg:px-20 bg-[#EDEEF0] text-[#111111] overflow-hidden">
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" />

      {/* Radial Studio Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] bg-gradient-to-r from-[#684AFF]/8 via-[#D97706]/6 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Top Editorial Archival Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full flex items-center justify-between text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase text-[#111111]/50 border-b border-[#111111]/10 pb-4"
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
      <div className="relative z-10 w-full my-auto py-4 md:py-8 flex flex-col items-center justify-center">
        
        {/* Top Badges / Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4"
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
            className="font-sans font-black text-[#111111] uppercase tracking-[-0.04em] leading-[0.88] select-none text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[120px] xl:text-[138px]"
          >
            <span>LUIGI </span>
            <span className="text-[#684AFF]">IRAM</span>
            <span className="text-[#111111]/20">.</span>
          </motion.h1>

          {/* 3D WebGL Kinetic Sculpture Viewport */}
          <div className="w-full max-w-[850px] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] relative -my-4 sm:-my-6 md:-my-8 z-20">
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
            className="font-sans font-black text-[#111111] uppercase tracking-[-0.04em] leading-[0.88] select-none text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[90px] xl:text-[105px] mt-2 sm:mt-4"
          >
            <span className="text-[#111111]/30">CULTURAL </span>
            <span className="text-[#111111]">COMPUTING</span>
          </motion.h2>
        </div>

        {/* Narrative & Action Callouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full max-w-2xl text-center mt-6 md:mt-8 flex flex-col items-center gap-6"
        >
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#111111]/60 leading-relaxed max-w-xl font-normal">
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
              className="px-6 py-3 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#684AFF] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2 group"
            >
              <span>Lihat Karya Terpilih</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                if (onNavigateToMilestone) {
                  onNavigateToMilestone();
                } else {
                  setActiveSection?.(1);
                }
              }}
              className="px-6 py-3 rounded-full bg-white text-[#111111] border border-black/10 font-sans text-xs font-bold uppercase tracking-[0.15em] hover:border-[#684AFF] hover:text-[#684AFF] transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Telusuri Milestone Rekayasa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Bottom Studio Info Bar */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between border-t border-[#111111]/10 pt-4 gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.18em] uppercase text-[#111111]/50">
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

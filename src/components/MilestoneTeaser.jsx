import { motion } from 'framer-motion';
import { ArrowUpRight, Box, Shield, Layers, Gauge, Cpu } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

const milestonePreviews = [
  {
    year: '2023',
    phase: '01 // High-Velocity',
    title: 'Zero-Bloat Web Systems',
    highlight: '120+ sistem web dengan skor mutlak 100/100 Core Vitals & LCP < 0.6s.',
    accent: '#684AFF',
    icon: Gauge,
    tags: ['100/100 Vitals', 'Sub-0.6s LCP', 'Clean Arch']
  },
  {
    year: '2024',
    phase: '02 // GPU Lab',
    title: 'Creative WebGL & Shaders',
    highlight: 'Riset rendering interaktif Three.js, custom GLSL, dan inersia lerp fisik.',
    accent: '#38bdf8',
    icon: Cpu,
    tags: ['Three.js', 'Custom GLSL', '120 FPS']
  },
  {
    year: '2025',
    phase: '03 // Global Reach',
    title: 'Regional Impact Ecosystem',
    highlight: 'Platform resmi borneoglobe.org untuk konservasi alam & riset internasional.',
    accent: '#10B981',
    icon: Layers,
    tags: ['Borneo Globe', '2.8k+ Users', 'Scale']
  },
  {
    year: '2026',
    phase: '04 // Spatial Craft',
    title: 'Cultural Computing Frontier',
    highlight: 'Founder Ddev: sintesis filosofi pusaka Dayak ke dalam arsitektur web spasial.',
    accent: '#D97706',
    icon: Shield,
    tags: ['Cultural Tech', 'Spatial Web', 'Founder']
  }
];

export default function MilestoneTeaser({ onNavigateToMilestone }) {
  return (
    <section id="milestone-preview" className="relative w-full bg-[#EDEEF0] text-[#111111] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-l from-[#684AFF]/8 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
                <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
                Arsip Rekam Jejak
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] text-[#684AFF] font-bold">
                Eksklusif Halaman 3D
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Pusaka Spasial &amp; Rekam Jejak<span className="text-[#684AFF]">.</span>
            </h2>
          </div>

          <p className="text-[#111111]/60 text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Bagian ini dirancang khusus dalam halaman tersendiri dengan rendering WebGL 3D interaktif pusaka Dayak, matriks benchmark performa, filosofi komputasi budaya, dan rekam jejak kronologis lengkap.
          </p>
        </div>

        {/* 4 Phase Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {milestonePreviews.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={onNavigateToMilestone}
                className="group p-6 md:p-7 rounded-[24px] bg-white border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-[0_20px_40px_-15px_rgba(104,74,255,0.15)] transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Accent top pill */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: m.accent }}
                  >
                    {m.year}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#111111]/5 flex items-center justify-center group-hover:bg-[#684AFF] group-hover:text-white transition-all">
                    <Icon className="w-4 h-4 text-[#111111]/70 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#111111]/40 block mb-1">
                    {m.phase}
                  </span>
                  <h3 className="text-xl md:text-[22px] font-bold text-[#111111] mb-2 leading-tight group-hover:text-[#684AFF] transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal mb-6">
                    {m.highlight}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#111111]/8">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider text-[#111111]/60 bg-[#111111]/[0.03]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#684AFF] font-bold group-hover:translate-x-1 transition-transform">
                  <span>Lihat di Pusaka Spasial</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Gateway Banner */}
        <div className="w-full p-8 md:p-12 rounded-[28px] md:rounded-[36px] bg-[#111111] text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
          {/* Subtle grid pattern in dark banner */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative z-10 flex flex-col gap-3 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                Interactive Spatial Experience
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono uppercase">
                4 Pusaka 3D WebGL
              </span>
            </div>
            
            <h3 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Kunjungi Halaman Khusus Pusaka Spasial
            </h3>

            <p className="text-white/60 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-normal">
              Rasakan pengalaman navigasi spasial mandiri dengan 4 model 3D pusaka digital Dayak interaktif (Bunga Terong Spasial, Cyber Mandau Blade, Rumah Betang Dayak, dan Sape' Pusaka Dayak), rekam jejak benchmark, serta arsitektur komputasi budaya Dayak.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onNavigateToMilestone}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#684AFF] text-white font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-white hover:text-[#111111] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Box className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Buka Halaman Pusaka Spasial</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

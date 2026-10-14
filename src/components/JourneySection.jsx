import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Sparkles, Layers, Terminal, Globe, Shield, Code2 } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';
import { WireframeMatrix3D, TorusKnot3D, CelestialGlobe3D, SacredShield3D } from './Dayak3DCanvas';

const milestones = [
  {
    id: 'milestone-2023',
    year: '2023',
    title: 'Zero-Bloat Web Systems',
    subtitle: 'High-Velocity Code & Performance Benchmarks',
    description:
      'Fondasi rekayasa sistem web tanpa beban bloatware. Merancang lebih dari 120 sistem web produksi dengan target absolut 100/100 Google PageSpeed, valid schema SEO, dan LCP di bawah 0.6 detik.',
    badges: ['120+ Web Systems', '100/100 Core Vitals', 'Sub-0.6s LCP Speed', 'Valid Schema SEO'],
    ThreeComponent: WireframeMatrix3D,
    accent: '#684AFF'
  },
  {
    id: 'milestone-2024',
    year: '2024',
    title: 'Creative WebGL & Shaders',
    subtitle: 'Ddev Studio Lab & GPU Computing',
    description:
      'Eksplorasi mendalam grafika komputasi interaktif Three.js dan custom GLSL shaders. Mengintegrasikan fisika inersia lerp yang halus, material optik dinamis, dan perpaduan ornamen Dayak dengan estetika digital cyber.',
    badges: ['Three.js 3D Geometries', 'Custom GLSL Shaders', '120 FPS WebGL', 'Kinetic Lerp Physics'],
    ThreeComponent: TorusKnot3D,
    accent: '#38bdf8'
  },
  {
    id: 'milestone-2025',
    year: '2025',
    title: 'Regional Impact Ecosystem',
    subtitle: 'Borneo Globe Active Hub (borneoglobe.org)',
    description:
      'Memimpin rekayasa platform resmi Borneo Globe. Menghubungkan inisiatif konservasi hutan hujan tropis Borneo, riset ilmiah, dan pemberdayaan komunitas lokal dengan jaringan mitra global berkelanjutan.',
    badges: ['borneoglobe.org Platform', '2,800+ Penerima Manfaat', 'Global Research Partners', '100% Mobile Ready'],
    ThreeComponent: CelestialGlobe3D,
    accent: '#10B981'
  },
  {
    id: 'milestone-2026',
    year: '2026 - Present',
    title: 'Cultural Computing Frontier',
    subtitle: 'Founder of Ddev • High-End Spatial Craft',
    description:
      'Mendefinisikan paradigma Cultural Computing: menyatukan filosofi pusaka Dayak Kalimantan dengan arsitektur web modern tingkat lanjut, interaksi spasial 3D, dan standar rekayasa digital tanpa kompromi.',
    badges: ['Ddev Founder', 'Spatial Web Experience', 'Next-Gen Cultural Tech', 'High-End Craft'],
    ThreeComponent: SacredShield3D,
    accent: '#D97706'
  }
];

const timelineRecap = [
  {
    num: '01',
    year: '2026',
    title: 'Cultural Computing Architecture',
    subtitle: 'Membawa warisan budaya Dayak ke masa depan web interaktif spasial 3D.',
    tags: ['Cultural Tech', 'Spatial Web', 'Three.js']
  },
  {
    num: '02',
    year: '2025',
    title: 'Regional Scale & Borneo Globe',
    subtitle: 'Menghubungkan inisiatif lokal Borneo ke skala internasional melalui platform tangguh.',
    tags: ['Borneo Globe', 'Platform', 'Global Reach']
  },
  {
    num: '03',
    year: '2024',
    title: 'WebGL & Shader Laboratory',
    subtitle: 'Menguasai rendering 3D di browser dengan Three.js, WebGL, dan custom GLSL.',
    tags: ['WebGL', 'GLSL', 'Kinetic 3D']
  },
  {
    num: '04',
    year: '2023',
    title: 'Zero-Bloat Code Architecture',
    subtitle: 'Membangun 120+ sistem web dengan skor performa PageSpeed 100/100.',
    tags: ['Clean Code', 'Performance', '100/100 Vitals']
  }
];

export default function JourneySection() {
  const [activeRecap, setActiveRecap] = useState(null);

  return (
    <section className="relative w-full bg-[#EDEEF0] text-[#111111] overflow-hidden">
      
      {/* ───────────────── 1. JOURNEY HEADER BANNER ───────────────── */}
      <div className="relative w-full pt-28 md:pt-36 pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-b border-[#111111]/10">
        
        {/* Archival metadata line */}
        <div className="flex items-center justify-between mb-8 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#111111]/50">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
            <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
            Milestone &amp; Evolusi Rekayasa
          </div>
          <span>Ddev Studio • West Borneo</span>
        </div>

        {/* Cohesive Headline & Narrative */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Rekam Jejak &amp; Dedikasi Digital<span className="text-[#684AFF]">.</span>
            </h2>
          </div>
          <p className="text-[#111111]/60 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed font-normal">
            Arsip kronologis evolusi teknologi dari fondasi performa web ultra-cepat, eksplorasi WebGL 3D interaktif, hingga rekayasa ekosistem komputasi berakar budaya Kalimantan.
          </p>
        </div>
      </div>

      {/* ───────────────── 2. MILESTONE 3D STACKING CARD DECK ───────────────── */}
      <div className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 md:mb-20">
          <div>
            <h3 className="text-[#111111] text-3xl md:text-4xl font-bold tracking-tight">
              Fase Inovasi Rekayasa<span className="text-[#684AFF]">.</span>
            </h3>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#111111]/40 block mt-1">
              Arsip Interaktif Tiga Dimensi WebGL
            </span>
          </div>
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#111111]/50">
            {milestones.length} Fase Milestone
          </span>
        </div>

        {/* Stacking Card Deck Container */}
        <div className="relative w-full flex flex-col gap-10 md:gap-14">
          {milestones.map((era, index) => {
            const Era3D = era.ThreeComponent;
            return (
              <motion.div
                key={era.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ top: `${90 + index * 18}px` }}
                className="sticky rounded-[28px] md:rounded-[36px] bg-white border border-[#111111]/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_25px_70px_-10px_rgba(104,74,255,0.12)]"
              >
                <div className="flex flex-col lg:flex-row items-stretch min-h-[460px] md:min-h-[500px]">
                  
                  {/* Left: Interactive 3D WebGL Canvas Stage */}
                  <div className="w-full lg:w-1/2 min-h-[300px] sm:min-h-[360px] lg:min-h-full bg-[#111111] relative flex flex-col items-center justify-center p-6 overflow-hidden">
                    {/* Subtle grid pattern */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }}
                    />

                    {/* Live Three.js WebGL Artifact */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                      <Era3D />
                    </div>

                    {/* Badge Cue */}
                    <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: era.accent }} />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                        Interactive Three.js Artifact
                      </span>
                    </div>

                    <div className="absolute top-4 right-6 z-20">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        {era.year}
                      </span>
                    </div>
                  </div>

                  {/* Right: Editorial Narrative & Milestones */}
                  <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-[#FCFCFC]">
                    <div>
                      {/* Year pill badge */}
                      <span className="inline-block px-3.5 py-1 bg-[#111111]/5 rounded-full font-mono text-[10px] md:text-xs text-[#111111] tracking-widest uppercase mb-6 border border-[#111111]/10">
                        {era.year}
                      </span>

                      {/* Headline */}
                      <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#111111] mb-2 tracking-tight leading-[1.05]">
                        {era.title}
                      </h4>
                      <p className="font-mono text-xs uppercase tracking-wider text-[#684AFF] font-semibold mb-6">
                        {era.subtitle}
                      </p>

                      {/* Narrative */}
                      <p className="text-sm md:text-base text-[#111111]/60 leading-relaxed font-normal mb-8">
                        {era.description}
                      </p>
                    </div>

                    {/* Tech & Achievement Badges */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#111111]/8">
                      {era.badges.map((b) => (
                        <span
                          key={b}
                          className="px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-[#111111]/70 bg-[#111111]/[0.03] border border-[#111111]/8 hover:border-[#684AFF]/30 transition-colors"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ───────────────── 3. STATS & METRICS ───────────────── */}
      <div className="w-full bg-[#111111] py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { num: '05+', label: 'Years', desc: 'of Experience' },
            { num: '120+', label: 'Web Systems', desc: 'Engineered & Deployed' },
            { num: '100%', label: 'PageSpeed', desc: 'Core Vitals Benchmark' },
            { num: '∞', label: 'Creative', desc: 'Ambition & Craft' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 md:p-8 rounded-[20px] md:rounded-[24px] bg-[#1A1A1A] border border-white/5 hover:border-[#684AFF]/40 transition-all duration-500 cursor-default"
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white mb-2 group-hover:text-[#684AFF] transition-colors duration-500">
                {stat.num}
              </span>
              <span className="block text-sm md:text-base font-medium text-white/80 tracking-tight">
                {stat.label}
              </span>
              <span className="block text-[11px] md:text-xs text-white/40 font-mono tracking-wide mt-1">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ───────────────── 4. PHILOSOPHY & CAPABILITIES ───────────────── */}
      <div className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          <div className="w-full lg:w-5/12">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#111111]/40 block mb-4">
              Filosofi Rekayasa
            </span>
            <h3 className="text-[#111111] text-3xl md:text-4xl lg:text-[48px] font-bold leading-[1.1] tracking-[-0.03em]">
              Dedikasi pada presisi kode, performa, dan akar <span className="text-[#684AFF]">budaya</span>.
            </h3>
            
            <div className="mt-8 p-6 md:p-8 rounded-[20px] bg-white border border-[#111111]/10 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-12 bg-[#684AFF] rounded-full shrink-0 mt-1" />
                <div>
                  <p className="text-[#111111] text-base md:text-lg leading-relaxed font-medium italic">
                    “Desain dan kode yang baik bukan hanya tentang estetika visual semata — tetapi tentang bagaimana teknologi mampu menghidupkan makna dan memberdayakan manusia.”
                  </p>
                  <span className="block mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#111111]/40">
                    Luigi Iram Rangi — Founder of Ddev
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#111111] font-bold">
                  // Akar &amp; Filosofi
                </h4>
                <p className="text-[#111111]/55 text-sm md:text-[15px] leading-relaxed">
                  Perjalanan saya berawal dari Pontianak, Kalimantan Barat. Mengagumi ketelitian motif perisai Dayak dan filosofi keseimbangan alam Borneo yang saya transformasikan ke dalam arsitektur digital.
                </p>
                <p className="text-[#111111]/55 text-sm md:text-[15px] leading-relaxed">
                  Dari baris kode awal hingga mengarsiteki sistem web skala regional dan platform konservasi global seperti Borneo Globe.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#111111] font-bold">
                  // Kemampuan Inti
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Three.js & WebGL 3D',
                    'GLSL Shaders',
                    'Fullstack Architecture',
                    'Core Web Vitals CRO',
                    'Cultural Computing',
                    'E-Commerce Engines',
                    'Interactive UX Design',
                    'Performance Auditing'
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-medium text-[#111111]/70 bg-white border border-[#111111]/10 hover:border-[#684AFF] hover:text-[#684AFF] transition-all cursor-default"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#111111]/10 mt-12 mb-6" />

            <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#111111]/40">
              <span>Pontianak, Kalimantan Barat</span>
              <span>Available for Selective Commissions</span>
            </div>
          </div>

        </div>
      </div>

      {/* ───────────────── 5. YEARLY RECAP / TIMELINE CHAPTERS ───────────────── */}
      <div className="relative w-full pt-8 pb-24 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-[#111111]/10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#111111]/40 block mb-2">
              Jejak Waktu
            </span>
            <h3 className="text-[#111111] text-3xl md:text-5xl font-bold leading-tight tracking-[-0.03em]">
              Kronologi Milestone<span className="text-[#684AFF]">.</span>
            </h3>
          </div>
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#111111]/40">
            {timelineRecap.length} Rekam Jejak
          </span>
        </div>

        {/* Chapters List */}
        <div className="flex flex-col w-full">
          {timelineRecap.map((item, idx) => {
            const isOpen = activeRecap === idx;
            return (
              <div
                key={item.num}
                onMouseEnter={() => setActiveRecap(idx)}
                className="group relative border-t border-[#111111]/10 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 py-7 md:py-9 cursor-pointer">
                  {/* Left Number & Year */}
                  <div className="flex items-center gap-4 md:gap-6 md:w-[220px] shrink-0">
                    <span className="font-mono text-[10px] text-[#111111]/30 tracking-widest w-5">
                      {item.num}
                    </span>
                    <span className="font-mono text-[11px] md:text-xs tracking-[0.2em] text-[#111111]/40 group-hover:text-[#684AFF] transition-colors duration-500 uppercase font-bold">
                      {item.year}
                    </span>
                    {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF] animate-pulse" />}
                  </div>

                  {/* Center Title */}
                  <div className="flex-1 md:pl-4">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[54px] font-bold tracking-[-0.03em] text-[#111111]/25 group-hover:text-[#111111] transition-all duration-500 ease-out leading-[1.05]">
                      {item.title}
                    </h4>
                  </div>

                  {/* Right Arrow Action */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#111111]/10 opacity-0 group-hover:opacity-100 group-hover:border-[#684AFF]/40 transition-all duration-500 shrink-0 ml-4">
                    <ArrowUpRight className="w-4 h-4 text-[#111111]/50 group-hover:text-[#684AFF] transition-colors" />
                  </div>
                </div>

                {/* Expanding Drawer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isOpen ? 'max-h-[200px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="md:pl-[220px] flex flex-col md:flex-row gap-4 md:gap-8 md:items-center">
                    <p className="text-[#111111]/55 text-sm md:text-[15px] leading-relaxed max-w-lg">
                      {item.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 bg-[#111111]/[0.04] border border-[#111111]/8"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}

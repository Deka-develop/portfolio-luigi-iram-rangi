import { ArrowUpRight, Gauge, Cpu, Gamepad2 } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

export default function SkillsTeaser({ onNavigateToSkills }) {
  return (
    <section className="relative w-full bg-[#EDEEF0] text-[#111111] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
                <DayakShieldEmblem className="w-3.5 h-3.5 text-[#10B981]" color="#10B981" />
                Standar Rekayasa
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] text-[#10B981] font-bold">
                Halaman Khusus
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Kapabilitas &amp; Tolok Ukur Kinerja<span className="text-[#684AFF]">.</span>
            </h2>
          </div>

          <p className="text-[#111111]/60 text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Arsitektur web tanpa beban bloatware: LCP sub-0.6 detik, skor 100/100 Core Web Vitals, grafika WebGL 3D 120 FPS, dan mini game interaktif Cyber Arcade.
          </p>
        </div>

        {/* 3 Pillar Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <button
            type="button"
            aria-label="Buka detail kapabilitas 100/100 Core Vitals"
            onClick={onNavigateToSkills}
            className="p-8 text-left rounded-[24px] bg-white border border-[#111111]/10 hover:border-[#10B981]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:outline-none"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#10B981] font-bold">
                  01 // High-Velocity
                </span>
                <Gauge className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#10B981] transition-colors mb-2">
                100 / 100 Core Vitals
              </h3>
              <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                LCP di bawah 0.6 detik, valid schema SEO LD, dan zero-bloatware untuk 120+ sistem web produksi.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#10B981] font-bold mt-6 group-hover:translate-x-1 transition-transform">
              <span>Buka Detail Kapabilitas</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </button>

          <button
            type="button"
            aria-label="Buka simulator 120 FPS Cyber Arcade"
            onClick={onNavigateToSkills}
            className="p-8 text-left rounded-[24px] bg-white border border-[#111111]/10 hover:border-[#684AFF]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#684AFF] font-bold">
                  02 // WebGL &amp; Arcade
                </span>
                <Gamepad2 className="w-5 h-5 text-[#684AFF]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                120 FPS Cyber Arcade
              </h3>
              <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                Three.js R186, custom GLSL shader hardware GPU, dan game arcade interaktif playable di browser.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#684AFF] font-bold mt-6 group-hover:translate-x-1 transition-transform">
              <span>Mainkan Game Arcade</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </button>

          <button
            type="button"
            aria-label="Buka detail spesifikasi produksi Borneo Digital Hub"
            onClick={onNavigateToSkills}
            className="p-8 text-left rounded-[24px] bg-white border border-[#111111]/10 hover:border-[#D97706]/50 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px] focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:outline-none"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D97706] font-bold">
                  03 // Production Scale
                </span>
                <Cpu className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#D97706] transition-colors mb-2">
                Borneo Digital Hub
              </h3>
              <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                React 19, TypeScript, sistem token desain custom, dan ketahanan jaringan di pelosok Kalimantan.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#D97706] font-bold mt-6 group-hover:translate-x-1 transition-transform">
              <span>Lihat Spesifikasi Lengkap</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </button>
        </div>

        {/* Action Button Banner */}
        <div className="w-full flex items-center justify-center">
          <button
            onClick={onNavigateToSkills}
            className="px-8 py-4 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#684AFF] transition-all duration-300 shadow-md hover:scale-105 cursor-pointer flex items-center gap-2 group"
          >
            <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Buka Halaman Khusus Kapabilitas &amp; Arcade</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

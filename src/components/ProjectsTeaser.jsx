import { ArrowUpRight, Layers } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

import borneoGlobeImg from '../assets/projects/borneo-globe.webp';
import anyarmartImg from '../assets/projects/anyarmart.webp';
import bukuDayakImg from '../assets/projects/buku-dayak.webp';

const featuredProjects = [
  {
    num: '01',
    title: 'Borneo Globe',
    category: 'Digital Impact Platform',
    highlight: 'Platform resmi borneoglobe.org dengan visi global untuk konservasi alam Borneo.',
    status: 'CURRENTLY ENGAGED',
    year: '2025 - Present',
    image: borneoGlobeImg,
    accent: '#38bdf8'
  },
  {
    num: '02',
    title: 'Anyarmart',
    category: 'E-Commerce Platform',
    highlight: 'Marketplace karya khas Nusantara, buku adat, dan kerajinan tangan lokal.',
    status: 'PRODUCTION LIVE',
    year: '2025 - Present',
    image: anyarmartImg,
    accent: '#00f0ff'
  },
  {
    num: '03',
    title: 'Penerbit Buku Dayak',
    category: 'Cultural Publishing Engine',
    highlight: 'Sistem web arsip literatur dan penerbitan warisan kultural suku Dayak.',
    status: 'PRODUCTION LIVE',
    year: '2024 - Present',
    image: bukuDayakImg,
    accent: '#10B981'
  }
];

export default function ProjectsTeaser({ onNavigateToProjects }) {
  return (
    <section className="relative w-full bg-[#EDEEF0] text-[#111111] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header metadata */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
                <DayakShieldEmblem className="w-3.5 h-3.5 text-[#684AFF]" color="#684AFF" />
                Portofolio Produksi
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#111111]/10 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] text-[#684AFF] font-bold">
                Halaman Khusus
              </span>
            </div>

            <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Portfolio &amp; Ekosistem Digital<span className="text-[#684AFF]">.</span>
            </h2>
          </div>

          <p className="text-[#111111]/60 text-sm md:text-base max-w-lg leading-relaxed font-normal">
            Katalog sistem web produksi skala regional &amp; internasional. Menampilkan 9 proyek lengkap dengan filter kategori, metrik, dan studi kasus pada halaman khusus.
          </p>
        </div>

        {/* 3 Featured Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featuredProjects.map((p) => (
            <button
              key={p.num}
              type="button"
              aria-label={`Buka studi kasus proyek ${p.title}`}
              onClick={onNavigateToProjects}
              className="p-6 md:p-7 text-left rounded-[26px] bg-white border border-[#111111]/10 hover:border-[#684AFF]/40 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between overflow-hidden focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none"
            >
              <div>
                <div className="w-full h-48 rounded-[18px] overflow-hidden mb-5 bg-[#111111]/5 relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] font-mono uppercase tracking-wider text-white">
                    {p.status}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#684AFF] font-bold">
                    {p.num} // {p.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-[#684AFF] transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-[#111111]/60 leading-relaxed font-normal">
                  {p.highlight}
                </p>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#684AFF] font-bold mt-6 group-hover:translate-x-1 transition-transform pt-4 border-t border-[#111111]/8">
                <span>Lihat Studi Kasus</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>

        {/* Action Button Banner */}
        <div className="w-full flex items-center justify-center">
          <button
            onClick={onNavigateToProjects}
            className="px-8 py-4 rounded-full bg-[#111111] text-[#EDEEF0] font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#684AFF] transition-all duration-300 shadow-md hover:scale-105 cursor-pointer flex items-center gap-2 group"
          >
            <Layers className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Buka Halaman Khusus Portfolio (9 Proyek Lengkap)</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}

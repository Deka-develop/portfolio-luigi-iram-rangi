import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Send, Mail, MessageSquare } from 'lucide-react';
import { DayakShieldEmblem } from './DayakMotifs';

export default function Contact() {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', contact: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Live WIB Pontianak Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options = {
          timeZone: 'Asia/Pontianak',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        setTimeStr(new Intl.DateTimeFormat('id-ID', options).format(now));
      } catch {
        setTimeStr('01:00:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iramrangi@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/iramrangi@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          contact: formState.contact || 'N/A',
          message: formState.message,
          _subject: `[Portfolio Inquiry] ${formState.name}`
        })
      });
      setIsSent(true);
    } catch {
      // Fallback mailto
      window.open(
        `mailto:iramrangi@gmail.com?subject=Inquiry from ${formState.name}&body=${encodeURIComponent(
          formState.message
        )}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#EDEEF0] text-[#111111] px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-16 md:pb-24 select-none">
      
      {/* Metadata Bar */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between mb-8 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-[#111111]/50 border-b border-[#111111]/10 pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-[#EDEEF0] text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em]">
          <DayakShieldEmblem className="w-3.5 h-3.5 text-[#D97706]" color="#D97706" />
          Inisiasi Proyek &amp; Kolaborasi
        </div>
        <span>Terbuka Untuk Penugasan Terpilih</span>
      </div>

      <div className="max-w-[1400px] mx-auto">
        
        {/* Bespoke Headline & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
          <div>
            <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#111111] tracking-[-0.03em] leading-[1.05]">
              Mari Wujudkan Solusi Digital Anda<span className="text-[#684AFF]">.</span>
            </h2>
            <p className="text-[#111111]/60 text-sm md:text-base max-w-xl leading-relaxed mt-4">
              Siap berdiskusi mengenai perancangan arsitektur sistem web baru, platform regional, optimasi performa berkecepatan tinggi, atau visual 3D interaktif.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-md">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#111111]/40 block mb-2">
                Kolaborasi &amp; Konsultasi
              </span>
              <p className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight leading-snug">
                Arsitektur Web / Platform Berkelanjutan / Eksplorasi 3D
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="mailto:iramrangi@gmail.com"
                className="px-8 py-4 rounded-full bg-[#111111] text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#684AFF] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105"
              >
                <span>Mulai Diskusi via Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-5 py-4 rounded-full bg-white border border-[#111111]/10 font-mono text-xs uppercase tracking-wider text-[#111111] hover:border-[#684AFF] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4 text-[#111111]/60" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Direct Message Box */}
        <div className="rounded-[28px] md:rounded-[36px] bg-white border border-[#111111]/10 p-8 md:p-12 shadow-lg mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#111111]/8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-1">
                Kirim Pesan Cepat Langsung
              </h3>
              <p className="text-sm text-[#111111]/50">
                Respon dijamin dalam 1x24 jam untuk proyek baru atau kolaborasi.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#111111]/60">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>PTK {timeStr} WIB</span>
            </div>
          </div>

          {isSent ? (
            <div className="p-8 rounded-[20px] bg-[#10B981]/10 border border-[#10B981]/20 text-center flex flex-col items-center gap-3">
              <span className="text-2xl">✨</span>
              <h4 className="text-xl font-bold text-[#0D5C3A]">Pesan Terkirim Berhasil!</h4>
              <p className="text-sm text-[#0D5C3A]/80 max-w-md">
                Terima kasih telah menghubungi Luigi Iram Rangi. Saya akan segera merespon via email Anda secepatnya.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-2 px-5 py-2 rounded-full bg-[#0D5C3A] text-white font-mono text-xs uppercase tracking-wider"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#111111]/60">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Alex Pradipta"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-[14px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#111111]/60">
                  Email atau WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: alex@company.com / 0812..."
                  value={formState.contact}
                  onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-[14px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white transition-all"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#111111]/60">
                  Detail Proyek atau Pertanyaan *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan gambaran proyek web, target peluncuran, atau ide kolaborasi..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-[14px] bg-[#EDEEF0]/60 border border-[#111111]/10 text-sm font-sans text-[#111111] focus:outline-none focus:border-[#684AFF] focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-full bg-[#111111] text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#684AFF] transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Channels & Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { label: 'Direct Email', val: 'iramrangi@gmail.com', href: 'mailto:iramrangi@gmail.com' },
            { label: 'Instagram DM', val: '@iramrangi_dev', href: 'https://www.instagram.com/iramrangi_dev/' },
            { label: 'Live Platform', val: 'borneoglobe.org', href: 'https://www.borneoglobe.org/' }
          ].map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-[20px] bg-white border border-[#111111]/10 hover:border-[#684AFF] transition-all duration-300 flex items-center justify-between group shadow-sm"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#111111]/40 block mb-1">
                  {ch.label}
                </span>
                <span className="font-sans font-bold text-sm text-[#111111] group-hover:text-[#684AFF] transition-colors">
                  {ch.val}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#111111]/40 group-hover:text-[#684AFF] transition-transform group-hover:rotate-45" />
            </a>
          ))}
        </div>

        {/* Bottom Colophon Footer */}
        <div className="pt-8 border-t border-[#111111]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] text-[#111111]/40">
          <div className="flex items-center gap-2">
            <DayakShieldEmblem className="w-4 h-4 text-[#D97706]" color="#D97706" />
            <span>LUIGI IRAM RANGI • FOUNDER OF DDEV</span>
          </div>

          <div className="flex items-center gap-4">
            <span>0°01′S 109°20′E</span>
            <span>•</span>
            <span>PONTIANAK, KALBAR</span>
            <span>•</span>
            <span>EDISI 2026</span>
          </div>

          <span>BUILT WITH REACT 19 &amp; THREE.JS</span>
        </div>

      </div>

    </section>
  );
}

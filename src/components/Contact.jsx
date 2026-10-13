import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check, MapPin, Globe, ExternalLink, Send, Sparkles, MessageSquare, Terminal, CheckCircle2 } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export default function Contact() {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'ecosystem'
  
  // Quick form state
  const [formState, setFormState] = useState({ name: '', contact: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  // Live WIB / UTC+7 West Kalimantan Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      try {
        setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
      } catch (e) {
        setTimeStr(now.toTimeString().split(' ')[0]);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('iramrangi@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    
    // Construct pre-filled email transmission
    const subject = encodeURIComponent(`Project Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Halo Luigi,\n\nSaya: ${formState.name}\nKontak: ${formState.contact || 'N/A'}\n\nPesan Proyek:\n${formState.message}\n\n--\nDikirim via Portfolio Terminal`
    );
    
    window.open(`mailto:iramrangi@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setIsSent(true);
  };

  return (
    <section className="w-full h-full min-h-screen bg-transparent flex flex-col justify-between pt-20 md:pt-24 pb-6 relative overflow-hidden select-none">
      
      {/* Background Subtle Watermark & Atmospheric Glows */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 text-[18vw] font-display font-black text-white/[0.015] pointer-events-none select-none leading-none z-0 whitespace-nowrap">
        CONNECT
      </div>
      <div className="absolute -left-20 top-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10 flex-1 flex flex-col justify-center gap-6 my-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/80 text-[11px] font-mono font-semibold tracking-widest uppercase">
                04 / Get In Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase tracking-tight leading-none">
              LET'S WORK <span className="text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text">TOGETHER.</span>
            </h2>
          </div>

          {/* Live Telemetry Pill */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs font-mono text-white/75 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div className="flex items-center gap-2">
              <span className="text-white/70">PONTIANAK:</span>
              <span className="text-emerald-300 font-bold tracking-wider">{timeStr || '23:45:00'} WIB</span>
            </div>
            <span className="text-white/20">|</span>
            <span className="text-cyan-300 hidden sm:inline-block">AVAILABLE FOR COLLABORATION</span>
          </div>
        </div>

        {/* Clean 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Kolom Kiri: Kontak Langsung (Email, Instagram, Platform) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-neutral-950/70 border border-white/10 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-white/20 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest">
                  Direct Channels
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  Respon Cepat &lt; 24 Jam
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-1.5">
                Saluran Komunikasi Langsung
              </h3>
              <p className="text-xs text-white/75 font-light mb-4 leading-relaxed">
                Punya ide proyek, kebutuhan template khusus, atau kerja sama arsitektur web modern? Silakan hubungi langsung:
              </p>

              {/* 1. Primary Email Address Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/30 hover:border-cyan-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 transition-all group/mail shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-cyan-400 group-hover/mail:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block font-semibold tracking-wider">SALURAN UTAMA • EMAIL RESMI</span>
                    <span className="text-xs sm:text-sm font-mono text-white font-medium">
                      iramrangi@gmail.com
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Salin alamat email"
                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white/80 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                    title="Salin alamat email"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 text-[11px]">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-white/80" />
                        <span className="text-[11px]">Salin</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:iramrangi@gmail.com"
                    aria-label="Kirim email ke Luigi Iram Rangi"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Kirim</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 2. Instagram Direct Message Card */}
              <a
                href="https://www.instagram.com/iramrangi_dev/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kirim Direct Message ke Instagram @iramrangi_dev"
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/20 hover:border-pink-400/50 flex items-center justify-between transition-all group/ig mb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center shrink-0">
                    <InstagramIcon className="w-4 h-4 text-pink-400 group-hover/ig:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 block font-semibold">INSTAGRAM DIRECT MESSAGE</span>
                    <span className="text-xs font-mono text-pink-100 group-hover/ig:text-white font-medium">
                      @iramrangi_dev
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-pink-400">
                  <span className="hidden sm:inline">DM</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/ig:translate-x-0.5 group-hover/ig:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* 3. Borneo Globe Live Platform Card */}
              <a
                href="https://www.borneoglobe.org/"
                target="_blank"
                rel="noreferrer"
                aria-label="Kunjungi platform resmi Borneo Globe"
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-400/50 flex items-center justify-between transition-all group/bg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-emerald-400 group-hover/bg:scale-110 transition-transform" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block font-semibold">LIVE ACTIVE PLATFORM</span>
                    <span className="text-xs font-mono text-emerald-100 group-hover/bg:text-white font-medium">
                      borneoglobe.org
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
                  <span className="hidden sm:inline">Visit</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/bg:translate-x-0.5 group-hover/bg:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
              <span>Status: Terbuka untuk Kolaborasi</span>
              <span className="text-cyan-400">Ddev Studio</span>
            </div>
          </motion.div>

          {/* Kolom Kanan: Tab Switcher (Form Pesan Cepat vs Ekosistem & Peran) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl bg-neutral-950/70 border border-white/10 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:border-white/20 transition-all select-text"
          >
            <div>
              {/* Tab Header Switcher */}
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2.5 select-none">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                  <button
                    onClick={() => setActiveTab('message')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'message'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>Quick Transmission</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ecosystem')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeTab === 'ecosystem'
                        ? 'bg-white/15 text-white font-bold border border-white/20'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Ecosystem & Roles</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 hidden sm:inline-block">
                  ● RELAY ACTIVE
                </span>
              </div>

              {/* Tab 1: Quick Cyber Message Terminal Form */}
              {activeTab === 'message' && (
                <div>
                  {isSent ? (
                    <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-base font-display font-bold text-white">
                        Transmisi Terbuka!
                      </h4>
                      <p className="text-xs text-white/70 font-mono">
                        Pesan Anda siap dikirimkan langsung ke <span className="text-cyan-300 font-bold">iramrangi@gmail.com</span>.
                      </p>
                      <button
                        onClick={() => {
                          setIsSent(false);
                          setFormState({ name: '', contact: '', message: '' });
                        }}
                        className="mt-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                      >
                        Kirim Pesan Lain
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label htmlFor="contact-name" className="text-[11px] font-mono text-white/80 font-medium block mb-1 uppercase tracking-wider">
                            Nama / Brand
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            aria-label="Nama atau nama brand Anda"
                            placeholder="Contoh: Alex Pratama"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 focus:border-cyan-400 focus:outline-none text-xs font-mono text-white placeholder-white/40 transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-channel" className="text-[11px] font-mono text-white/80 font-medium block mb-1 uppercase tracking-wider">
                            Email / Kontak Anda
                          </label>
                          <input
                            id="contact-channel"
                            type="text"
                            aria-label="Email atau kontak alternatif Anda"
                            placeholder="alex@domain.com / @alex"
                            value={formState.contact}
                            onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 focus:border-cyan-400 focus:outline-none text-xs font-mono text-white placeholder-white/40 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-message" className="text-[11px] font-mono text-white/80 font-medium block mb-1 uppercase tracking-wider">
                          Kebutuhan Proyek / Pesan
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={3}
                          aria-label="Deskripsi kebutuhan proyek atau pesan Anda"
                          placeholder="Ceritakan gambaran proyek web, kebutuhan template kustom, atau perkiraan timeline..."
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 focus:border-cyan-400 focus:outline-none text-xs font-mono text-white placeholder-white/40 resize-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-black font-mono font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.01] cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Kirim Transmisi Pesan 🚀</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Tab 2: Ecosystem & Roles Block */}
              {activeTab === 'ecosystem' && (
                <div className="flex flex-col gap-3">
                  {/* Borneo Globe Block */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono font-bold text-emerald-300">
                          BORNEO GLOBE
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Active Role
                      </span>
                    </div>

                    <p className="text-xs text-white/75 font-light leading-relaxed mb-2">
                      Platform digital resmi pemantauan lingkungan regional dan inisiatif berkelanjutan Borneo.
                    </p>

                    <a
                      href="https://www.borneoglobe.org/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Kunjungi situs Borneo Globe"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 hover:text-white text-xs font-mono transition-colors"
                    >
                      <Globe className="w-3 h-3" />
                      <span>borneoglobe.org ↗</span>
                    </a>
                  </div>

                  {/* Ddev Studio Block */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        DDEV (DAYAK DEVELOPER)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        Founder
                      </span>
                    </div>
                    <p className="text-xs text-white/75 font-light leading-relaxed">
                      Studio template Blogger berkecepatan tinggi, 3D WebGL, dan arsitektur web modern Pontianak.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70 select-none">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pontianak, Kalimantan Barat</span>
              </div>
              <span className="text-emerald-400 font-semibold">Online</span>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Footer Bar */}
      <footer className="max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 text-white/70 text-[11px] font-mono uppercase tracking-widest gap-3 relative z-10">
        <div className="flex items-center gap-5">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Kunjungi akun GitHub" className="hover:text-cyan-300 transition-colors">GitHub</a>
          <a 
            href="https://www.instagram.com/iramrangi_dev/" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="Kunjungi akun Instagram @iramrangi_dev"
            className="hover:text-pink-300 transition-colors"
          >
            Instagram
          </a>
          <a href="https://www.borneoglobe.org/" target="_blank" rel="noreferrer" aria-label="Kunjungi situs Borneo Globe" className="hover:text-emerald-300 transition-colors">
            Borneo Globe
          </a>
          <span className="text-white/20 hidden sm:inline-block">•</span>
          <span className="text-cyan-400 hidden sm:inline-block">Ddev Studio</span>
        </div>

        <div>
          © {new Date().getFullYear()} LUIGI IRAM RANGI • DAYAK DEVELOPER
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>BORNEO, INDONESIA</span>
        </div>
      </footer>

    </section>
  );
}

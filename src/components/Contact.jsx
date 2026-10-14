import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, CheckCircle2 } from 'lucide-react';

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
};

const channels = [
  {
    label: 'Email',
    value: 'iramrangi@gmail.com',
    href: 'mailto:iramrangi@gmail.com',
    external: false,
    cta: 'Kirim'
  },
  {
    label: 'Instagram DM',
    value: '@iramrangi_dev',
    href: 'https://www.instagram.com/iramrangi_dev/',
    external: true,
    cta: 'DM'
  },
  {
    label: 'Live Platform',
    value: 'borneoglobe.org',
    href: 'https://www.borneoglobe.org/',
    external: true,
    cta: 'Visit'
  }
];

const inputClass =
  'w-full bg-transparent border-0 border-b-2 border-ink px-0 py-3 text-base font-sans text-ink placeholder-ink/35 focus:outline-none focus:border-violet transition-colors rounded-none';

export default function Contact() {
  const [timeStr, setTimeStr] = useState('');
  const [copied, setCopied] = useState(false);

  // Quick form state
  const [formState, setFormState] = useState({ name: '', contact: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [sendResult, setSendResult] = useState({ type: 'direct', message: '', urls: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live WIB / UTC+7 West Borneo Clock
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
      } catch {
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

  // Helper to construct mail compose URLs (both mailto and web Gmail)
  const getMailUrls = (name, contact, message) => {
    const subject = encodeURIComponent(`[Portofolio] Pesan Proyek dari ${name}`);
    const body = encodeURIComponent(
      `Halo Luigi,\n\nSaya: ${name}\nKontak: ${contact || 'N/A'}\n\nPesan Proyek:\n${message}\n\n--\nDikirim via Portfolio Terminal`
    );
    return {
      mailto: `mailto:iramrangi@gmail.com?subject=${subject}&body=${body}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=iramrangi@gmail.com&su=${subject}&body=${body}`
    };
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    setIsSubmitting(true);
    const urls = getMailUrls(formState.name, formState.contact, formState.message);

    try {
      const res = await fetch('https://formsubmit.co/ajax/iramrangi@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          contact: formState.contact || 'N/A',
          message: formState.message,
          _subject: `[Portofolio] Pesan Proyek Baru dari ${formState.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === 'true' || data.success === true)) {
        setSendResult({
          type: 'direct',
          message: 'Pesan transmisi berhasil terkirim langsung ke inbox iramrangi@gmail.com.'
        });
        setIsSent(true);
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        setSendResult({
          type: 'activation',
          message: 'FormSubmit memerlukan aktivasi 1x via email masuk di iramrangi@gmail.com. Pesan tetap dapat Anda teruskan langsung lewat Gmail atau aplikasi email sekarang:',
          urls
        });
        setIsSent(true);
      } else {
        throw new Error(data.message || 'Auto-relay pending');
      }
    } catch {
      setSendResult({
        type: 'fallback',
        message: 'Pengiriman otomatis dialihkan. Silakan klik tombol di bawah untuk meneruskan pesan via Gmail Web atau aplikasi email:',
        urls
      });
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-ink text-paper px-5 md:px-12 lg:px-20 pt-28 md:pt-40 pb-8 overflow-hidden">

      {/* Section tag */}
      <motion.div {...reveal} className="flex items-center gap-4 mb-8 md:mb-14">
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">05 / Contact</span>
        <div className="flex-1 h-[1px] bg-paper/25" />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/60 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
          <span>Pontianak {timeStr || '00:00:00'} WIB</span>
        </span>
      </motion.div>

      {/* Giant heading */}
      <motion.h2
        {...reveal}
        className="font-sans font-black uppercase tracking-tighter leading-[0.84] text-[17vw] md:text-[12vw] lg:text-[11vw] mb-12 md:mb-20"
      >
        Let’s work<br />
        <span className="text-violet">together.</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-28">

        {/* Direct channels */}
        <motion.div {...reveal} className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1.5 bg-violet text-ink font-mono text-[10px] font-bold uppercase tracking-widest">
              Respon &lt; 24 Jam
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Available for collaboration</span>
          </div>

          <p className="font-sans text-base md:text-lg leading-relaxed text-paper/80 max-w-md">
            Punya ide proyek, kebutuhan platform web kustom, visual 3D WebGL, atau kolaborasi arsitektur modern? Silakan hubungi langsung.
          </p>

          <ul className="border-t-2 border-paper">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-paper/30">
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  aria-label={`${c.label}: ${c.value}`}
                  className="group flex items-center justify-between gap-4 py-4 hover:bg-paper hover:text-ink hover:px-4 transition-all duration-300"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{c.label}</span>
                    <span className="block font-sans font-bold text-lg md:text-xl truncate">{c.value}</span>
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest shrink-0">
                    <span className="hidden sm:inline">{c.cta}</span>
                    <span className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-violet group-hover:border-ink transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={handleCopyEmail}
            aria-label="Salin alamat email"
            className="self-start flex items-center gap-2 px-4 py-2.5 border-2 border-paper font-mono text-xs font-bold uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-violet" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin email</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Quick message form */}
        <motion.div {...reveal} className="lg:col-span-7 bg-paper text-ink border-2 border-paper p-5 md:p-9 select-text self-start shadow-[8px_8px_0_#684AFF] md:shadow-[12px_12px_0_#684AFF]">
          <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b-2 border-ink">
            <h3 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl leading-none">Quick message</h3>
            <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet border border-ink" />
              Relay active
            </span>
          </div>

          {isSent ? (
            <div className="py-6 flex flex-col items-start gap-5">
              <div className="w-12 h-12 bg-violet border-2 border-ink flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans font-black uppercase text-2xl md:text-3xl tracking-tight leading-none mb-2">
                  {sendResult.type === 'direct'
                    ? 'Transmisi Berhasil Terkirim!'
                    : sendResult.type === 'activation'
                    ? 'Aktivasi Form Diperlukan'
                    : 'Transmisi Siap Diteruskan'}
                </h4>
                <p className="font-sans text-sm md:text-base text-[#333] max-w-md leading-relaxed">{sendResult.message}</p>
              </div>

              {sendResult.urls && (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={sendResult.urls.gmail}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-ink translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                    <div className="relative px-4 py-3 bg-violet border-2 border-ink flex items-center gap-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                      <span className="font-sans font-black text-xs uppercase tracking-widest">Buka di Gmail Web</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                  <a
                    href={sendResult.urls.mailto}
                    className="px-4 py-3 border-2 border-ink font-sans font-black text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                  >
                    Buka Mail Client
                  </a>
                </div>
              )}

              <button
                onClick={() => {
                  setIsSent(false);
                  setSendResult({ type: 'direct', message: '', urls: null });
                  setFormState({ name: '', contact: '', message: '' });
                }}
                className="font-mono text-xs uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 hover:text-violet transition-colors cursor-pointer"
              >
                Kirim pesan lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 block">
                    01 — Nama / Brand
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-label="Nama atau nama brand Anda"
                    placeholder="Alex Pratama"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-channel" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 block">
                    02 — Email / Kontak
                  </label>
                  <input
                    id="contact-channel"
                    type="text"
                    aria-label="Email atau kontak alternatif Anda"
                    placeholder="alex@domain.com / @alex"
                    value={formState.contact}
                    onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 block">
                  03 — Kebutuhan proyek / pesan
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  aria-label="Deskripsi kebutuhan proyek atau pesan Anda"
                  placeholder="Ceritakan gambaran proyek web, platform kustom, visual 3D, atau perkiraan timeline…"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative self-start mt-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-ink translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0" />
                <div className="relative px-7 py-4 bg-violet border-2 border-ink flex items-center justify-center gap-2 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:translate-y-1.5">
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                      <span className="font-sans font-black text-sm uppercase tracking-widest">Mengirim…</span>
                    </>
                  ) : (
                    <span className="font-sans font-black text-sm uppercase tracking-widest">
                      Kirim pesan <span className="ml-1">↗</span>
                    </span>
                  )}
                </div>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-paper/30 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-paper/70">
        <div className="flex items-center gap-5">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="Kunjungi akun GitHub" className="hover:text-violet transition-colors">GitHub</a>
          <a
            href="https://www.instagram.com/iramrangi_dev/"
            target="_blank"
            rel="noreferrer"
            aria-label="Kunjungi akun Instagram @iramrangi_dev"
            className="hover:text-violet transition-colors"
          >
            Instagram
          </a>
          <a href="https://www.borneoglobe.org/" target="_blank" rel="noreferrer" aria-label="Kunjungi situs Borneo Globe" className="hover:text-violet transition-colors">
            Borneo Globe
          </a>
        </div>
        <span>© {new Date().getFullYear()} Luigi Iram Rangi · Dayak Developer</span>
        <span>Pontianak, Borneo · V. 1.0</span>
      </footer>
    </section>
  );
}

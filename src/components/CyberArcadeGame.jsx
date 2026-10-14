import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Shield, Trophy, Zap, Sparkles } from 'lucide-react';

const TECH_TARGETS = [
  { name: 'Three.js', color: '#00f0ff', points: 100, type: 'gem' },
  { name: 'WebGL 3D', color: '#d946ef', points: 120, type: 'gem' },
  { name: 'PageSpeed 100', color: '#10b981', points: 150, type: 'gem' },
  { name: 'Architecture', color: '#f59e0b', points: 110, type: 'gem' },
  { name: 'React 19', color: '#38bdf8', points: 90, type: 'gem' },
  { name: 'Borneo Globe', color: '#2dd4bf', points: 200, type: 'gem' },
  { name: 'Memory Leak', color: '#ef4444', points: -50, type: 'bug' },
  { name: '404 Bug', color: '#f43f5e', points: -50, type: 'bug' }
];

export default function CyberArcadeGame({ onExit }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('ddev_arcade_highscore') || '0', 10);
  });
  const [shield, setShield] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [combo, setCombo] = useState(1);

  // References for live game loop without React re-render lag
  const gameState = useRef({
    playerX: 200,
    targetX: 200,
    bullets: [],
    targets: [],
    particles: [],
    floatingTexts: [],
    score: 0,
    shield: 100,
    combo: 1,
    comboTimer: 0,
    lastSpawn: 0,
    lastShot: 0,
    gameOver: false,
    stars: []
  });

  // Sound effect synthesizer via Web Audio API (Zero external assets needed)
  const audioCtxRef = useRef(null);
  const playSound = (type) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'hit') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'bug') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch (e) {
      // Audio autoplay may be restricted by browser until user gesture
    }
  };

  const restartGame = () => {
    gameState.current = {
      playerX: 200,
      targetX: 200,
      bullets: [],
      targets: [],
      particles: [],
      floatingTexts: [],
      score: 0,
      shield: 100,
      combo: 1,
      comboTimer: 0,
      lastSpawn: 0,
      lastShot: 0,
      gameOver: false,
      stars: gameState.current.stars
    };
    setScore(0);
    setShield(100);
    setCombo(1);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Handle high-dpi canvas sizing
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize stars
      if (gameState.current.stars.length === 0) {
        for (let i = 0; i < 45; i++) {
          gameState.current.stars.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 1.2 + 0.4
          });
        }
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse / Touch interaction
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      gameState.current.targetX = Math.max(30, Math.min(rect.width - 30, x));
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Main 120 FPS Arcade Game Loop
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 1. Clear Screen
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Moving Cyber Background Stars & Grid Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      gameState.current.stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!gameState.current.gameOver) {
        // Smooth player movement interpolation (lerp)
        gameState.current.playerX += (gameState.current.targetX - gameState.current.playerX) * 0.18;

        // Auto-fire bullets every 160ms
        if (time - gameState.current.lastShot > 160) {
          gameState.current.bullets.push({
            x: gameState.current.playerX,
            y: height - 38,
            speed: 12
          });
          gameState.current.lastShot = time;
          playSound('laser');
        }

        // Spawn falling tech targets every 650ms
        if (time - gameState.current.lastSpawn > 650) {
          const template = TECH_TARGETS[Math.floor(Math.random() * TECH_TARGETS.length)];
          gameState.current.targets.push({
            ...template,
            x: Math.random() * (width - 80) + 40,
            y: -25,
            speed: Math.random() * 1.5 + 1.2,
            radius: template.type === 'bug' ? 18 : 22,
            wobble: Math.random() * Math.PI * 2
          });
          gameState.current.lastSpawn = time;
        }

        // Combo decay
        if (gameState.current.comboTimer > 0) {
          gameState.current.comboTimer -= dt;
          if (gameState.current.comboTimer <= 0) {
            gameState.current.combo = 1;
            setCombo(1);
          }
        }
      }

      // 3. Update & Draw Bullets
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      for (let i = gameState.current.bullets.length - 1; i >= 0; i--) {
        const b = gameState.current.bullets[i];
        b.y -= b.speed;

        ctx.fillRect(b.x - 2, b.y, 4, 14);

        if (b.y < -20) {
          gameState.current.bullets.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 4. Update & Draw Targets
      for (let i = gameState.current.targets.length - 1; i >= 0; i--) {
        const t = gameState.current.targets[i];
        t.y += t.speed;
        t.wobble += 0.05;
        t.x += Math.sin(t.wobble) * 0.5;

        // Check collision with bullets
        let targetDestroyed = false;
        for (let j = gameState.current.bullets.length - 1; j >= 0; j--) {
          const b = gameState.current.bullets[j];
          const dist = Math.hypot(b.x - t.x, b.y - t.y);

          if (dist < t.radius + 6) {
            // Hit!
            gameState.current.bullets.splice(j, 1);
            targetDestroyed = true;

            // Spurt particles
            for (let p = 0; p < 14; p++) {
              gameState.current.particles.push({
                x: t.x,
                y: t.y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: t.color,
                life: 1.0,
                decay: Math.random() * 0.03 + 0.02
              });
            }

            if (t.type === 'gem') {
              // Points awarded with combo multiplier
              const earned = t.points * gameState.current.combo;
              gameState.current.score += earned;
              gameState.current.combo = Math.min(gameState.current.combo + 1, 8);
              gameState.current.comboTimer = 2.5;

              playSound('hit');

              gameState.current.floatingTexts.push({
                text: `+${earned} ${t.name}!`,
                x: t.x,
                y: t.y - 10,
                color: t.color,
                life: 1.0
              });
            } else {
              // Bug destroyed
              gameState.current.score += 75;
              playSound('bug');
              gameState.current.floatingTexts.push({
                text: `+75 Bug Fixed!`,
                x: t.x,
                y: t.y - 10,
                color: '#34d399',
                life: 1.0
              });
            }

            setScore(gameState.current.score);
            setCombo(gameState.current.combo);

            if (gameState.current.score > highScore) {
              setHighScore(gameState.current.score);
              localStorage.setItem('ddev_arcade_highscore', gameState.current.score.toString());
            }

            break;
          }
        }

        if (targetDestroyed) {
          gameState.current.targets.splice(i, 1);
          continue;
        }

        // Target reached bottom
        if (t.y > height + 30) {
          if (t.type === 'bug') {
            // Bug leaked! Reduce shield
            gameState.current.shield = Math.max(0, gameState.current.shield - 20);
            setShield(gameState.current.shield);
            playSound('bug');

            if (gameState.current.shield <= 0) {
              gameState.current.gameOver = true;
              setIsGameOver(true);
            }
          }
          gameState.current.targets.splice(i, 1);
          continue;
        }

        // Draw Target Body & Badge
        ctx.save();
        ctx.translate(t.x, t.y);

        // Outer glow circle
        ctx.fillStyle = `${t.color}20`;
        ctx.strokeStyle = t.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, t.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner Core Icon / Dot
        ctx.fillStyle = t.color;
        ctx.beginPath();
        ctx.arc(0, 0, t.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Label Tag
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(t.name, 0, t.radius + 12);

        ctx.restore();
      }

      // 5. Update & Draw Particles
      for (let i = gameState.current.particles.length - 1; i >= 0; i--) {
        const p = gameState.current.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          gameState.current.particles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 6. Floating Text Feedbacks
      for (let i = gameState.current.floatingTexts.length - 1; i >= 0; i--) {
        const ft = gameState.current.floatingTexts[i];
        ft.y -= 1.2;
        ft.life -= 0.025;

        if (ft.life <= 0) {
          gameState.current.floatingTexts.splice(i, 1);
          continue;
        }

        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = ft.color;
        ctx.globalAlpha = ft.life;
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.globalAlpha = 1.0;
      }

      // 7. Draw Player Cyber Cannon Ship
      const px = gameState.current.playerX;
      const py = height - 25;

      ctx.save();
      ctx.translate(px, py);

      // Jet Glow
      ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(0, 10, 12, 0, Math.PI * 2);
      ctx.fill();

      // Cyber Jet Body (Triangle)
      ctx.fillStyle = '#00f0ff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(16, 12);
      ctx.lineTo(0, 6);
      ctx.lineTo(-16, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Core cockpit
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
    };
  }, [highScore]);

  return (
    <div className="relative w-full bg-[#111111] border-2 border-[#111111] shadow-[8px_8px_0_#684AFF] overflow-hidden flex flex-col justify-between">

      
      {/* Top Arcade HUD Header */}
      <div className="px-5 py-3 bg-neutral-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white font-bold tracking-wider">DDEV CYBER ARCADE</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 border border-white/10">
            <span className="text-white/40">SCORE:</span>
            <span className="text-cyan-300 font-bold">{score}</span>
          </div>

          {combo > 1 && (
            <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold animate-bounce text-[11px]">
              COMBO x{combo}!
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Shield Health Bar */}
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-300"
                style={{ width: `${shield}%` }}
              />
            </div>
            <span className="text-[10px] text-white/70">{shield}%</span>
          </div>

          {/* High Score */}
          <div className="flex items-center gap-1.5 text-white/80">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] text-amber-300 font-bold">{highScore}</span>
          </div>

          {/* Return / Specs Toggle */}
          <button
            onClick={onExit}
            aria-label="Tutup Game Arcade"
            className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono transition-all cursor-pointer"
          >
            Tutup Game ✕
          </button>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div className="relative w-full h-[360px] sm:h-[400px] overflow-hidden bg-[#06070a]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
            <span className="text-3xl sm:text-4xl font-display font-black text-red-500 tracking-wider mb-2">
              SYSTEM OVERLOAD!
            </span>
            <p className="text-xs sm:text-sm text-white/75 font-mono mb-4">
              Latency Glitch menghabiskan shield sistem Anda.
            </p>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center gap-6 text-sm font-mono">
              <div>
                <span className="text-white/70 block text-[10px]">FINAL SCORE</span>
                <span className="text-cyan-300 font-bold text-lg">{score}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-white/70 block text-[10px]">RECORD</span>
                <span className="text-amber-300 font-bold text-lg">{highScore}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={restartGame}
                aria-label="Mainkan Lagi Game Arcade"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Mainkan Lagi</span>
              </button>

              <button
                onClick={onExit}
                aria-label="Kembali ke Matrix Keahlian"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs transition-all cursor-pointer"
              >
                Kembali ke Matrix Keahlian
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Help Ribbon */}
      <div className="px-5 py-2 bg-neutral-900/90 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/75">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Geser mouse / sentuh layar untuk mengendalikan pesawat laser & tembak target!</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-cyan-300">● Tembak Badge Teknologi (+Poin)</span>
          <span className="text-red-400">● Hancurkan Bug Merah</span>
        </div>
      </div>

    </div>
  );
}

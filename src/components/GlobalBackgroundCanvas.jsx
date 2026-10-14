import { useEffect, useRef } from 'react';

/**
 * Ultra-Lightweight 2D Spatial Starfield Canvas
 * Zero Three.js dependency, ~0% CPU, no WebGL context overhead.
 * Provides the same cyber spatial depth, ambient glow, and parallax response.
 */
export default function GlobalBackgroundCanvas({ activeSection = 0 }) {
  const canvasRef = useRef(null);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isLowPower = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const count = isLowPower ? 40 : 90;

    // Palette: Cyan, Neon Purple, Diamond White
    const colors = [
      'rgba(0, 240, 255, ',
      'rgba(168, 85, 247, ',
      'rgba(255, 255, 255, '
    ];

    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        depth: Math.random() * 0.8 + 0.2, // 0.2 (distant) to 1.0 (near)
        baseAlpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseVal: Math.random() * Math.PI * 2,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let animId;
    let isVisible = true;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 35;
      targetMouseY = (e.clientY / height - 0.5) * 35;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let frame = 0;
    const render = () => {
      animId = requestAnimationFrame(render);

      if (!isVisible) return;
      frame++;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Section shift offset
      const secShift = activeSectionRef.current * 18;

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseVal += p.pulseSpeed;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax coordinates
        const drawX = p.x + mouseX * p.depth;
        const drawY = p.y + mouseY * p.depth - (secShift * p.depth);

        const currentAlpha = p.baseAlpha * (0.7 + Math.sin(p.pulseVal) * 0.3);

        ctx.fillStyle = `${p.colorPrefix}${currentAlpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * p.depth, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

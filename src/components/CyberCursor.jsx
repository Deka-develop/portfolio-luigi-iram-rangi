import { useEffect, useRef, useState } from 'react';

export default function CyberCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad) and screen >= 768px
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768 || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isMouseDown = false;
    let isVisible = false;
    let isRunning = false;
    let animId = null;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ringX = mouseX;
        ringY = mouseY;
      }

      // Check if target or its ancestors are interactive
      const target = e.target;
      const interactiveEl = target.closest?.('button, a, input, textarea, select, [role="button"], .cursor-pointer');
      isHovering = !!interactiveEl;

      startLoop();
    };

    const onMouseDown = () => {
      isMouseDown = true;
      startLoop();
    };

    const onMouseUp = () => {
      isMouseDown = false;
      startLoop();
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      startLoop();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Sleep when ring has caught up to mouse (0% idle CPU)
    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const diffX = mouseX - ringX;
      const diffY = mouseY - ringY;
      ringX += diffX * 0.18;
      ringY += diffY * 0.18;

      // Update Center Laser Dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
        isMouseDown ? 0.7 : isHovering ? 1.4 : 1
      })`;

      // Update Outer Trailing Ring
      const ringScale = isMouseDown ? 0.8 : isHovering ? 1.6 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;

      if (isHovering) {
        ring.style.borderColor = 'rgba(0, 240, 255, 0.9)';
        ring.style.boxShadow = '0 0 16px rgba(0, 240, 255, 0.4), inset 0 0 8px rgba(0, 240, 255, 0.2)';
        ring.style.backgroundColor = 'rgba(0, 240, 255, 0.06)';
      } else {
        ring.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        ring.style.boxShadow = 'none';
        ring.style.backgroundColor = 'transparent';
      }

      // If ring is within 0.1px of mouse position and no active mouse down, stop the loop
      if (Math.abs(diffX) < 0.1 && Math.abs(diffY) < 0.1 && !isMouseDown) {
        ringX = mouseX;
        ringY = mouseY;
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Cyber Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/35 pointer-events-none z-[9999] transition-[background-color,border-color,box-shadow] duration-200 ease-out opacity-0 will-change-transform"
      >
        {/* Subtle Crosshair Ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[3px] bg-cyan-400/80 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[3px] bg-cyan-400/80 rounded-full" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-[3px] bg-cyan-400/80 rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[2px] w-[3px] bg-cyan-400/80 rounded-full" />
      </div>

      {/* Central Laser Cyber Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff,0_0_20px_#00f0ff] pointer-events-none z-[10000] opacity-0 will-change-transform"
      />
    </>
  );
}

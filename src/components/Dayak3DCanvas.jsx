import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Box } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   1. HERO MASTERPIECE: 3D Dayak Cyber Crystal & Kinetic Gyroscope
   ───────────────────────────────────────────────────────────── */
export default function Dayak3DCanvas({ className = '', showControls = false, showHud = false }) {
  const mountRef = useRef(null);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [themeColor, setThemeColor] = useState('violet'); // 'violet' | 'gold' | 'emerald'
  const [spinSpeed, setSpinSpeed] = useState('normal'); // 'normal' | 'fast' | 'pause'
  const [fps, setFps] = useState(60);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const objectsRef = useRef({});
  const wireframeRef = useRef(wireframeOnly);
  const themeRef = useRef(themeColor);
  const speedRef = useRef(spinSpeed);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update refs safely inside useEffect without mutating during render
  useEffect(() => {
    wireframeRef.current = wireframeOnly;
    themeRef.current = themeColor;
    speedRef.current = spinSpeed;
  }, [wireframeOnly, themeColor, spinSpeed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene & Camera with spatial perspective
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    // 2. WebGL Renderer with Alpha & Tone Mapping
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL failed to initialize:', e);
      return;
    }

    // 3. Dynamic Studio Lighting (Electric Violet + Amber Gold Specular)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLightViolet = new THREE.DirectionalLight(0x684aff, 3.5);
    dirLightViolet.position.set(4, 5, 4);
    scene.add(dirLightViolet);

    const dirLightAmber = new THREE.DirectionalLight(0xd97706, 2.8);
    dirLightAmber.position.set(-4, -3, -2);
    scene.add(dirLightAmber);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 15);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // 4. Kinetic Kinetic Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Elongated Dayak Diamond Shield Core (Scaled down for subtle elegance)
    const shieldGeo = new THREE.OctahedronGeometry(0.7, 0);
    shieldGeo.scale(0.78, 1.25, 0.78);

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.18,
      flatShading: true
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, solidMat);
    mainGroup.add(shieldMesh);

    // Dynamic Edge Wireframe
    const wireGeo = new THREE.WireframeGeometry(shieldGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x684aff,
      linewidth: 2,
      transparent: true,
      opacity: 0.95
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    mainGroup.add(wireLines);

    // Counter-rotating Inner Core
    const innerGeo = new THREE.OctahedronGeometry(0.32, 0);
    innerGeo.scale(0.75, 1.15, 0.75);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // Orbital Ring 1 (Electric Violet Equatorial Ring - Compact)
    const ring1Geo = new THREE.TorusGeometry(1.28, 0.02, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x684aff,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x3b1c9c,
      emissiveIntensity: 0.35
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Orbital Ring 2 (Golden Meridian Ring with jewel nodes - Compact)
    const ring2Geo = new THREE.TorusGeometry(1.48, 0.016, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.25
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    mainGroup.add(ring2);

    // 4 Jewel Nodes on Ring 2
    const nodeGeo = new THREE.OctahedronGeometry(0.06, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodeCount = 4;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * Math.PI * 2) / nodeCount;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.48, Math.sin(angle) * 1.48, 0);
      ring2.add(node);
    }

    // Outer Ambient Floating Stardust Particles
    const particleCount = 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.5 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x684aff,
      size: 0.035,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    objectsRef.current = {
      mainGroup,
      shieldMesh,
      wireLines,
      wireMat,
      innerCore,
      innerMat,
      ring1,
      ring1Mat,
      ring2,
      ring2Mat,
      particles,
      particleMat,
      solidMat,
      pointLight
    };

    // 5. Interactive Drag & Mouse Parallax with Scrolling Stability
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    let isVisible = true;

    // Viewport Intersection Observer: Pause WebGL updates when scrolled off-screen
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    const onPointerDown = (e) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e) => {
      if (!isVisible) return;
      const rect = container.getBoundingClientRect();
      // If container is scrolled out of viewport, ignore mouse move
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
      mouseRef.current.targetX = nx * 0.3;
      mouseRef.current.targetY = ny * 0.25;

      if (!isDragging) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      dragVelocityY = dx * 0.007;
      dragVelocityX = dy * 0.007;

      mainGroup.rotation.y += dragVelocityY;
      mainGroup.rotation.x += dragVelocityX;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    // CRITICAL: touchAction 'pan-y' allows natural page scrolling on touch and trackpads
    domElement.style.touchAction = 'pan-y';
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('blur', onPointerUp);

    // 6. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Render Loop with Smooth Lerping & Inertia (Safely Paused When Off-screen)
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const animate = (currentTime) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Skip render when hero section is offscreen to prevent scroll bugs and save GPU
      if (!isVisible) return;

      // FPS Calculation
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Spin Speed Factor
      let speedFactor = 1.0;
      if (speedRef.current === 'fast') speedFactor = 2.4;
      if (speedRef.current === 'pause') speedFactor = 0.0;

      // Continuous Idle Kinetic Rotation
      if (speedFactor > 0) {
        mainGroup.rotation.y += 0.45 * speedFactor * delta;
        innerCore.rotation.y -= 0.85 * speedFactor * delta;
        innerCore.rotation.x += 0.35 * speedFactor * delta;
        ring1.rotation.z += 0.6 * speedFactor * delta;
        ring2.rotation.x -= 0.4 * speedFactor * delta;
        particles.rotation.y += 0.15 * speedFactor * delta;
      }

      // Drag Inertia Damping
      if (!isDragging) {
        mainGroup.rotation.y += dragVelocityY;
        mainGroup.rotation.x += dragVelocityX;
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
      }

      // Smooth Mouse Parallax Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      camera.position.x = mouseRef.current.x * 0.8;
      camera.position.y = mouseRef.current.y * 0.8;
      camera.lookAt(0, 0, 0);

      // Wireframe Mode Sync
      shieldMesh.visible = !wireframeRef.current;

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', onPointerUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Theme Color Switcher
  useEffect(() => {
    const o = objectsRef.current;
    if (!o.wireMat) return;

    if (themeColor === 'violet') {
      o.wireMat.color.setHex(0x684aff);
      o.ring1Mat.color.setHex(0x684aff);
      o.particleMat.color.setHex(0x684aff);
      o.innerMat.color.setHex(0xd97706);
    } else if (themeColor === 'gold') {
      o.wireMat.color.setHex(0xd97706);
      o.ring1Mat.color.setHex(0xd97706);
      o.particleMat.color.setHex(0xd97706);
      o.innerMat.color.setHex(0x684aff);
    } else if (themeColor === 'emerald') {
      o.wireMat.color.setHex(0x10b981);
      o.ring1Mat.color.setHex(0x10b981);
      o.particleMat.color.setHex(0x10b981);
      o.innerMat.color.setHex(0xd97706);
    }
  }, [themeColor]);

  const resetView = () => {
    if (objectsRef.current.mainGroup) {
      objectsRef.current.mainGroup.rotation.set(0, 0, 0);
    }
    mouseRef.current = { x: 0, y: 0, targetX: 0, targetY: 0 };
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <section
        ref={mountRef}
        aria-label="Kanvas Interaktif 3D Perisai Dayak Talawang"
        className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] cursor-grab active:cursor-grabbing relative z-10"
        title="Geser mouse untuk memutar 360°"
      >
        <span className="sr-only">
          Model 3D interaktif Perisai Dayak kontemporer bertenaga WebGL Three.js. Anda dapat menggunakan tombol kontrol di bawah untuk mengatur mode tampilan, palet warna, dan kecepatan rotasi.
        </span>
      </section>

      {/* Floating Spatial Micro-Controls Bar */}
      {showControls && (
        <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-black/10 shadow-md text-[10px] md:text-[11px] font-mono tracking-wider">
          <button
            onClick={() => setWireframeOnly((prev) => !prev)}
            aria-label={wireframeOnly ? 'Aktifkan mode solid' : 'Aktifkan mode wireframe'}
            className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#684AFF] focus-visible:outline-none ${
              wireframeOnly ? 'bg-[#111111] text-white font-bold' : 'hover:bg-black/5 text-[#111111]'
            }`}
            title="Toggle Wireframe mode"
          >
            <Box className="w-3 h-3" aria-hidden="true" />
            <span>{wireframeOnly ? 'Wireframe' : 'Solid'}</span>
          </button>

          <div className="w-px h-3.5 bg-black/15" />

          {/* Color Palette Switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setThemeColor('violet')}
              aria-label="Warna Violet"
              className={`w-3.5 h-3.5 rounded-full bg-[#684AFF] transition-transform ${
                themeColor === 'violet' ? 'ring-2 ring-black scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setThemeColor('gold')}
              aria-label="Warna Emas"
              className={`w-3.5 h-3.5 rounded-full bg-[#D97706] transition-transform ${
                themeColor === 'gold' ? 'ring-2 ring-black scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
            <button
              onClick={() => setThemeColor('emerald')}
              aria-label="Warna Emerald"
              className={`w-3.5 h-3.5 rounded-full bg-[#10B981] transition-transform ${
                themeColor === 'emerald' ? 'ring-2 ring-black scale-110' : 'opacity-70 hover:opacity-100'
              }`}
            />
          </div>

          <div className="w-px h-3.5 bg-black/15" />

          <button
            onClick={() =>
              setSpinSpeed((prev) => (prev === 'normal' ? 'fast' : prev === 'fast' ? 'pause' : 'normal'))
            }
            className="px-2 py-1 rounded-full hover:bg-black/5 text-[#111111] transition-colors cursor-pointer capitalize"
            title="Ubah kecepatan putaran"
          >
            {spinSpeed}
          </button>

          <button
            onClick={resetView}
            aria-label="Reset orientasi"
            className="p-1 rounded-full hover:bg-black/5 text-[#111111] transition-colors cursor-pointer"
            title="Reset posisi"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Telemetry & Drag Cue */}
      {showHud && (
        <>
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-none">
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#111111]/40 px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-black/5">
              {fps} FPS // THREE.JS
            </span>
          </div>

          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#111111]/50 px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-black/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#684AFF] animate-pulse" />
              Interactive 3D Stage
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. MINI 3D MILESTONE CANVASES (For 3D Milestone Stacking Deck)
   ───────────────────────────────────────────────────────────── */

// Era 1: 3D Wireframe Cyber Matrix (Zero-Bloat Systems)
export function WireframeMatrix3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.5, 2.0, 3.2);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Box wireframe matrix
    const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const boxWire = new THREE.WireframeGeometry(boxGeo);
    const boxMat = new THREE.LineBasicMaterial({ color: 0x684aff, linewidth: 2 });
    const wireMesh = new THREE.LineSegments(boxWire, boxMat);
    group.add(wireMesh);

    // Inner rotating octahedron
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
      flatShading: true
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    const light1 = new THREE.DirectionalLight(0x684aff, 3);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(light2);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.x += 0.008;
      group.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// Era 2: 3D Kinetic Torus Knot (Creative WebGL & Shaders)
export function TorusKnot3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const geo = new THREE.TorusKnotGeometry(1.1, 0.28, 100, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Glowing wire overlay
    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x684aff, transparent: true, opacity: 0.7 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    knot.add(wireMesh);

    const light1 = new THREE.DirectionalLight(0x684aff, 3.5);
    light1.position.set(3, 4, 3);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xd97706, 2.5);
    light2.position.set(-3, -3, -2);
    scene.add(light2);

    const amb = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(amb);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      knot.rotation.x += 0.009;
      knot.rotation.y += 0.014;
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// Era 3: 3D Celestial Wireframe Globe (Borneo Globe Platform)
export function CelestialGlobe3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Globe Sphere Wireframe
    const sphereGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const sphereWire = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const globe = new THREE.LineSegments(sphereWire, wireMat);
    group.add(globe);

    // Dark core
    const coreGeo = new THREE.SphereGeometry(1.08, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.3
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // Equator Ring & Borneo Coordinate Marker
    const equatorGeo = new THREE.TorusGeometry(1.4, 0.02, 16, 64);
    const equatorMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const equator = new THREE.Mesh(equatorGeo, equatorMat);
    equator.rotation.x = Math.PI / 2;
    group.add(equator);

    // Borneo Beacon (0° lat, 109° long)
    const beaconGeo = new THREE.OctahedronGeometry(0.12, 0);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(1.22, 0.05, 0.1);
    group.add(beacon);

    const light = new THREE.DirectionalLight(0x38bdf8, 3);
    light.position.set(3, 4, 3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.008;
      group.rotation.x = 0.2;
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// Era 4: 3D Sacred Dayak Geometry (Cultural Computing)
export function SacredShield3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Elongated Dayak Diamond
    const geo = new THREE.OctahedronGeometry(1.2, 0);
    geo.scale(0.85, 1.4, 0.85);

    const mat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);

    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 2 });
    group.add(new THREE.LineSegments(wireGeo, wireMat));

    // Outer Golden Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x684aff });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    const light1 = new THREE.DirectionalLight(0xd97706, 3);
    light1.position.set(4, 3, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x684aff, 2.5);
    light2.position.set(-3, -3, 2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.012;
      group.rotation.x = Math.sin(performance.now() * 0.001) * 0.15;
      ring.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

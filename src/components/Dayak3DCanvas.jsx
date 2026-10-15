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

    // 1. Scene & Camera with spatial perspective (Bigger, heroic presence)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.4);

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
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL failed to initialize:', e);
      return;
    }

    // 3. Dynamic Studio Lighting (Electric Violet + Amber Gold Specular)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLightViolet = new THREE.DirectionalLight(0x684aff, 3.8);
    dirLightViolet.position.set(4, 5, 4);
    scene.add(dirLightViolet);

    const dirLightAmber = new THREE.DirectionalLight(0xd97706, 3.2);
    dirLightAmber.position.set(-4, -3, 3);
    scene.add(dirLightAmber);

    const pointLight = new THREE.PointLight(0x684aff, 2.5, 12);
    pointLight.position.set(0, 0, 2.5);
    scene.add(pointLight);

    // 4. Bunga Terong Dayak (Bungai Terung) Kinetic Masterpiece Hierarchy
    const mainGroup = new THREE.Group();
    // Initial 3D isometric tilt to reveal relief depth and woodcarving facets
    mainGroup.rotation.x = 0.22;
    mainGroup.rotation.y = -0.18;
    scene.add(mainGroup);

    // --- A. THE 8 SACRED PETALS (KELOPAK BUNGA TERONG) ---
    const petalsGroup = new THREE.Group();
    mainGroup.add(petalsGroup);

    // Parametric Dayak Petal Shape (Curved arc hook with carved belly)
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0.18, 0.0);
    petalShape.bezierCurveTo(0.28, 0.14, 0.58, 0.24, 0.88, 0.16);
    petalShape.bezierCurveTo(0.98, 0.11, 1.02, -0.04, 0.90, -0.14);
    petalShape.bezierCurveTo(0.68, -0.22, 0.40, -0.14, 0.18, 0.0);

    const extrudeSettings = {
      depth: 0.065,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.018,
      bevelThickness: 0.018
    };

    const petalGeo = new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
    petalGeo.center();

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      metalness: 0.88,
      roughness: 0.22,
      flatShading: true
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: 0x684aff,
      linewidth: 2,
      transparent: true,
      opacity: 0.95
    });

    const wireGeo = new THREE.WireframeGeometry(petalGeo);
    const wireLinesGroup = new THREE.Group();
    petalsGroup.add(wireLinesGroup);

    // Instantiate 8 symmetrical petals radiating at 45-degree intervals
    const petalCount = 8;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i * Math.PI * 2) / petalCount;
      
      const petalMesh = new THREE.Mesh(petalGeo, solidMat);
      petalMesh.rotation.z = angle;
      petalMesh.position.x = Math.cos(angle) * 0.48;
      petalMesh.position.y = Math.sin(angle) * 0.48;
      // Slight outward dish curvature for 3D bloom depth
      petalMesh.rotation.x = Math.sin(angle) * 0.06;
      petalMesh.rotation.y = -Math.cos(angle) * 0.06;
      petalsGroup.add(petalMesh);

      const petalWire = new THREE.LineSegments(wireGeo, wireMat);
      petalWire.rotation.z = angle;
      petalWire.position.copy(petalMesh.position);
      petalWire.rotation.x = petalMesh.rotation.x;
      petalWire.rotation.y = petalMesh.rotation.y;
      wireLinesGroup.add(petalWire);
    }

    // --- B. CENTRAL SACRED SPIRAL (TALI NYAWA - PUSARAN HIDUP) ---
    const taliNyawaGroup = new THREE.Group();
    mainGroup.add(taliNyawaGroup);

    // Parametric 3D Archimedean logarithmic spiral tube
    const spiralPoints = [];
    const spiralTurns = 2.4;
    const spiralSegments = 70;
    for (let j = 0; j <= spiralSegments; j++) {
      const t = j / spiralSegments;
      const angle = t * Math.PI * 2 * spiralTurns;
      const r = 0.035 + 0.25 * Math.pow(t, 0.88);
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      const z = 0.08 * (1.0 - t * 0.7); // Forward dome elevation
      spiralPoints.push(new THREE.Vector3(x, y, z));
    }
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralGeo = new THREE.TubeGeometry(spiralCurve, 64, 0.02, 12, false);

    const taliNyawaMat = new THREE.MeshStandardMaterial({
      color: 0x684aff,
      emissive: 0x3b1c9c,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.16
    });
    const taliNyawaMesh = new THREE.Mesh(spiralGeo, taliNyawaMat);
    taliNyawaGroup.add(taliNyawaMesh);

    // Center Core Seed Gem (Point of origin / Titik Pusaran)
    const coreGeo = new THREE.OctahedronGeometry(0.08, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.1
    });
    const innerCore = new THREE.Mesh(coreGeo, innerMat);
    innerCore.position.z = 0.09;
    taliNyawaGroup.add(innerCore);

    // --- C. SACRED CONCENTRIC RINGS (TITI DAUN & LINGKAR KINETIK) ---
    // Inner Binding Ring (holding the petal roots)
    const ring1Geo = new THREE.TorusGeometry(0.36, 0.016, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0x78350f,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.position.z = 0.04;
    mainGroup.add(ring1);

    // Outer Gyro Cultural Ring (Cyber kinetic ring tilted at 25°)
    const ring2Geo = new THREE.TorusGeometry(1.18, 0.014, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x684aff,
      emissive: 0x311080,
      emissiveIntensity: 0.3,
      metalness: 0.95,
      roughness: 0.15
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 4 Diamond Jewel Nodes on Outer Ring
    const nodeGeo = new THREE.OctahedronGeometry(0.045, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let k = 0; k < 4; k++) {
      const angle = (k * Math.PI * 2) / 4;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0);
      ring2.add(node);
    }

    // --- D. AMBIENT SACRED STARDUST SPARK PARTICLES ---
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.15 + Math.random() * 0.65;
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
      size: 0.028,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    objectsRef.current = {
      mainGroup,
      petalsGroup,
      taliNyawaGroup,
      taliNyawaMat,
      wireLinesGroup,
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

      // Continuous Idle Kinetic Rotation of Bunga Terong Dayak
      if (speedFactor > 0) {
        // Slow continuous yaw and gentle breathing pitch tilt
        mainGroup.rotation.y += 0.22 * speedFactor * delta;
        mainGroup.rotation.x = 0.22 + Math.sin(currentTime * 0.0012) * 0.06;

        // Sacred 8 petals revolving gracefully
        petalsGroup.rotation.z += 0.3 * speedFactor * delta;

        // Central Tali Nyawa spiral revolving in counter-harmony
        taliNyawaGroup.rotation.z -= 0.45 * speedFactor * delta;

        // Kinetic orbital ring gyroscopic motion
        ring1.rotation.z += 0.4 * speedFactor * delta;
        ring2.rotation.x -= 0.35 * speedFactor * delta;
        ring2.rotation.y += 0.25 * speedFactor * delta;

        // Ambient sparks
        particles.rotation.y += 0.12 * speedFactor * delta;
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
      solidMat.wireframe = wireframeRef.current;

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
    if (!o.wireMat || !o.taliNyawaMat) return;

    if (themeColor === 'violet') {
      o.wireMat.color.setHex(0x684aff);
      o.taliNyawaMat.color.setHex(0x684aff);
      o.taliNyawaMat.emissive.setHex(0x3b1c9c);
      o.ring1Mat.color.setHex(0xd97706);
      o.ring2Mat.color.setHex(0x684aff);
      o.particleMat.color.setHex(0x684aff);
      o.innerMat.color.setHex(0xd97706);
    } else if (themeColor === 'gold') {
      o.wireMat.color.setHex(0xd97706);
      o.taliNyawaMat.color.setHex(0xd97706);
      o.taliNyawaMat.emissive.setHex(0x78350f);
      o.ring1Mat.color.setHex(0x684aff);
      o.ring2Mat.color.setHex(0xd97706);
      o.particleMat.color.setHex(0xd97706);
      o.innerMat.color.setHex(0x684aff);
    } else if (themeColor === 'emerald') {
      o.wireMat.color.setHex(0x10b981);
      o.taliNyawaMat.color.setHex(0x10b981);
      o.taliNyawaMat.emissive.setHex(0x064e3b);
      o.ring1Mat.color.setHex(0xd97706);
      o.ring2Mat.color.setHex(0x10b981);
      o.particleMat.color.setHex(0x10b981);
      o.innerMat.color.setHex(0xd97706);
    }
  }, [themeColor]);

  const resetView = () => {
    if (objectsRef.current.mainGroup) {
      objectsRef.current.mainGroup.rotation.set(0.22, -0.18, 0);
    }
    mouseRef.current = { x: 0, y: 0, targetX: 0, targetY: 0 };
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* Three.js Canvas Container */}
      <section
        ref={mountRef}
        aria-label="Kanvas Interaktif 3D Bunga Terong Dayak (Bungai Terung)"
        className="w-full h-full min-h-[210px] sm:min-h-[240px] md:min-h-[265px] cursor-grab active:cursor-grabbing relative z-10"
      >
        <span className="sr-only">
          Model 3D interaktif Bunga Terong Dayak (Bungai Terung) kontemporer bertenaga WebGL Three.js. Menampilkan 8 kelopak ukir sakral, pusaran Tali Nyawa di titik tengah, dan cincin kinetik orbital.
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

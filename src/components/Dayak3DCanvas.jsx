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
    camera.position.set(0, 0, 3.45);

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

    // 4. Authentic Bunga Terong Dayak (Bungai Terung) Kinetic Masterpiece
    const mainGroup = new THREE.Group();
    // Front-facing orientation with subtle 3D hovering tilt
    mainGroup.rotation.x = 0.08;
    mainGroup.rotation.y = 0.0;
    scene.add(mainGroup);

    // --- A. THE 8-LOBED & 8-THORN MONOLITHIC FLOWER BODY ---
    // Mathematically crafted to match the authentic Dayak Bungai Terung reference image
    const flowerShape = new THREE.Shape();
    const petalCount = 8;
    const outlinePoints = [];

    for (let i = 0; i < petalCount; i++) {
      const aThorn = (i * Math.PI * 2) / petalCount;
      const aNextThorn = ((i + 1) * Math.PI * 2) / petalCount;

      // 1. Sharp Pointed Thorn / Sepal Tip (duri terong)
      const rThorn = 1.10;
      outlinePoints.push(new THREE.Vector2(Math.cos(aThorn) * rThorn, Math.sin(aThorn) * rThorn));

      // 2. Crevice flank down from thorn tip into the notch
      const aCrevice1 = aThorn + 0.065;
      const rCrevice = 0.68;
      outlinePoints.push(new THREE.Vector2(Math.cos(aCrevice1) * rCrevice, Math.sin(aCrevice1) * rCrevice));

      // 3. Rounded Petal Lobe (Smooth semicircular bulge between thorns)
      const aCrevice2 = aNextThorn - 0.065;
      const lobeSteps = 14;
      const rLobePeak = 0.96;

      for (let s = 1; s <= lobeSteps; s++) {
        const t = s / (lobeSteps + 1);
        const angle = aCrevice1 + t * (aCrevice2 - aCrevice1);
        // Half-sine profile generates a plump, circular petal lobe
        const r = rCrevice + (rLobePeak - rCrevice) * Math.sin(t * Math.PI);
        outlinePoints.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r));
      }

      // 4. Crevice notch before the next thorn
      outlinePoints.push(new THREE.Vector2(Math.cos(aCrevice2) * rCrevice, Math.sin(aCrevice2) * rCrevice));
    }

    flowerShape.moveTo(outlinePoints[0].x, outlinePoints[0].y);
    for (let i = 1; i < outlinePoints.length; i++) {
      flowerShape.lineTo(outlinePoints[i].x, outlinePoints[i].y);
    }
    flowerShape.closePath();

    const flowerExtrudeSettings = {
      depth: 0.075,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.024,
      bevelThickness: 0.024
    };

    const flowerGeo = new THREE.ExtrudeGeometry(flowerShape, flowerExtrudeSettings);
    flowerGeo.center();

    // Deep Obsidian / Carbon Black Body matching the solid black silhouette
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      metalness: 0.85,
      roughness: 0.25,
      flatShading: false
    });
    const flowerMesh = new THREE.Mesh(flowerGeo, solidMat);
    mainGroup.add(flowerMesh);

    // Subtle Cyber-Violet / Gold Contour Hairline
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x684aff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75
    });
    const wireGeo = new THREE.WireframeGeometry(flowerGeo);
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // --- B. CENTRAL TALI NYAWA INTERLOCKING DOUBLE SPIRAL ---
    // Exact S-curved twin crescent spirals from the reference image
    const taliNyawaGroup = new THREE.Group();
    // Positioned cleanly on the front face of the flower
    taliNyawaGroup.position.z = 0.048;
    mainGroup.add(taliNyawaGroup);

    // Recessed circular boundary ring in the center
    const centerRingGeo = new THREE.TorusGeometry(0.50, 0.012, 16, 64);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0x78350f,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2
    });
    const centerRing = new THREE.Mesh(centerRingGeo, ring1Mat);
    taliNyawaGroup.add(centerRing);

    // Parametric Tali Nyawa Spiral Arm (curving from center S-hub to razor outer tip)
    const armShape = new THREE.Shape();
    const spiralSteps = 45;
    const outerArmPoints = [];
    const innerArmPoints = [];

    for (let j = 0; j <= spiralSteps; j++) {
      const t = j / spiralSteps;
      // Clockwise spiral sweep (~1.2 revolutions)
      const angle = -(t * Math.PI * 2.3);
      const rOut = 0.05 + 0.44 * Math.pow(t, 0.82);
      outerArmPoints.push(new THREE.Vector2(Math.cos(angle) * rOut, Math.sin(angle) * rOut));

      // Bold tapered thickness: up to 0.082 thick in the body
      const thickness = 0.082 * Math.sin(t * Math.PI * 0.95);
      const rIn = Math.max(0.012, rOut - thickness);
      innerArmPoints.push(new THREE.Vector2(Math.cos(angle) * rIn, Math.sin(angle) * rIn));
    }

    armShape.moveTo(outerArmPoints[0].x, outerArmPoints[0].y);
    for (let j = 1; j < outerArmPoints.length; j++) {
      armShape.lineTo(outerArmPoints[j].x, outerArmPoints[j].y);
    }
    for (let j = innerArmPoints.length - 1; j >= 0; j--) {
      armShape.lineTo(innerArmPoints[j].x, innerArmPoints[j].y);
    }
    armShape.closePath();

    const armExtrudeSettings = {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008
    };

    const armGeo = new THREE.ExtrudeGeometry(armShape, armExtrudeSettings);
    armGeo.center();

    // High-visibility pure white material matching the reference image stencil
    const taliNyawaMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    // Arm 1 (Upper-Right Swirl)
    const arm1Mesh = new THREE.Mesh(armGeo, taliNyawaMat);
    arm1Mesh.position.set(0.05, 0.05, 0.015);
    taliNyawaGroup.add(arm1Mesh);

    // Arm 2 (Lower-Left Interlocking Swirl - 180° rotation)
    const arm2Mesh = new THREE.Mesh(armGeo, taliNyawaMat);
    arm2Mesh.rotation.z = Math.PI;
    arm2Mesh.position.set(-0.05, -0.05, 0.015);
    taliNyawaGroup.add(arm2Mesh);

    // Center Core Seed Gem (Point of Origin)
    const coreGeo = new THREE.OctahedronGeometry(0.055, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.1
    });
    const innerCore = new THREE.Mesh(coreGeo, innerMat);
    innerCore.position.z = 0.03;
    taliNyawaGroup.add(innerCore);


    // --- D. AMBIENT SACRED STARDUST SPARK PARTICLES ---
    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.18 + Math.random() * 0.65;
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
      size: 0.026,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    objectsRef.current = {
      mainGroup,
      flowerMesh,
      taliNyawaGroup,
      taliNyawaMat,
      wireMesh,
      wireMat,
      innerCore,
      innerMat,
      ring1: centerRing,
      ring1Mat,
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
        // Keep front-facing with subtle 3D hovering breathing motion
        mainGroup.rotation.x = 0.06 + Math.sin(currentTime * 0.0012) * 0.04;
        mainGroup.rotation.y = Math.cos(currentTime * 0.001) * 0.04;

        // Bunga Terong 8-lobed plate revolving smoothly like a sacred mandala wheel
        flowerMesh.rotation.z += 0.22 * speedFactor * delta;
        wireMesh.rotation.z = flowerMesh.rotation.z;

        // Central Tali Nyawa spiral revolving in counter-harmony
        taliNyawaGroup.rotation.z -= 0.35 * speedFactor * delta;

        // Center ring rotation
        centerRing.rotation.z += 0.3 * speedFactor * delta;

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
    if (!o.wireMat) return;

    if (themeColor === 'violet') {
      o.wireMat.color.setHex(0x684aff);
      o.ring1Mat?.color.setHex(0xd97706);
      o.particleMat?.color.setHex(0x684aff);
      o.innerMat?.color.setHex(0xd97706);
    } else if (themeColor === 'gold') {
      o.wireMat.color.setHex(0xd97706);
      o.ring1Mat?.color.setHex(0x684aff);
      o.particleMat?.color.setHex(0xd97706);
      o.innerMat?.color.setHex(0x684aff);
    } else if (themeColor === 'emerald') {
      o.wireMat.color.setHex(0x10b981);
      o.ring1Mat?.color.setHex(0xd97706);
      o.particleMat?.color.setHex(0x10b981);
      o.innerMat?.color.setHex(0xd97706);
    }
  }, [themeColor]);

  const resetView = () => {
    if (objectsRef.current.mainGroup) {
      objectsRef.current.mainGroup.rotation.set(0.06, 0.0, 0);
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
          Model 3D interaktif Bunga Terong Dayak (Bungai Terung) kontemporer bertenaga WebGL Three.js. Menampilkan 8 kelopak ukir sakral dan pusaran Tali Nyawa di titik tengah.
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
   2. MINI 3D MILESTONE CANVASES — TEMA PUSAKA DIGITAL DAYAK
   ───────────────────────────────────────────────────────────── */

// 1. Era 2023: 3D Bunga Terong Spasial (Zero-Bloat Web Systems)
// Model Bunga Terong Dayak otentik persis seperti di Beranda (Hero Masterpiece)
export function BungaTerong3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const mainGroup = new THREE.Group();
    mainGroup.rotation.x = 0.1;
    scene.add(mainGroup);

    // ── A. THE 8-LOBED & 8-THORN MONOLITHIC FLOWER BODY (PERSIS SEPERTI DI BERANDA) ──
    const flowerShape = new THREE.Shape();
    const petalCount = 8;
    const outlinePoints = [];

    for (let i = 0; i < petalCount; i++) {
      const aThorn = (i * Math.PI * 2) / petalCount;
      const aNextThorn = ((i + 1) * Math.PI * 2) / petalCount;

      // 1. Sharp Pointed Thorn / Sepal Tip (duri terong)
      const rThorn = 1.10;
      outlinePoints.push(new THREE.Vector2(Math.cos(aThorn) * rThorn, Math.sin(aThorn) * rThorn));

      // 2. Crevice flank down from thorn tip into the notch
      const aCrevice1 = aThorn + 0.065;
      const rCrevice = 0.68;
      outlinePoints.push(new THREE.Vector2(Math.cos(aCrevice1) * rCrevice, Math.sin(aCrevice1) * rCrevice));

      // 3. Rounded Petal Lobe (Smooth semicircular bulge between thorns)
      const aCrevice2 = aNextThorn - 0.065;
      const lobeSteps = 14;
      const rLobePeak = 0.96;

      for (let s = 1; s <= lobeSteps; s++) {
        const t = s / (lobeSteps + 1);
        const angle = aCrevice1 + t * (aCrevice2 - aCrevice1);
        const r = rCrevice + (rLobePeak - rCrevice) * Math.sin(t * Math.PI);
        outlinePoints.push(new THREE.Vector2(Math.cos(angle) * r, Math.sin(angle) * r));
      }

      // 4. Crevice notch before next thorn
      outlinePoints.push(new THREE.Vector2(Math.cos(aCrevice2) * rCrevice, Math.sin(aCrevice2) * rCrevice));
    }

    flowerShape.moveTo(outlinePoints[0].x, outlinePoints[0].y);
    for (let i = 1; i < outlinePoints.length; i++) {
      flowerShape.lineTo(outlinePoints[i].x, outlinePoints[i].y);
    }
    flowerShape.closePath();

    const flowerExtrudeSettings = {
      depth: 0.075,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.024,
      bevelThickness: 0.024
    };

    const flowerGeo = new THREE.ExtrudeGeometry(flowerShape, flowerExtrudeSettings);
    flowerGeo.center();

    // Deep Obsidian / Carbon Black Body
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x111113,
      metalness: 0.88,
      roughness: 0.22,
      flatShading: false
    });
    const flowerMesh = new THREE.Mesh(flowerGeo, solidMat);
    mainGroup.add(flowerMesh);

    // Subtle Cyber-Violet Contour Hairline
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x684aff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.75
    });
    const wireGeo = new THREE.WireframeGeometry(flowerGeo);
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // ── B. CENTRAL TALI NYAWA INTERLOCKING DOUBLE SPIRAL ──
    const taliNyawaGroup = new THREE.Group();
    taliNyawaGroup.position.z = 0.048;
    mainGroup.add(taliNyawaGroup);

    // Center circular boundary ring in gold
    const centerRingGeo = new THREE.TorusGeometry(0.50, 0.012, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0x78350f,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2
    });
    const centerRing = new THREE.Mesh(centerRingGeo, ringMat);
    taliNyawaGroup.add(centerRing);

    // Parametric Tali Nyawa Spiral Arm
    const armShape = new THREE.Shape();
    const spiralSteps = 45;
    const outerArmPoints = [];
    const innerArmPoints = [];

    for (let j = 0; j <= spiralSteps; j++) {
      const t = j / spiralSteps;
      const angle = -(t * Math.PI * 2.3);
      const rOut = 0.05 + 0.44 * Math.pow(t, 0.82);
      outerArmPoints.push(new THREE.Vector2(Math.cos(angle) * rOut, Math.sin(angle) * rOut));

      const thickness = 0.082 * Math.sin(t * Math.PI * 0.95);
      const rIn = Math.max(0.012, rOut - thickness);
      innerArmPoints.push(new THREE.Vector2(Math.cos(angle) * rIn, Math.sin(angle) * rIn));
    }

    armShape.moveTo(outerArmPoints[0].x, outerArmPoints[0].y);
    for (let j = 1; j < outerArmPoints.length; j++) {
      armShape.lineTo(outerArmPoints[j].x, outerArmPoints[j].y);
    }
    for (let j = innerArmPoints.length - 1; j >= 0; j--) {
      armShape.lineTo(innerArmPoints[j].x, innerArmPoints[j].y);
    }
    armShape.closePath();

    const armExtrudeSettings = {
      depth: 0.03,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008
    };

    const armGeo = new THREE.ExtrudeGeometry(armShape, armExtrudeSettings);
    armGeo.center();

    // Crisp white Tali Nyawa spirals
    const taliNyawaMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Arm 1
    const arm1Mesh = new THREE.Mesh(armGeo, taliNyawaMat);
    arm1Mesh.position.set(0.05, 0.05, 0.015);
    taliNyawaGroup.add(arm1Mesh);

    // Arm 2 (180° rotated)
    const arm2Mesh = new THREE.Mesh(armGeo, taliNyawaMat);
    arm2Mesh.rotation.z = Math.PI;
    arm2Mesh.position.set(-0.05, -0.05, 0.015);
    taliNyawaGroup.add(arm2Mesh);

    // Center Core Seed Gem
    const coreGeo = new THREE.OctahedronGeometry(0.055, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      emissive: 0xb45309,
      emissiveIntensity: 0.5,
      metalness: 0.95,
      roughness: 0.1
    });
    const innerCore = new THREE.Mesh(coreGeo, innerMat);
    innerCore.position.z = 0.03;
    taliNyawaGroup.add(innerCore);

    // ── C. AMBIENT SACRED STARDUST SPARK PARTICLES ──
    const pCount = 60;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const radius = 1.15 + Math.random() * 0.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = radius * Math.cos(phi) * 0.4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x684aff,
      size: 0.035,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── D. LIGHTING ──
    const light1 = new THREE.DirectionalLight(0xffffff, 2.8);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xd97706, 2.2);
    light2.position.set(-3, -2, 2);
    scene.add(light2);
    const pointLight = new THREE.PointLight(0x684aff, 3.5, 6);
    pointLight.position.set(0, 0, 1.2);
    scene.add(pointLight);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now();

      // Smooth revolving mandala wheel rotation like in Hero
      mainGroup.rotation.z += 0.006;
      mainGroup.rotation.x = 0.1 + Math.sin(time * 0.001) * 0.06;
      mainGroup.rotation.y = Math.cos(time * 0.001) * 0.08;

      innerCore.rotation.x += 0.015;
      innerCore.rotation.y += 0.02;
      particles.rotation.z += 0.002;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      flowerGeo.dispose();
      solidMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      centerRingGeo.dispose();
      ringMat.dispose();
      armGeo.dispose();
      taliNyawaMat.dispose();
      coreGeo.dispose();
      innerMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// 2. Era 2024: 3D Cyber Mandau Blade (Creative WebGL & Shaders)
export function CyberMandau3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Mandau Blade Silhouette Shape (Otentik Geometri Bilah Dayak)
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.1);
    shape.lineTo(0.24, -1.1);
    shape.lineTo(0.27, 0.2);
    shape.lineTo(0.38, 1.0); // convex sweeping belly
    shape.lineTo(0.04, 1.55); // sharp upturned point
    shape.lineTo(-0.06, 1.4); // concave back clip
    shape.lineTo(-0.04, 0.3);
    shape.lineTo(-0.03, -1.1);
    shape.closePath();

    const bladeGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.015,
      bevelThickness: 0.015
    });

    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.96,
      roughness: 0.12
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    group.add(bladeMesh);

    // Neon Cyan Laser Cutting Edge
    const edgesGeo = new THREE.EdgesGeometry(bladeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2, transparent: true, opacity: 0.85 });
    const wireBlade = new THREE.LineSegments(edgesGeo, edgesMat);
    bladeMesh.add(wireBlade);

    // Decorative Traditional Brass Motifs on Spine (Ukiran Kuningan Mandau)
    const spineInlayGroup = new THREE.Group();
    const ringInlayGeo = new THREE.TorusGeometry(0.05, 0.012, 8, 20);
    const ringInlayMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    for (let i = 0; i < 4; i++) {
      const ring = new THREE.Mesh(ringInlayGeo, ringInlayMat);
      ring.position.set(0.12 + i * 0.05, -0.4 + i * 0.35, 0.045);
      spineInlayGroup.add(ring);
    }
    group.add(spineInlayGroup);

    // Carved Hilt / Handle (Hulu Mandau Bertanduk)
    const hiltGroup = new THREE.Group();
    const handleGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.55, 12);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x181412, metalness: 0.8, roughness: 0.3 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = -1.4;
    hiltGroup.add(handle);

    // Pommel (Hulu Kepala Burung Enggang / Ornamen)
    const pommelGeo = new THREE.ConeGeometry(0.16, 0.35, 8);
    const pommelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
    const pommel = new THREE.Mesh(pommelGeo, pommelMat);
    pommel.position.set(-0.06, -1.75, 0);
    pommel.rotation.z = Math.PI * 0.85;
    hiltGroup.add(pommel);

    // Golden Ferrule Collar
    const collarGeo = new THREE.TorusGeometry(0.11, 0.02, 12, 24);
    const collarMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.y = -1.12;
    collar.rotation.x = Math.PI / 2;
    hiltGroup.add(collar);

    group.add(hiltGroup);

    // Kinetic Orbit Ring
    const orbitGeo = new THREE.TorusGeometry(1.65, 0.012, 16, 64);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x684aff, transparent: true, opacity: 0.6 });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 3;
    group.add(orbitRing);

    // Lighting
    const light1 = new THREE.DirectionalLight(0x38bdf8, 3.8);
    light1.position.set(3, 4, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xd97706, 2.5);
    light2.position.set(-3, -3, 2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now();

      // Fluid levitation and dynamic 3D rotation
      group.rotation.y += 0.013;
      group.rotation.z = Math.sin(time * 0.001) * 0.12 + 0.15;
      group.position.y = Math.sin(time * 0.0016) * 0.1;
      orbitRing.rotation.z += 0.015;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bladeGeo.dispose();
      bladeMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ringInlayGeo.dispose();
      ringInlayMat.dispose();
      handleGeo.dispose();
      handleMat.dispose();
      pommelGeo.dispose();
      pommelMat.dispose();
      collarGeo.dispose();
      collarMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// 3. Era 2025: 3D Rumah Betang Dayak Spasial (Borneo Globe Platform)
export function RumahBetang3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 3.4);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // ── 1. TIANG PANGGUNG KAYU ULIN (10 STILT PILLARS) ──
    const pillarsGroup = new THREE.Group();
    const pillarGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.85, 10);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x181310,
      metalness: 0.8,
      roughness: 0.3
    });
    const pillarWireGeo = new THREE.WireframeGeometry(pillarGeo);
    const pillarWireMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.5 });

    const xOffsets = [-1.1, -0.55, 0, 0.55, 1.1];
    const zOffsets = [-0.42, 0.42];

    xOffsets.forEach((x) => {
      zOffsets.forEach((z) => {
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(x, -0.85, z);
        const wire = new THREE.LineSegments(pillarWireGeo, pillarWireMat);
        pillar.add(wire);
        pillarsGroup.add(pillar);
      });
    });
    group.add(pillarsGroup);

    // ── 2. GELAGAR PENYANGGA & LANTAI PANGGUNG SELASAR (ELEVATED DECK) ──
    const deckGeo = new THREE.BoxGeometry(2.9, 0.07, 1.25);
    const deckMat = new THREE.MeshStandardMaterial({
      color: 0x1f1915,
      metalness: 0.85,
      roughness: 0.25
    });
    const deckMesh = new THREE.Mesh(deckGeo, deckMat);
    deckMesh.position.y = -0.42;
    group.add(deckMesh);

    // Pagar Selasar Teras Depan (Veranda Railing)
    const railGroup = new THREE.Group();
    const railGeo = new THREE.BoxGeometry(2.7, 0.03, 0.03);
    const railMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const topRail = new THREE.Mesh(railGeo, railMat);
    topRail.position.set(0, -0.22, 0.55);
    railGroup.add(topRail);

    // Baluster posts
    const balusterGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.18, 6);
    const balusterMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    for (let i = -1.2; i <= 1.2; i += 0.3) {
      const baluster = new THREE.Mesh(balusterGeo, balusterMat);
      baluster.position.set(i, -0.31, 0.55);
      railGroup.add(baluster);
    }
    group.add(railGroup);

    // ── 3. BADAN UTAMA RUMAH PANJANG (MAIN CHAMBERS & WALLS) ──
    const bodyGeo = new THREE.BoxGeometry(2.7, 0.65, 0.88);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x121016,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.set(0, -0.07, -0.06);
    group.add(bodyMesh);

    // 5 Jendela/Bilik Bercahaya Kehidupan (Warm Glowing Community Windows)
    const windowsGroup = new THREE.Group();
    const winGeo = new THREE.PlaneGeometry(0.18, 0.22);
    const winMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const winAmberMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });

    const winX = [-0.95, -0.48, 0, 0.48, 0.95];
    winX.forEach((x, idx) => {
      const winMesh = new THREE.Mesh(winGeo, idx % 2 === 0 ? winMat : winAmberMat);
      winMesh.position.set(x, -0.07, 0.39);
      windowsGroup.add(winMesh);
    });
    group.add(windowsGroup);

    // ── 4. ATAP PELANA KHAS RUMAH BETANG (ICONIC GABLE ROOF) ──
    // Atap bersudut curam dengan bubungan membumbung
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-0.65, 0); // eave front
    roofShape.lineTo(0, 0.88); // ridge peak
    roofShape.lineTo(0.65, 0); // eave back
    roofShape.lineTo(0.58, -0.03);
    roofShape.lineTo(0, 0.8); // inner gable
    roofShape.lineTo(-0.58, -0.03);
    roofShape.closePath();

    const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
      depth: 3.1,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });
    roofGeo.center();

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x0f1515,
      metalness: 0.92,
      roughness: 0.18,
      flatShading: true
    });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.rotation.y = Math.PI / 2;
    roofMesh.position.set(0, 0.65, -0.06);
    group.add(roofMesh);

    // Luminous Emerald Roof Shingle Edges
    const roofEdges = new THREE.EdgesGeometry(roofGeo);
    const roofEdgesMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2, transparent: true, opacity: 0.85 });
    const wireRoof = new THREE.LineSegments(roofEdges, roofEdgesMat);
    roofMesh.add(wireRoof);

    // ── 5. TANDUK BUBUNGAN DAYAK / ORNAMEN BURUNG ENGGANG (GABLE HORNS) ──
    const hornsGroup = new THREE.Group();
    const hornGeo = new THREE.TorusGeometry(0.22, 0.024, 8, 20, Math.PI * 0.85);
    const hornMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });

    // Left Horn
    const hornLeft = new THREE.Mesh(hornGeo, hornMat);
    hornLeft.position.set(-1.54, 1.12, -0.06);
    hornLeft.rotation.z = Math.PI * 0.25;
    hornsGroup.add(hornLeft);

    // Right Horn
    const hornRight = new THREE.Mesh(hornGeo, hornMat);
    hornRight.position.set(1.54, 1.12, -0.06);
    hornRight.rotation.z = Math.PI * 0.55;
    hornsGroup.add(hornRight);

    group.add(hornsGroup);

    // ── 6. TANGGA TRADISIONAL BERTANGGA (HEJAN ULIN) ──
    const ladderGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.72, 8);
    const ladderMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 });
    const ladder = new THREE.Mesh(ladderGeo, ladderMat);
    ladder.position.set(0, -0.65, 0.82);
    ladder.rotation.x = -Math.PI / 4;
    group.add(ladder);

    // ── 7. PARTIKEL BIOSPFERA KUNANG-KUNANG BORNEO (RAINFOREST FIREFLIES) ──
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const rad = 1.2 + Math.random() * 1.0;
      pPos[i * 3] = Math.cos(a) * rad;
      pPos[i * 3 + 1] = -0.4 + Math.random() * 1.6;
      pPos[i * 3 + 2] = Math.sin(a) * rad;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x10b981, size: 0.04, transparent: true, opacity: 0.8 });
    const fireflies = new THREE.Points(pGeo, pMat);
    group.add(fireflies);

    // ── 8. LIGHTING ──
    const light1 = new THREE.DirectionalLight(0x10b981, 3.8);
    light1.position.set(3, 4, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xd97706, 2.8);
    light2.position.set(-3, -2, 2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 1.3));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now();

      // Continuous majestic 3D rotation & floating
      group.rotation.y += 0.0075;
      group.position.y = Math.sin(time * 0.0016) * 0.05;
      fireflies.rotation.y -= 0.004;

      // Warm pulsing windows
      winMat.opacity = 0.75 + Math.sin(time * 0.003) * 0.2;
      winAmberMat.opacity = 0.8 + Math.cos(time * 0.003) * 0.18;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pillarGeo.dispose();
      pillarMat.dispose();
      pillarWireGeo.dispose();
      pillarWireMat.dispose();
      deckGeo.dispose();
      deckMat.dispose();
      railGeo.dispose();
      railMat.dispose();
      balusterGeo.dispose();
      balusterMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      winGeo.dispose();
      winMat.dispose();
      winAmberMat.dispose();
      roofGeo.dispose();
      roofMat.dispose();
      roofEdges.dispose();
      roofEdgesMat.dispose();
      hornGeo.dispose();
      hornMat.dispose();
      ladderGeo.dispose();
      ladderMat.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// Backward compatibility alias
export const BatangGaring3D = RumahBetang3D;

// 4. Era 2026: 3D Talawang Sacred Shield (Cultural Computing Frontier)
export function TalawangShield3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // Traditional Hexagonal Pointed Silhouette of Talawang Dayak Shield
    const shape = new THREE.Shape();
    shape.moveTo(0, 1.6); // Top sharp point
    shape.lineTo(0.65, 0.95); // Upper right shoulder
    shape.lineTo(0.52, 0.0); // Waist taper
    shape.lineTo(0.62, -0.95); // Lower flank
    shape.lineTo(0, -1.6); // Bottom sharp point
    shape.lineTo(-0.62, -0.95); // Lower left flank
    shape.lineTo(-0.52, 0.0); // Left waist
    shape.lineTo(-0.65, 0.95); // Upper left shoulder
    shape.closePath();

    const shieldGeo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    });

    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x101116,
      metalness: 0.92,
      roughness: 0.18,
      flatShading: true
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    group.add(shieldMesh);

    // Golden Edge Contour Lines
    const edgesGeo = new THREE.EdgesGeometry(shieldGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 2 });
    const wireShield = new THREE.LineSegments(edgesGeo, edgesMat);
    shieldMesh.add(wireShield);

    // Central Creased Spine Ridge (Tulang Punggung Perisai 3D)
    const spineGeo = new THREE.CylinderGeometry(0.025, 0.035, 3.15, 6);
    const spineMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.15 });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.z = 0.07;
    group.add(spineMesh);

    // Traditional Protective Dayak Eye / Motif Inlays (Ukiran Kamang)
    const motifGroup = new THREE.Group();
    const createDiamondPts = (scale) => [
      new THREE.Vector3(0, 0.45 * scale, 0.08),
      new THREE.Vector3(0.28 * scale, 0, 0.08),
      new THREE.Vector3(0, -0.45 * scale, 0.08),
      new THREE.Vector3(-0.28 * scale, 0, 0.08),
      new THREE.Vector3(0, 0.45 * scale, 0.08)
    ];

    const dUpperGeo = new THREE.BufferGeometry().setFromPoints(createDiamondPts(1.0));
    const dUpperMat = new THREE.LineBasicMaterial({ color: 0x684aff, linewidth: 2 });
    const dUpper = new THREE.Line(dUpperGeo, dUpperMat);
    dUpper.position.y = 0.55;
    motifGroup.add(dUpper);

    const dLowerGeo = new THREE.BufferGeometry().setFromPoints(createDiamondPts(1.0));
    const dLowerMat = new THREE.LineBasicMaterial({ color: 0x684aff, linewidth: 2 });
    const dLower = new THREE.Line(dLowerGeo, dLowerMat);
    dLower.position.y = -0.55;
    motifGroup.add(dLower);

    group.add(motifGroup);

    // Floating Quantum Gem Core (Inti Pusaka Spasial)
    const coreGeo = new THREE.OctahedronGeometry(0.22, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x684aff,
      emissive: 0x221155,
      metalness: 0.95,
      roughness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.z = 0.22;
    group.add(coreMesh);

    // Dual Spatial Kinetic Forcefield Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.015, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x684aff, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.4, 0.012, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.6 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xd97706, 3.5);
    light1.position.set(4, 3, 3);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0x684aff, 3.0);
    light2.position.set(-3, -3, 2);
    scene.add(light2);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = performance.now();

      group.rotation.y += 0.011;
      group.rotation.x = Math.sin(time * 0.001) * 0.14;
      coreMesh.rotation.x += 0.02;
      coreMesh.rotation.y += 0.03;
      ring1.rotation.z += 0.012;
      ring2.rotation.x += 0.014;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 300;
      height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      spineGeo.dispose();
      spineMat.dispose();
      dUpperGeo.dispose();
      dUpperMat.dispose();
      dLowerGeo.dispose();
      dLowerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`w-full h-full min-h-[260px] ${className}`} />;
}

// Aliases for seamless backward compatibility
export {
  BungaTerong3D as WireframeMatrix3D,
  CyberMandau3D as TorusKnot3D,
  BatangGaring3D as CelestialGlobe3D,
  TalawangShield3D as SacredShield3D
};

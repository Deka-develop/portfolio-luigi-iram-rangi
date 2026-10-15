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

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, RotateCcw, Sparkles } from 'lucide-react';

export default function ScrollWebGLCanvas({ className = '' }) {
  const mountRef = useRef(null);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [themeColor, setThemeColor] = useState('violet'); // 'violet' | 'gold' | 'emerald'
  const [fps, setFps] = useState(60);
  const [currentPhase, setCurrentPhase] = useState('HERO // TALAWANG DIAMOND');
  const [scrollPercent, setScrollPercent] = useState(0);

  const wireframeRef = useRef(wireframeOnly);
  const themeRef = useRef(themeColor);
  const scrollRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    prevY: 0
  });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const objectsRef = useRef({});

  // Sync state into refs for render loop
  useEffect(() => {
    wireframeRef.current = wireframeOnly;
    themeRef.current = themeColor;
  }, [wireframeOnly, themeColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    // 2. WebGL Renderer
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
      renderer.toneMappingExposure = 1.3;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL failed to initialize:', e);
      return;
    }

    // 3. Dynamic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLightViolet = new THREE.DirectionalLight(0x684aff, 3.6);
    dirLightViolet.position.set(4, 5, 4);
    scene.add(dirLightViolet);

    const dirLightAmber = new THREE.DirectionalLight(0xd97706, 3.0);
    dirLightAmber.position.set(-4, -3, -2);
    scene.add(dirLightAmber);

    const pointLight = new THREE.PointLight(0xffffff, 2.2, 18);
    pointLight.position.set(0, 0, 3.5);
    scene.add(pointLight);

    // 4. Kinetic Hierarchy
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const mainGroup = new THREE.Group();
    rootGroup.add(mainGroup);

    // Central Dayak Diamond Shield Core
    const shieldGeo = new THREE.OctahedronGeometry(1.0, 0);
    shieldGeo.scale(0.85, 1.4, 0.85);

    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.92,
      roughness: 0.16,
      flatShading: true
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, solidMat);
    mainGroup.add(shieldMesh);

    // Edge Wireframe Overlay
    const wireGeo = new THREE.WireframeGeometry(shieldGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x684aff,
      linewidth: 2,
      transparent: true,
      opacity: 0.95
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    mainGroup.add(wireLines);

    // Counter-Rotating Inner Sacred Core
    const innerGeo = new THREE.OctahedronGeometry(0.44, 0);
    innerGeo.scale(0.8, 1.25, 0.8);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // Orbital Ring 1 (Equatorial Ring)
    const ring1Geo = new THREE.TorusGeometry(1.68, 0.024, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x684aff,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x3b1c9c,
      emissiveIntensity: 0.4
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Orbital Ring 2 (Meridian Ring with nodes)
    const ring2Geo = new THREE.TorusGeometry(1.95, 0.02, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.3
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    mainGroup.add(ring2);

    // 4 Jewel Nodes on Ring 2
    const nodeGeo = new THREE.OctahedronGeometry(0.08, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI * 2) / 4;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.95, Math.sin(angle) * 1.95, 0);
      ring2.add(node);
    }

    // Outer Ambient Floating Stardust Particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 2.2;
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
      size: 0.045,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    objectsRef.current = {
      rootGroup,
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

    // 5. Scroll Event Listener with Velocity Calculation
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      
      const deltaY = scrollY - scrollRef.current.prevY;
      scrollRef.current.prevY = scrollY;
      scrollRef.current.target = progress;
      scrollRef.current.velocity = deltaY;
    };

    const onPointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx * 0.45;
      mouseRef.current.targetY = ny * 0.35;
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    // 6. Animation Loop with Multi-Phase Spatial Scroll Kinematics
    let animId;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;
    let lastUiUpdate = 0;

    const animate = (currentTime) => {
      animId = requestAnimationFrame(animate);

      // FPS tracking
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth lerp of scroll progress
      const scrollObj = scrollRef.current;
      scrollObj.current += (scrollObj.target - scrollObj.current) * 0.08;
      scrollObj.velocity *= 0.92; // decay velocity

      const p = scrollObj.current;
      const isMobile = window.innerWidth < 1024;

      // ──────────────── MULTI-PHASE 3D SCROLL CHOREOGRAPHY ────────────────
      let targetX = 0;
      let targetY = 0;
      let targetZ = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let targetRotZ = 0;
      let targetScale = 1.0;
      let targetRingScale = 1.0;
      let phaseTitle = 'HERO // TALAWANG DIAMOND';

      if (p < 0.10) {
        // Phase 0: Hero Centerpiece
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetRotX = 0.05;
        targetRotY = p * 4;
        targetRotZ = 0;
        targetScale = isMobile ? 0.75 : 0.95;
        targetRingScale = 1.0;
        phaseTitle = 'HERO // TALAWANG DIAMOND';
      } else if (p < 0.35) {
        // Phase 1: Chapter 01 Manifesto & Cultural Roots (Slides Right, deeper Z)
        const subP = (p - 0.10) / (0.35 - 0.10);
        targetX = isMobile ? 0 : 2.25 * subP;
        targetY = isMobile ? -0.15 : -0.25 * subP;
        targetZ = isMobile ? -1.5 : -0.65;
        targetRotX = 0.35 * subP;
        targetRotY = (p * 5) + (subP * 2.2);
        targetRotZ = 0.25 * subP;
        targetScale = isMobile ? 0.65 : 0.9 + (subP * 0.15);
        targetRingScale = 1.0 + (subP * 0.4);
        phaseTitle = 'CH.01 // MANIFESTO TRANSFORMATION';
      } else if (p < 0.62) {
        // Phase 2: Chapter 02 Three Pillars (Centers High as Floating Gyroscope)
        const subP = (p - 0.35) / (0.62 - 0.35);
        targetX = isMobile ? 0 : 2.25 * (1 - subP);
        targetY = 0.75 * subP;
        targetZ = isMobile ? -1.5 : -0.95;
        targetRotX = 0.65 + (subP * 0.2);
        targetRotY = (p * 7);
        targetRotZ = -0.3 * subP;
        targetScale = isMobile ? 0.65 : 1.05;
        targetRingScale = 1.4 + (subP * 0.35);
        phaseTitle = 'CH.02 // TRIAD GYROSCOPE MATRIX';
      } else if (p < 0.85) {
        // Phase 3: Chapter 03 & 04 Ethos & Persona (Slides Left)
        const subP = (p - 0.62) / (0.85 - 0.62);
        targetX = isMobile ? 0 : -2.25 * subP;
        targetY = -0.1 * (1 - subP);
        targetZ = isMobile ? -1.5 : -0.65;
        targetRotX = -0.25 * subP;
        targetRotY = (p * 9);
        targetRotZ = 0.35 * subP;
        targetScale = isMobile ? 0.65 : 0.95;
        targetRingScale = 1.25;
        phaseTitle = 'CH.03-04 // CELESTIAL ETHOS';
      } else {
        // Phase 4: Chapter 05 Gateway to Worlds (Forward Zoom Portal)
        const subP = (p - 0.85) / (1.0 - 0.85);
        targetX = isMobile ? 0 : -2.25 * (1 - subP);
        targetY = 0.2;
        targetZ = isMobile ? -0.8 : -0.2;
        targetRotX = 0.2;
        targetRotY = (p * 12);
        targetRotZ = 0;
        targetScale = isMobile ? 0.75 : 1.15;
        targetRingScale = 1.6 + (subP * 0.4);
        phaseTitle = 'CH.05 // DIMENSIONAL GATEWAY';
      }

      // Smooth position & rotation lerp
      rootGroup.position.x += (targetX - rootGroup.position.x) * 0.08;
      rootGroup.position.y += (targetY - rootGroup.position.y) * 0.08;
      rootGroup.position.z += (targetZ - rootGroup.position.z) * 0.08;

      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.z += (targetRotZ - rootGroup.rotation.z) * 0.08;

      const currentScale = rootGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.08;
      rootGroup.scale.set(newScale, newScale, newScale);

      // Ring Expansion Lerp
      const rScale = ring1.scale.x;
      const newRScale = rScale + (targetRingScale - rScale) * 0.08;
      ring1.scale.set(newRScale, newRScale, newRScale);
      ring2.scale.set(newRScale, newRScale, newRScale);

      // Idle Rotation + Scroll Velocity Injection
      const velocityImpact = scrollObj.velocity * 0.003;
      mainGroup.rotation.y += (0.45 * delta) + velocityImpact;
      mainGroup.rotation.x += (velocityImpact * 0.4);
      innerCore.rotation.y -= (0.85 * delta) + (velocityImpact * 1.5);
      ring1.rotation.z += (0.6 * delta) + velocityImpact;
      ring2.rotation.x -= (0.4 * delta) - velocityImpact;
      particles.rotation.y += 0.12 * delta;

      // Mouse Parallax Lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      camera.position.x = mouseRef.current.x * 0.7;
      camera.position.y = mouseRef.current.y * 0.7;
      camera.lookAt(0, 0, 0);

      // Wireframe Mode
      shieldMesh.visible = !wireframeRef.current;

      // Update UI Telemetry periodically (every 120ms to prevent React churn)
      if (currentTime - lastUiUpdate > 120) {
        lastUiUpdate = currentTime;
        setScrollPercent(Math.round(p * 100));
        setCurrentPhase(phaseTitle);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Theme color updates
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
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="w-full h-full relative"
      />

      {/* Floating WebGL Scroll HUD Telemetry Bar */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-black/10 shadow-xl text-[10px] md:text-[11px] font-mono tracking-wider transition-all">
        
        {/* Real-time Indicator & Phase */}
        <div className="flex items-center gap-2 pr-2 border-r border-black/10">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-bold text-[#111111] uppercase hidden sm:inline">WebGL 3D Scroll:</span>
          <span className="text-[#684AFF] font-bold uppercase">{currentPhase}</span>
        </div>

        {/* Scroll Progress Metric */}
        <div className="flex items-center gap-1.5 text-[#111111]/70">
          <Sparkles className="w-3 h-3 text-[#D97706]" aria-hidden="true" />
          <span>{scrollPercent}%</span>
        </div>

        <div className="w-px h-3 bg-black/10 hidden sm:block" />

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframeOnly((prev) => !prev)}
          aria-label={wireframeOnly ? 'Aktifkan mode solid' : 'Aktifkan mode wireframe'}
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold transition-colors cursor-pointer flex items-center gap-1 ${
            wireframeOnly ? 'bg-[#111111] text-white' : 'hover:bg-black/5 text-[#111111]'
          }`}
          title="Toggle Wireframe"
        >
          <Box className="w-2.5 h-2.5" />
          <span>{wireframeOnly ? 'Wire' : 'Solid'}</span>
        </button>

        {/* Color Palette Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setThemeColor('violet')}
            aria-label="Warna Violet"
            className={`w-3 h-3 rounded-full bg-[#684AFF] transition-transform ${
              themeColor === 'violet' ? 'ring-2 ring-black scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          />
          <button
            onClick={() => setThemeColor('gold')}
            aria-label="Warna Emas"
            className={`w-3 h-3 rounded-full bg-[#D97706] transition-transform ${
              themeColor === 'gold' ? 'ring-2 ring-black scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          />
          <button
            onClick={() => setThemeColor('emerald')}
            aria-label="Warna Emerald"
            className={`w-3 h-3 rounded-full bg-[#10B981] transition-transform ${
              themeColor === 'emerald' ? 'ring-2 ring-black scale-110' : 'opacity-60 hover:opacity-100'
            }`}
          />
        </div>

        <div className="w-px h-3 bg-black/10" />

        {/* FPS Telemetry */}
        <span className="text-[#111111]/50 text-[9px] uppercase hidden md:inline">
          {fps} FPS
        </span>

        {/* Reset View Button */}
        <button
          onClick={resetView}
          aria-label="Reset orientasi WebGL"
          className="p-1 rounded-full hover:bg-black/5 text-[#111111] transition-colors cursor-pointer"
          title="Reset Orientasi"
        >
          <RotateCcw className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
}

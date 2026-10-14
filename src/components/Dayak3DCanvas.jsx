import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Eye, Gauge, Sparkles } from 'lucide-react';

export default function Dayak3DCanvas({ className = '' }) {
  const mountRef = useRef(null);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [spinSpeed, setSpinSpeed] = useState('normal'); // 'normal' | 'fast' | 'pause'
  const [isInteracting, setIsInteracting] = useState(false);
  const [fps, setFps] = useState(60);

  // Mutable refs for Three.js instances to avoid re-renders
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const objectsRef = useRef({});
  const wireframeRef = useRef(wireframeOnly);
  const speedRef = useRef(spinSpeed);

  wireframeRef.current = wireframeOnly;
  speedRef.current = spinSpeed;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    // 2. High-performance WebGL Renderer with Alpha
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
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL failed to initialize:', e);
      return;
    }

    // 3. Dynamic Lighting (Dayak Ochre + Emerald Ambient + Golden Point)
    const ambientLight = new THREE.AmbientLight(0xfffbf5, 1.2);
    scene.add(ambientLight);

    const dirLightGold = new THREE.DirectionalLight(0xd97706, 2.8);
    dirLightGold.position.set(4, 5, 4);
    scene.add(dirLightGold);

    const dirLightEmerald = new THREE.DirectionalLight(0x0d5c3a, 1.4);
    dirLightEmerald.position.set(-4, -3, -2);
    scene.add(dirLightEmerald);

    const pointLight = new THREE.PointLight(0xf59e0b, 1.6, 12);
    pointLight.position.set(0, 0, 2.2);
    scene.add(pointLight);

    // 4. Procedural Dayak Kinetic Artifact Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Geometry: Elongated Dayak Diamond Shield Core
    const shieldGeo = new THREE.OctahedronGeometry(1.0, 0);
    shieldGeo.scale(0.85, 1.35, 0.85); // Traditional Dayak diamond proportions

    // Solid obsidian material
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x141413,
      metalness: 0.8,
      roughness: 0.25,
      flatShading: true
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, solidMat);
    mainGroup.add(shieldMesh);

    // Golden wireframe edge cage
    const wireGeo = new THREE.WireframeGeometry(shieldGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xd97706,
      linewidth: 2,
      transparent: true,
      opacity: 0.95
    });
    const wireLines = new THREE.LineSegments(wireGeo, wireMat);
    mainGroup.add(wireLines);

    // Inner Glowing Core (Inverted diamond that counter-rotates)
    const innerGeo = new THREE.OctahedronGeometry(0.42, 0);
    innerGeo.scale(0.8, 1.2, 0.8);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // Orbital Ring 1 (Gold Equatorial Astrolabe)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.022, 16, 72);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.95,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Orbital Ring 2 (Carbon Meridian Ring with 4 golden jewel nodes)
    const ring2Geo = new THREE.TorusGeometry(1.88, 0.018, 16, 72);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x262624,
      metalness: 0.85,
      roughness: 0.3
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    mainGroup.add(ring2);

    // 4 Cardinal Diamond Nodes on Ring 2
    const nodeGeo = new THREE.OctahedronGeometry(0.07, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const nodeCount = 4;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * Math.PI * 2) / nodeCount;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.88, Math.sin(angle) * 1.88, 0);
      ring2.add(node);
    }

    // Golden Micro-Stardust Embers (BufferGeometry)
    const particleCount = 85;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.9 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd97706,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    objectsRef.current = {
      mainGroup,
      shieldMesh,
      wireLines,
      innerCore,
      ring1,
      ring2,
      particles,
      solidMat
    };

    // 5. Interactive Drag Rotation (STRICT CONSTRAINT: NO CURSOR-FOLLOW TRACKING!)
    // Rotation is ONLY affected when user explicitly drags or touches INSIDE the canvas.
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      velY = dx * 0.007;
      velX = dy * 0.007;

      mainGroup.rotation.y += velY;
      mainGroup.rotation.x += velX;
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none'; // Smooth touch without page stutter
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // 6. Responsive Auto-Resize via ResizeObserver
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

    // 7. Render Loop with Inertia Damping & Performance Telemetry
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const animate = (currentTime) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // FPS Measurement
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      // Base auto-rotation speed based on state
      let baseSpeed = 0.008;
      if (speedRef.current === 'fast') baseSpeed = 0.024;
      if (speedRef.current === 'pause') baseSpeed = 0.0;

      // Handle Wireframe toggle
      if (shieldMesh) {
        shieldMesh.visible = !wireframeRef.current;
      }

      // Inertia decay for drag rotation
      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        mainGroup.rotation.x += velX;
        mainGroup.rotation.y += velY + baseSpeed;
      }

      // Opposing kinetic rotations for inner elements
      innerCore.rotation.y -= baseSpeed * 1.8;
      innerCore.rotation.x += baseSpeed * 0.7;

      ring1.rotation.z += baseSpeed * 1.2;
      ring2.rotation.y -= baseSpeed * 0.9;
      ring2.rotation.x += baseSpeed * 0.5;

      particles.rotation.y += baseSpeed * 0.3;

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    // 8. Robust Clean-up on Unmount
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      resizeObserver.disconnect();

      // Geometries & Materials disposal
      shieldGeo.dispose();
      solidMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  const handleResetOrientation = () => {
    if (objectsRef.current?.mainGroup) {
      objectsRef.current.mainGroup.rotation.set(0, 0, 0);
    }
  };

  const cycleSpeed = () => {
    setSpinSpeed((prev) => {
      if (prev === 'normal') return 'fast';
      if (prev === 'fast') return 'pause';
      return 'normal';
    });
  };

  return (
    <div className={`relative flex flex-col bg-paper-dark border-2 border-ink shadow-[5px_5px_0_#D97706] ${className}`}>
      
      {/* Archival Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-ink text-paper border-b border-ink select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ochre animate-pulse" />
          <span className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-paper">
            WebGL 3D // Pusaka Kinetik Dayak
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-paper/70">
          <span className="text-ochre font-bold">R183</span>
          <span>•</span>
          <span>{fps} FPS</span>
        </div>
      </div>

      {/* Three.js Interactive Canvas Viewport */}
      <div
        ref={mountRef}
        className={`relative w-full h-64 sm:h-72 md:h-80 select-none touch-none ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        title="Klik & Geser untuk memutar 3D (Drag to rotate)"
      >
        {/* Subtle Watermark HUD */}
        <div className="absolute top-2 left-3 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
          THREE.JS PROCEDURAL MESH
        </div>

        {/* Interaction Hint Pill */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 bg-paper/90 border border-ink/20 backdrop-blur-sm rounded-full font-mono text-[9px] uppercase tracking-wider text-ink/80 flex items-center gap-1.5 transition-opacity duration-300 ${
            isInteracting ? 'opacity-30' : 'opacity-90'
          }`}
        >
          <Sparkles className="w-3 h-3 text-ochre" />
          <span>Geser untuk memutar 360°</span>
        </div>
      </div>

      {/* Archival Control Footer */}
      <div className="flex items-center justify-between px-3 py-2 bg-paper border-t border-ink/15 text-ink font-mono text-[10px] uppercase">
        <div className="flex items-center gap-2">
          {/* Wireframe Toggle */}
          <button
            onClick={() => setWireframeOnly((prev) => !prev)}
            className={`px-2.5 py-1 border border-ink transition-colors cursor-pointer flex items-center gap-1 ${
              wireframeOnly ? 'bg-ochre text-white font-bold' : 'bg-paper hover:bg-paper-dark'
            }`}
            title="Ganti mode Wireframe / Solid"
          >
            <Eye className="w-3 h-3" />
            <span>{wireframeOnly ? 'Wireframe' : 'Solid'}</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="px-2.5 py-1 border border-ink bg-paper hover:bg-paper-dark transition-colors cursor-pointer flex items-center gap-1"
            title="Ubah kecepatan rotasi kinetik"
          >
            <Gauge className="w-3 h-3 text-ochre" />
            <span className="capitalize">{spinSpeed}</span>
          </button>
        </div>

        {/* Reset Orientation */}
        <button
          onClick={handleResetOrientation}
          className="p-1.5 border border-ink bg-paper hover:bg-ochre hover:text-white transition-colors cursor-pointer"
          title="Reset posisi rotasi"
          aria-label="Reset rotasi"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}

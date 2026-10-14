import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  RotateCw, 
  Eye, 
  Layers, 
  Cpu, 
  Maximize2, 
  Activity, 
  Compass,
  Palette,
  Atom,
  ScanFace
} from 'lucide-react';

const COLOR_THEMES = {
  cyan: {
    name: 'Cyber Cyan',
    primary: 0x00f0ff,
    secondary: 0x0077ff,
    accent: 0xa64dff,
    bgGlow: 'from-cyan-500/20 via-blue-600/10 to-transparent',
    badgeBorder: 'border-cyan-500/40 text-cyan-300',
    dot: 'bg-cyan-400',
    hex: '#00f0ff'
  },
  violet: {
    name: 'Neon Violet',
    primary: 0xb537f2,
    secondary: 0xec4899,
    accent: 0x6366f1,
    bgGlow: 'from-purple-500/20 via-pink-600/10 to-transparent',
    badgeBorder: 'border-purple-500/40 text-purple-300',
    dot: 'bg-purple-400',
    hex: '#b537f2'
  },
  emerald: {
    name: 'Matrix Mint',
    primary: 0x10b981,
    secondary: 0x06b6d4,
    accent: 0x84cc16,
    bgGlow: 'from-emerald-500/20 via-teal-600/10 to-transparent',
    badgeBorder: 'border-emerald-500/40 text-emerald-300',
    dot: 'bg-emerald-400',
    hex: '#10b981'
  },
  gold: {
    name: 'Solar Gold',
    primary: 0xf59e0b,
    secondary: 0xef4444,
    accent: 0xfbbf24,
    bgGlow: 'from-amber-500/20 via-orange-600/10 to-transparent',
    badgeBorder: 'border-amber-500/40 text-amber-300',
    dot: 'bg-amber-400',
    hex: '#f59e0b'
  }
};

// Authentic 3D Anatomical Human Face (with Cyber Holographic Shader & Wireframe Lattice)
function createHumanFaceGroup(theme, onLoaded) {
  const group = new THREE.Group();
  const materials = [];

  // 1. Glossy Cyber Human Skin Material
  const faceMat = new THREE.MeshPhysicalMaterial({
    color: theme.primary,
    emissive: theme.primary,
    emissiveIntensity: 0.22,
    metalness: 0.35,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    transparent: true,
    opacity: 0.78
  });
  materials.push(faceMat);

  // 2. Glowing Magenta Wireframe Lattice Material
  const faceWireMat = new THREE.LineBasicMaterial({
    color: theme.accent,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  faceWireMat.userData = { forceWireframe: true };
  materials.push(faceWireMat);

  let faceMesh = null;
  let faceWireMesh = null;

  // 3. Forehead Neural Processor Octahedron
  const neuralCoreGeo = new THREE.OctahedronGeometry(0.08, 0);
  const neuralCoreMat = new THREE.MeshStandardMaterial({
    color: theme.primary,
    emissive: theme.primary,
    emissiveIntensity: 3.0,
    roughness: 0.1
  });
  materials.push(neuralCoreMat);
  const neuralCore = new THREE.Mesh(neuralCoreGeo, neuralCoreMat);
  neuralCore.position.set(0, 0.45, 0.82);
  group.add(neuralCore);

  // 4. Floating Holographic Gimbal Rings
  const gimbalGeo1 = new THREE.RingGeometry(1.65, 1.68, 48);
  const gimbalMat1 = new THREE.MeshBasicMaterial({
    color: theme.primary,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.35
  });
  materials.push(gimbalMat1);
  const gimbal1 = new THREE.Mesh(gimbalGeo1, gimbalMat1);
  gimbal1.rotation.x = Math.PI / 3;
  group.add(gimbal1);

  const gimbalGeo2 = new THREE.RingGeometry(1.82, 1.84, 48);
  const gimbalMat2 = new THREE.MeshBasicMaterial({
    color: theme.accent,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3
  });
  materials.push(gimbalMat2);
  const gimbal2 = new THREE.Mesh(gimbalGeo2, gimbalMat2);
  gimbal2.rotation.y = Math.PI / 4;
  group.add(gimbal2);

  // 5. Load Real Human Face Scan (LeePerrySmith GLB)
  const modelUrl = (import.meta.env.BASE_URL || './') + 'models/human_face.glb';
  const loader = new GLTFLoader();
  loader.load(modelUrl, (gltf) => {
    let sourceMesh = null;
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        sourceMesh = child;
      }
    });

    if (sourceMesh) {
      const geo = sourceMesh.geometry;
      geo.center();

      faceMesh = new THREE.Mesh(geo, faceMat);
      faceMesh.scale.set(0.3, 0.3, 0.3);
      group.add(faceMesh);

      const wireGeo = new THREE.WireframeGeometry(geo);
      faceWireMesh = new THREE.LineSegments(wireGeo, faceWireMat);
      faceWireMesh.scale.set(0.3008, 0.3008, 0.3008);
      group.add(faceWireMesh);

      if (onLoaded) {
        onLoaded({ faceMesh, faceWireMesh });
      }
    }
  }, undefined, (err) => {
    console.warn('Failed to load human face GLB:', err);
  });

  return {
    group,
    materials,
    elements: {
      faceMat,
      faceWireMat,
      neuralCore,
      neuralCoreMat,
      gimbal1,
      gimbal2,
      gimbalMat1,
      gimbalMat2
    }
  };
}

const GEOMETRY_MODES = [
  { id: 'face', label: 'Human AI Avatar', shortLabel: 'AI Human', icon: ScanFace },
  { id: 'core', label: 'Quantum Core', shortLabel: 'Core', icon: Atom },
  { id: 'nebula', label: 'Vortex Cloud', shortLabel: 'Cloud', icon: Sparkles },
  { id: 'lattice', label: 'Cyber Lattice', shortLabel: 'Lattice', icon: Layers }
];

export default function CyberCoreCanvas() {
  const mountRef = useRef(null);
  
  // Interactive State
  const [activeMode, setActiveMode] = useState('face');
  const [activeTheme, setActiveTheme] = useState('cyan');
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Live Telemetry Readout
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    frameTime: 16.6,
    gpuRenderer: 'Detecting GPU...',
    vertices: 4800,
    faces: 9600,
    rotX: 0,
    rotY: 0
  });

  // Three.js mutable state refs
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    startTime: performance.now(),
    mainGroup: null,
    meshes: {},
    particles: null,
    rings: [],
    materials: [],
    targetRotation: { x: 0.2, y: 0.3 },
    currentRotation: { x: 0.2, y: 0.3 },
    pointer: { x: 0, y: 0, isDown: false, prevX: 0, prevY: 0 },
    fpsHistory: [],
    lastFrameTime: performance.now(),
    frameCount: 0,
    activeMode: 'face',
    activeTheme: 'cyan',
    isWireframe: false,
    autoRotate: true
  });

  // Keep stateRef synced with React state for render loop access
  useEffect(() => {
    stateRef.current.activeMode = activeMode;
    stateRef.current.isWireframe = isWireframe;
    stateRef.current.autoRotate = autoRotate;
    updateSceneVisuals();
  }, [activeMode, isWireframe, autoRotate]);

  useEffect(() => {
    stateRef.current.activeTheme = activeTheme;
    updateThemeMaterials();
  }, [activeTheme]);

  // Update theme colors dynamically on materials
  const updateThemeMaterials = () => {
    const theme = COLOR_THEMES[activeTheme];
    if (!theme) return;

    const { materials, pointLight1, pointLight2 } = stateRef.current;
    if (pointLight1) pointLight1.color.setHex(theme.primary);
    if (pointLight2) pointLight2.color.setHex(theme.secondary);

    if (materials) {
      materials.forEach(mat => {
        if (mat.isMeshPhysicalMaterial || mat.isMeshStandardMaterial) {
          mat.color.setHex(theme.primary);
          mat.emissive.setHex(theme.primary);
        } else if (mat.isLineBasicMaterial) {
          mat.color.setHex(theme.accent);
        } else if (mat.isPointsMaterial) {
          mat.color.setHex(theme.primary);
        }
      });
    }

    if (stateRef.current.faceElements) {
      const { 
        faceMat, 
        faceWireMat, 
        neuralCoreMat, 
        gimbalMat1, 
        gimbalMat2
      } = stateRef.current.faceElements;
      if (faceMat) {
        faceMat.color.setHex(theme.primary);
        faceMat.emissive.setHex(theme.primary);
      }
      if (faceWireMat) faceWireMat.color.setHex(theme.accent);
      if (neuralCoreMat) {
        neuralCoreMat.color.setHex(theme.primary);
        neuralCoreMat.emissive.setHex(theme.primary);
      }
      if (gimbalMat1) gimbalMat1.color.setHex(theme.primary);
      if (gimbalMat2) gimbalMat2.color.setHex(theme.accent);
    }
  };

  // Toggle active visual group
  const updateSceneVisuals = () => {
    const { meshes } = stateRef.current;
    if (!meshes) return;

    Object.keys(meshes).forEach(key => {
      if (meshes[key]) {
        meshes[key].visible = (key === stateRef.current.activeMode);
      }
    });

    // Update wireframe property on applicable materials
    if (stateRef.current.materials) {
      stateRef.current.materials.forEach(mat => {
        if ('wireframe' in mat && !mat.userData?.forceWireframe) {
          mat.wireframe = stateRef.current.isWireframe;
        }
      });
    }

    // Update telemetry counts
    if (stateRef.current.activeMode === 'face') {
      setTelemetry(prev => ({ ...prev, vertices: 9279, faces: 18558 }));
    } else if (stateRef.current.activeMode === 'core') {
      setTelemetry(prev => ({ ...prev, vertices: 6240, faces: 12480 }));
    } else if (stateRef.current.activeMode === 'nebula') {
      setTelemetry(prev => ({ ...prev, vertices: 3200, faces: 0 }));
    } else {
      setTelemetry(prev => ({ ...prev, vertices: 2562, faces: 5120 }));
    }
  };

  // Primary Three.js Setup & Animation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.08);
    stateRef.current.scene = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);
    stateRef.current.camera = camera;

    // Adaptive quality: phones / touch devices get a lighter pipeline
    const isLowPower = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

    // 3. Renderer with adaptive configuration
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isLowPower,
      powerPreference: isLowPower ? 'low-power' : 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1 : 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.touchAction = 'pan-y';
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // Safe hardware renderer info without deprecated extension warnings
    try {
      const gl = renderer.getContext();
      const rendererStr = gl.getParameter(gl.RENDERER) || 'WebGL 2.0 GPU';
      setTelemetry(prev => ({
        ...prev,
        gpuRenderer: isLowPower ? 'Mobile WebGL GPU' : rendererStr.replace('ANGLE (', '').split(',')[0].trim()
      }));
    } catch {
      setTelemetry(prev => ({ ...prev, gpuRenderer: 'Hardware Accelerated WebGL' }));
    }

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(COLOR_THEMES.cyan.primary, 35, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    stateRef.current.pointLight1 = pointLight1;

    const pointLight2 = new THREE.PointLight(COLOR_THEMES.cyan.secondary, 25, 10);
    pointLight2.position.set(-3, -2, -2);
    scene.add(pointLight2);
    stateRef.current.pointLight2 = pointLight2;

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // 5. Main Content Hierarchy
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    stateRef.current.mainGroup = mainGroup;

    const materialsList = [];

    // --- Mode 0: Real Anatomical Human Face (Holographic Cyber Shader) ---
    const faceData = createHumanFaceGroup(COLOR_THEMES[activeTheme] || COLOR_THEMES.cyan, () => {
      if (stateRef.current.activeMode === 'face') {
        setTelemetry(prev => ({ ...prev, vertices: 9279, faces: 18558 }));
      }
    });
    mainGroup.add(faceData.group);
    materialsList.push(...faceData.materials);
    stateRef.current.faceElements = faceData.elements;

    // --- Mode 1: Quantum Core (Torus Knot + Holographic Wireframe + Orbital Rings) ---
    const coreGroup = new THREE.Group();
    coreGroup.visible = false;
    mainGroup.add(coreGroup);

    // Primary Torus Knot Geometry (optimized tessellation)
    const torusGeo = isLowPower
      ? new THREE.TorusKnotGeometry(1.0, 0.32, 60, 12, 2, 3)
      : new THREE.TorusKnotGeometry(1.0, 0.32, 80, 16, 2, 3);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: COLOR_THEMES.cyan.primary,
      emissive: COLOR_THEMES.cyan.primary,
      emissiveIntensity: 0.22,
      metalness: 0.35,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.78
    });
    materialsList.push(torusMat);
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    coreGroup.add(torusMesh);

    // Inner Luminous Wireframe Lattice
    const wireGeo = new THREE.WireframeGeometry(torusGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: COLOR_THEMES.cyan.accent,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    wireMat.userData = { forceWireframe: true };
    materialsList.push(wireMat);
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireMesh.scale.set(1.003, 1.003, 1.003);
    coreGroup.add(wireMesh);

    // Outer Gyro Gimbal Rings
    const ringGeo1 = new THREE.RingGeometry(1.65, 1.68, 36);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(1.82, 1.84, 36);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: COLOR_THEMES.cyan.primary,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    materialsList.push(ringMat2);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // --- Mode 2: Vortex Particle Nebula ---
    const nebulaGroup = new THREE.Group();
    nebulaGroup.visible = false;
    mainGroup.add(nebulaGroup);

    const particleCount = isLowPower ? 600 : 1200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleOrigins = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      particleScales[i] = Math.random();

      particleOrigins.push({ radius, theta, phi, speed: 0.2 + Math.random() * 0.8 });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Generate circular particle texture programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(0,240,255,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: COLOR_THEMES.cyan.primary
    });
    materialsList.push(particleMat);

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    nebulaGroup.add(particleSystem);

    // --- Mode 3: Cyber Lattice (Dual Nested Geodesic Polyhedron) ---
    const latticeGroup = new THREE.Group();
    latticeGroup.visible = false;
    mainGroup.add(latticeGroup);

    const icoGeoOuter = new THREE.IcosahedronGeometry(1.35, 2);
    const icoMatOuter = new THREE.MeshStandardMaterial({
      color: COLOR_THEMES.cyan.primary,
      wireframe: true,
      emissive: COLOR_THEMES.cyan.primary,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8
    });
    materialsList.push(icoMatOuter);
    const icoOuter = new THREE.Mesh(icoGeoOuter, icoMatOuter);
    latticeGroup.add(icoOuter);

    const icoGeoInner = new THREE.IcosahedronGeometry(0.85, 1);
    const icoMatInner = new THREE.MeshPhysicalMaterial({
      color: COLOR_THEMES.cyan.secondary,
      emissive: COLOR_THEMES.cyan.secondary,
      emissiveIntensity: 0.4,
      metalness: 0.2,
      roughness: 0.15,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.8
    });
    materialsList.push(icoMatInner);
    const icoInner = new THREE.Mesh(icoGeoInner, icoMatInner);
    latticeGroup.add(icoInner);

    // Satellite Floating Cyber Nodes
    const satelliteGroup = new THREE.Group();
    latticeGroup.add(satelliteGroup);
    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 8; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / 8) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 1.7, Math.sin(angle * 2) * 0.4, Math.sin(angle) * 1.7);
      satelliteGroup.add(sat);
    }

    // Register mesh objects into stateRef
    stateRef.current.meshes = {
      face: faceData.group,
      core: coreGroup,
      nebula: nebulaGroup,
      lattice: latticeGroup
    };
    stateRef.current.materials = materialsList;
    stateRef.current.particleData = {
      geo: particleGeo,
      origins: particleOrigins,
      positions: particlePositions
    };
    stateRef.current.rings = [ring1, ring2];
    stateRef.current.subEntities = {
      torusMesh,
      wireMesh,
      icoOuter,
      icoInner,
      satelliteGroup
    };

    // 6. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause rendering when the canvas is off-screen (saves GPU/battery)
    let isOnScreen = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isOnScreen = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    // 7. Mouse / Touch Interactions with Mobile Scroll Pass-through
    let touchStartClientX = 0;
    let touchStartClientY = 0;
    let isHorizontalGesture = false;

    const onPointerDown = (e) => {
      stateRef.current.pointer.isDown = true;
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      stateRef.current.pointer.prevX = clientX;
      stateRef.current.pointer.prevY = clientY;
      touchStartClientX = clientX;
      touchStartClientY = clientY;
      isHorizontalGesture = false;
      setIsDragging(true);
    };

    const onPointerMove = (e) => {
      const isTouchEvent = !!e.touches;
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX === undefined) return;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.pointer.x = normX;
      stateRef.current.pointer.y = normY;

      if (stateRef.current.pointer.isDown) {
        const deltaX = clientX - stateRef.current.pointer.prevX;
        const deltaY = clientY - stateRef.current.pointer.prevY;
        stateRef.current.pointer.prevX = clientX;
        stateRef.current.pointer.prevY = clientY;

        if (isTouchEvent) {
          // On mobile touch: only rotate if user is explicitly dragging horizontally
          const totalDx = Math.abs(clientX - touchStartClientX);
          const totalDy = Math.abs(clientY - touchStartClientY);
          if (totalDx > totalDy + 8) {
            isHorizontalGesture = true;
          }
          if (isHorizontalGesture) {
            stateRef.current.targetRotation.y += deltaX * 0.008;
          }
        } else {
          // Desktop mouse drag: full freedom
          stateRef.current.targetRotation.y += deltaX * 0.008;
          stateRef.current.targetRotation.x += deltaY * 0.008;
        }
      }
    };

    const onPointerUp = () => {
      stateRef.current.pointer.isDown = false;
      isHorizontalGesture = false;
      setIsDragging(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 8. Animation & Render Loop
    let animationFrameId;
    let lastTime = performance.now();
    let lastTelemetryUpdate = performance.now();

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip all work when not visible
      if (!isOnScreen || document.hidden) {
        lastTime = currentTime;
        return;
      }

      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      const elapsedTime = (currentTime - stateRef.current.startTime) * 0.001;

      // FPS and Telemetry Tracker
      stateRef.current.frameCount++;
      const frameDelta = currentTime - stateRef.current.lastFrameTime;
      stateRef.current.lastFrameTime = currentTime;

      if (currentTime - lastTelemetryUpdate > 2000) {
        const currentFps = Math.round(1000 / (frameDelta || 16.6));
        setTelemetry(prev => ({
          ...prev,
          fps: Math.min(Math.max(currentFps, 30), 144),
          frameTime: parseFloat((frameDelta || 16.6).toFixed(1)),
          rotX: parseFloat((stateRef.current.currentRotation.x).toFixed(2)),
          rotY: parseFloat((stateRef.current.currentRotation.y).toFixed(2))
        }));
        lastTelemetryUpdate = currentTime;
      }

      // Parallax and Rotation Interpolation (Smooth Damping)
      if (stateRef.current.autoRotate && !stateRef.current.pointer.isDown) {
        stateRef.current.targetRotation.y += delta * 0.45;
        stateRef.current.targetRotation.x = 0.2 + Math.sin(elapsedTime * 0.6) * 0.15;
      }

      // Cursor magnetic influence
      const mouseInfluenceX = stateRef.current.pointer.y * 0.4;
      const mouseInfluenceY = stateRef.current.pointer.x * 0.4;

      stateRef.current.currentRotation.x += (stateRef.current.targetRotation.x + mouseInfluenceX - stateRef.current.currentRotation.x) * 0.08;
      stateRef.current.currentRotation.y += (stateRef.current.targetRotation.y + mouseInfluenceY - stateRef.current.currentRotation.y) * 0.08;

      mainGroup.rotation.x = stateRef.current.currentRotation.x;
      mainGroup.rotation.y = stateRef.current.currentRotation.y;

      // Dynamic Sub-mesh Animations
      const { subEntities, rings, activeMode, faceElements } = stateRef.current;
      if (activeMode === 'face' && faceElements) {
        faceElements.neuralCore.rotation.y = elapsedTime * 1.8;
        faceElements.neuralCore.rotation.z = elapsedTime * 0.9;
        faceElements.neuralCoreMat.emissiveIntensity = 2.0 + Math.sin(elapsedTime * 4.0) * 1.2;
        faceElements.gimbal1.rotation.z = elapsedTime * 0.25;
        faceElements.gimbal2.rotation.x = -elapsedTime * 0.2;
      } else if (activeMode === 'core' && subEntities?.torusMesh) {
        subEntities.torusMesh.rotation.z = elapsedTime * 0.15;
        subEntities.wireMesh.rotation.z = elapsedTime * 0.15;
        if (rings[0]) rings[0].rotation.z = -elapsedTime * 0.25;
        if (rings[1]) rings[1].rotation.z = elapsedTime * 0.35;
      } else if (activeMode === 'nebula') {
        const { particleData } = stateRef.current;
        if (particleData) {
          const pos = particleData.positions;
          const origins = particleData.origins;
          for (let i = 0; i < origins.length; i++) {
            const org = origins[i];
            const angle = org.theta + elapsedTime * org.speed * 0.4;
            const wave = Math.sin(elapsedTime * 1.5 + org.radius * 3) * 0.12;
            const currentR = org.radius + wave;

            pos[i * 3] = currentR * Math.cos(angle) * Math.cos(org.phi);
            pos[i * 3 + 1] = currentR * Math.sin(org.phi) + wave * 0.5;
            pos[i * 3 + 2] = currentR * Math.sin(angle) * Math.cos(org.phi);
          }
          particleData.geo.attributes.position.needsUpdate = true;
        }
      } else if (activeMode === 'lattice' && subEntities?.icoOuter) {
        subEntities.icoOuter.rotation.y = elapsedTime * 0.3;
        subEntities.icoOuter.rotation.x = elapsedTime * 0.2;
        subEntities.icoInner.rotation.y = -elapsedTime * 0.4;
        subEntities.icoInner.rotation.z = elapsedTime * 0.25;
        if (subEntities.satelliteGroup) {
          subEntities.satelliteGroup.rotation.y = -elapsedTime * 0.5;
        }
      }

      // Lights orbiting gently
      pointLight1.position.x = Math.sin(elapsedTime * 0.8) * 3;
      pointLight1.position.z = Math.cos(elapsedTime * 0.8) * 3;
      pointLight2.position.x = -Math.sin(elapsedTime * 0.6) * 3;
      pointLight2.position.z = -Math.cos(elapsedTime * 0.6) * 3;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      materialsList.forEach(m => m.dispose());
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
      });
      renderer.dispose();
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, []);

  const curTheme = COLOR_THEMES[activeTheme] || COLOR_THEMES.cyan;

  return (
    <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] aspect-square flex items-center justify-center select-none">
      
      {/* Dynamic Atmospheric Glow based on current active theme */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${curTheme.bgGlow} rounded-full blur-[100px] pointer-events-none transition-all duration-700`} 
      />

      {/* Orbiting Compass Rings */}
      <div className="absolute inset-2 rounded-full border border-dashed border-white/10 pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />

      {/* Main Glassmorphic 3D Card Container */}
      <div className="relative z-10 w-full h-full rounded-3xl bg-neutral-950/75 backdrop-blur-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between p-5 overflow-hidden">
        
        {/* Top Highlight Shimmer */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* 1. Header Bar: Real-time Telemetry & Mode Indicator */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] flex items-center justify-center text-white border border-white/15 shadow-inner">
              <Compass className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  WebGL 2.0 Engine
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white/70">
                  3D Live
                </span>
              </div>
              <p className="text-[10px] text-white/75 font-mono truncate max-w-[190px]">
                {telemetry.gpuRenderer}
              </p>
            </div>
          </div>

          {/* Real Live FPS Counter */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-[11px] font-mono font-bold text-emerald-400">
              {telemetry.fps} FPS
            </span>
          </div>
        </div>

        {/* 2. Central WebGL Viewport Container */}
        <div 
          ref={mountRef} 
          className="relative flex-1 w-full min-h-[180px] xs:min-h-[210px] sm:min-h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden touch-pan-y"
          title="Drag to rotate, hover to interact"
        >
          {/* Drag Overlay Hint */}
          <AnimatePresence>
            {!isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-white/80 flex items-center gap-1.5 shadow-sm"
              >
                <Maximize2 className="w-3 h-3 text-cyan-300" />
                <span>Drag to Rotate • Parallax Active</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Telemetry Corner Badges */}
          <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] text-white/70 space-y-0.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5 backdrop-blur-sm">
            <div>VERTS: {telemetry.vertices.toLocaleString()}</div>
            <div>FRAME: {telemetry.frameTime}ms</div>
          </div>

          <div className="absolute top-2 right-2 pointer-events-none font-mono text-[9px] text-white/70 space-y-0.5 bg-black/40 px-2 py-1 rounded-lg border border-white/5 backdrop-blur-sm text-right">
            <div>ROT X: {telemetry.rotX}</div>
            <div>ROT Y: {telemetry.rotY}</div>
          </div>
        </div>

        {/* 3. Interactive Control Bar */}
        <div className="pt-3 border-t border-white/10 z-20 space-y-2.5">
          
          {/* Geometry Mode Selectors */}
          <div className="flex items-center justify-between gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/10">
            {GEOMETRY_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  aria-label={`Pilih mode geometri ${mode.label}`}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm' 
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-cyan-300' : 'text-white/75'}`} />
                  <span className="hidden sm:inline">{mode.label}</span>
                  <span className="sm:hidden">{mode.shortLabel || mode.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Controls: Color Themes & Toggle Toggles */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Color Palette Buttons */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-white/70 uppercase mr-1 hidden xs:inline">
                Color
              </span>
              {Object.keys(COLOR_THEMES).map((key) => {
                const theme = COLOR_THEMES[key];
                const isSelected = activeTheme === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTheme(key)}
                    title={theme.name}
                    aria-label={`Pilih tema warna ${theme.name}`}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer border ${
                      isSelected 
                        ? 'scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                        : 'border-white/20 hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: theme.hex }}
                  />
                );
              })}
            </div>

            {/* Quick Action Toggles */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsWireframe(!isWireframe)}
                aria-label="Toggle wireframe render mode"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                  isWireframe 
                    ? 'bg-white/20 border-white/40 text-white' 
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white'
                }`}
                title="Toggle Wireframe"
              >
                <Eye className="w-3 h-3" />
                <span>Wire</span>
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                aria-label="Toggle auto rotation spin"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                  autoRotate 
                    ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300' 
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:text-white'
                }`}
                title="Toggle Auto Spin"
              >
                <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                <span>Spin</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Ambient Hologram Badges */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute -bottom-4 -left-6 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/20 shadow-xl text-[11px] font-mono text-white"
      >
        <Activity className="w-3.5 h-3.5 text-emerald-400" />
        <span>Hardware Accelerated</span>
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute -top-4 -right-6 z-20 items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 backdrop-blur-xl border border-white/20 shadow-xl text-[11px] font-mono text-white"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Three.js Shaders</span>
      </motion.div>

    </div>
  );
}

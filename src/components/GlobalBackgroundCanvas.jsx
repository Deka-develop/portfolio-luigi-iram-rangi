import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlobalBackgroundCanvas({ activeSection = 0 }) {
  const mountRef = useRef(null);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;

    // Target camera positions per section to create spatial transition
    const sectionCameraPositions = [
      { z: 25, y: 0, rotZ: 0 },         // 0: Hero
      { z: 32, y: 4, rotZ: 0.1 },       // 1: About
      { z: 20, y: -4, rotZ: -0.15 },     // 2: Work
      { z: 36, y: 2, rotZ: 0.2 },       // 3: Expertise
      { z: 22, y: -2, rotZ: 0 }          // 4: Contact
    ];

    // Adaptive quality for phones / touch devices
    const isLowPower = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isLowPower ? 1 : Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 4. Create Ambient 3D Particle Cloud
    const particleCount = isLowPower ? 450 : 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(0x00f0ff);
    const color2 = new THREE.Color(0x9d4edd);
    const color3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Color variation
      const r = Math.random();
      const c = r < 0.4 ? color1 : r < 0.8 ? color2 : color3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTex = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.5,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle ambient grid floor in the distance
    const grid = new THREE.GridHelper(100, 30, 0x333344, 0x111122);
    grid.position.y = -20;
    grid.material.transparent = true;
    grid.material.opacity = 0.15;
    scene.add(grid);

    // 5. Mouse & Scroll tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 6. Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 7. Render Loop
    let animId;
    const startTime = performance.now();

    let frame = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Pause when tab hidden; render ~30fps on low-power devices
      if (document.hidden) return;
      frame++;
      if (isLowPower && frame % 2 !== 0) return;

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Rotate particle cloud gently
      particles.rotation.y = elapsedTime * 0.02 + mouseX * 0.15;
      particles.rotation.x = mouseY * 0.1;
      particles.position.y = -scrollY * 0.008;
      grid.rotation.y = elapsedTime * 0.005;

      // Smooth camera transition to target section position
      const secIdx = Math.min(Math.max(activeSectionRef.current, 0), sectionCameraPositions.length - 1);
      const targetPos = sectionCameraPositions[secIdx] || sectionCameraPositions[0];

      camera.position.z += (targetPos.z - camera.position.z) * 0.05;
      camera.position.y += (targetPos.y + mouseY * 1.5 - camera.position.y) * 0.05;
      camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.05;
      camera.rotation.z += (targetPos.rotZ - camera.rotation.z) * 0.05;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      particleTex.dispose();
      grid.geometry.dispose();
      grid.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
}

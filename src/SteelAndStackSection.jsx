import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './SteelAndStackSection.css';

export default function SteelAndStackSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0e0f14, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc084fc, 3.2); // Accent violet
    dirLight1.position.set(4, 6, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Cyan rim
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xaa3bff, 4.0, 12);
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    // --- 3D "STEEL & STACK" MONOLITH ---
    const stackGroup = new THREE.Group();
    scene.add(stackGroup);

    // Slabs specifications: width, height, depth, y-offset, rotationY
    const SLABS_DATA = [
      { w: 2.6, h: 0.22, d: 2.6, baseDy: -0.7, rot: 0.05 },
      { w: 2.2, h: 0.24, d: 2.2, baseDy: -0.32, rot: -0.1 },
      { w: 1.8, h: 0.26, d: 1.8, baseDy: 0.08, rot: 0.16 },
      { w: 1.4, h: 0.28, d: 1.4, baseDy: 0.48, rot: -0.06 },
      { w: 0.9, h: 0.22, d: 0.9, baseDy: 0.85, rot: 0.25 },
    ];

    const slabMeshes = [];
    const slabEdges = [];

    SLABS_DATA.forEach((cfg, idx) => {
      const geom = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
      
      // Brushed metallic steel material
      const mat = new THREE.MeshStandardMaterial({
        color: idx === 2 ? 0x242238 : 0x181923,
        roughness: 0.25,
        metalness: 0.88,
        emissive: idx === 2 ? 0x2a1645 : 0x05060a,
        emissiveIntensity: 0.6,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.y = cfg.baseDy;
      mesh.rotation.y = cfg.rot;
      stackGroup.add(mesh);
      slabMeshes.push({ mesh, cfg, idx });

      // Luminous neon steel edges
      const wireGeom = new THREE.EdgesGeometry(geom);
      const wireMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0xc084fc : 0x60a5fa,
        transparent: true,
        opacity: 0.75,
      });
      const wire = new THREE.LineSegments(wireGeom, wireMat);
      mesh.add(wire);
      slabEdges.push(wire);
    });

    // Orbiting Geometric Rings
    const ringGeom = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    stackGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, ringMat);
    ring2.rotation.x = -Math.PI / 2.8;
    ring2.rotation.y = Math.PI / 6;
    ring2.scale.setScalar(1.2);
    stackGroup.add(ring2);

    // Floating Ambient Particles
    const PARTICLE_COUNT = 160;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 12;
      pPositions[i + 1] = (Math.random() - 0.5) * 10;
      pPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Mouse Tracking with smooth interpolation
    let targetRotX = 0.2;
    let targetRotY = 0.3;
    let currentRotX = 0.2;
    let currentRotY = 0.3;

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.9;
      targetRotX = -y * 0.6 + 0.15;
    };

    window.addEventListener('pointermove', onPointerMove);

    // Scroll opacity & brightness sync with section runway
    let scrollRaf = 0;
    const syncScroll = () => {
      scrollRaf = 0;
      const parentRunway = container.closest('.hero-shift');
      if (!parentRunway) return;
      const vh = window.innerHeight;
      const pinDist = Math.max(1, parentRunway.offsetHeight - vh);
      const p = Math.min(1, Math.max(0, -parentRunway.getBoundingClientRect().top / pinDist));
      const e = p * p;
      container.style.filter = `brightness(${(1 - e * 0.5).toFixed(3)})`;
      container.style.opacity = `${(1 - p * 0.35).toFixed(3)}`;
      // Dynamic camera/stack tilt on scroll
      stackGroup.rotation.z = p * 0.4;
    };

    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(syncScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Window Resize Handling
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.position.z = w < 768 ? 7.2 : 5.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
    onResize();

    // --- ANIMATION LOOP ---
    let animId = 0;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!reduce) {
        // Smooth mouse orbit lerp
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        stackGroup.rotation.x = currentRotX + Math.sin(elapsedTime * 0.8) * 0.04;
        stackGroup.rotation.y = currentRotY + elapsedTime * 0.15;

        ring1.rotation.z = elapsedTime * 0.25;
        ring2.rotation.z = -elapsedTime * 0.2;

        particles.rotation.y = elapsedTime * 0.03;
      }

      // Explosion / Expansion dynamics
      const expandTarget = container.dataset.exploded === 'true' ? 1.9 : 1.0;
      slabMeshes.forEach(({ mesh, cfg }) => {
        const targetY = cfg.baseDy * expandTarget;
        mesh.position.y += (targetY - mesh.position.y) * 0.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  const toggleExplode = () => {
    setExploded((prev) => !prev);
  };

  return (
    <section
      ref={containerRef}
      className="sas-section"
      data-exploded={exploded}
      aria-label="Steel and Stack Studio by Devansh Grover"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="sas-canvas" aria-hidden="true" />

      {/* Futuristic Grid & Ambient Glows */}
      <div className="sas-grid-overlay" aria-hidden="true" />
      <div className="sas-glow-radial" aria-hidden="true" />

      {/* Content Layer */}
      <div className="sas-content">
        <div className="sas-badge">
          <span className="sas-badge-dot" />
          <span>FOUNDER &amp; CREATIVE TECHNOLOGIST</span>
        </div>

        <h1 className="sas-title">
          STEEL <span className="sas-amp">&amp;</span> STACK
        </h1>

        <p className="sas-tagline">
          Forging high-performance websites, boundary-pushing digital systems, and creative engineering.
        </p>

        <p className="sas-bio">
          Founded by <strong>Devansh Grover</strong>. We build digital flagships and interactive 
          software with tactile mass, deep polish, and zero compromise.
        </p>

        {/* Core Pillars */}
        <div className="sas-pillars">
          <span className="sas-pill">⚡ Bespoke Web Architecture</span>
          <span className="sas-pill">🧊 Interactive 3D &amp; WebGL</span>
          <span className="sas-pill">🦾 Robotics &amp; AI Systems</span>
          <span className="sas-pill">🎯 Precision Design Engineering</span>
        </div>

        {/* Action Controls */}
        <div className="sas-actions">
          <button
            type="button"
            className="sas-btn sas-btn--primary"
            onClick={toggleExplode}
            aria-pressed={exploded}
          >
            {exploded ? 'Collapse 3D Stack' : 'Explode 3D Stack'}
          </button>

          <a href="#contact" className="sas-btn sas-btn--ghost">
            Let&rsquo;s Build Together &rarr;
          </a>
        </div>

        <div className="sas-hint" aria-hidden="true">
          <span>✦ Move cursor to orbit 3D stack • Click button to expand layers</span>
        </div>
      </div>
    </section>
  );
}

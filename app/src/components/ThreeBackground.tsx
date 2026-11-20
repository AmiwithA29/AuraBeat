import React, { useEffect, useRef } from 'react';
import { MoodType } from '../types';
import { MOODS } from '../constants/moods';

interface ThreeBackgroundProps {
  mood: MoodType;
  isPlaying?: boolean;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ mood, isPlaying = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 4, 20); // Electric violet
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 4, 20); // Neon cyan
    pointLight2.position.set(-5, -4, 4);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf43f5e, 2, 15); // Rose glow
    pointLight3.position.set(0, 6, -3);
    scene.add(pointLight3);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Central Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 4);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x181033,
      emissive: 0x3b0764,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88
    });
    const centralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    worldGroup.add(centralSphere);

    // Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(2.05, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireCage = new THREE.Mesh(wireGeo, wireMat);
    worldGroup.add(wireCage);

    // Concentric Resonance Rings
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    worldGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xe879f9,
      emissive: 0xa21caf,
      emissiveIntensity: 0.6,
      roughness: 0.3
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = Math.PI * 0.2;
    worldGroup.add(ring2);

    // Floating Audio Dust Particles
    const particleCount = 400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.4 + Math.random() * 3.2;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas Texture for circular particles
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(192, 132, 252, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }

    const particleTexture = new THREE.CanvasTexture(pCanvas);
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.5;
      targetRotX = -ny * 0.3;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      worldGroup.rotation.x = currentRotX + Math.sin(t * 0.3) * 0.08;
      worldGroup.rotation.y = currentRotY + t * 0.15;

      const pulseSpeed = isPlaying ? 2.5 : 0.8;
      const pulseAmp = isPlaying ? 0.05 : 0.02;
      const pulse = 1.0 + Math.sin(t * pulseSpeed) * pulseAmp;
      centralSphere.scale.set(pulse, pulse, pulse);

      wireCage.rotation.y = -t * 0.2;
      wireCage.rotation.z = t * 0.1;

      ring1.rotation.z = t * 0.35;
      ring2.rotation.z = -t * 0.25;

      const posArr = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const ox = particleOriginals[idx];
        const oy = particleOriginals[idx + 1];
        const oz = particleOriginals[idx + 2];
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);

        const wave = Math.sin(dist * 3.0 - t * 2.5) * 0.1;
        posArr[idx] = ox + (ox / dist) * wave;
        posArr[idx + 1] = oy + (oy / dist) * wave;
        posArr[idx + 2] = oz + (oz / dist) * wave;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, []);

  // Dynamic glow colors based on active mood
  const moodColor = MOODS[mood]?.color || '#38bdf8';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div ref={containerRef} className="w-full h-full absolute inset-0 pointer-events-auto" />
      {/* Ambient backdrop glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-[540px] h-[540px] rounded-full blur-[110px] opacity-25 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: moodColor }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] opacity-20 transition-all duration-1000 pointer-events-none"
        style={{ backgroundColor: '#4cd7f6' }}
      />
      <div
        className="absolute -bottom-20 left-1/4 w-[480px] h-[480px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: '#a855f7' }}
      />
      {/* High-fashion cinematic dark scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent_25%,rgba(6,7,12,0.85)_100%)] pointer-events-none" />
    </div>
  );
};

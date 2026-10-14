"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import TrustStrip from "@/components/sections/TrustStrip";

// --- Exact Capability SVG Icons (High Clarity & Definition) ---
const AgenticAiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aoai-agentic-flow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF8A00" />
        <stop offset="100%" stopColor="#FF3E00" />
      </linearGradient>
    </defs>
    <path d="M12 3a9 9 0 1 1-6.36 2.64" stroke="url(#aoai-agentic-flow)" strokeWidth="2" strokeLinecap="round" />
    <path d="M5.5 2v3.8h3.8" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20.5" cy="9.5" r="1.8" fill="#FFA34D" />
    <circle cx="14" cy="20.8" r="1.8" fill="#FFA34D" />
    <circle cx="4.5" cy="15.5" r="1.8" fill="#FFA34D" />
    <path d="M12 6.5L13.6 10.4L17.5 12L13.6 13.6L12 17.5L10.4 13.6L6.5 12L10.4 10.4L12 6.5Z" fill="url(#aoai-agentic-flow)" />
    <circle cx="12" cy="12" r="1.6" fill="#FFFFFF" />
  </svg>
);

const AiAgentsIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="2.8" r="1.5" fill="#FF6B00" />
    <path d="M10 4.3v2" stroke="#FF6B00" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="3" y="6.3" width="14" height="10.4" rx="3.2" fill="#FF6B00" fillOpacity="0.28" stroke="#FF6B00" strokeWidth="1.8" />
    <rect x="5.8" y="9.4" width="8.4" height="3.2" rx="1.6" fill="#FFA34D" />
    <circle cx="8" cy="11" r="1" fill="#FFFFFF" />
    <circle cx="12" cy="11" r="1" fill="#FFFFFF" />
    <path d="M1.8 10.5h1.2M17 10.5h1.2" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CopilotsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.533 1.829A2.528 2.528 0 0015.11 0h-.737a2.531 2.531 0 00-2.484 2.087l-1.263 6.937.314-1.08a2.528 2.528 0 012.424-1.833h4.284l1.797.706 1.731-.706h-.505a2.528 2.528 0 01-2.423-1.829l-.715-2.453z" fill="url(#aoai-copilot-0)" transform="translate(0 1)" />
    <path d="M6.726 20.16A2.528 2.528 0 009.152 22h1.566c1.37 0 2.49-1.1 2.525-2.48l.17-6.69-.357 1.228a2.528 2.528 0 01-2.423 1.83h-4.32l-1.54-.842-1.667.843h.497c1.124 0 2.113.75 2.426 1.84l.697 2.432z" fill="url(#aoai-copilot-1)" transform="translate(0 1)" />
    <path d="M15 0H6.252c-2.5 0-4 3.331-5 6.662-1.184 3.947-2.734 9.225 1.75 9.225H6.78c1.13 0 2.12-.753 2.43-1.847.657-2.317 1.809-6.359 2.713-9.436.46-1.563.842-2.906 1.43-3.742A1.97 1.97 0 0115 0" fill="url(#aoai-copilot-2)" transform="translate(0 1)" />
    <path d="M9 22h8.749c2.5 0 4-3.332 5-6.663 1.184-3.948 2.734-9.227-1.75-9.227H17.22c-1.129 0-2.12.754-2.43 1.848a1149.2 1149.2 0 01-2.713 9.437c-.46 1.564-.842 2.907-1.43 3.743A1.97 1.97 0 019 22" fill="url(#aoai-copilot-4)" transform="translate(0 1)" />
    <defs>
      <radialGradient id="aoai-copilot-0" cx="85.44%" cy="100.653%" fx="85.44%" fy="100.653%" gradientTransform="scale(-.8553 -1) rotate(50.927 2.041 -1.946)" r="105.116%">
        <stop offset="9.6%" stopColor="#00AEFF" /><stop offset="77.3%" stopColor="#2253CE" /><stop offset="100%" stopColor="#0736C4" />
      </radialGradient>
      <radialGradient id="aoai-copilot-1" cx="18.143%" cy="32.928%" fx="18.143%" fy="32.928%" gradientTransform="scale(.8897 1) rotate(52.069 .193 .352)" r="95.612%">
        <stop offset="0%" stopColor="#FFB657" /><stop offset="63.4%" stopColor="#FF5F3D" /><stop offset="92.3%" stopColor="#C02B3C" />
      </radialGradient>
      <linearGradient id="aoai-copilot-2" x1="39.465%" y1="12.117%" x2="46.884%" y2="103.774%">
        <stop offset="15.6%" stopColor="#0D91E1" /><stop offset="48.7%" stopColor="#52B471" /><stop offset="65.2%" stopColor="#98BD42" /><stop offset="93.7%" stopColor="#FFC800" />
      </linearGradient>
      <radialGradient id="aoai-copilot-4" cx="82.987%" cy="-9.792%" fx="82.987%" fy="-9.792%" gradientTransform="scale(-1 -.9441) rotate(-70.872 .142 1.17)" r="140.622%">
        <stop offset="6.6%" stopColor="#8C48FF" /><stop offset="50%" stopColor="#F2598A" /><stop offset="89.6%" stopColor="#FFB152" />
      </radialGradient>
    </defs>
  </svg>
);

const RagIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="5" rx="5.5" ry="2" fill="#FF6B00" fillOpacity="0.3" stroke="#FF6B00" strokeWidth="1.6" />
    <path d="M2.5 5v3.5c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V5" stroke="#FF6B00" strokeWidth="1.6" />
    <path d="M2.5 8.5v3.5c0 1.1 2.5 2 5.5 2 1.2 0 2.4-.2 3.3-.5" stroke="#FF6B00" strokeWidth="1.6" />
    <circle cx="13.5" cy="13.5" r="3" fill="#18181B" stroke="#FFA34D" strokeWidth="1.8" />
    <path d="M15.8 15.8L18 18" stroke="#FFA34D" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="13.5" cy="13.5" r="1.2" fill="#FF6B00" />
  </svg>
);

const IntelligentAutomationIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 2L4 11h5.5l-1.5 7 8-9.5h-5.5l1-6.5z" fill="#FF6B00" stroke="#FFA34D" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const MicrosoftAiIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="7.2" height="7.2" rx="0.8" fill="#F25022" />
    <rect x="10.8" y="2" width="7.2" height="7.2" rx="0.8" fill="#7FBA00" />
    <rect x="2" y="10.8" width="7.2" height="7.2" rx="0.8" fill="#00A4EF" />
    <rect x="10.8" y="10.8" width="7.2" height="7.2" rx="0.8" fill="#FFB900" />
  </svg>
);

const EnterpriseSecIcon = () => (
  <svg viewBox="0 0 20 20" className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2L3 5v5c0 4 3 7.5 7 8.5C17 17.5 20 14 20 10V5L10 2z" fill="#FF6B00" fillOpacity="0.25" stroke="#FF6B00" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M7 10l2 2 4-4" stroke="#FFA34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const capabilities = [
  { title: 'Agentic AI', icon: AgenticAiIcon },
  { title: 'AI Agents', icon: AiAgentsIcon },
  { title: 'Copilots', icon: CopilotsIcon },
  { title: 'RAG', icon: RagIcon },
  { title: 'Intelligent Automation', icon: IntelligentAutomationIcon },
  { title: 'Microsoft AI', icon: MicrosoftAiIcon },
  { title: 'Enterprise Security', icon: EnterpriseSecIcon },
];

export default function AzureOpenAIHero2() {
  const textControls = useAnimation();

  useEffect(() => {
    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.035 + 0.3,
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
  }, [textControls]);

  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-black pt-20 lg:pt-24 pb-0">

      {/* Main Split Content: Left (Text) and Right (The Wave) */}
      <div className="relative z-10 flex items-start w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-2 sm:pt-4 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 w-full items-center">

          {/* LEFT: The Text */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start text-left z-10">

            {/* Eyebrow Pill */}
            <motion.div
              custom={0}
              initial={{ opacity: 0, y: 15 }}
              animate={textControls}
              className="mb-3.5 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-5 py-2 text-[11px] font-bold tracking-widest text-[#FF6B00] backdrop-blur-md shadow-[0_0_15px_rgba(255,107,0,0.15)] w-fit uppercase"
            >
              <span className="h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
              <span>AZURE OPENAI DEVELOPMENT</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]"
              style={{ textShadow: '0 0 35px rgba(255, 107, 0, 0.25)' }}
            >
              <span className="block">Build GPT Apps &amp;</span>
              <span className="block text-[#FF6B00] drop-shadow-[0_0_25px_rgba(255,107,0,0.4)]">
                RAG Pipelines
              </span>
              <span className="block">on Azure OpenAI</span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              custom={4}
              initial={{ opacity: 0, y: 20 }}
              animate={textControls}
              className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed"
            >
              Partner with Softree&apos;s offshore engineering team to design, build, and deploy GPT‑4o applications, RAG pipelines, and Microsoft Copilot extensions — all running securely inside your own Azure subscription. Your IP. Your cloud. Our team.
            </motion.p>

          </div>

          {/* RIGHT: The Wave */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full h-[420px] sm:h-[450px] lg:h-[480px] py-0">
            <div className="pointer-events-none absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#FF6B00]/15 blur-[90px] -z-10" />
            <div className="w-full h-full relative flex items-center justify-center">
              <WovenCanvas />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full z-20 shrink-0 mt-4 sm:mt-6 pb-8"
      >
        <TrustStrip theme="dark" />
      </motion.div>
    </div>
  );
}

// --- Three.js Canvas Component with Viewport Culling & Device-Responsive Particle Scaling ---
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(255, 220, 130, 0.98)');
      gradient.addColorStop(0.38, 'rgba(255, 135, 25, 0.85)');
      gradient.addColorStop(0.65, 'rgba(255, 80, 0, 0.35)');
      gradient.addColorStop(0.88, 'rgba(210, 45, 0, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();

    const particleCount = isMobile ? 12000 : 32000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.20, 0.38, isMobile ? 140 : 260, isMobile ? 32 : 48);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);
      positions[i * 3] = x; positions[i * 3 + 1] = y; positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x; originalPositions[i * 3 + 1] = y; originalPositions[i * 3 + 2] = z;
      velocities[i * 3] = 0; velocities[i * 3 + 1] = 0; velocities[i * 3 + 2] = 0;

      const color = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.2) { color.setHSL(0.11, 0.95, 0.85); }
      else if (rand < 0.65) { color.setHSL(0.065 + Math.random() * 0.03, 0.98, 0.62); }
      else { color.setHSL(0.045 + Math.random() * 0.02, 0.95, 0.54); }
      colors[i * 3] = color.r; colors[i * 3 + 1] = color.g; colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.035,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);

    const ambientCount = isMobile ? 350 : 800;
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientBasePositions = new Float32Array(ambientCount * 3);
    const ambientColors = new Float32Array(ambientCount * 3);
    const ambientSpeeds = new Float32Array(ambientCount);
    const ambientPhases = new Float32Array(ambientCount);

    for (let i = 0; i < ambientCount; i++) {
      const theta = Math.random() * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const r = 1.20 + Math.pow(Math.random(), 1.6) * 0.55;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.88;
      const z = r * Math.cos(phi);
      ambientPositions[i * 3] = x; ambientPositions[i * 3 + 1] = y; ambientPositions[i * 3 + 2] = z;
      ambientBasePositions[i * 3] = x; ambientBasePositions[i * 3 + 1] = y; ambientBasePositions[i * 3 + 2] = z;
      const falloff = Math.max(0.15, 1 - Math.max(0, (r - 1.45) / 0.45));
      if (Math.random() > 0.3) {
        ambientColors[i * 3] = 1.0 * falloff; ambientColors[i * 3 + 1] = (0.45 + Math.random() * 0.25) * falloff; ambientColors[i * 3 + 2] = 0.05 * falloff;
      } else {
        ambientColors[i * 3] = 0.98 * falloff; ambientColors[i * 3 + 1] = 0.92 * falloff; ambientColors[i * 3 + 2] = 0.82 * falloff;
      }
      ambientSpeeds[i] = 0.25 + Math.random() * 0.5;
      ambientPhases[i] = Math.random() * Math.PI * 2;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));
    ambientGeometry.setAttribute('color', new THREE.BufferAttribute(ambientColors, 3));

    const ambientMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.035,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);

    const waveGroup = new THREE.Group();
    waveGroup.add(points);
    waveGroup.add(ambientPoints);
    scene.add(waveGroup);

    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const currentAspect = w / h;
      camera.aspect = currentAspect;
      const halfFovRad = (camera.fov * Math.PI) / 360;
      const tanHalfFov = Math.tan(halfFovRad);
      const safeRadius = 2.40;
      camera.position.z = Math.max(safeRadius / tanHalfFov, safeRadius / (tanHalfFov * currentAspect), 4.4);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, true);
    };

    updateSize(width, height);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) updateSize(w, h);
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    intersectionObserver.observe(container);

    const targetMouse = { x: 0, y: 0 };
    const smoothedMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!container || !isVisible) return;
      const rect = container.getBoundingClientRect();
      const isInside = event.clientX >= rect.left - 50 && event.clientX <= rect.right + 50 && event.clientY >= rect.top - 50 && event.clientY <= rect.bottom + 50;
      if (isInside) {
        targetMouse.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
        targetMouse.y = Math.max(-1, Math.min(1, -((event.clientY - rect.top) / rect.height) * 2 + 1));
      } else {
        targetMouse.x = 0; targetMouse.y = 0;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();
      smoothedMouse.x += (targetMouse.x - smoothedMouse.x) * 0.045;
      smoothedMouse.y += (targetMouse.y - smoothedMouse.y) * 0.045;
      const mwx = smoothedMouse.x * 2.0;
      const mwy = smoothedMouse.y * 2.0;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;
        const cx = positions[ix], cy = positions[iy], cz = positions[iz];
        const oy = originalPositions[iy] + Math.sin(t * 1.6 + ix * 0.008) * 0.012;
        let vx = velocities[ix], vy = velocities[iy], vz = velocities[iz];
        const dx = cx - mwx, dy = cy - mwy, dz = cz;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 2.56 && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = (1.6 - dist) * 0.012 / dist;
          vx += dx * force; vy += dy * force; vz += dz * force;
        }
        vx += (originalPositions[ix] - cx) * 0.0015;
        vy += (oy - cy) * 0.0015;
        vz += (originalPositions[iz] - cz) * 0.0015;
        vx *= 0.96; vy *= 0.96; vz *= 0.96;
        positions[ix] = cx + vx; positions[iy] = cy + vy; positions[iz] = cz + vz;
        velocities[ix] = vx; velocities[iy] = vy; velocities[iz] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = t * 0.055;
      points.rotation.x = Math.sin(t * 0.025) * 0.08;
      points.rotation.z = Math.cos(t * 0.02) * 0.05;

      const ambPos = ambientGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientCount; i++) {
        const i3 = i * 3, sp = ambientSpeeds[i], ph = ambientPhases[i];
        ambPos[i3] = ambientBasePositions[i3] + Math.sin(t * sp + ph) * 0.12 + smoothedMouse.x * 0.12;
        ambPos[i3 + 1] = ambientBasePositions[i3 + 1] + Math.cos(t * sp * 0.75 + ph) * 0.12 + smoothedMouse.y * 0.12;
        ambPos[i3 + 2] = ambientBasePositions[i3 + 2] + Math.sin(t * 0.45 + ph) * 0.1;
      }
      ambientGeometry.attributes.position.needsUpdate = true;
      ambientPoints.rotation.y = -t * 0.02;
      ambientPoints.rotation.x = Math.cos(t * 0.015) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      glowTexture?.dispose();
      geometry.dispose();
      material.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full relative flex items-center justify-center pointer-events-none sm:pointer-events-auto" />;
};

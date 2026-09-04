"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import { Shield, Users, Cpu, Sparkles, Calendar, ArrowUpRight } from 'lucide-react';

const trustItems = [
  { icon: Shield, title: 'WHITE-LABEL', subtitle: 'Trusted agency partner.' },
  { icon: Users, title: 'OFFSHORE TEAMS', subtitle: 'Scale on demand.' },
  { icon: Cpu, title: 'MICROSOFT AI', subtitle: 'Azure & OpenAI partners.' },
  { icon: Sparkles, title: 'ENTERPRISE AI', subtitle: 'Secure, production-grade.' },
  { icon: Calendar, title: 'SINCE 2013', subtitle: '13+ years of excellence.' },
];

const capabilities = [
  'Agentic AI',
  'AI Agents',
  'Copilots',
  'RAG',
  'Intelligent Automation',
  'Microsoft AI',
  'AWS AI',
];

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const textControls = useAnimation();

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.035 + 0.3,
        duration: 0.7,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [textControls]);

  const headline = "Offshore Agentic AI Engineering Partner";

  return (
    <div className="relative flex min-h-[105vh] w-full flex-col overflow-hidden bg-black dark:bg-white pt-24 md:pt-32 pb-8">
      <WovenCanvas />
      {/* HeroNav removed to prevent duplicate header/navigation */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4 pb-12 w-full">
        {/* Eyebrow Pill */}
        <motion.div
          custom={0}
          initial={{ opacity: 0, y: 20 }}
          animate={textControls}
          className="mb-5 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-black/80 px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#FF6B00] backdrop-blur-sm shadow-[0_0_15px_rgba(255,107,0,0.15)]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span className="h-2 w-2 rounded-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00] animate-pulse" />
          <span>BUILD AI. SCALE FASTER.</span>
        </motion.div>

        {/* Main Headline in Orange-Black Pill (Single Line) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center rounded-full border-2 border-[#FF6B00] bg-black/90 px-5 sm:px-9 md:px-11 py-2.5 sm:py-3.5 md:py-4 backdrop-blur-md shadow-[0_0_40px_rgba(255,107,0,0.35),inset_0_0_20px_rgba(255,107,0,0.08)] max-w-[96vw]"
        >
          <h1
            className="text-[13px] xs:text-[15px] sm:text-2xl md:text-3xl lg:text-4xl xl:text-[45px] font-bold text-white tracking-tight whitespace-nowrap leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 0 35px rgba(255, 107, 0, 0.25)',
            }}
          >
            {headline.split(" ").map((word, i) => {
              const isOrange = word === "Agentic" || word === "AI";
              return (
                <span key={i} className="inline-block">
                  {word.split("").map((char, j) => (
                    <motion.span 
                      key={j} 
                      custom={i * 3 + j} 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={textControls} 
                      className={isOrange ? "text-[#FF6B00]" : ""}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
              );
            })}
          </h1>
        </motion.div>

        {/* Subtitle Description */}
        <motion.p
          custom={headline.split(" ").length * 3 + 2}
          initial={{ opacity: 0, y: 25 }}
          animate={textControls}
          className="mx-auto mt-5 sm:mt-6 max-w-2xl text-base sm:text-lg text-slate-300 dark:text-slate-600 leading-relaxed font-normal"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Build and scale AI agents with a dedicated offshore engineering team.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#FF6B00] hover:bg-[#E05E00] px-8 py-3.5 font-semibold text-white transition-all shadow-lg shadow-[#FF6B00]/30 hover:scale-[1.02] active:scale-[0.98] group"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Build Your AI Team</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </button>
          </Link>
          <Link href="#partnership" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span>Explore White-Label Partnership</span>
            </button>
          </Link>
        </motion.div>

        {/* Capabilities Pill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-7 sm:mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl px-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-[#FF6B00]/60 backdrop-blur-md text-xs sm:text-[13px] font-medium text-slate-200 hover:text-white transition-all duration-200 shadow-sm hover:shadow-[0_0_14px_rgba(255,107,0,0.3)] hover:scale-105 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]/70 group-hover:bg-[#FF6B00] group-hover:shadow-[0_0_6px_#FF6B00] transition-all shrink-0" />
              <span className="tracking-wide">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="w-full z-20 border-t border-white/10 bg-black/40 backdrop-blur-md py-6 shrink-0 mt-auto"
      >
        <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]">
                    <Icon className="h-5 w-5 text-[#FF6B00]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">{item.title}</span>
                    <span className="text-xs text-[#A1A1AA] mt-0.5">{item.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Three.js Canvas Component ---
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // --- Softree Silk ---
    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
      transparent: true,
      opacity: isDarkMode ? 1.0 : 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
        const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        // Return to original position
        const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.001);
        velocity.add(returnForce);

        // Damping
        velocity.multiplyScalar(0.95);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

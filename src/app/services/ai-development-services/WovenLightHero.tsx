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

// --- Main Hero Component ---
export const WovenLightHero = () => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    // Add a more elegant font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (typeof i === 'number' ? i : 0) * 0.01 + 0.1,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: 0.8, duration: 0.8 }
    });

    return () => {
      document.head.removeChild(link);
    }
  }, [textControls, buttonControls]);

  const headline = "Build Intelligent Agentic AI to Transform Business Processes";

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black dark:bg-white pb-32 pt-24 md:pb-40 md:pt-32">
      <WovenCanvas />
      {/* HeroNav removed to prevent duplicate header/navigation */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 text-left">
        <div className="max-w-[850px]">
          <motion.p
            custom={0}
            initial={{ opacity: 0, y: 30 }}
            animate={textControls}
            className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-slate-300 backdrop-blur-sm dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            AGENTIC AI ENGINEERING SERVICES
          </motion.p>
          <h1 className="text-5xl md:text-7xl text-white dark:text-slate-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }}>
            {headline.split(" ").map((word, i) => {
              const isOrange = word === "Agentic" || word === "AI";
              return (
                <span key={i} className="inline-block">
                  {word.split("").map((char, j) => (
                    <motion.span 
                      key={j} 
                      custom={i * 5 + j} 
                      initial={{ opacity: 0, y: 50 }} 
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
          <motion.p
            custom={headline.length}
            initial={{ opacity: 0, y: 30 }}
            animate={textControls}
            className="mt-6 max-w-xl text-lg text-slate-300 dark:text-slate-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Design, develop, and deploy autonomous AI agents that automate complex workflows, improve decision-making, and drive smarter business operations.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10 flex justify-start">
            <Link href="/contact">
              <button className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <span>Explore Agentic AI Services</span>
                <ArrowUpRight className="h-5 w-5 text-[#FF6B00]" strokeWidth={2.5} />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-0 w-full z-20 border-t border-white/10 bg-black/40 backdrop-blur-md py-6"
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
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

    const getShiftX = () => {
      if (typeof window === 'undefined') return 0;
      return window.innerWidth < 1024 ? 0 : 1.6;
    };

    const points = new THREE.Points(geometry, material);
    points.position.x = getShiftX();
    scene.add(points);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const shiftX = getShiftX();
      const mouseWorld = new THREE.Vector3(mouse.x * 3 - shiftX, mouse.y * 3, 0);

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
      points.position.x = getShiftX();
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

"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * MicrosoftParticleTorusVisual
 * Exact 3D glowing particle torus knot visual matching AzureOpenAIHero2:
 * - Mathematical TorusKnotGeometry with 18,000+ luminous amber/golden particles
 * - Canvas radial glow particle texture with additive blending
 * - Ambient floating constellation particles with harmonic phase motion
 * - Subtle cursor interactivity and continuous 3D rotation
 * - Zero external asset overhead, hardware accelerated WebGL with auto-pause
 */
export function MicrosoftParticleTorusVisual({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;
    const aspect = width / height;

    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
      precision: isMobile ? "mediump" : "highp",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Exact Canvas Radial Glow Texture from AzureOpenAIHero2
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.18, "rgba(255, 220, 130, 0.98)");
      gradient.addColorStop(0.38, "rgba(255, 135, 25, 0.85)");
      gradient.addColorStop(0.65, "rgba(255, 80, 0, 0.35)");
      gradient.addColorStop(0.88, "rgba(210, 45, 0, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 24,000 to 28,000 dense luminous particles matching AzureOpenAIHero2
    const particleCount = isMobile ? 14000 : 28000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.20, 0.38, isMobile ? 150 : 260, isMobile ? 32 : 48);

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
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // Exact golden-amber-orange gradient HSL distribution
      const color = new THREE.Color();
      const rand = Math.random();
      if (rand < 0.22) {
        color.setHSL(0.11, 0.96, 0.88); // Brilliant incandescent highlight
      } else if (rand < 0.68) {
        color.setHSL(0.068 + Math.random() * 0.025, 0.98, 0.64); // Radiant warm amber
      } else {
        color.setHSL(0.048 + Math.random() * 0.02, 0.96, 0.56); // Deep molten orange
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.052 : 0.045,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.99,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);

    // Floating ambient particle constellation
    const ambientCount = isMobile ? 300 : 600;
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
      ambientPositions[i * 3] = x;
      ambientPositions[i * 3 + 1] = y;
      ambientPositions[i * 3 + 2] = z;
      ambientBasePositions[i * 3] = x;
      ambientBasePositions[i * 3 + 1] = y;
      ambientBasePositions[i * 3 + 2] = z;
      const falloff = Math.max(0.15, 1 - Math.max(0, (r - 1.45) / 0.45));
      if (Math.random() > 0.3) {
        ambientColors[i * 3] = 1.0 * falloff;
        ambientColors[i * 3 + 1] = (0.48 + Math.random() * 0.25) * falloff;
        ambientColors[i * 3 + 2] = 0.06 * falloff;
      } else {
        ambientColors[i * 3] = 0.98 * falloff;
        ambientColors[i * 3 + 1] = 0.92 * falloff;
        ambientColors[i * 3 + 2] = 0.82 * falloff;
      }
      ambientSpeeds[i] = 0.25 + Math.random() * 0.5;
      ambientPhases[i] = Math.random() * Math.PI * 2;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute("position", new THREE.BufferAttribute(ambientPositions, 3));
    ambientGeometry.setAttribute("color", new THREE.BufferAttribute(ambientColors, 3));

    const ambientMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.048 : 0.04,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });

    const ambientPoints = new THREE.Points(ambientGeometry, ambientMaterial);

    const waveGroup = new THREE.Group();
    waveGroup.add(points);
    waveGroup.add(ambientPoints);
    // Shift particle torus knot downwards to eliminate gap above content on mobile
    waveGroup.position.y = isMobile ? -0.26 : -0.20;
    scene.add(waveGroup);

    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const currentAspect = w / h;
      camera.aspect = currentAspect;
      const halfFovRad = (camera.fov * Math.PI) / 360;
      const tanHalfFov = Math.tan(halfFovRad);
      // Framing calibrated to showcase torus knot slightly lower with rich scale
      const safeRadius = isMobile ? 1.95 : 2.05;
      camera.position.z = Math.max(safeRadius / tanHalfFov, safeRadius / (tanHalfFov * currentAspect), 4.0);
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

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const targetMouse = { x: 0, y: 0 };
    const smoothedMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!container || !isVisible) return;
      const rect = container.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left - 40 &&
        event.clientX <= rect.right + 40 &&
        event.clientY >= rect.top - 40 &&
        event.clientY <= rect.bottom + 40;
      if (isInside) {
        targetMouse.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
        targetMouse.y = Math.max(-1, Math.min(1, -((event.clientY - rect.top) / rect.height) * 2 + 1));
      } else {
        targetMouse.x = 0;
        targetMouse.y = 0;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const t = clock.getElapsedTime();
      smoothedMouse.x += (targetMouse.x - smoothedMouse.x) * 0.045;
      smoothedMouse.y += (targetMouse.y - smoothedMouse.y) * 0.045;
      const mwx = smoothedMouse.x * 2.0;
      const mwy = smoothedMouse.y * 2.0;

      // Particle physics & subtle harmonic oscillation
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3,
          iy = ix + 1,
          iz = ix + 2;
        const cx = positions[ix],
          cy = positions[iy],
          cz = positions[iz];
        const oy = originalPositions[iy] + Math.sin(t * 1.6 + ix * 0.008) * 0.012;
        let vx = velocities[ix],
          vy = velocities[iy],
          vz = velocities[iz];
        const dx = cx - mwx,
          dy = cy - mwy,
          dz = cz;
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 2.56 && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = ((1.6 - dist) * 0.012) / dist;
          vx += dx * force;
          vy += dy * force;
          vz += dz * force;
        }
        vx += (originalPositions[ix] - cx) * 0.0015;
        vy += (oy - cy) * 0.0015;
        vz += (originalPositions[iz] - cz) * 0.0015;
        vx *= 0.96;
        vy *= 0.96;
        vz *= 0.96;
        positions[ix] = cx + vx;
        positions[iy] = cy + vy;
        positions[iz] = cz + vz;
        velocities[ix] = vx;
        velocities[iy] = vy;
        velocities[iz] = vz;
      }
      geometry.attributes.position.needsUpdate = true;

      // Smooth continuous 3D rotation
      points.rotation.y = t * 0.055;
      points.rotation.x = Math.sin(t * 0.025) * 0.08;
      points.rotation.z = Math.cos(t * 0.02) * 0.05;

      // Ambient drift
      const ambPos = ambientGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < ambientCount; i++) {
        const i3 = i * 3,
          sp = ambientSpeeds[i],
          ph = ambientPhases[i];
        ambPos[i3] = ambientBasePositions[i3] + Math.sin(t * sp + ph) * 0.12 + smoothedMouse.x * 0.12;
        ambPos[i3 + 1] =
          ambientBasePositions[i3 + 1] + Math.cos(t * sp * 0.75 + ph) * 0.12 + smoothedMouse.y * 0.12;
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
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      glowTexture?.dispose();
      geometry.dispose();
      material.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
      torusKnot.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full min-h-0 overflow-hidden select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Warm ambient orange glow behind the particle knot */}
      <div className="pointer-events-none absolute w-56 h-56 rounded-full bg-[#FF6B00]/18 blur-[65px] -z-10 translate-y-3" />

      {/* Three.js interactive canvas mount */}
      <div ref={mountRef} className="w-full h-full relative flex items-center justify-center" />

      {/* Smooth bottom gradient fade into card body */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #090a10 0%, rgba(9, 10, 16, 0) 100%)",
        }}
      />
    </div>
  );
}

export default MicrosoftParticleTorusVisual;

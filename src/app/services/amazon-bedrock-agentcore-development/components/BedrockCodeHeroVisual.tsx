"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Amazon Bedrock Hero Visualization
   - 100% Pure Code WebGL Canvas with THREE.Points & Additive Blending
   - Exact Woven Silk Particle Aesthetic (Matches /services/ai-development-services)
   - Cloud Part: Puffy billowy Amazon Bedrock Cloud with 5 distinct rounded lobes
   - Below Circle Radius: Concentric harmonic ripple floor rings
   - Cascading Vertical Photon Light Waterfall connecting cloud to platform
   - Surrounded dotted outer loops/clutter completely eliminated
   - Perfectly Centered Vector SVG AWS Bedrock Branding
   - 100% Native Transparency (Zero Black Box / Zero Borders)
   - Smooth 60fps Mouse Parallax Physics
   ───────────────────────────────────────────────────────────── */

/* High-definition radial glow canvas texture for additive photon particles */
function createGlowTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);

  // Brilliant pinpoint white-gold core -> vibrant Softree orange -> soft falloff
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.16, "rgba(255, 235, 150, 0.98)");
  gradient.addColorStop(0.36, "rgba(255, 135, 25, 0.88)");
  gradient.addColorStop(0.65, "rgba(255, 75, 0, 0.35)");
  gradient.addColorStop(0.88, "rgba(210, 45, 0, 0.08)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function BedrockCodeHeroVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isCloudHovered, setIsCloudHovered] = useState(false);

  // Mouse parallax state
  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    smoothedX: 0,
    smoothedY: 0,
    isHovered: false,
  });

  useEffect(() => {
    mouseState.current.isHovered = isCloudHovered;
  }, [isCloudHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
    const yNorm = (e.clientY - rect.top) / rect.height - 0.5;
    mouseState.current.targetX = xNorm * 0.35;
    mouseState.current.targetY = -yNorm * 0.25;
  };

  const handleMouseLeave = () => {
    mouseState.current.targetX = 0;
    mouseState.current.targetY = 0;
    setIsCloudHovered(false);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    const scene = new THREE.Scene();

    const initialWidth = container.clientWidth || 600;
    const initialHeight = container.clientHeight || 500;
    const aspect = initialWidth / initialHeight;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(46, aspect, 0.1, 1000);
    camera.position.set(0, -0.15, 5.8);

    // Renderer with native alpha transparency
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGLRenderer initialization failed:", e);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    const glowTexture = createGlowTexture();

    // ─────────────────────────────────────────────────────────────
    // 1. CLOUD GEOMETRY (Parametric 5-Lobed Cloud with Woven Silk Ribbons)
    // ─────────────────────────────────────────────────────────────
    // 5 Puffy Cloud Lobes + Flat Base Shelf
    const cloudLobes = [
      { x: 0.0,   y: 1.13, rx: 1.15, ry: 0.95, weight: 1.0 }, // Top center main peak (tallest)
      { x: -1.05, y: 0.83, rx: 0.95, ry: 0.85, weight: 1.0 }, // Upper left puffy lobe
      { x: 1.05,  y: 0.77, rx: 0.90, ry: 0.82, weight: 1.0 }, // Upper right puffy lobe
      { x: -1.62, y: 0.20, rx: 0.88, ry: 0.78, weight: 1.0 }, // Left wide bulging cheek
      { x: 1.62,  y: 0.15, rx: 0.85, ry: 0.75, weight: 1.0 }, // Right wide bulging cheek
      { x: -0.80, y: -0.20, rx: 0.95, ry: 0.52, weight: 0.95 }, // Base shelf left
      { x: 0.80,  y: -0.20, rx: 0.95, ry: 0.52, weight: 0.95 }, // Base shelf right
      { x: 0.0,   y: -0.22, rx: 1.30, ry: 0.50, weight: 1.0 },  // Base shelf center
    ];

    // Inner hollow for logo chamber (centered at x: 0, y: 0.40)
    const logoHollow = { x: 0.0, y: 0.40, rx: 0.88, ry: 0.62 };

    function getCloudDensity(x: number, y: number): number {
      const hdx = (x - logoHollow.x) / logoHollow.rx;
      const hdy = (y - logoHollow.y) / logoHollow.ry;
      const hollowDist = Math.sqrt(hdx * hdx + hdy * hdy);
      if (hollowDist < 0.85) return 0; // completely clear logo chamber

      // Soft feather edge around logo opening
      let hollowFactor = 1.0;
      if (hollowDist < 1.08) {
        hollowFactor = (hollowDist - 0.85) / 0.23;
      }

      let maxDepth = 0;
      for (const l of cloudLobes) {
        const dx = (x - l.x) / l.rx;
        const dy = (y - l.y) / l.ry;
        const d2 = dx * dx + dy * dy;
        if (d2 < 1.0) {
          const depth = (1.0 - d2) * l.weight;
          if (depth > maxDepth) maxDepth = depth;
        }
      }

      return maxDepth * hollowFactor;
    }

    // Pre-generate woven silk ribbon particles across the cloud
    const numThreads = 180;
    const numPtsInThread = 240;
    const minY = -0.55, maxY = 2.05;
    const minX = -2.60, maxX = 2.60;

    const tempCloudPts: { x: number; y: number; z: number; r: number; g: number; b: number; phase: number }[] = [];

    for (let i = 0; i < numThreads; i++) {
      const tY = i / (numThreads - 1);
      const baseLineY = minY + tY * (maxY - minY);
      const phase = i * 0.32;

      for (let j = 0; j < numPtsInThread; j++) {
        const tX = j / (numPtsInThread - 1);
        const baseX = minX + tX * (maxX - minX);

        // Woven silk ribbon wave undulation
        const waveY = Math.sin(baseX * 3.8 + phase) * 0.032;
        const waveX = Math.cos(baseLineY * 4.5 + phase) * 0.016;
        const px = baseX + waveX;
        const py = baseLineY + waveY;

        const density = getCloudDensity(px, py);
        if (density <= 0.02) continue;

        // 3D dome depth (pillow puff volume)
        const z = Math.sqrt(density) * 0.50;

        // Color palette matching WovenLightHero (Golden-white / Softree Orange / Warm Amber)
        const rand = Math.random();
        let red = 1.0, green = 0.52, blue = 0.08;
        if (rand < 0.22) {
          red = 1.0; green = 0.94; blue = 0.72; // Luminous golden highlight
        } else if (rand < 0.72) {
          red = 1.0; green = 0.50 + Math.random() * 0.16; blue = 0.08; // Softree neon orange
        } else {
          red = 1.0; green = 0.30 + Math.random() * 0.10; blue = 0.02; // Warm amber
        }

        tempCloudPts.push({
          x: px, y: py, z, r: red, g: green, b: blue,
          phase: phase + baseX * 1.5,
        });
      }
    }

    const cloudCount = tempCloudPts.length;
    const cloudPositions = new Float32Array(cloudCount * 3);
    const cloudOrigPositions = new Float32Array(cloudCount * 3);
    const cloudColors = new Float32Array(cloudCount * 3);
    const cloudPhases = new Float32Array(cloudCount);

    for (let i = 0; i < cloudCount; i++) {
      const p = tempCloudPts[i];
      const i3 = i * 3;
      cloudPositions[i3] = p.x;
      cloudPositions[i3 + 1] = p.y;
      cloudPositions[i3 + 2] = p.z;
      cloudOrigPositions[i3] = p.x;
      cloudOrigPositions[i3 + 1] = p.y;
      cloudOrigPositions[i3 + 2] = p.z;
      cloudColors[i3] = p.r;
      cloudColors[i3 + 1] = p.g;
      cloudColors[i3 + 2] = p.b;
      cloudPhases[i] = p.phase;
    }

    const cloudGeometry = new THREE.BufferGeometry();
    cloudGeometry.setAttribute("position", new THREE.BufferAttribute(cloudPositions, 3));
    cloudGeometry.setAttribute("color", new THREE.BufferAttribute(cloudColors, 3));

    const cloudMaterial = new THREE.PointsMaterial({
      size: 0.040,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
    });

    const cloudPoints = new THREE.Points(cloudGeometry, cloudMaterial);

    // ─────────────────────────────────────────────────────────────
    // 2. BELOW CIRCLE RADIUS (Concentric Harmonic Ripple Rings: ~9,600 points)
    // ─────────────────────────────────────────────────────────────
    const numRings = 24;
    const floorY = -1.88;
    let totalRadiusPoints = 0;
    for (let r = 0; r < numRings; r++) {
      const f = (r + 1) / numRings;
      totalRadiusPoints += Math.round(90 + f * 230);
    }

    const radiusPositions = new Float32Array(totalRadiusPoints * 3);
    const radiusOrigPositions = new Float32Array(totalRadiusPoints * 3);
    const radiusColors = new Float32Array(totalRadiusPoints * 3);
    const radiusRadii = new Float32Array(totalRadiusPoints);

    let radPtr = 0;
    for (let ring = 0; ring < numRings; ring++) {
      const f = (ring + 1) / numRings;
      // Expanding concentric radius
      const rx = 0.45 + f * 2.10;
      const rz = rx * 0.72; // Elliptical perspective on X-Z floor plane
      const numPts = Math.round(90 + f * 230);

      for (let j = 0; j < numPts; j++) {
        const ang = (j / numPts) * Math.PI * 2;
        const x = Math.cos(ang) * rx;
        const z = Math.sin(ang) * rz;
        const y = floorY;

        const idx = radPtr * 3;
        radiusPositions[idx] = x;
        radiusPositions[idx + 1] = y;
        radiusPositions[idx + 2] = z;

        radiusOrigPositions[idx] = x;
        radiusOrigPositions[idx + 1] = y;
        radiusOrigPositions[idx + 2] = z;

        radiusRadii[radPtr] = rx;

        // Golden amber concentric rings
        const rand = Math.random();
        if (rand < 0.20) {
          radiusColors[idx] = 1.0;
          radiusColors[idx + 1] = 0.92;
          radiusColors[idx + 2] = 0.65;
        } else {
          radiusColors[idx] = 1.0;
          radiusColors[idx + 1] = 0.45 + f * 0.22;
          radiusColors[idx + 2] = 0.05;
        }

        radPtr++;
      }
    }

    const radiusGeometry = new THREE.BufferGeometry();
    radiusGeometry.setAttribute("position", new THREE.BufferAttribute(radiusPositions, 3));
    radiusGeometry.setAttribute("color", new THREE.BufferAttribute(radiusColors, 3));

    const radiusMaterial = new THREE.PointsMaterial({
      size: 0.038,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });

    const radiusPoints = new THREE.Points(radiusGeometry, radiusMaterial);

    // ─────────────────────────────────────────────────────────────
    // 3. VERTICAL LIGHT BEAMS (Cascading Photon Streams: ~3,200 points)
    // ─────────────────────────────────────────────────────────────
    const numBeams = 38;
    const ptsPerBeam = 85;
    const beamCount = numBeams * ptsPerBeam; // 3,230 points

    const beamPositions = new Float32Array(beamCount * 3);
    const beamOrigPositions = new Float32Array(beamCount * 3);
    const beamColors = new Float32Array(beamCount * 3);
    const beamOffsets = new Float32Array(beamCount);

    let beamPtr = 0;
    for (let b = 0; b < numBeams; b++) {
      const tb = b / (numBeams - 1);
      const bx = -1.25 + tb * 2.5;
      const startY = -0.30 + Math.sin(tb * Math.PI) * 0.08;
      const endY = floorY;
      const totalH = startY - endY;

      for (let k = 0; k < ptsPerBeam; k++) {
        const fy = k / (ptsPerBeam - 1);
        const y = startY - fy * totalH;
        const jx = (Math.random() - 0.5) * 0.03;
        const jz = (Math.random() - 0.5) * 0.10;

        const idx = beamPtr * 3;
        beamPositions[idx] = bx + jx;
        beamPositions[idx + 1] = y;
        beamPositions[idx + 2] = jz;

        beamOrigPositions[idx] = bx + jx;
        beamOrigPositions[idx + 1] = y;
        beamOrigPositions[idx + 2] = jz;

        beamOffsets[beamPtr] = fy;

        const rand = Math.random();
        if (rand < 0.28) {
          beamColors[idx] = 1.0;
          beamColors[idx + 1] = 0.96;
          beamColors[idx + 2] = 0.78; // Photon white sparkle
        } else {
          beamColors[idx] = 1.0;
          beamColors[idx + 1] = 0.55;
          beamColors[idx + 2] = 0.12; // Orange stream
        }

        beamPtr++;
      }
    }

    const beamGeometry = new THREE.BufferGeometry();
    beamGeometry.setAttribute("position", new THREE.BufferAttribute(beamPositions, 3));
    beamGeometry.setAttribute("color", new THREE.BufferAttribute(beamColors, 3));

    const beamMaterial = new THREE.PointsMaterial({
      size: 0.035,
      map: glowTexture || undefined,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const beamPoints = new THREE.Points(beamGeometry, beamMaterial);

    // ─────────────────────────────────────────────────────────────
    // 4. MAIN SCENE HIERARCHY
    // ─────────────────────────────────────────────────────────────
    const mainGroup = new THREE.Group();
    mainGroup.add(cloudPoints);
    mainGroup.add(radiusPoints);
    mainGroup.add(beamPoints);
    scene.add(mainGroup);

    // Responsive Camera and Viewport handler
    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const curAspect = w / h;
      camera.aspect = curAspect;

      const halfFovRad = (camera.fov * Math.PI) / 360;
      const tanHalfFov = Math.tan(halfFovRad);

      const safeRadius = 2.85;
      const distFromHeight = safeRadius / tanHalfFov;
      const distFromWidth = safeRadius / (tanHalfFov * curAspect);

      camera.position.z = Math.max(distFromHeight, distFromWidth, 5.8);
      camera.updateProjectionMatrix();

      renderer.setSize(w, h, true);
    };

    updateSize(initialWidth, initialHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          updateSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // ─────────────────────────────────────────────────────────────
    // 5. 60FPS HIGH-PERFORMANCE ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouseState.current.smoothedX +=
        (mouseState.current.targetX - mouseState.current.smoothedX) * 0.06;
      mouseState.current.smoothedY +=
        (mouseState.current.targetY - mouseState.current.smoothedY) * 0.06;

      const hoverMult = mouseState.current.isHovered ? 1.35 : 1.0;

      // Group rotation based on mouse
      mainGroup.rotation.y = mouseState.current.smoothedX * 0.65;
      mainGroup.rotation.x = -mouseState.current.smoothedY * 0.55;

      // ── Cloud Silk Ribbon Wave Breathing ──
      const cPos = cloudGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < cloudCount; i++) {
        const i3 = i * 3;
        const origX = cloudOrigPositions[i3];
        const origY = cloudOrigPositions[i3 + 1];
        const origZ = cloudOrigPositions[i3 + 2];
        const phase = cloudPhases[i];

        // Fluid undulating wave displacement
        const wave = Math.sin(elapsedTime * 1.8 * hoverMult + phase) * 0.032;
        cPos[i3] = origX + Math.cos(elapsedTime * 1.4 + phase) * 0.015;
        cPos[i3 + 1] = origY + wave;
        cPos[i3 + 2] = origZ + Math.cos(elapsedTime * 1.6 + phase) * 0.035;
      }
      cloudGeometry.attributes.position.needsUpdate = true;

      // ── Below Circle Radius Floor Shockwave Ripples ──
      const rPos = radiusGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < totalRadiusPoints; i++) {
        const i3 = i * 3;
        const rad = radiusRadii[i];
        // Concentric wave ripple pulsing outward
        const ripple = Math.sin(rad * 7.5 - elapsedTime * 3.2 * hoverMult) * 0.045;
        rPos[i3 + 1] = floorY + ripple;
      }
      radiusGeometry.attributes.position.needsUpdate = true;

      // ── Vertical Light Beam Waterfall Flow ──
      const bPos = beamGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < beamCount; i++) {
        const i3 = i * 3;
        const startY = beamOrigPositions[i3 + 1];
        const offset = beamOffsets[i];
        const beamH = startY - floorY;

        // Continuous cascading downward flow
        const cycle = (offset + elapsedTime * 0.45 * hoverMult) % 1.0;
        bPos[i3 + 1] = startY - cycle * beamH;
      }
      beamGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      radiusGeometry.dispose();
      radiusMaterial.dispose();
      beamGeometry.dispose();
      beamMaterial.dispose();
      glowTexture?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[1104/836] max-w-[840px] select-none flex items-center justify-center overflow-visible"
    >
      {/* ── AMBIENT BLOOM GLOW BEHIND CLOUD (NATIVE SEAMLESS RADIAL) ── */}
      <div
        className={`pointer-events-none absolute left-[50%] top-[38.8%] -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(255,115,20,0.30)_0%,rgba(255,75,0,0.06)_52%,transparent_74%)] blur-3xl transition-all duration-500 z-0 ${
          isCloudHovered ? "scale-115 opacity-100" : "scale-100 opacity-80"
        }`}
        aria-hidden="true"
      />

      {/* ── THREE.JS WEBGL CONTAINER (100% NATIVE TRANSPARENT) ── */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ══════════════════════════════════════════════
          CENTRAL AWS BEDROCK LOGO & TYPOGRAPHY (PURE VECTOR SVG, PERFECTLY CENTERED)
         ══════════════════════════════════════════════ */}
      <motion.div
        animate={{
          scale: isCloudHovered ? 1.05 : 1,
          x: mouseState.current.smoothedX * 35,
          y: -mouseState.current.smoothedY * 25,
        }}
        transition={{ scale: { duration: 0.3 } }}
        onMouseEnter={() => setIsCloudHovered(true)}
        onMouseLeave={() => setIsCloudHovered(false)}
        className="absolute left-[50%] top-[38.8%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer pointer-events-auto select-none"
        title="Amazon Bedrock AI Foundation Platform"
      >
        {/* ── 1. OFFICIAL AWS LOGO (Exact Trademark Vector Path) ── */}
        <div className="relative flex flex-col items-center mb-1 sm:mb-1.5">
          <svg
            className="w-18 sm:w-21 md:w-22 h-auto text-white overflow-visible drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] filter"
            viewBox="0 0 304 182"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Official AWS Letterforms */}
            <path
              fill="#FFFFFF"
              d="M86.4,66.4c0,3.7,0.4,6.7,1.1,8.9c0.8,2.2,1.8,4.6,3.2,7.2c0.5,0.8,0.7,1.6,0.7,2.3c0,1-0.6,2-1.9,3l-6.3,4.2
                c-0.9,0.6-1.8,0.9-2.6,0.9c-1,0-2-0.5-3-1.4C76.2,90,75,88.4,74,86.8c-1-1.7-2-3.6-3.1-5.9c-7.8,9.2-17.6,13.8-29.4,13.8
                c-8.4,0-15.1-2.4-20-7.2c-4.9-4.8-7.4-11.2-7.4-19.2c0-8.5,3-15.4,9.1-20.6c6.1-5.2,14.2-7.8,24.5-7.8c3.4,0,6.9,0.3,10.6,0.8
                c3.7,0.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16c-3.2-3.1-8.6-4.6-16.3-4.6c-3.5,0-7.1,0.4-10.8,1.3c-3.7,0.9-7.3,2-10.8,3.4
                c-1.6,0.7-2.8,1.1-3.5,1.3c-0.7,0.2-1.2,0.3-1.6,0.3c-1.4,0-2.1-1-2.1-3.1v-4.9c0-1.6,0.2-2.8,0.7-3.5c0.5-0.7,1.4-1.4,2.8-2.1
                c3.5-1.8,7.7-3.3,12.6-4.5c4.9-1.3,10.1-1.9,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1c5.5,5.4,8.3,13.6,8.3,24.6V66.4z M45.8,81.6
                c3.3,0,6.7-0.6,10.3-1.8c3.6-1.2,6.8-3.4,9.5-6.4c1.6-1.9,2.8-4,3.4-6.4c0.6-2.4,1-5.3,1-8.7v-4.2c-2.9-0.7-6-1.3-9.2-1.7
                c-3.2-0.4-6.3-0.6-9.4-0.6c-6.7,0-11.6,1.3-14.9,4c-3.3,2.7-4.9,6.5-4.9,11.5c0,4.7,1.2,8.2,3.7,10.6
                C37.7,80.4,41.2,81.6,45.8,81.6z M126.1,92.4c-1.8,0-3-0.3-3.8-1c-0.8-0.6-1.5-2-2.1-3.9L96.7,10.2c-0.6-2-0.9-3.3-0.9-4
                c0-1.6,0.8-2.5,2.4-2.5h9.8c1.9,0,3.2,0.3,3.9,1c0.8,0.6,1.4,2,2,3.9l16.8,66.2l15.6-66.2c0.5-2,1.1-3.3,1.9-3.9c0.8-0.6,2.2-1,4-1
                h8c1.9,0,3.2,0.3,4,1c0.8,0.6,1.5,2,1.9,3.9l15.8,67l17.3-67c0.6-2,1.3-3.3,2-3.9c0.8-0.6,2.1-1,3.9-1h9.3c1.6,0,2.5,0.8,2.5,2.5
                c0,0.5-0.1,1-0.2,1.6c-0.1,0.6-0.3,1.4-0.7,2.5l-24.1,77.3c-0.6,2-1.3,3.3-2.1,3.9c-0.8,0.6-2.1,1-3.8,1h-8.6c-1.9,0-3.2-0.3-4-1
                c-0.8-0.7-1.5-2-1.9-4L156,23l-15.4,64.4c-0.5,2-1.1,3.3-1.9,4c-0.8,0.7-2.2,1-4,1H126.1z M254.6,95.1c-5.2,0-10.4-0.6-15.4-1.8
                c-5-1.2-8.9-2.5-11.5-4c-1.6-0.9-2.7-1.9-3.1-2.8c-0.4-0.9-0.6-1.9-0.6-2.8v-5.1c0-2.1,0.8-3.1,2.3-3.1c0.6,0,1.2,0.1,1.8,0.3
                c0.6,0.2,1.5,0.6,2.5,1c3.4,1.5,7.1,2.7,11,3.5c4,0.8,7.9,1.2,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3c3.4-2.2,5.2-5.4,5.2-9.5
                c0-2.8-0.9-5.1-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L246,52c-7.3-2.3-12.7-5.7-16-10.2c-3.3-4.4-5-9.3-5-14.5c0-4.2,0.9-7.9,2.7-11.1
                c1.8-3.2,4.2-6,7.2-8.2c3-2.3,6.4-4,10.4-5.2c4-1.2,8.2-1.7,12.6-1.7c2.2,0,4.5,0.1,6.7,0.4c2.3,0.3,4.4,0.7,6.5,1.1
                c2,0.5,3.9,1,5.7,1.6c1.8,0.6,3.2,1.2,4.2,1.8c1.4,0.8,2.4,1.6,3,2.5c0.6,0.8,0.9,1.9,0.9,3.3v4.7c0,2.1-0.8,3.2-2.3,3.2
                c-0.8,0-2.1-0.4-3.8-1.2c-5.7-2.6-12.1-3.9-19.2-3.9c-5.7,0-10.2,0.9-13.3,2.8c-3.1,1.9-4.7,4.8-4.7,8.9c0,2.8,1,5.2,3,7.1
                c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6c3.1,4.1,4.6,8.8,4.6,14c0,4.3-0.9,8.2-2.6,11.6
                c-1.8,3.4-4.2,6.4-7.3,8.8c-3.1,2.5-6.8,4.3-11.1,5.6C264.4,94.4,259.7,95.1,254.6,95.1z"
            />
            {/* Official AWS Orange Smile Curve & Arrowhead */}
            <path
              fill="#FF9900"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M273.5,143.7c-32.9,24.3-80.7,37.2-121.8,37.2c-57.6,0-109.5-21.3-148.7-56.7c-3.1-2.8-0.3-6.6,3.4-4.4
                c42.4,24.6,94.7,39.5,148.8,39.5c36.5,0,76.6-7.6,113.5-23.2C274.2,133.6,278.9,139.7,273.5,143.7z"
            />
            <path
              fill="#FF9900"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M287.2,128.1c-4.2-5.4-27.8-2.6-38.5-1.3c-3.2,0.4-3.7-2.4-0.8-4.5c18.8-13.2,49.7-9.4,53.3-5
                c3.6,4.5-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C282.5,155.7,291.4,133.4,287.2,128.1z"
            />
          </svg>
        </div>

        {/* ── 2. AMAZON BEDROCK TYPOGRAPHY ── */}
        <div className="flex flex-col items-center text-center -space-y-0.5 sm:-space-y-1 mt-0.5">
          <span
            className="text-[20px] sm:text-[23px] md:text-[25px] font-semibold text-white tracking-[-0.015em] leading-tight"
            style={{
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.95), 0 0 24px rgba(255, 255, 255, 0.3)",
            }}
          >
            Amazon
          </span>
          <span
            className="text-[20px] sm:text-[23px] md:text-[25px] font-semibold text-white tracking-[-0.015em] leading-tight"
            style={{
              textShadow: "0 2px 14px rgba(0, 0, 0, 0.95), 0 0 24px rgba(255, 255, 255, 0.3)",
            }}
          >
            Bedrock
          </span>
        </div>
      </motion.div>
    </div>
  );
}

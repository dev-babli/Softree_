"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleHeadHeroProps {
  className?: string;
  style?: React.CSSProperties;
}

type Anchor = [number, number, number, number, number]; // [y, frontFeat, frontBase, back, width]

// Enhanced profile anchors for a highly detailed realistic human face
const ANCHORS: Anchor[] = [
  // [y, frontFeat, frontBase, back, width]
  [1.15, 0.15, 0.15, -0.15, 0.30], // Top
  [1.00, 0.40, 0.40, -0.50, 0.60],
  [0.85, 0.52, 0.52, -0.70, 0.75],
  [0.70, 0.58, 0.58, -0.80, 0.80], // Upper forehead
  [0.55, 0.64, 0.60, -0.88, 0.82], // Brow
  [0.45, 0.52, 0.55, -0.92, 0.80], // Eye socket / root of nose
  [0.35, 0.65, 0.52, -0.90, 0.78], // Nose bridge
  [0.20, 0.80, 0.48, -0.85, 0.72], // Nose tip (reduced from 0.88 to fix stretch)
  [0.10, 0.62, 0.46, -0.80, 0.68], // Philtrum
  [0.05, 0.68, 0.45, -0.78, 0.65], // Upper lip
  [-0.02, 0.64, 0.44, -0.75, 0.62], // Mouth line
  [-0.10, 0.72, 0.44, -0.72, 0.60], // Lower lip
  [-0.20, 0.60, 0.45, -0.68, 0.57], // Under lip
  [-0.35, 0.76, 0.48, -0.60, 0.55], // Chin
  [-0.55, 0.58, 0.45, -0.45, 0.52], // Jaw/Neck front
  [-0.80, 0.45, 0.38, -0.35, 0.45], // Neck
  [-1.10, 0.50, 0.42, -0.30, 0.52], // Base/Shoulders
];

function interp(y: number, col: 1 | 2 | 3 | 4): number {
  if (y >= ANCHORS[0][0]) return ANCHORS[0][col];
  const last = ANCHORS[ANCHORS.length - 1];
  if (y <= last[0]) return last[col];
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const a = ANCHORS[i];
    const b = ANCHORS[i + 1];
    if (y <= a[0] && y >= b[0]) {
      const t = (a[0] - y) / (a[0] - b[0]);
      const t2 = (1 - Math.cos(t * Math.PI)) / 2; // Cosine interpolation for smooth curves
      return a[col] * (1 - t2) + b[col] * t2;
    }
  }
  return 0;
}

function radiusAt(y: number, theta: number): number {
  const c = Math.cos(theta);
  const s = Math.sin(theta);

  if (c >= 0) { // Front half
    const feat = interp(y, 1);
    const base = interp(y, 2);
    const width = interp(y, 4);

    // Higher power means nose/lips are confined to the center and don't stretch cheeks
    const featureWeight = Math.pow(c, 16);
    const facePlaneX = base + (feat - base) * featureWeight;

    const a = facePlaneX;
    const b = width;
    const denom = Math.sqrt((b * c) * (b * c) + (a * s) * (a * s));
    return denom > 0 ? (a * b) / denom : 0;
  } else { // Back half
    const back = Math.abs(interp(y, 3));
    const width = interp(y, 4);
    const a = back;
    const b = width;
    const denom = Math.sqrt((b * c) * (b * c) + (a * s) * (a * s));
    return denom > 0 ? (a * b) / denom : 0;
  }
}

function createGlowTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(255, 220, 150, 0.8)");
  gradient.addColorStop(0.5, "rgba(255, 120, 0, 0.2)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

const ParticleHeadHero: React.FC<ParticleHeadHeroProps> = ({
  className,
  style,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    // Deep black background with very subtle warm atmospheric glow
    scene.background = new THREE.Color(0x020100);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const headGroup = new THREE.Group();
    scene.add(headGroup);

    const tex = createGlowTexture();
    const cWhite = new THREE.Color(0xffffff);
    const cWarmWhite = new THREE.Color(0xfff0cc); // Golden warm white
    const cGold = new THREE.Color(0xffcc00); // Brilliant pure gold
    const cOrange = new THREE.Color(0xff6600); // Vibrant glowing orange
    const cDark = new THREE.Color(0x330500);

    const VSCALE = 1.0; // Reset scale to rely purely on correct anchors

    // --- 1. Head Contours (Topographic Radiating Surface) ---
    const headPos: number[] = [];
    const headCol: number[] = [];
    const addHead = (x: number, y: number, z: number, c: THREE.Color) => {
      headPos.push(x, y, z);
      headCol.push(c.r, c.g, c.b);
    };

    // We use a dense grid and rejection sample to create sweeping concentric topographic rings (fingerprint effect)
    const ySteps = 450;
    const thetaSteps = 450;
    for (let iy = 0; iy < ySteps; iy++) {
      const y = 1.15 - (iy / ySteps) * 2.25;

      for (let it = 0; it < thetaSteps; it++) {
        const theta = (it / thetaSteps) * Math.PI * 2;
        const r = radiusAt(y, theta);
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        // Center of radiation (Temple area)
        const dX = x - 0.0;
        const dY = y - 0.3;
        const dZ = z - 0.6;
        const distToTemple = Math.sqrt(dX * dX + dY * dY + dZ * dZ);

        // Define distinct topographic rings
        const ringSpacing = 0.035;
        const thickness = 0.007;

        if (distToTemple % ringSpacing < thickness) {
          let c = cGold.clone();
          if (x < 0) { // Back of head -> Orange/Gold
            const t = Math.min(1, Math.abs(x) / 0.8);
            c = cGold.clone().lerp(cOrange, t);
          } else { // Front face -> Intense White/Gold
            const zNorm = Math.min(1, Math.abs(z) / 0.5);
            c = cWhite.clone().lerp(cGold, zNorm * 0.4); // Very bright face
          }
          if (Math.random() < 0.15) c = cWhite.clone(); // High frequency of bright white sparks
          addHead(x, y * VSCALE, z, c);
        }
      }
    }

    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute("position", new THREE.Float32BufferAttribute(headPos, 3));
    headGeo.setAttribute("color", new THREE.Float32BufferAttribute(headCol, 3));
    const headMat = new THREE.PointsMaterial({
      size: 0.035, // Larger size for clear, brilliantly glowing dots
      vertexColors: true,
      map: tex || undefined,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    headGroup.add(new THREE.Points(headGeo, headMat));

    // --- 2. Bright Facial Profile Rim ---
    const rimPos: number[] = [];
    const rimCol: number[] = [];
    for (let y = 1.15; y >= -1.0; y -= 0.003) {
      // Front profile highlight
      const rFront = radiusAt(y, 0);
      rimPos.push(rFront, y * VSCALE, 0);
      rimCol.push(cWhite.r, cWhite.g, cWhite.b);

      // Back profile highlight
      const rBack = radiusAt(y, Math.PI);
      rimPos.push(-rBack, y * VSCALE, 0);
      rimCol.push(cOrange.r, cOrange.g, cOrange.b);
    }
    const rimGeo = new THREE.BufferGeometry();
    rimGeo.setAttribute("position", new THREE.Float32BufferAttribute(rimPos, 3));
    rimGeo.setAttribute("color", new THREE.Float32BufferAttribute(rimCol, 3));
    const rimMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      map: tex || undefined,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    headGroup.add(new THREE.Points(rimGeo, rimMat));

    // --- 3. Inner Brain / Neural Paths ---
    const brainPos: number[] = [];
    const brainCol: number[] = [];
    for (let b = 0; b < 400; b++) { // Denser paths for a visible brain cloud
      const cy = 0.5 + Math.random() * 0.4; // Upper section
      const cx = -0.2 + (Math.random() - 0.5) * 0.6; // Rear section
      const cz = (Math.random() - 0.5) * 0.4;
      const maxR = 0.05 + Math.random() * 0.25; // Slightly wider swirls

      const pathPts = 120;
      for (let p = 0; p < pathPts; p++) {
        const t = p / pathPts;
        const angle = t * Math.PI * (4 + Math.random() * 4); // Curved spiral paths
        const r = t * maxR;
        const bx = cx + Math.cos(angle) * r;
        const by = cy + t * 0.2; // Spiral upwards
        const bz = cz + Math.sin(angle) * r;

        const limitR = radiusAt(by, Math.atan2(bz, bx));
        const dist = Math.sqrt(bx * bx + bz * bz);
        if (dist < limitR * 0.70) {
          brainPos.push(bx, by * VSCALE, bz);
          // Mostly gold with occasional bright orange
          const bc = Math.random() > 0.3 ? cGold : cOrange;
          brainCol.push(bc.r, bc.g, bc.b);
        }
      }
    }
    const brainGeo = new THREE.BufferGeometry();
    brainGeo.setAttribute("position", new THREE.Float32BufferAttribute(brainPos, 3));
    brainGeo.setAttribute("color", new THREE.Float32BufferAttribute(brainCol, 3));
    const brainMat = new THREE.PointsMaterial({
      size: 0.045, // Larger dots for the brain so they are visible
      vertexColors: true,
      map: tex || undefined,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    headGroup.add(new THREE.Points(brainGeo, brainMat));

    // --- 4. Glowing Eye Highlight ---
    const eyePos: number[] = [];
    const eyeCol: number[] = [];
    const eyeY = 0.45;
    const eyeX = 0.48;
    const eyeZ = 0.22; // Right eye only for strong profile read
    const cEye = new THREE.Color(0xffffff); // Pure white core
    for (let e = 0; e < 250; e++) {
      // Starburst rays extending outward
      const rayDir = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).normalize();

      rayDir.x *= 0.3; // Flatten slightly to fit socket

      const length = Math.random() * 0.18; // Long intense rays
      const px = eyeX + rayDir.x * length;
      const py = eyeY + rayDir.y * length;
      const pz = eyeZ + rayDir.z * length;

      eyePos.push(px, py * VSCALE, pz);
      eyeCol.push(cEye.r, cEye.g, cEye.b);
    }
    const eyeGeo = new THREE.BufferGeometry();
    eyeGeo.setAttribute("position", new THREE.Float32BufferAttribute(eyePos, 3));
    eyeGeo.setAttribute("color", new THREE.Float32BufferAttribute(eyeCol, 3));
    const eyeMat = new THREE.PointsMaterial({
      size: 0.08, // Intense glow
      vertexColors: true,
      map: tex || undefined,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    headGroup.add(new THREE.Points(eyeGeo, eyeMat));

    // --- 5. Atmospheric Background Sparks ---
    const sparkPos: number[] = [];
    const sparkCol: number[] = [];
    for (let i = 0; i < 4000; i++) {
      // Cloud roughly centered around head, pushed outward
      const x = (Math.random() - 0.6) * 12; // shifted slightly rearwards
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;

      const headR = radiusAt(y / VSCALE, Math.atan2(z, x));
      const distToCenter = Math.sqrt(x * x + z * z);
      if (distToCenter < headR * 1.5 && y / VSCALE < 1.3 && y / VSCALE > -1.2) continue; // Keep out of dense head bounds

      sparkPos.push(x, y, z);

      let c = Math.random() < 0.6 ? cOrange : cGold;
      if (Math.random() < 0.03) c = cWhite;

      // Atmospheric distance falloff
      const dist = Math.sqrt(x * x + y * y + z * z);
      c = c.clone().multiplyScalar(Math.max(0.05, 1 - (dist / 8)));
      sparkCol.push(c.r, c.g, c.b);
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.Float32BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute("color", new THREE.Float32BufferAttribute(sparkCol, 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      map: tex || undefined,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(bgPoints);

    // Initial orientation facing right, slightly tilted towards camera
    headGroup.rotation.y = 0.2;
    headGroup.rotation.x = -0.02;

    // --- Interaction ---
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let autoRotate = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 2000);
    };
    const pointerDown = (x: number, y: number) => {
      dragging = true;
      autoRotate = false;
      lastX = x;
      lastY = y;
      velX = 0;
      velY = 0;
    };
    const pointerMove = (x: number, y: number) => {
      if (!dragging) return;
      const dx = x - lastX;
      const dy = y - lastY;
      headGroup.rotation.y += dx * 0.005;
      headGroup.rotation.x += dy * 0.005;
      headGroup.rotation.x = Math.max(-0.4, Math.min(0.4, headGroup.rotation.x));
      velX = dx * 0.005;
      velY = dy * 0.005;
      lastX = x;
      lastY = y;
    };
    const pointerUp = () => {
      dragging = false;
    };

    const onMouseDown = (e: MouseEvent) => pointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => {
      pointerMove(e.clientX, e.clientY);
      scheduleIdle();
    };
    const onMouseUp = () => pointerUp();
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      pointerDown(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      pointerMove(t.clientX, t.clientY);
      scheduleIdle();
    };
    const onTouchEnd = () => pointerUp();

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      if (!mount) return;

      const width = mount.clientWidth;
      camera.aspect = width / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, mount.clientHeight);

      // Responsive layout matching Screenshot 2 composition
      if (width < 768) {
        headGroup.scale.set(1.8, 1.8, 1.8);
        headGroup.position.set(0, -0.2, 0);
      } else if (width < 1024) {
        headGroup.scale.set(2.4, 2.4, 2.4);
        headGroup.position.set(1.0, -0.4, 0);
      } else {
        // Desktop: Large, highly detailed, occupying right side
        headGroup.scale.set(3.0, 3.0, 3.0);
        headGroup.position.set(1.8, -0.5, 0);
      }
    };
    window.addEventListener("resize", onResize);
    onResize(); // Initial sizing

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      if (!dragging) {
        if (autoRotate) {
          // Smoothly return to slow breathing orientation facing right
          const breathY = 0.2 + Math.sin(time * 0.5) * 0.05;
          headGroup.rotation.y += (breathY - headGroup.rotation.y) * 0.02;
          headGroup.rotation.x += (-0.02 - headGroup.rotation.x) * 0.02;
        } else {
          // Inertial drift after interaction
          headGroup.rotation.y += velX;
          headGroup.rotation.x += velY;
          velX *= 0.92;
          velY *= 0.92;
        }
      }

      // Slowly rotate background sparks for atmospheric movement
      bgPoints.rotation.y -= 0.0005;
      bgPoints.rotation.z += 0.0002;

      // Subtle float
      headGroup.position.y += (Math.sin(time) * 0.001);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);

      headGeo.dispose();
      headMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      if (tex) tex.dispose();

      brainGeo.dispose();
      brainMat.dispose();

      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
};

export default ParticleHeadHero;

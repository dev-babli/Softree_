"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ParticleHead
 * Exact implementation matching the reference visual:
 * - Beautiful organic neural particle face & cranium.
 * - 70% Silver / Starlight White points with 30% intense glowing golden-orange rim halo.
 * - Anatomically accurate human facial features (feathered brows, realistic eyes with iris/pupil,
 *   sculpted nose, sensual lips, defined ears, cheekbones, chin, and center meridian line).
 * - Delicately connected wireframe network lines and ambient radiating bokeh embers.
 * - Graceful neck with smooth transparency fade-out.
 */

interface ParticleHeadProps {
  className?: string;
  style?: React.CSSProperties;
  pointCount?: number;
  backgroundColor?: string;
}

// ─── Math Helpers ───────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function gauss(x: number, c: number, w: number) {
  const d = (x - c) / w;
  return Math.exp(-d * d);
}

function pgauss(phi: number, c: number, w: number) {
  let d = phi - c;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return Math.exp(-(d / w) * (d / w));
}

// ─── Anatomical Head Surface Generator ──────────────────────────────

// Profile radii [y, sideRadius, frontRadius, backRadius]
type PA = [number, number, number, number];

const PROFILE: PA[] = [
  [ 1.05, 0.00, 0.00, 0.00],
  [ 1.00, 0.16, 0.15, 0.18],
  [ 0.90, 0.32, 0.28, 0.38],
  [ 0.80, 0.42, 0.36, 0.50],
  [ 0.70, 0.47, 0.40, 0.56], // Forehead
  [ 0.58, 0.48, 0.39, 0.56], // Brow Ridge
  [ 0.48, 0.47, 0.34, 0.54], // Eye Sockets (deep orbit)
  [ 0.38, 0.46, 0.35, 0.52], // Cheekbones
  [ 0.26, 0.43, 0.32, 0.48], // Nose Tip Level
  [ 0.16, 0.39, 0.30, 0.44], // Philtrum
  [ 0.06, 0.36, 0.30, 0.40], // Mouth
  [-0.04, 0.33, 0.27, 0.37], // Lower Lip / Mentolabial
  [-0.14, 0.28, 0.26, 0.33], // Chin
  [-0.24, 0.22, 0.18, 0.27], // Submental / Throat
  [-0.38, 0.20, 0.16, 0.22], // Mid Neck
  [-0.55, 0.24, 0.19, 0.25], // Lower Neck / Clavicle flare
];

function lerpProfile(y: number): [number, number, number] {
  if (y >= PROFILE[0][0]) return [PROFILE[0][1], PROFILE[0][2], PROFILE[0][3]];
  const last = PROFILE[PROFILE.length - 1];
  if (y <= last[0]) return [last[1], last[2], last[3]];
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const a = PROFILE[i], b = PROFILE[i + 1];
    if (y <= a[0] && y >= b[0]) {
      const t = (a[0] - y) / (a[0] - b[0]);
      return [a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t];
    }
  }
  return [0, 0, 0];
}

function baseRadius(y: number, phi: number): number {
  const [s, f, bk] = lerpProfile(y);
  const c = Math.cos(phi), sn = Math.sin(phi);
  const a = s, b = c >= 0 ? f : bk;
  const d = Math.sqrt((b * sn) ** 2 + (a * c) ** 2);
  return d > 0 ? (a * b) / d : 0;
}

// Precise 3D Facial Deformations
function getSurfaceRadius(y: number, phi: number): number {
  let r = baseRadius(y, phi);
  if (r <= 0.001) return 0;

  // Nose Bridge & Tip
  const noseBridge = gauss(y, 0.38, 0.08) * pgauss(phi, 0, 0.15) * 0.11;
  const noseTip = gauss(y, 0.26, 0.045) * pgauss(phi, 0, 0.14) * 0.18;
  const noseAlae = (gauss(y, 0.23, 0.035) * pgauss(phi, 0.20, 0.09) +
                    gauss(y, 0.23, 0.035) * pgauss(phi, -0.20, 0.09)) * 0.05;

  // Eye Sockets (Deep orbit depression)
  const eyeL = gauss(y, 0.48, 0.055) * pgauss(phi, 0.38, 0.16);
  const eyeR = gauss(y, 0.48, 0.055) * pgauss(phi, -0.38, 0.16);
  const eyeRecess = (eyeL + eyeR) * -0.075;

  // Brow Ridge (Prominent arch above eye sockets)
  const browL = gauss(y, 0.56, 0.04) * pgauss(phi, 0.34, 0.30);
  const browR = gauss(y, 0.56, 0.04) * pgauss(phi, -0.34, 0.30);
  const browRidge = (browL + browR) * 0.065;

  // Lips (Upper cupid's bow, lower full lip, depression at corners)
  const lipAngle = pgauss(phi, 0, 0.28);
  const upperLip = gauss(y, 0.11, 0.022) * 0.055 * lipAngle;
  const lowerLip = gauss(y, 0.03, 0.025) * 0.065 * lipAngle;
  const mouthSeam = -gauss(y, 0.07, 0.010) * 0.02 * lipAngle;

  // Chin Prominence
  const chin = gauss(y, -0.12, 0.055) * pgauss(phi, 0, 0.32) * 0.09;

  // Cheekbones (Zygomatic arch)
  const cheekL = gauss(y, 0.38, 0.08) * pgauss(phi, 0.78, 0.20) * 0.045;
  const cheekR = gauss(y, 0.38, 0.08) * pgauss(phi, -0.78, 0.20) * 0.045;

  // Ears (Anatomical ears protruding on both sides)
  const earHeight = gauss(y, 0.38, 0.11);
  const earL = earHeight * pgauss(phi, Math.PI * 0.50, 0.22) * 0.085;
  const earR = earHeight * pgauss(phi, -Math.PI * 0.50, 0.22) * 0.085;

  r += noseBridge + noseTip + noseAlae + eyeRecess + browRidge + upperLip + lowerLip + mouthSeam + chin + cheekL + cheekR + earL + earR;
  return Math.max(0, r);
}

function getPointOnHead(y: number, phi: number, scale = 1): THREE.Vector3 {
  const r = getSurfaceRadius(y, phi) * scale;
  return new THREE.Vector3(Math.sin(phi) * r, y, Math.cos(phi) * r);
}

// ─── Glow Particle Texture Generator ─────────────────────────────────

function createGlowDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.2, "rgba(240, 248, 255, 0.95)");
    grad.addColorStop(0.5, "rgba(200, 225, 255, 0.4)");
    grad.addColorStop(0.8, "rgba(255, 140, 40, 0.15)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  return new THREE.CanvasTexture(canvas);
}

// ─── Component ───────────────────────────────────────────────────────

const ParticleHead: React.FC<ParticleHeadProps> = ({
  className,
  style,
  backgroundColor = "#000000",
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    cam.position.set(0, 0.28, 3.2);

    const ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ren.setSize(width, height);
    ren.setClearColor(new THREE.Color(backgroundColor), 1);
    mount.appendChild(ren.domElement);

    const dotTex = createGlowDotTexture();

    const hg = new THREE.Group();
    scene.add(hg);

    // Color definitions
    const cSilverWhite = new THREE.Color("#FFFFFF");
    const cSilverLight = new THREE.Color("#E2E8F0");
    const cSilverMuted = new THREE.Color("#94A3B8");
    const cOrangeBright = new THREE.Color("#FF7700");
    const cOrangeWarm   = new THREE.Color("#FFAA33");
    const cGoldGlow     = new THREE.Color("#FFCC55");

    // ── 1. Structured Head Grid: Fine Mesh & Particles ──────────────────
    // Creates the organic wireframe look matching reference image 2
    const numLat = 75;  // vertical slices
    const numLon = 110; // radial segments

    const gridPoints: THREE.Vector3[][] = [];
    const meshLinePts: THREE.Vector3[] = [];
    const surfacePts: THREE.Vector3[] = [];
    const surfaceColors: number[] = [];

    const Y_TOP = 1.05;
    const Y_BOT = -0.52;

    for (let i = 0; i <= numLat; i++) {
      const v = i / numLat;
      const y = Y_TOP + v * (Y_BOT - Y_TOP);
      gridPoints[i] = [];

      // Fade factor near neck base
      const neckFade = y < -0.25 ? Math.max(0, 1 - (-0.25 - y) / 0.27) : 1;

      for (let j = 0; j <= numLon; j++) {
        const u = j / numLon;
        const phi = u * Math.PI * 2;
        const pt = getPointOnHead(y, phi);
        gridPoints[i][j] = pt;

        if (pt.length() > 0.05 && neckFade > 0.05) {
          // Add surface points (70% Silver, 30% Orange)
          surfacePts.push(pt);
          const isFront = Math.cos(phi) > 0.2;
          const isFaceFeature = isFront && y > -0.20 && y < 0.65;
          const rand = Math.random();

          let c: THREE.Color;
          if (isFaceFeature) {
            // Facial area is mostly silver starlight
            c = rand < 0.78 ? cSilverWhite : cOrangeWarm;
          } else {
            c = rand < 0.65 ? cSilverLight : cOrangeBright;
          }

          const brightFactor = (0.4 + rand * 0.6) * neckFade;
          surfaceColors.push(c.r * brightFactor, c.g * brightFactor, c.b * brightFactor);
        }
      }
    }

    // Connect delicate horizontal latitude contour lines
    for (let i = 2; i < numLat; i += 1) {
      const y = Y_TOP + (i / numLat) * (Y_BOT - Y_TOP);
      const neckFade = y < -0.25 ? Math.max(0, 1 - (-0.25 - y) / 0.27) : 1;
      if (neckFade <= 0.05) continue;

      for (let j = 0; j < numLon; j++) {
        const p1 = gridPoints[i][j];
        const p2 = gridPoints[i][j + 1];
        if (p1.length() > 0.05 && p2.length() > 0.05) {
          meshLinePts.push(p1, p2);
        }
      }
    }

    // Connect subtle vertical longitude lines (spaced out for wireframe feel)
    for (let j = 0; j < numLon; j += 4) {
      for (let i = 2; i < numLat - 1; i++) {
        const p1 = gridPoints[i][j];
        const p2 = gridPoints[i + 1][j];
        if (p1.length() > 0.05 && p2.length() > 0.05) {
          meshLinePts.push(p1, p2);
        }
      }
    }

    // Add Surface Mesh Lines
    const meshLineGeo = new THREE.BufferGeometry().setFromPoints(meshLinePts);
    const meshLineMat = new THREE.LineBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    });
    hg.add(new THREE.LineSegments(meshLineGeo, meshLineMat));

    // Add Surface Dots (70% Silver / 30% Orange)
    const surfGeo = new THREE.BufferGeometry().setFromPoints(surfacePts);
    surfGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(surfaceColors), 3));
    const surfMat = new THREE.PointsMaterial({
      size: 0.016,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    hg.add(new THREE.Points(surfGeo, surfMat));

    // ── 2. Glowing Halo Rim Lining (30% Fiery Golden-Orange) ────────────
    const RIM_COUNT = 6500;
    const rimP = new Float32Array(RIM_COUNT * 3);
    const rimC = new Float32Array(RIM_COUNT * 3);
    let rIdx = 0;

    for (let i = 0; i < RIM_COUNT * 2 && rIdx < RIM_COUNT; i++) {
      const y = Y_TOP + Math.random() * (Y_BOT - Y_TOP);
      const phi = Math.random() * Math.PI * 2;
      const neckFade = y < -0.25 ? Math.max(0, 1 - (-0.25 - y) / 0.27) : 1;
      if (neckFade <= 0.02) continue;

      const sr = getSurfaceRadius(y, phi);
      if (sr <= 0.02) continue;

      // Concentrate on the silhouette / perimeter
      const jitter = (Math.random() - 0.5) * 0.025;
      const r = (sr + jitter) * 1.004;

      rimP[rIdx * 3] = Math.sin(phi) * r;
      rimP[rIdx * 3 + 1] = y;
      rimP[rIdx * 3 + 2] = Math.cos(phi) * r;

      const rand = Math.random();
      const c = rand < 0.65
        ? cOrangeBright.clone().lerp(cGoldGlow, Math.random() * 0.6)
        : cSilverWhite.clone().lerp(cGoldGlow, Math.random() * 0.5);

      const op = neckFade * (0.6 + Math.random() * 0.4);
      rimC[rIdx * 3] = c.r * op;
      rimC[rIdx * 3 + 1] = c.g * op;
      rimC[rIdx * 3 + 2] = c.b * op;
      rIdx++;
    }

    const rimGeo = new THREE.BufferGeometry();
    rimGeo.setAttribute("position", new THREE.BufferAttribute(rimP, 3));
    rimGeo.setAttribute("color", new THREE.BufferAttribute(rimC, 3));
    const rimMat = new THREE.PointsMaterial({
      size: 0.026,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    hg.add(new THREE.Points(rimGeo, rimMat));

    // ── 3. Anatomical Facial Feature Constellations ─────────────────────
    // Formed of fine, dense starlight points with subtle connected lines
    const featureGrp = new THREE.Group();

    const addConstellation = (
      points: THREE.Vector3[],
      colorHex = 0xffffff,
      opacity = 0.95,
      dotSize = 0.025,
      connectLines = true
    ) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const dense = curve.getPoints(Math.max(16, points.length * 10));
      const geom = new THREE.BufferGeometry().setFromPoints(dense);

      if (connectLines) {
        const lMat = new THREE.LineBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: opacity * 0.45,
        });
        featureGrp.add(new THREE.Line(geom, lMat));
      }

      const pMat = new THREE.PointsMaterial({
        size: dotSize,
        map: dotTex,
        color: colorHex,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      featureGrp.add(new THREE.Points(geom, pMat));
    };

    // A. Natural Eyebrow Arches (Feathered Silver-White Arches)
    const createEyebrows = (sign: number) => {
      const browMain = [
        new THREE.Vector3(sign * 0.06, 0.54, 0.44),
        new THREE.Vector3(sign * 0.16, 0.58, 0.42),
        new THREE.Vector3(sign * 0.28, 0.57, 0.37),
        new THREE.Vector3(sign * 0.38, 0.52, 0.30),
      ];
      addConstellation(browMain, 0xffffff, 0.95, 0.028);

      const browUpper = [
        new THREE.Vector3(sign * 0.08, 0.555, 0.44),
        new THREE.Vector3(sign * 0.18, 0.595, 0.415),
        new THREE.Vector3(sign * 0.30, 0.58, 0.365),
      ];
      addConstellation(browUpper, 0xd8e8ff, 0.70, 0.020, false);
    };
    createEyebrows(1);
    createEyebrows(-1);

    // B. Anatomical Almond Eyes (Iris, Upper/Lower Lids, Bright Pupil Glints)
    const createRealisticEyes = (sign: number) => {
      // Upper Eyelid Arch
      const upperLid = [
        new THREE.Vector3(sign * 0.09, 0.47, 0.41),
        new THREE.Vector3(sign * 0.18, 0.50, 0.405),
        new THREE.Vector3(sign * 0.28, 0.495, 0.37),
        new THREE.Vector3(sign * 0.36, 0.46, 0.32),
      ];
      addConstellation(upperLid, 0xffffff, 0.98, 0.026);

      // Lower Eyelid
      const lowerLid = [
        new THREE.Vector3(sign * 0.09, 0.47, 0.41),
        new THREE.Vector3(sign * 0.20, 0.45, 0.395),
        new THREE.Vector3(sign * 0.30, 0.455, 0.35),
        new THREE.Vector3(sign * 0.36, 0.46, 0.32),
      ];
      addConstellation(lowerLid, 0xffbb66, 0.85, 0.022);

      // Iris Ring
      const irisCenter = new THREE.Vector3(sign * 0.22, 0.475, 0.395);
      const irisPts: THREE.Vector3[] = [];
      for (let a = 0; a <= 16; a++) {
        const rad = (a / 16) * Math.PI * 2;
        irisPts.push(
          new THREE.Vector3(
            irisCenter.x + Math.sin(rad) * 0.026,
            irisCenter.y + Math.cos(rad) * 0.024,
            irisCenter.z + 0.002
          )
        );
      }
      addConstellation(irisPts, 0x88ccff, 0.90, 0.018);

      // Luminous Pupil Spark
      const pupilGeo = new THREE.BufferGeometry().setFromPoints([irisCenter]);
      const pupilMat = new THREE.PointsMaterial({
        size: 0.065,
        map: dotTex,
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      featureGrp.add(new THREE.Points(pupilGeo, pupilMat));
    };
    createRealisticEyes(1);
    createRealisticEyes(-1);

    // C. Sculpted Nose (Bridge, Tip, Nostril Alae, Base)
    const noseBridge = [
      new THREE.Vector3(0.00, 0.54, 0.44),
      new THREE.Vector3(0.00, 0.44, 0.465),
      new THREE.Vector3(0.00, 0.34, 0.505),
      new THREE.Vector3(0.00, 0.26, 0.53),
    ];
    addConstellation(noseBridge, 0xffffff, 0.95, 0.030);

    const noseTipCurve = [
      new THREE.Vector3(-0.04, 0.245, 0.51),
      new THREE.Vector3(0.00, 0.26, 0.53),
      new THREE.Vector3(0.04, 0.245, 0.51),
    ];
    addConstellation(noseTipCurve, 0xffd8a8, 0.95, 0.026);

    for (const sign of [1, -1]) {
      const nostrilAla = [
        new THREE.Vector3(sign * 0.03, 0.23, 0.50),
        new THREE.Vector3(sign * 0.10, 0.22, 0.45),
        new THREE.Vector3(sign * 0.08, 0.18, 0.41),
      ];
      addConstellation(nostrilAla, 0xff9933, 0.85, 0.024);
    }

    // D. Lips & Philtrum (Sensual Cupid's Bow, Full Lower Lip)
    // Philtrum Columns
    for (const sign of [1, -1]) {
      const philtrum = [
        new THREE.Vector3(sign * 0.025, 0.20, 0.45),
        new THREE.Vector3(sign * 0.035, 0.13, 0.435),
      ];
      addConstellation(philtrum, 0xffffff, 0.75, 0.018);
    }

    // Upper Lip
    const upperLip = [
      new THREE.Vector3(-0.15, 0.085, 0.36),
      new THREE.Vector3(-0.06, 0.125, 0.43),
      new THREE.Vector3(0.00, 0.11, 0.44),
      new THREE.Vector3(0.06, 0.125, 0.43),
      new THREE.Vector3(0.15, 0.085, 0.36),
    ];
    addConstellation(upperLip, 0xffffff, 0.95, 0.026);

    // Mouth Division Line
    const mouthLine = [
      new THREE.Vector3(-0.15, 0.085, 0.36),
      new THREE.Vector3(0.00, 0.08, 0.42),
      new THREE.Vector3(0.15, 0.085, 0.36),
    ];
    addConstellation(mouthLine, 0xff7722, 0.80, 0.018);

    // Lower Lip
    const lowerLip = [
      new THREE.Vector3(-0.15, 0.085, 0.36),
      new THREE.Vector3(-0.07, 0.035, 0.425),
      new THREE.Vector3(0.00, 0.025, 0.435),
      new THREE.Vector3(0.07, 0.035, 0.425),
      new THREE.Vector3(0.15, 0.085, 0.36),
    ];
    addConstellation(lowerLip, 0xffffff, 0.95, 0.026);

    // E. Defined Jawline & Chin
    const jawline = [
      new THREE.Vector3(-0.44, 0.18, 0.00),
      new THREE.Vector3(-0.34, 0.03, 0.16),
      new THREE.Vector3(-0.22, -0.09, 0.28),
      new THREE.Vector3(-0.09, -0.14, 0.37),
      new THREE.Vector3(0.00, -0.15, 0.39),
      new THREE.Vector3(0.09, -0.14, 0.37),
      new THREE.Vector3(0.22, -0.09, 0.28),
      new THREE.Vector3(0.34, 0.03, 0.16),
      new THREE.Vector3(0.44, 0.18, 0.00),
    ];
    addConstellation(jawline, 0xffffff, 0.90, 0.026);

    // F. Anatomical Ears (Helix & Lobe on both sides)
    for (const sign of [1, -1]) {
      const earHelix = [
        new THREE.Vector3(sign * 0.44, 0.48, 0.04),
        new THREE.Vector3(sign * 0.52, 0.50, -0.04),
        new THREE.Vector3(sign * 0.54, 0.36, -0.08),
        new THREE.Vector3(sign * 0.50, 0.24, -0.06),
        new THREE.Vector3(sign * 0.44, 0.18, 0.00),
      ];
      addConstellation(earHelix, 0xffaa33, 0.90, 0.024);
    }

    // G. Center Symmetrical Meridian (Signature dashed starlight line)
    const meridianPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 55; i++) {
      const y = 1.02 - i * 0.024;
      if (y < -0.32) continue;
      meridianPts.push(getPointOnHead(y, 0, 1.004));
    }
    addConstellation(meridianPts, 0xffffff, 0.70, 0.018, false);

    hg.add(featureGrp);

    // ── 4. Swirling Brain Whorls & Neural Topography ─────────────────────
    const brainGrp = new THREE.Group();
    const bCY = 0.74, bCP = 0.15;
    for (let i = 1; i <= 9; i++) {
      const rad = i * 0.055;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 70; s++) {
        const a = (s / 70) * Math.PI * 2;
        const ey = bCY + Math.sin(a) * rad * 0.80;
        const ep = bCP + Math.cos(a) * rad * 1.10;
        if (ey < 0.40 || ey > 1.01) continue;
        const sr = getSurfaceRadius(ey, ep);
        if (sr < 0.08) continue;
        pts.push(new THREE.Vector3(Math.sin(ep) * sr * 0.998, ey, Math.cos(ep) * sr * 0.998));
      }
      if (pts.length < 6) continue;
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      brainGrp.add(
        new THREE.Line(
          g,
          new THREE.LineBasicMaterial({
            color: i % 3 === 0 ? 0xff8833 : 0x94a3b8,
            transparent: true,
            opacity: 0.18,
          })
        )
      );
    }
    hg.add(brainGrp);

    // ── 5. Radiating Sparkles / Floating Embers ─────────────────────────
    const BG_COUNT = 900;
    const bgP = new Float32Array(BG_COUNT * 3);
    const bgC = new Float32Array(BG_COUNT * 3);
    for (let i = 0; i < BG_COUNT; i++) {
      bgP[i * 3] = (Math.random() - 0.5) * 7.5;
      bgP[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      bgP[i * 3 + 2] = (Math.random() - 0.5) * 5 - 0.2;

      const c = Math.random() < 0.70
        ? cSilverWhite.clone().multiplyScalar(0.35 + Math.random() * 0.45)
        : cOrangeBright.clone().multiplyScalar(0.35 + Math.random() * 0.45);

      bgC[i * 3] = c.r;
      bgC[i * 3 + 1] = c.g;
      bgC[i * 3 + 2] = c.b;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgP, 3));
    bgGeo.setAttribute("color", new THREE.BufferAttribute(bgC, 3));
    const bgMat = new THREE.PointsMaterial({
      size: 0.034,
      map: dotTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const bgPts = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPts);

    // ── Mouse & Touch 360 Rotation ──────────────────────────────────────
    let dragging = false;
    let lx = 0, ly = 0;
    let uYaw = 0, uPitch = 0;
    let vx = 0, vy = 0;
    let autoRot = true;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const t0 = performance.now();

    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRot = true;
      }, 3500);
    };

    const onPointerDown = (x: number, y: number) => {
      dragging = true;
      autoRot = false;
      lx = x;
      ly = y;
      vx = 0;
      vy = 0;
      if (idleTimer) clearTimeout(idleTimer);
    };

    const onPointerMove = (x: number, y: number) => {
      if (!dragging) return;
      const dx = x - lx;
      const dy = y - ly;
      uYaw += dx * 0.006;
      uPitch += dy * 0.004;
      uPitch = clamp(uPitch, -0.65, 0.65);
      vx = dx * 0.006;
      vy = dy * 0.004;
      lx = x;
      ly = y;
    };

    const onPointerUp = () => {
      dragging = false;
      resetIdle();
    };

    const handleMouseDown = (e: MouseEvent) => onPointerDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleMouseUp = () => onPointerUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onPointerUp();

    const dom = ren.domElement;
    dom.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    dom.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      ren.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ── Render Loop ─────────────────────────────────────────────────────
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      if (!dragging) {
        if (autoRot) {
          const el = performance.now() - t0;
          const sway = Math.sin(el * 0.00032) * 0.52;
          hg.rotation.y = 0.15 + sway + uYaw;
          hg.rotation.x = Math.sin(el * 0.0002) * 0.05 + uPitch;
        } else {
          uYaw += vx;
          uPitch += vy;
          hg.rotation.y = 0.15 + uYaw;
          hg.rotation.x = uPitch;
          vx *= 0.93;
          vy *= 0.93;
        }
      }

      bgPts.rotation.y += 0.0002;
      ren.render(scene, cam);
    };
    animate();

    // ── Cleanup ─────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);

      dom.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      dom.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);

      dotTex.dispose();
      meshLineGeo.dispose();
      meshLineMat.dispose();
      surfGeo.dispose();
      surfMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      bgGeo.dispose();
      bgMat.dispose();

      [featureGrp, brainGrp].forEach((g) => {
        g.children.forEach((obj) => {
          if ((obj as any).geometry) (obj as any).geometry.dispose();
          if ((obj as any).material) {
            const mat = (obj as any).material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
      });

      ren.dispose();
      if (mount.contains(dom)) mount.removeChild(dom);
    };
  }, [backgroundColor]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: backgroundColor,
        position: "relative",
        overflow: "hidden",
        cursor: "grab",
        ...style,
      }}
    />
  );
};

export default ParticleHead;
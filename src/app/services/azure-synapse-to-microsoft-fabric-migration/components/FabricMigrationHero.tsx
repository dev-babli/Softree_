"use client";

import * as THREE from "three";
import { useRef, useEffect, useState, useCallback } from "react";
import TrustStrip from "@/components/sections/TrustStrip";

/* ----------------------------- utilities ----------------------------- */

/**
 * Most efficient mobile detection for breakpoint changes:
 * - Uses matchMedia (fired only when crossing breakpoint)
 * - Safely no-ops on server (SSR)
 */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile("matches" in e ? e.matches : (e as any).matches);

    // initial
    setIsMobile(mq.matches);

    // modern API
    try {
      mq.addEventListener("change", onChange as any);
      return () => mq.removeEventListener("change", onChange as any);
    } catch {
      // fallback for older browsers
      mq.addListener(onChange as any);
      return () => mq.removeListener(onChange as any);
    }
  }, [breakpoint]);

  return isMobile;
}

/* ----------------------------- shared shader ----------------------------- */

const vertexShader = `void main(){ gl_Position = vec4(position, 1.0); }`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;

#define TAU 6.2831853071795865
#define TUNNEL_LAYERS 88
#define RING_POINTS 124
#define POINT_SIZE 2.8
#define POINT_COLOR_A vec3(1.0, 0.46, 0.08)
#define POINT_COLOR_B vec3(1.0, 0.22, 0.02)
#define SPEED 0.38

float sq(float x){ return x*x; }

vec2 AngRep(vec2 uv, float angle){
  vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
  polar.x = mod(polar.x + angle * 0.5, angle) - angle * 0.5;
  return polar.y * vec2(cos(polar.x), sin(polar.x));
}

float sdCircle(vec2 uv, float r){ return length(uv) - r; }

void main(){
  vec2 res = iResolution.xy / iResolution.y;
  // Exact Dead-Center Origin (0.0, 0.0)
  vec2 uv = gl_FragCoord.xy / iResolution.y - res * 0.5;
  vec3 color = vec3(0.0);
  
  float repAngle = TAU / float(RING_POINTS);
  float basePointSize = POINT_SIZE / (2.0 * iResolution.y);
  float layerStep = 1.0 / float(TUNNEL_LAYERS);
  float camZ = iTime * SPEED;
  float zOffset = mod(camZ, layerStep);

  for(int i = 0; i < TUNNEL_LAYERS; i++){
    float pz = float(i) * layerStep + layerStep - zOffset;
    if(pz <= 0.01 || pz >= 1.0) continue;

    // Symmetrical radial expansion from exact dead center
    float ringRad = 0.24 * (1.0 / sq(pz * 0.80 + 0.28));
    float ringDist = abs(length(uv) - ringRad);
    
    // Dynamic point size scaling for depth perspective
    float pSize = basePointSize * (1.0 + (1.0 - pz) * 0.9);
    
    if(ringDist < pSize * 2.6){
      // Hypnotic axial rotation along depth
      float rotAngle = pz * 1.5 + camZ * 0.12;
      vec2 rotUv = vec2(
        uv.x * cos(rotAngle) - uv.y * sin(rotAngle),
        uv.x * sin(rotAngle) + uv.y * cos(rotAngle)
      );
      
      vec2 aruv = AngRep(rotUv, repAngle);
      float pdist = sdCircle(aruv - vec2(ringRad, 0.0), pSize);
      
      // Smooth boundary depth fading (no popping on spawn or despawn)
      float edgeFade = smoothstep(0.01, 0.12, pz) * smoothstep(1.0, 0.78, pz);
      
      // High-precision sub-pixel antialiased particle disc
      float ptAlpha = smoothstep(pSize * 0.75, -pSize * 0.25, pdist) * edgeFade;
      
      if(ptAlpha > 0.002){
        vec3 ptColor = (mod(float(i), 2.0) < 1.0) ? POINT_COLOR_A : POINT_COLOR_B;
        float brightness = (1.0 - pz * 0.65);
        vec3 glowColor = ptColor * brightness;
        color = mix(color, glowColor, ptAlpha);
      }
    }
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

/* ----------------------------- three helpers ----------------------------- */

type ThreeContext = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;
  geometry: THREE.PlaneGeometry;
};

function createThreeForCanvas(canvas: HTMLCanvasElement, width: number, height: number): ThreeContext {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  // Cap pixel ratio to avoid excessive GPU usage
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height, false); // Do not write fixed inline pixel width

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(width, height, 1) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return { renderer, scene, camera, material, mesh, geometry };
}

function disposeThree(ctx: ThreeContext) {
  try {
    ctx.scene.remove(ctx.mesh);
    ctx.mesh.geometry.dispose();
    ctx.material.dispose();
    ctx.renderer.dispose();
  } catch (e) {
    // ignore disposal errors
  }
}

/* ----------------------------- TunnelShowcase (fullscreen) ----------------------------- */

export function TunnelShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<ThreeContext | null>(null);
  const lastTimeRef = useRef<number>(0);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef<boolean>(false);
  const rafResizeRef = useRef<boolean>(false);
  const isMobile = useIsMobile();

  // start / stop animation loop (pausable with clamped delta for rock-solid framerates)
  const animate = useCallback((time: number) => {
    if (!ctxRef.current) return;
    animRef.current = requestAnimationFrame(animate);
    if (pausedRef.current) {
      lastTimeRef.current = time;
      return;
    }
    time *= 0.001; // ms -> s
    const delta = time - (lastTimeRef.current || time);
    lastTimeRef.current = time;
    const safeDelta = Math.min(Math.max(delta, 0), 0.05); // Clamp delta to prevent sudden jump
    ctxRef.current.material.uniforms.iTime.value += safeDelta;
    ctxRef.current.renderer.render(ctxRef.current.scene, ctxRef.current.camera);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || typeof window === "undefined") return;

    // Measure true viewport dimensions
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;
    const ctx = createThreeForCanvas(canvas, width, height);
    ctxRef.current = ctx;

    const updateSize = () => {
      if (!ctxRef.current || !canvas) return;
      const w = container ? container.clientWidth : window.innerWidth;
      const h = container ? container.clientHeight : window.innerHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctxRef.current.renderer.setPixelRatio(dpr);
      ctxRef.current.renderer.setSize(w, h, false);
      (ctxRef.current.material.uniforms.iResolution.value as THREE.Vector3).set(w, h, 1);
    };

    updateSize();

    // resize handler (debounced via rAF)
    const handleResize = () => {
      if (rafResizeRef.current) return;
      rafResizeRef.current = true;
      requestAnimationFrame(() => {
        rafResizeRef.current = false;
        updateSize();
      });
    };
    window.addEventListener("resize", handleResize);

    // pause when tab not visible to save CPU
    const handleVisibility = () => {
      pausedRef.current = !!document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility(); // initial

    // start animation
    animRef.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (ctxRef.current) {
        disposeThree(ctxRef.current);
        ctxRef.current = null;
      }
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="bg-[#050909] text-white min-h-screen overflow-hidden relative flex flex-col pt-24 lg:pt-28 w-full"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#050909] pointer-events-none" />

      {/* Full-Width Three.js Particle Tunnel Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Soft radial ambient glow behind the dead-centered tunnel hole */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full bg-[#FF6B2C]/15 blur-[160px] pointer-events-none" />

        <canvas
          ref={canvasRef}
          className="w-full h-full block opacity-95 pointer-events-none"
          style={{ width: "100%", height: "100%", display: "block" }}
          id="tunnel-canvas"
        />
      </div>

      {/* Top Vignette Gradient for Header Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050909] via-transparent to-[#050909]/75 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050909]/30 via-transparent to-transparent z-[1] pointer-events-none" />

      {/* Main Content Grid: Symmetrically pushed to the far left and far right */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:px-24 flex flex-col lg:flex-row items-start justify-between min-h-[44vh] gap-10 lg:gap-16 mt-4 sm:mt-6">

        {/* LEFT COLUMN: Pushed Far Left */}
        <div className="w-full lg:max-w-[480px] xl:max-w-[540px] 2xl:max-w-[580px] flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/35 bg-orange-500/10 mb-5 backdrop-blur-md shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#FF6B2C] animate-pulse shadow-[0_0_10px_rgba(255,107,44,0.9)]" />
            <span className="typo-caption text-[#FF6B2C] text-xs font-semibold tracking-wider uppercase">
              Offshore Azure Synapse to Microsoft Fabric Migration
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.12] mb-0">
            Modernize Your Data Platform with{" "}
            <span className="bg-gradient-to-r from-[#FF6B2C] via-[#FF8A50] to-[#FFA756] bg-clip-text text-transparent">
              Azure Synapse to Fabric
            </span>{" "}
            Migration
          </h1>
        </div>

        {/* RIGHT COLUMN: Pushed Far Right */}
        <div className="w-full lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-[520px] flex flex-col items-start lg:pt-[52px] lg:ml-auto">
          <p className="text-base sm:text-lg lg:text-[1.1rem] text-zinc-300 leading-relaxed font-normal">
            Modernize your Azure Synapse workloads with our specialized offshore engineering team. We provide end-to-end migration—from architectural assessment to OneLake deployment—helping you build a unified, scalable Microsoft Fabric data platform with zero business downtime.
          </p>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="relative z-20 mt-auto pt-10 sm:pt-14 pb-8 sm:pb-12 px-4 max-w-7xl mx-auto w-full">
        <TrustStrip theme="dark" />
      </div>
    </div>
  );
}

export default function FabricMigrationHero() {
  return <TunnelShowcase />;
}


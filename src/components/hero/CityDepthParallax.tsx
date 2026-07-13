"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** base1.png / depth1.png — 1934×813 panoramic city */
export const HERO_DEPTH_ASPECT = 1934 / 813;

const fragmentShader = /* glsl */ `
  uniform sampler2D uColorMap;
  uniform sampler2D uDepthMap;
  uniform vec2 uMouse;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    float depth = texture2D(uDepthMap, vUv).r;
    vec2 offset = uMouse * uStrength * depth;
    vec2 sampleUv = clamp(vUv - offset, vec2(0.001), vec2(0.999));
    vec4 color = texture2D(uColorMap, sampleUv);

    vec2 vig = vUv - 0.5;
    float vignette = 1.0 - dot(vig, vig) * 0.42;
    color.rgb *= mix(0.88, 1.0, vignette);

    gl_FragColor = color;
  }
`;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

type FitMode = "cover" | "contain";

function computePlaneSize(
  viewport: { width: number; height: number },
  containerAspect: number,
  imageAspect: number,
  fit: FitMode,
  zoom = 1,
) {
  let planeWidth: number;
  let planeHeight: number;

  if (fit === "cover") {
    if (containerAspect > imageAspect) {
      planeWidth = viewport.width;
      planeHeight = planeWidth / imageAspect;
    } else {
      planeHeight = viewport.height;
      planeWidth = planeHeight * imageAspect;
    }
  } else {
    if (containerAspect > imageAspect) {
      planeHeight = viewport.height;
      planeWidth = planeHeight * imageAspect;
    } else {
      planeWidth = viewport.width;
      planeHeight = planeWidth / imageAspect;
    }
  }

  planeWidth *= zoom;
  planeHeight *= zoom;

  return { planeWidth, planeHeight };
}

interface SceneProps {
  colorSrc: string;
  depthSrc: string;
  maxStrength: number;
  reduceMotion: boolean;
  aspectRatio: number;
  fit: FitMode;
  lift: number;
  zoom: number;
}

function Scene({
  colorSrc,
  depthSrc,
  maxStrength,
  reduceMotion,
  aspectRatio,
  fit,
  lift,
  zoom,
}: SceneProps) {
  const { viewport, size } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  const [colorMap, depthMap] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const color = loader.load(colorSrc);
    const depth = loader.load(depthSrc);
    color.colorSpace = THREE.SRGBColorSpace;
    color.minFilter = THREE.LinearFilter;
    color.magFilter = THREE.LinearFilter;
    depth.minFilter = THREE.LinearFilter;
    depth.magFilter = THREE.LinearFilter;
    return [color, depth];
  }, [colorSrc, depthSrc]);

  useEffect(() => {
    if (reduceMotion) return;
    const handlePointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetMouse.current.set(nx, ny);
    };
    const handlePointerLeave = () => targetMouse.current.set(0, 0);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

  useFrame(() => {
    currentMouse.current.lerp(targetMouse.current, 0.06);
    if (materialRef.current) {
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    }
  });

  const containerAspect = size.width / size.height;
  const { planeWidth, planeHeight } = computePlaneSize(
    viewport,
    containerAspect,
    aspectRatio,
    fit,
    zoom,
  );

  const yOffset = (viewport.height - planeHeight) / 2 + viewport.height * lift;
  const responsiveStrength = maxStrength * Math.min(1, size.width / 1400);

  return (
    <mesh position={[0, yOffset, 0]} scale={[planeWidth, planeHeight, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uColorMap: { value: colorMap },
          uDepthMap: { value: depthMap },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uStrength: { value: responsiveStrength },
        }}
        transparent
      />
    </mesh>
  );
}

interface CityDepthParallaxProps {
  colorSrc: string;
  depthSrc: string;
  strength?: number;
  className?: string;
  aspectRatio?: number;
  fit?: FitMode;
  lift?: number;
  zoom?: number;
}

export default function CityDepthParallax({
  colorSrc,
  depthSrc,
  strength = 0.04,
  className,
  aspectRatio = HERO_DEPTH_ASPECT,
  fit = "contain",
  lift = 0,
  zoom = 1.1,
}: CityDepthParallaxProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  const aspectStyle = fit === "contain" ? "auto" : `${aspectRatio}`;

  if (!webglSupported) {
    return (
      <div
        className={className}
        style={{ position: "relative", width: "100%", height: "100%", aspectRatio: aspectStyle }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={colorSrc}
          alt="City skyline"
          style={{ width: "100%", height: "100%", objectFit: fit === "contain" ? "contain" : "cover", objectPosition: "center center" }}
        />
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", aspectRatio: aspectStyle }}
    >
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 10] }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Scene
          colorSrc={colorSrc}
          depthSrc={depthSrc}
          maxStrength={strength}
          reduceMotion={reduceMotion || isTouch}
          aspectRatio={aspectRatio}
          fit={fit}
          lift={lift}
          zoom={zoom}
        />
      </Canvas>
    </div>
  );
}

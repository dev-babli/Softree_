"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
attribute float size;
varying float vDistance;
varying vec3 vPos;

void main() {
  vec3 pos = position;
  vPos = pos;
  
  // Convert position to world space to match un-rotated mouse
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  
  // Center of globe in world space
  vec4 center = modelMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  
  // Globe radius in world space (base radius 1.75 * scale)
  float currentScale = length(modelMatrix[0].xyz);
  float actualRadius = 1.75 * currentScale;
  
  // Calculate distance from mouse to globe center
  float mouseDistFromCenter = distance(uMouse.xy, center.xy);
  
  // Fade out the effect when the mouse leaves the globe
  float hoverStrength = 1.0 - smoothstep(actualRadius * 0.95, actualRadius * 1.1, mouseDistFromCenter);
  
  // Calculate distance to mouse in 2D space (screen plane) using world coordinates
  float dist = distance(worldPos.xy, uMouse.xy);
  
  // Repulsion effect (bulge outwards from sphere center)
  float maxDist = 1.2; // Radius of effect
  if (dist < maxDist && hoverStrength > 0.0) {
    float force = (maxDist - dist) / maxDist; // 0 to 1
    
    // Push outwards from the center of the sphere
    vec3 outwardDir = normalize(pos);
    
    // Apply smooth easing to the force
    force = smoothstep(0.0, 1.0, force);
    
    // Normal expand (not too much), masked by whether mouse is on globe
    pos += outwardDir * force * 0.4 * hoverStrength; 
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Size attenuation
  gl_PointSize = size * (300.0 / -mvPosition.z);
  
  // Pass distance for color fading, pushing it out of range if mouse is not on globe
  vDistance = mix(10.0, dist, hoverStrength);
}
`;

const fragmentShader = `
varying float vDistance;
varying vec3 vPos;

void main() {
  // Circular particle
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if (ll > 0.5) discard;
  
  // Soft edge
  float alpha = (0.5 - ll) * 2.0;
  
  // Rich orange to crimson-red gradient colors
  vec3 deepRed = vec3(0.92, 0.08, 0.02);    // Intense glowing crimson red
  vec3 brightOrange = vec3(1.0, 0.44, 0.03); // Luminous vivid orange
  vec3 warmAmber = vec3(1.0, 0.72, 0.18);    // Radiant warm amber highlight
  
  // Vertical and radial gradient factor across the sphere (top-bottom and center-edge)
  float gradY = clamp((vPos.y / 1.75) * 0.5 + 0.5, 0.0, 1.0);
  float rim = clamp(length(vPos.xy) / 1.75, 0.0, 1.0);
  
  // Mix from deep red into luminous orange with warm rim
  float blendFactor = clamp(gradY * 0.7 + rim * 0.4, 0.0, 1.0);
  vec3 baseColor = mix(deepRed, brightOrange, blendFactor);
  
  // Interactive hover highlight
  float highlight = smoothstep(1.5, 0.2, vDistance);
  vec3 color = mix(baseColor, warmAmber, highlight * 0.5);
  
  gl_FragColor = vec4(color, alpha * 0.88);
}
`;

const auroraVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const auroraFragmentShader = `
uniform float uTime;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Map x from -1 to 1
  float x = uv.x * 2.0 - 1.0;
  float y = uv.y;
  
  // Create upward curving flare shape (parabolic)
  float curve = y - 0.2 - (x * x * 0.5);
  // Intensity is highest at the bottom and center, fade out as it enters the globe
  float baseShape = 1.0 - smoothstep(-0.2, 0.7, curve);
  
  // Fanning and curving out effect for the noise coordinates
  float fanX = x * (1.0 - pow(y, 1.2) * 0.7); 
  
  // Vertical flowing radiating streaks
  float n1 = snoise(vec2(fanX * 5.0, y * 2.5 - uTime * 0.15));
  float n2 = snoise(vec2(fanX * 10.0, y * 4.0 - uTime * 0.25));
  float streaks = (n1 * 0.7 + n2 * 0.3) * 0.5 + 0.5;
  
  streaks = smoothstep(0.2, 0.8, streaks);
  
  float intensity = baseShape * baseShape * (0.2 + 0.8 * streaks);
  
  intensity *= smoothstep(0.0, 0.1, y);
  intensity *= smoothstep(0.7, 0.4, y);
  intensity *= smoothstep(1.0, 0.4, abs(x));
  
  float isFlank = smoothstep(0.1, 0.7, abs(x));
  vec3 colorCenter = vec3(1.0, 0.42, 0.05);
  vec3 colorFlank = vec3(1.0, 0.18, 0.02);
  vec3 color = mix(colorCenter, colorFlank, isFlank);
  
  float core = smoothstep(0.6, 1.0, intensity) * (1.0 - isFlank);
  color += vec3(1.0, 0.82, 0.45) * core;
  
  float alpha = intensity * 0.7;
  gl_FragColor = vec4(color, alpha);
}
`;

function AuroraBackground({ scale = 1.0, radius = 1.75 }: { scale?: number; radius?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  return (
    <mesh position={[0, -radius * scale, -5]} scale={[scale, scale, 1]}>
      {/* Optimized segment count (16x16 instead of 32x32) */}
      <planeGeometry args={[14, 6, 16, 16]} />
      <shaderMaterial
        key="card-aurora-shader-orange"
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function ShaderParticles({
  count = 45000,
  radius = 1.75,
  scale = 1.0,
}: {
  count?: number;
  radius?: number;
  scale?: number;
}) {
  const points = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer, viewport } = useThree();
  const mousePos = useRef(new THREE.Vector3(0, 0, 0));

  const [positions, sizes] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Golden ratio spiral for even spherical distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const r = radius * (0.95 + Math.random() * 0.05);

      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);

      // Slightly tuned size for 45k particles maintaining identical lush density
      s[i] = Math.random() * 0.034 + 0.014;
    }
    return [p, s];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.08;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;

      mousePos.current.x += (x - mousePos.current.x) * 0.1;
      mousePos.current.y += (y - mousePos.current.y) * 0.1;
      mousePos.current.z = 2.0;

      materialRef.current.uniforms.uMouse.value.copy(mousePos.current);
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3() },
    }),
    []
  );

  return (
    <points ref={points} scale={[scale, scale, scale]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        key="card-particle-shader-orange"
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const ringVertexShader = `
uniform float uTime;
uniform float uSpeed;
attribute float aAngle;
attribute float aSemiMajor;
attribute float aSemiMinor;
attribute float aScatterZ;
attribute float size;
varying float vAlpha;
varying float vAngle;

void main() {
  float currentAngle = aAngle + uTime * uSpeed;
  
  vec3 pos = vec3(
    aSemiMajor * cos(currentAngle),
    aSemiMinor * sin(currentAngle),
    aScatterZ
  );
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  gl_PointSize = size * (260.0 / -mvPosition.z);
  vAngle = currentAngle;
  vAlpha = smoothstep(-3.0, 3.0, pos.z) * 0.45 + 0.55;
}
`;

const ringFragmentShader = `
varying float vAlpha;
varying float vAngle;

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if (ll > 0.5) discard;
  
  float alpha = (0.5 - ll) * 2.0;
  
  vec3 deepRed = vec3(0.95, 0.12, 0.03);
  vec3 brightOrange = vec3(1.0, 0.52, 0.05);
  
  float t = sin(vAngle) * 0.5 + 0.5;
  vec3 color = mix(deepRed, brightOrange, t);
  
  gl_FragColor = vec4(color, alpha * vAlpha * 0.95);
}
`;

function OrbitalRings({ radius = 1.75, scale = 1.0 }: { radius?: number; scale?: number }) {
  const mat1Ref = useRef<THREE.ShaderMaterial>(null);
  const mat2Ref = useRef<THREE.ShaderMaterial>(null);

  const generateRingData = (numParticles: number, a: number, b: number) => {
    const angles = new Float32Array(numParticles);
    const semiMajor = new Float32Array(numParticles);
    const semiMinor = new Float32Array(numParticles);
    const scatterZ = new Float32Array(numParticles);
    const sizes = new Float32Array(numParticles);
    const initialPos = new Float32Array(numParticles * 3);

    for (let i = 0; i < numParticles; i++) {
      const ang = (i / numParticles) * Math.PI * 2;
      const scatter = (Math.random() - 0.5) * 0.08;
      const z = (Math.random() - 0.5) * 0.06;

      angles[i] = ang;
      semiMajor[i] = a + scatter;
      semiMinor[i] = b + scatter;
      scatterZ[i] = z;
      sizes[i] = Math.random() * 0.024 + 0.012;

      initialPos[i * 3] = (a + scatter) * Math.cos(ang);
      initialPos[i * 3 + 1] = (b + scatter) * Math.sin(ang);
      initialPos[i * 3 + 2] = z;
    }
    return { angles, semiMajor, semiMinor, scatterZ, sizes, initialPos };
  };

  // 1,800 particles per ring provides identical smooth ellipse trail with half the GPU draw overhead
  const count = 1800;
  const ring1Data = useMemo(() => generateRingData(count, radius * 1.38, radius * 1.08), [radius]);
  const ring2Data = useMemo(() => generateRingData(count, radius * 1.38, radius * 1.08), [radius]);

  const uniforms1 = useMemo(() => ({ uTime: { value: 0 }, uSpeed: { value: 0.18 } }), []);
  const uniforms2 = useMemo(() => ({ uTime: { value: 0 }, uSpeed: { value: -0.18 } }), []);

  useFrame((state) => {
    if (mat1Ref.current) {
      mat1Ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (mat2Ref.current) {
      mat2Ref.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group scale={[scale, scale, scale]}>
      <points
        rotation={[Math.PI * 0.38, Math.PI * 0.12, -Math.PI * 0.16]}
        frustumCulled={false}
      >
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring1Data.initialPos, 3]} />
          <bufferAttribute attach="attributes-aAngle" args={[ring1Data.angles, 1]} />
          <bufferAttribute attach="attributes-aSemiMajor" args={[ring1Data.semiMajor, 1]} />
          <bufferAttribute attach="attributes-aSemiMinor" args={[ring1Data.semiMinor, 1]} />
          <bufferAttribute attach="attributes-aScatterZ" args={[ring1Data.scatterZ, 1]} />
          <bufferAttribute attach="attributes-size" args={[ring1Data.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          key="orbital-ring-1"
          ref={mat1Ref}
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={uniforms1}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points
        rotation={[Math.PI * 0.38, -Math.PI * 0.12, Math.PI * 0.16]}
        frustumCulled={false}
      >
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring2Data.initialPos, 3]} />
          <bufferAttribute attach="attributes-aAngle" args={[ring2Data.angles, 1]} />
          <bufferAttribute attach="attributes-aSemiMajor" args={[ring2Data.semiMajor, 1]} />
          <bufferAttribute attach="attributes-aSemiMinor" args={[ring2Data.semiMinor, 1]} />
          <bufferAttribute attach="attributes-aScatterZ" args={[ring2Data.scatterZ, 1]} />
          <bufferAttribute attach="attributes-size" args={[ring2Data.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          key="orbital-ring-2"
          ref={mat2Ref}
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          uniforms={uniforms2}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function SphereScene({ radius = 1.75 }: { radius?: number }) {
  const { viewport } = useThree();

  const scale = useMemo(() => {
    const targetDiameter = radius * 2;
    const minDim = Math.min(viewport.width, viewport.height);
    return (minDim * 0.72) / targetDiameter;
  }, [viewport.width, viewport.height, radius]);

  const positionY = 0.05;

  return (
    <group position={[0, positionY, 0]}>
      <AuroraBackground scale={scale} radius={radius} />
      <ShaderParticles count={45000} radius={radius} scale={scale} />
      <OrbitalRings radius={radius} scale={scale} />
    </group>
  );
}

export default function ParticleSphereCard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay Three.js WebGL initialization by one microtask tick to let main thread finish initial paint
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[#070d18]" />;
  }

  return (
    <div
      className="w-full h-full overflow-hidden pointer-events-auto"
      style={{
        contain: "strict",
        transform: "translateZ(0)",
      }}
    >
      <Canvas
        key="orange-globe-card-v2"
        camera={{ position: [0, 0, 5], fov: 55 }}
        dpr={[1, 1.25]}
        style={{ pointerEvents: "auto", width: "100%", height: "100%" }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
          stencil: false,
        }}
      >
        <SphereScene radius={1.75} />
      </Canvas>
    </div>
  );
}

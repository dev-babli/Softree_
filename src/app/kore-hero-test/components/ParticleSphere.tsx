"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
attribute float size;
varying float vDistance;

void main() {
  vec3 pos = position;
  
  // Calculate distance to mouse in 3D space
  float dist = distance(pos, uMouse);
  
  // Repulsion effect (bulge outwards from sphere center)
  float maxDist = 1.5; // Radius of effect
  if (dist < maxDist) {
    float force = (maxDist - dist) / maxDist; // 0 to 1
    
    // Push outwards from the center of the sphere
    vec3 outwardDir = normalize(pos);
    
    // Apply smooth easing to the force
    force = smoothstep(0.0, 1.0, force);
    
    pos += outwardDir * force * 0.8; // Expand outside
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Size attenuation
  gl_PointSize = size * (300.0 / -mvPosition.z);
  
  // Pass distance for color fading
  vDistance = dist;
}
`;

const fragmentShader = `
varying float vDistance;

void main() {
  // Circular particle
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);
  if (ll > 0.5) discard;
  
  // Soft edge
  float alpha = (0.5 - ll) * 2.0;
  
  // Base color (cyan/green like reference)
  vec3 color = vec3(0.0, 0.8, 0.5);
  
  gl_FragColor = vec4(color, alpha * 0.8);
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
  // As Y increases, the streaks will visually bend outwards like radiating fire
  float fanX = x * (1.0 - pow(y, 1.2) * 0.7); 
  
  // Vertical flowing radiating streaks - SLOWED DOWN
  float n1 = snoise(vec2(fanX * 5.0, y * 2.5 - uTime * 0.15));
  float n2 = snoise(vec2(fanX * 10.0, y * 4.0 - uTime * 0.25));
  float streaks = (n1 * 0.7 + n2 * 0.3) * 0.5 + 0.5;
  
  // Emphasize the streaks
  streaks = smoothstep(0.2, 0.8, streaks);
  
  // Combine shape and streaks
  float intensity = baseShape * baseShape * (0.2 + 0.8 * streaks);
  
  // Fade out sharply at the very bottom edge so it doesn't clip
  intensity *= smoothstep(0.0, 0.1, y);
  // Soft top fade - fade out completely before reaching the center of the globe
  // The bottom of the globe is around y=0.5, so we fade out right after it enters the globe
  intensity *= smoothstep(0.7, 0.4, y);
  
  // Slightly wider horizontal fade
  intensity *= smoothstep(1.0, 0.4, abs(x));
  
  // Color mapping: Green in center, Blue/Cyan on flanks
  float isFlank = smoothstep(0.1, 0.7, abs(x));
  
  vec3 colorCenter = vec3(0.0, 1.0, 0.4); // Vivid green
  vec3 colorFlank = vec3(0.0, 0.5, 0.9); // Deep blue/cyan
  
  vec3 color = mix(colorCenter, colorFlank, isFlank);
  
  // Add a bright core at the very bottom center
  float core = smoothstep(0.6, 1.0, intensity) * (1.0 - isFlank);
  color += vec3(0.6, 1.0, 0.8) * core;
  
  // Make it more transparent/soft (less solid)
  float alpha = intensity * 0.7;
  
  gl_FragColor = vec4(color, alpha);
}
`;

function AuroraBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  return (
    <mesh position={[0, -2.5, -5]}>
      {/* Increased width and placed firmly behind the sphere (z=-5) */}
      <planeGeometry args={[16, 7, 32, 32]} />
      <shaderMaterial
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

function ShaderParticles({ count = 15000, radius = 2.5 }) {
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
      
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return [p, s];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (points.current) {
      // Spin from left to right purely horizontally
      points.current.rotation.y += delta * 0.08;
    }
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Convert pointer to 3D space
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      
      // Interpolate mouse position for smooth movement
      mousePos.current.x += (x - mousePos.current.x) * 0.1;
      mousePos.current.y += (y - mousePos.current.y) * 0.1;
      // Bring mouse slightly forward so it pushes the front of the sphere
      mousePos.current.z = 2.0; 
      
      // Adjust mouse pos to object space (counteract rotation)
      const currentRot = points.current!.rotation;
      const inverseEuler = new THREE.Euler(-currentRot.x, -currentRot.y, -currentRot.z, currentRot.order);
      const localMouse = mousePos.current.clone().applyEuler(inverseEuler);
      
      materialRef.current.uniforms.uMouse.value.copy(localMouse);
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3() }
  }), []);

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
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

export default function ParticleSphere() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ pointerEvents: "auto" }}>
        <fog attach="fog" args={["#000000", 3, 10]} />
        {/* Layer 2: Aurora */}
        <AuroraBackground />
        {/* Layer 3: Particle Sphere */}
        <ShaderParticles count={25000} radius={2.5} />
      </Canvas>
    </div>
  );
}

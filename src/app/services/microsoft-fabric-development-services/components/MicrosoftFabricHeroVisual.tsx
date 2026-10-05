"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import TrustStrip from "@/components/sections/TrustStrip";

/* ================================================================
   MICROSOFT FABRIC 3D HERO — RIGHT-SIDE VISUAL
   
   Clean light background, matching the reference exactly.
   Structure (bottom → top):
     Metallic Table → Glass Cover → Stacked Cubes (ONE LAKE) →
     Hexagonal FABRIC center → 7 beams → Capability nodes → Laptop
   ================================================================ */

// ─── LAPTOP ──────────────────────────────────────────────────────
function Laptop({ position, rotation, scale: s }: any) {
  return (
    <group position={position} rotation={rotation} scale={s}>
      <Float speed={0.6} rotationIntensity={0.015} floatIntensity={0.015}>
        <mesh castShadow>
          <boxGeometry args={[2, 0.06, 1.3]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.035, -0.08]}>
          <boxGeometry args={[1.7, 0.004, 0.8]} />
          <meshStandardMaterial color="#111" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.035, 0.38]}>
          <boxGeometry args={[0.5, 0.004, 0.3]} />
          <meshStandardMaterial color="#222" roughness={0.7} />
        </mesh>
        <group position={[0, 0, -0.65]} rotation={[-0.2, 0, 0]}>
          <mesh position={[0, 0.68, 0.025]} castShadow>
            <boxGeometry args={[2, 1.3, 0.04]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[1.85, 1.15, 0.008]} />
            <meshStandardMaterial color="#0a0e27" emissive="#0a0e27" emissiveIntensity={0.9} />
          </mesh>
          {/* Sidebar */}
          <mesh position={[-0.58, 0.68, -0.006]}>
            <planeGeometry args={[0.45, 1.0]} />
            <meshBasicMaterial color="#162040" />
          </mesh>
          {[0.88, 0.72, 0.56, 0.4].map((y, i) => (
            <mesh key={i} position={[-0.58, y, -0.009]}>
              <planeGeometry args={[0.35, 0.04]} />
              <meshBasicMaterial color="#4FC3F7" transparent opacity={0.25 + i * 0.08} />
            </mesh>
          ))}
          {/* Content area */}
          <mesh position={[0.18, 0.92, -0.006]}>
            <planeGeometry args={[0.9, 0.28]} />
            <meshBasicMaterial color="#4FC3F7" transparent opacity={0.12} />
          </mesh>
          <mesh position={[0.18, 0.55, -0.006]}>
            <planeGeometry args={[0.9, 0.4]} />
            <meshBasicMaterial color="#0078D4" transparent opacity={0.08} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// ─── BEAM (Thick Glass Pipe) ───────────────────────────────────────
function Beam({ start, end, speed = 0.35 }: { start: THREE.Vector3; end: THREE.Vector3; speed?: number }) {
  const dotRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    return new THREE.LineCurve3(start, end);
  }, [start, end]);

  useFrame(({ clock }) => {
    if (!dotRef.current) return;
    const t = (clock.elapsedTime * speed) % 1;
    dotRef.current.position.copy(curve.getPointAt(t));
  });

  return (
    <group>
      {/* Outer Hexagonal Glass Pipe */}
      <mesh>
        <tubeGeometry args={[curve, 8, 0.08, 6, false]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent opacity={0.3} 
          roughness={0.05} 
          metalness={0.1} 
          transmission={0.8} 
          thickness={0.1}
          side={THREE.DoubleSide} 
        />
      </mesh>
      {/* Data particle travelling through the pipe */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ff9800" />
        <pointLight color="#ffb74d" intensity={2.5} distance={1.5} />
      </mesh>
    </group>
  );
}

// ─── CAPABILITY NODE ─────────────────────────────────────────────
function CapNode({ pos, label, icon, center }: {
  pos: [number, number, number]; label: string; icon: React.ReactNode; center: THREE.Vector3;
}) {
  const [hov, setHov] = useState(false);
  const v = useMemo(() => new THREE.Vector3(...pos), [pos]);
  
  const startPos = useMemo(() => {
    // Start the beam from the surface of the hexagon (radius 0.95 to barely intersect)
    const dir = new THREE.Vector3().subVectors(v, center).normalize();
    return new THREE.Vector3().copy(center).add(dir.multiplyScalar(0.95));
  }, [v, center]);

  return (
    <group>
      <Beam start={startPos} end={v} speed={0.2 + Math.random() * 0.2} />
      <Float position={pos} speed={1.5} rotationIntensity={0.1} floatIntensity={0.15} floatingRange={[-0.05, 0.05]}>
        <group
          onPointerOver={(e) => { e.stopPropagation(); setHov(true); }}
          onPointerOut={() => setHov(false)}
          scale={hov ? 1.12 : 1}
        >
          <mesh>
            <boxGeometry args={[0.85, 0.85, 0.85]} />
            <meshPhysicalMaterial color="#ffffff" transparent opacity={0.4} roughness={0.02} metalness={0.1} transmission={0.9} ior={1.5} thickness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.87, 0.87, 0.87]} />
            <meshBasicMaterial color="#ffcc80" wireframe transparent opacity={0.35} />
          </mesh>
          <group scale={0.65}>{icon}</group>
          {hov && <pointLight color="#ff9800" intensity={3} distance={3} />}
        </group>
        <Html position={[0, -0.65, 0]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(10,15,60,0.78)", color: "#fff", fontSize: 10,
            fontFamily: "'Inter',sans-serif", padding: "2px 8px", borderRadius: 3,
            whiteSpace: "nowrap", border: "1px solid rgba(79,195,247,0.3)",
          }}>{label}</div>
        </Html>
      </Float>
    </group>
  );
}

// ─── ICONS ───────────────────────────────────────────────────────
function IcoChart() {
  return (<group position={[0, -0.25, 0]}>
    <mesh position={[-0.28, 0.12, 0]}><boxGeometry args={[0.13, 0.25, 0.13]} /><meshStandardMaterial color="#ffb74d" emissive="#ffb74d" emissiveIntensity={0.5} /></mesh>
    <mesh position={[0, 0.3, 0]}><boxGeometry args={[0.13, 0.6, 0.13]} /><meshStandardMaterial color="#ffb74d" emissive="#ffb74d" emissiveIntensity={0.5} /></mesh>
    <mesh position={[0.28, 0.45, 0]}><boxGeometry args={[0.13, 0.9, 0.13]} /><meshStandardMaterial color="#ff9800" emissive="#ff9800" emissiveIntensity={0.5} /></mesh>
  </group>);
}
function IcoNet() {
  return (<group>
    <mesh position={[0, 0.28, 0]}><sphereGeometry args={[0.09]} /><meshBasicMaterial color="#ffb74d" /></mesh>
    <mesh position={[-0.28, -0.18, 0]}><sphereGeometry args={[0.09]} /><meshBasicMaterial color="#f57c00" /></mesh>
    <mesh position={[0.28, -0.18, 0]}><sphereGeometry args={[0.09]} /><meshBasicMaterial color="#f57c00" /></mesh>
    <Line points={[[0, 0.28, 0], [-0.28, -0.18, 0]]} color="#ffb74d" lineWidth={1} />
    <Line points={[[0, 0.28, 0], [0.28, -0.18, 0]]} color="#ffb74d" lineWidth={1} />
    <Line points={[[-0.28, -0.18, 0], [0.28, -0.18, 0]]} color="#ffb74d" lineWidth={1} />
  </group>);
}
function IcoPipe() {
  return (<group>
    <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.06, 0.06, 0.35]} /><meshStandardMaterial color="#ffb74d" emissive="#ffb74d" emissiveIntensity={0.4} /></mesh>
    <mesh><boxGeometry args={[0.25, 0.25, 0.25]} /><meshStandardMaterial color="#f57c00" /></mesh>
    <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.06, 0.06, 0.35]} /><meshStandardMaterial color="#ffb74d" emissive="#ffb74d" emissiveIntensity={0.4} /></mesh>
  </group>);
}
function IcoDB() {
  return (<group position={[0, -0.12, 0]}>
    {[0, 0.18, 0.36].map((y, i) => <mesh key={i} position={[0, y, 0]}><cylinderGeometry args={[0.18, 0.18, 0.1, 18]} /><meshStandardMaterial color={i === 2 ? "#ffb74d" : "#f57c00"} /></mesh>)}
  </group>);
}
function IcoGauge() {
  return (<group position={[0, -0.1, 0]}>
    <mesh rotation={[0, 0, 0]}><torusGeometry args={[0.22, 0.03, 10, 18, Math.PI]} /><meshStandardMaterial color="#ffb74d" /></mesh>
    <group rotation={[0, 0, -Math.PI / 4]}>
      <mesh position={[0, 0.11, 0]}><boxGeometry args={[0.02, 0.22, 0.02]} /><meshStandardMaterial color="#E31E24" /></mesh>
    </group>
    <mesh position={[0, 0, 0]}><sphereGeometry args={[0.04]} /><meshStandardMaterial color="#ffffff" /></mesh>
  </group>);
}
function IcoGear() {
  return (<group>
    <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 4]}><boxGeometry args={[0.24, 0.24, 0.06]} /><meshStandardMaterial color="#FFA726" emissive="#FFA726" emissiveIntensity={0.35} /></mesh>
    <mesh position={[0, -0.12, 0]}><sphereGeometry args={[0.07]} /><meshStandardMaterial color="#ffb74d" /></mesh>
  </group>);
}
function IcoWrench() {
  return (<group>
    <mesh position={[0, 0.08, 0]} rotation={[0, 0, 0.3]}><cylinderGeometry args={[0.035, 0.035, 0.4, 6]} /><meshStandardMaterial color="#ffb74d" /></mesh>
    <mesh position={[0, 0.28, 0]}><torusGeometry args={[0.08, 0.035, 6, 10]} /><meshStandardMaterial color="#ffb74d" /></mesh>
    <mesh position={[0.12, -0.12, 0]}><sphereGeometry args={[0.1]} /><meshStandardMaterial color="#f57c00" /></mesh>
  </group>);
}

// ─── ONE LAKE VOXEL LAYER ────────────────────────────────────────
function VoxelLayer({ y, w, d, cols, rows, h = 0.45, solidColor, textMapping }: { y: number, w: number, d: number, cols: number, rows: number, h?: number, solidColor?: string, textMapping?: Record<string, {char: string, face: 'left'|'front'}> }) {
  const boxes = [];
  const spacingX = w / cols;
  const spacingZ = d / rows;
  const boxW = spacingX * 0.95;
  const boxD = spacingZ * 0.95;
  
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      const px = (i - cols/2 + 0.5) * spacingX;
      const pz = (j - rows/2 + 0.5) * spacingZ;
      const key = `${i}-${j}`;
      const mapping = textMapping?.[key];

      boxes.push(
        <group key={key} position={[px, y, pz]}>
          <mesh castShadow>
            <boxGeometry args={[boxW, h, boxD]} />
            {solidColor ? (
              <meshStandardMaterial color={solidColor} roughness={0.3} metalness={0.1} />
            ) : (
              <meshPhysicalMaterial color="#ffcc80" transparent opacity={0.35} roughness={0.02} metalness={0.1} transmission={0.9} ior={1.5} thickness={0.4} />
            )}
          </mesh>
          <mesh>
            <boxGeometry args={[boxW+0.01, h+0.01, boxD+0.01]} />
            <meshBasicMaterial color={solidColor ? "#b23c00" : "#ff9800"} wireframe transparent opacity={0.4} />
          </mesh>
          
          {/* Letters mapped to faces */}
          {mapping && mapping.face === 'left' && (
            <Html position={[-boxW/2 - 0.01, 0, 0]} rotation={[0, -Math.PI/2, 0]} transform center style={{ pointerEvents: "none" }}>
              <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 900, fontFamily: "'Inter',sans-serif" }}>{mapping.char}</div>
            </Html>
          )}
          {mapping && mapping.face === 'front' && (
            <Html position={[0, 0, boxD/2 + 0.01]} rotation={[0, 0, 0]} transform center style={{ pointerEvents: "none" }}>
              <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 900, fontFamily: "'Inter',sans-serif" }}>{mapping.char}</div>
            </Html>
          )}
        </group>
      );
    }
  }
  return <>{boxes}</>;
}

// ─── FABRIC CORE ─────────────────────────────────────────────────
function FabricCore() {
  const hexRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (hexRef.current) {
      hexRef.current.position.y = Math.sin(t * 1.1) * 0.05 - 0.42;
      hexRef.current.rotation.y = Math.sin(t * 0.35) * 0.03;
    }
    if (glowRef.current) glowRef.current.intensity = 3.5 + Math.sin(t * 2.2) * 0.8;
  });

  return (
    <group>
      {/* 3. STACKED CUBES — ONE LAKE */}
      <group rotation={[0, Math.PI / 4, 0]}>
        <mesh position={[0, -2.35, 0]} castShadow>
          <boxGeometry args={[3.2, 0.15, 2.6]} />
          <meshStandardMaterial color="#FF6600" roughness={0.3} metalness={0.1} />
        </mesh>

        <VoxelLayer y={-2.05} w={2.5} d={2.0} cols={5} rows={4} textMapping={{
          "0-0": { char: "O", face: "left" },
          "0-1": { char: "N", face: "left" },
          "0-2": { char: "E", face: "left" },
          "1-3": { char: "L", face: "front" },
          "2-3": { char: "A", face: "front" },
          "3-3": { char: "K", face: "front" },
          "4-3": { char: "E", face: "front" },
        }} />
        <VoxelLayer y={-1.6} w={1.8} d={1.4} cols={4} rows={3} />
      </group>

      {/* 4. HEXAGONAL FABRIC */}
      <group ref={hexRef} position={[0, -0.42, 0]}>
        <pointLight ref={glowRef} color="#ff9800" distance={9} />
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.3, 6]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.4} roughness={0.02} metalness={0.1} transmission={0.9} ior={1.5} thickness={0.5} emissive="#ff9800" emissiveIntensity={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.22, 1.22, 0.32, 6]} />
          <meshBasicMaterial color="#ffcc80" wireframe transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.25, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#f57c00" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
        {/* F emblem */}
        <group position={[0, 0.18, 0.14]}>
          <mesh position={[-0.1, 0, 0]}><boxGeometry args={[0.1, 0.6, 0.05]} /><meshBasicMaterial color="#118D4D" /></mesh>
          <mesh position={[0.08, 0.2, 0]}><boxGeometry args={[0.38, 0.08, 0.05]} /><meshBasicMaterial color="#00B294" /></mesh>
          <mesh position={[0.02, -0.03, 0]}><boxGeometry args={[0.22, 0.08, 0.05]} /><meshBasicMaterial color="#FFB900" /></mesh>
        </group>
        <Html position={[0, -0.3, 0.18]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: 3, fontFamily: "'Inter',sans-serif", textShadow: "0 0 14px rgba(79,195,247,0.7)" }}>FABRIC</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 6, letterSpacing: 1.2, fontFamily: "'Inter',sans-serif", marginTop: 1 }}>THE ONE DATA PLATFORM</div>
          </div>
        </Html>
      </group>
    </group>
  );
}

// ─── SCENE ───────────────────────────────────────────────────────
function Scene() {
  const center = useMemo(() => new THREE.Vector3(0, -0.42, 0), []);

  useFrame((state) => {
    // By offsetting the camera's X to the negative (left), the object at origin appears on the right!
    // For smaller screens we might want less offset, but we'll use a standard offset for lg.
    const isMobile = window.innerWidth < 1024;
    const targetX = isMobile ? 0 : -3.5;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + state.mouse.x * 1.5, 0.025);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y * 0.8, 0.025);
    state.camera.lookAt(targetX, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={2.8} />
      <directionalLight position={[7, 12, 7]} intensity={3} color="#fff" castShadow />
      <directionalLight position={[-5, 7, -3]} intensity={1.3} color="#fff3e0" />
      <pointLight position={[0, 3, 0]} color="#ff9800" intensity={1.5} distance={10} />
      <Sparkles count={40} scale={12} size={1} speed={0.1} color="#ffb74d" opacity={0.15} />

      <group position={[0, 0.1, 0]}>
        
        {/* TABLE & GLASS (Centered, Rotated) */}
        <group rotation={[0, Math.PI / 4, 0]}>
          <mesh position={[0, -2.0, 0]} receiveShadow>
            <boxGeometry args={[6.4, 0.1, 4.2]} />
            <meshStandardMaterial color="#b0bec5" roughness={0.22} metalness={0.88} />
          </mesh>
          <mesh position={[0, -1.94, 0]}>
            <boxGeometry args={[6.5, 0.02, 4.3]} />
            <meshStandardMaterial color="#cfd8dc" roughness={0.15} metalness={0.9} />
          </mesh>
          <mesh position={[0, -1.88, 0]}>
            <boxGeometry args={[6.0, 0.1, 3.8]} />
            <meshPhysicalMaterial color="#e3f2fd" transparent opacity={0.3} roughness={0.01} metalness={0.1} />
          </mesh>
          <mesh position={[0, -1.88, 0]}>
            <boxGeometry args={[6.02, 0.12, 3.82]} />
            <meshBasicMaterial color="#B3E5FC" wireframe transparent opacity={0.15} />
          </mesh>
        </group>

        {/* CENTRAL COMPOSITION (Scaled 0.75, Moved Back & Centered) */}
        <group position={[0, 0, 0.4]} scale={0.75}>
          <FabricCore />
          <CapNode pos={[-2.8, -0.22, -0.2]} label="Data Warehouse" icon={<IcoDB />} center={center} />
          <CapNode pos={[-1.6, 1.38, -0.6]} label="Power BI" icon={<IcoChart />} center={center} />
          <CapNode pos={[0, 1.88, -1.0]} label="Data Science" icon={<IcoNet />} center={center} />
          <CapNode pos={[1.6, 1.38, -0.6]} label="Data Engineering" icon={<IcoPipe />} center={center} />
          <CapNode pos={[2.8, -0.22, -0.2]} label="Real-time Analytics" icon={<IcoGauge />} center={center} />
          <CapNode pos={[2.2, -1.52, 0.5]} label="Data Factory" icon={<IcoWrench />} center={center} />
        </group>

        <Laptop position={[-2.5, -1.82, 1.0]} rotation={[0, 0, 0]} scale={0.7} />
      </group>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.2} scale={16} blur={2.5} far={6} resolution={256} color="#ffb74d" />
    </>
  );
}

// ─── EXPORT ──────────────────────────────────────────────────────
export default function MicrosoftFabricHeroVisual() {
  return (
    <>
      <section className="relative w-full min-h-[85vh] overflow-hidden bg-white flex flex-col justify-center">
        
        {/* 3D Canvas (Full Screen Background) */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [-3.5, 2.5, 11.5], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            shadows
          >
            <React.Suspense fallback={null}>
              <Scene />
            </React.Suspense>
          </Canvas>
        </div>

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[85vh] relative z-10 pointer-events-none">
          {/* LEFT — text content */}
          <div className="flex flex-col justify-center px-6 lg:px-12 pt-28 pb-4 pointer-events-auto" id="fabric-hero-left">
            <div className="inline-flex items-center gap-2 bg-[#FF6600]/10 border border-[#FF6600]/25 text-[#FF6600] text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-8 w-fit shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6600] animate-pulse" />
              Microsoft Fabric Offshore Technology Partner
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-[#0A0F3C] mb-6 drop-shadow-sm tracking-tight">
              Build, Extend & Deliver Microsoft Fabric Solutions <br className="hidden md:block" />
              <span className="text-[#FF6600]">With a White-Label Engineering Partner</span>
            </h1>
            
            <p className="text-[#3b4754] text-lg lg:text-xl max-w-xl mb-10 leading-relaxed font-medium">
              Extend your data engineering and analytics capabilities with an offshore Microsoft Fabric team that designs, builds, and maintains solutions—from OneLake architecture to Power BI and AI-ready data platforms.
            </p>
          </div>

          {/* RIGHT — empty, 3D renders underneath */}
          <div className="hidden lg:block w-full h-full" />
        </div>
      </section>

      {/* Trust Strip placed below the hero section entirely to avoid any 3D overlaps */}
      <section className="w-full bg-white pb-8 px-6 z-20 relative">
        <TrustStrip theme="light" />
      </section>
    </>
  );
}

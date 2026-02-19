"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, useTexture, Html } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ✅ Reduced size
const RADIUS = 1.1;

const locations = [
  { name: "USA", lat: 38, lng: -97 },
  { name: "India", lat: 20, lng: 78 },
  { name: "Canada", lat: 56, lng: -106 },
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Earth() {
  const texture = useTexture("/earth.jpg");

  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Marker({ data, active }: any) {
  const position = latLngToVector3(data.lat, data.lng, RADIUS + 0.05);

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshStandardMaterial color={active ? "#ff4d4d" : "#666"} />
      </mesh>

      <mesh position={[0, -0.12, 0]}>
        <coneGeometry args={[0.03, 0.15, 32]} />
        <meshStandardMaterial color={active ? "#ff4d4d" : "#666"} />
      </mesh>

      {active && (
        <Html position={[0, 0.2, 0]} center>
          <div
            style={{
              background: "white",
              color: "black",
              padding: "5px 12px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function AutoFocus({ activeIndex, setActiveIndex }: any) {
  const { camera } = useThree();
  const timer = useRef(0);
  const targetPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    const loc = locations[activeIndex];
    targetPosition.current = latLngToVector3(loc.lat, loc.lng, RADIUS + 2.5);
    timer.current = 0;
  }, [activeIndex]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPosition.current, 0.03);
    camera.lookAt(0, 0, 0);

    if (camera.position.distanceTo(targetPosition.current) < 0.1) {
      timer.current += delta;

      if (timer.current > 2) {
        setActiveIndex((prev: number) => (prev + 1) % locations.length);
      }
    }
  });

  return null;
}

export default function GlobeScene() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }} // ✅ moved back (smaller look)
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lights */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} />

          {/* Stars */}
          <Stars radius={100} depth={50} count={2500} factor={4} />

          {/* Earth */}
          <Earth />

          {/* Markers */}
          {locations.map((loc, i) => (
            <Marker key={i} data={loc} active={i === activeIndex} />
          ))}

          {/* Camera animation */}
          <AutoFocus
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

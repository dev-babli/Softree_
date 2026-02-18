"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const RADIUS = 2;

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
  const texture = useTexture(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg",
  );

  return (
    <mesh>
      <sphereGeometry args={[RADIUS, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

import { Html, Billboard } from "@react-three/drei";

function Marker({ data, active }: any) {
  const position = latLngToVector3(data.lat, data.lng, RADIUS + 0.05);

  return (
    <group position={position}>
      {/* Pin Head */}
      <mesh>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshStandardMaterial color={active ? "#ff4d4d" : "#666"} />
      </mesh>

      {/* Pin Tail */}
      <mesh position={[0, -0.15, 0]}>
        <coneGeometry args={[0.035, 0.18, 32]} />
        <meshStandardMaterial color={active ? "#ff4d4d" : "#666"} />
      </mesh>

      {/* Only ONE label */}
      {active && (
        <Html
          position={[0, 0.25, 0]}
          center
          style={{
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "white",
              color: "black",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "14px",
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
    targetPosition.current = latLngToVector3(loc.lat, loc.lng, RADIUS + 3);
    timer.current = 0;
  }, [activeIndex]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPosition.current, 0.04);
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
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} />

        <Earth />

        {locations.map((loc, i) => (
          <Marker key={i} data={loc} active={i === activeIndex} />
        ))}

        <AutoFocus activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </Canvas>
    </div>
  );
}


"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  SPIRAL_GALLERY_SHELL,
  applyCylinderOrientation,
  buildGalleryImageList,
  computeCardTransform,
} from "./config";
import type { SpiralGalleryTuning } from "./tuning";

export type SpiralState = {
  offset: number;
  velocity: number;
};

function Starfield({ count = 1200, enabled = true }: { count?: number; enabled?: boolean }) {
  if (!enabled) return null;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 90;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 100;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function GalleryImages({
  stateRef,
  tuningRef,
  tuning,
}: {
  stateRef: React.MutableRefObject<SpiralState>;
  tuningRef: React.MutableRefObject<SpiralGalleryTuning>;
  tuning: SpiralGalleryTuning;
}) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const urlsRef = useRef<string[]>([]);

  useFrame(() => {
    const tuning = tuningRef.current;
    const count = Math.max(1, Math.round(tuning.imageCount));
    if (urlsRef.current.length !== count) {
      urlsRef.current = buildGalleryImageList(count);
    }
    const urls = urlsRef.current;
    const { offset } = stateRef.current;

    for (let i = 0; i < count; i++) {
      const group = groupRefs.current[i];
      if (!group) continue;

      const tr = computeCardTransform(i, offset, tuning);
      group.position.set(tr.x, tr.y, tr.z);
      applyCylinderOrientation(group, tr.x, tr.y, tr.z);
      group.scale.setScalar(tr.scale);
    }
  });

  const count = Math.max(1, Math.round(tuning.imageCount));
  const urls = useMemo(() => buildGalleryImageList(count), [count, tuning.imageCount]);

  return (
    <group>
      {urls.map((url, i) => (
        <group
          key={`${i}-${url}`}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
        >
          <Image
            url={url}
            scale={[tuning.itemWidth, tuning.itemHeight]}
            radius={tuning.borderRadius}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </group>
      ))}
    </group>
  );
}

function Scene({
  stateRef,
  draggingRef,
  tuningRef,
  tuning,
}: {
  stateRef: React.MutableRefObject<SpiralState>;
  draggingRef: React.MutableRefObject<boolean>;
  tuningRef: React.MutableRefObject<SpiralGalleryTuning>;
  tuning: SpiralGalleryTuning;
}) {
  const { camera, scene } = useThree();
  const shell = SPIRAL_GALLERY_SHELL;

  useFrame((_, delta) => {
    const tuning = tuningRef.current;
    const state = stateRef.current;
    const dt = Math.min(delta, 0.05);

    if (!draggingRef.current) {
      state.offset += tuning.autoPlaySpeed * dt * 60;
    }
    state.velocity *= Math.pow(1 - shell.damping, dt * 60);
    state.offset += state.velocity * dt;
    state.offset = ((state.offset % 1) + 1) % 1;

    camera.position.set(0, 0, tuning.cameraDistance);
    camera.lookAt(0, 0, 0);
    if ("fov" in camera) {
      const cam = camera as THREE.PerspectiveCamera;
      if (cam.fov !== tuning.cameraFov) {
        cam.fov = tuning.cameraFov;
        cam.updateProjectionMatrix();
      }
    }
  });

  useEffect(() => {
    scene.background = new THREE.Color(SPIRAL_GALLERY_SHELL.cinematicBgOuter);
  }, [scene]);

  const isLight = shell.theme === "light";

  return (
    <>
      <fog attach="fog" args={[SPIRAL_GALLERY_SHELL.cinematicBgOuter, shell.fogNear, shell.fogFar]} />
      <Starfield enabled={shell.starfieldEnabled} />
      <ambientLight intensity={isLight ? 0.85 : 0.4} />
      <directionalLight position={[5, 8, 12]} intensity={isLight ? 0.55 : 0.7} color={isLight ? "#ffffff" : "#ffffff"} />
      <directionalLight position={[-4, -2, 8]} intensity={isLight ? 0.25 : 0.15} />
      <pointLight
        position={[0, 0, 0]}
        intensity={shell.poleFlare * 100}
        color={isLight ? "#f0f0f5" : "#ffffff"}
        distance={40}
        decay={2}
      />
      <GalleryImages stateRef={stateRef} tuningRef={tuningRef} tuning={tuning} />
    </>
  );
}

export default function SpiralGalleryCanvas({
  stateRef,
  draggingRef,
  tuningRef,
  tuning,
}: {
  stateRef: React.MutableRefObject<SpiralState>;
  draggingRef: React.MutableRefObject<boolean>;
  tuningRef: React.MutableRefObject<SpiralGalleryTuning>;
  tuning: SpiralGalleryTuning;
}) {
  return <Scene stateRef={stateRef} draggingRef={draggingRef} tuningRef={tuningRef} tuning={tuning} />;
}

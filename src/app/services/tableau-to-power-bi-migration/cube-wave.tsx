"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface CubeWaveProps {
  className?: string;
  primaryColorHex?: string;
  accentColorHex?: string;
}

export default function CubeWave({
  className = "w-full h-full",
  primaryColorHex = "#ff5812",
  accentColorHex = "#1a0b04",
}: CubeWaveProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050909");

    // Camera setup for Isometric 3D Perspective matching design
    const aspect = width / height;
    const d = 22;
    const camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      1,
      1000
    );

    // Position camera for dramatic isometric top-down view
    camera.position.set(30, 35, 30);
    camera.lookAt(0, -2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x22110c, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xff7733, 3.5);
    mainLight.position.set(20, 40, 20);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xff3300, 1.8);
    fillLight.position.set(-20, 20, -20);
    scene.add(fillLight);

    const topLight = new THREE.PointLight(0xff6b2c, 4, 60);
    topLight.position.set(0, 25, 0);
    scene.add(topLight);

    // Grid of Cubes
    const GRID_X = 38;
    const GRID_Z = 38;
    const count = GRID_X * GRID_Z;

    const boxWidth = 0.92;
    const boxDepth = 0.92;
    const baseBoxHeight = 4.0;
    const spacing = 1.05;

    const geometry = new THREE.BoxGeometry(boxWidth, baseBoxHeight, boxDepth);
    
    // Material with metallic/roughness properties matching 3D render
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.35,
      metalness: 0.25,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
    instancedMesh.castShadow = true;
    instancedMesh.receiveShadow = true;
    scene.add(instancedMesh);

    const dummy = new THREE.Object3D();

    // Color definitions
    const colorHigh = new THREE.Color("#ff6b2c"); // Glowing orange
    const colorMid = new THREE.Color("#c2410c");  // Deep orange/copper
    const colorLow = new THREE.Color("#3f3f46");  // Dark metallic charcoal
    const colorBase = new THREE.Color("#18181b"); // Base shadow

    const instanceColors = new Float32Array(count * 3);
    const tempColor = new THREE.Color();

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.018;

      let idx = 0;
      const offsetX = (GRID_X * spacing) / 2;
      const offsetZ = (GRID_Z * spacing) / 2;

      for (let x = 0; x < GRID_X; x++) {
        for (let z = 0; z < GRID_Z; z++) {
          const posX = x * spacing - offsetX;
          const posZ = z * spacing - offsetZ;

          // Compute complex wave function
          const distFromCenter = Math.sqrt(posX * posX + posZ * posZ);
          
          const wave1 = Math.sin(posX * 0.22 + posZ * 0.18 - time * 1.6);
          const wave2 = Math.cos(distFromCenter * 0.25 - time * 1.2);
          const combinedWave = (wave1 + wave2) * 0.5; // -1 to 1

          // Height offset
          const posY = combinedWave * 2.8;

          // Position & Scale
          dummy.position.set(posX, posY, posZ);
          
          // Slight height scaling based on wave
          const scaleY = 1.0 + combinedWave * 0.3;
          dummy.scale.set(1.0, scaleY, 1.0);
          
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(idx, dummy.matrix);

          // Color transition based on wave height and distance
          const normalizedHeight = (combinedWave + 1) / 2; // 0 to 1
          
          if (normalizedHeight > 0.6) {
            tempColor.lerpColors(colorMid, colorHigh, (normalizedHeight - 0.6) / 0.4);
          } else if (normalizedHeight > 0.3) {
            tempColor.lerpColors(colorLow, colorMid, (normalizedHeight - 0.3) / 0.3);
          } else {
            tempColor.lerpColors(colorBase, colorLow, normalizedHeight / 0.3);
          }

          instanceColors[idx * 3] = tempColor.r;
          instanceColors[idx * 3 + 1] = tempColor.g;
          instanceColors[idx * 3 + 2] = tempColor.b;

          idx++;
        }
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      } else {
        instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(instanceColors, 3);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      const newAspect = width / height;
      camera.left = -d * newAspect;
      camera.right = d * newAspect;
      camera.top = d;
      camera.bottom = -d;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [primaryColorHex, accentColorHex]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

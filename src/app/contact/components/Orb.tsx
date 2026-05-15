"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Orb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Sphere with a subtle noise-like material
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0xe5e4e0,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x1d1d1d,
      emissiveIntensity: 0.05,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff642f, 0.8, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4f46e5, 0.5, 10);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;
      sphere.position.x += (mouseX * 0.3 - sphere.position.x) * 0.02;
      sphere.position.y += (-mouseY * 0.3 - sphere.position.y) * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
      style={{ mixBlendMode: "difference" }}
    />
  );
}

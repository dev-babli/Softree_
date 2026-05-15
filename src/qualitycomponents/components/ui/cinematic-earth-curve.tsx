"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinematicEarthCurveProps {
  className?: string;
}

export default function CinematicEarthCurve({ className = "" }: CinematicEarthCurveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712); // Night sky

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    // Camera above, looking down — Earth below diagonal, night sky above
    camera.position.set(0, 100, 120);
    camera.lookAt(0, -40, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030712, 1);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    container.appendChild(renderer.domElement);

    // --- GLOBE PARAMETERS ---
    const globeRadius = 85;
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, -50, 0); // Shift down so Earth fills below-diagonal
    globeGroup.rotation.z = Math.PI / 4; // Arc runs top-left to bottom-right
    globeGroup.rotation.x = -0.25; // Tilt for diagonal horizon
    scene.add(globeGroup);

    // --- 1. THE EARTH BODY (Dark/Night) ---
    const loader = new THREE.TextureLoader();
    const nightTexture = loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
    );

    const globeMat = new THREE.MeshPhongMaterial({
      map: nightTexture,
      color: 0x0f172a, // Night base
      emissive: new THREE.Color(0x64748b), // Night sky & life — soft glow
      emissiveMap: nightTexture,
      emissiveIntensity: 0.6,
    });

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 64, 64),
      globeMat
    );
    globeGroup.add(globe);

    // --- 2. ILLUMINATED BORDERS (Canvas Overlay) ---
    const canvas = document.createElement("canvas");
    canvas.width = 4096;
    canvas.height = 2048;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2d context not available");

    const borderTex = new THREE.CanvasTexture(canvas);
    const borderMaterial = new THREE.MeshBasicMaterial({
      map: borderTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 1.0,
    });

    const bordersMesh = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius + 0.1, 64, 64), // Slightly larger to prevent flickering
      borderMaterial
    );
    globeGroup.add(bordersMesh);

    fetch(
      "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        ctx.strokeStyle = "#64748b"; // Night sky tone
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#475569";

        const drawRing = (ring: [number, number][]) => {
          ring.forEach((coord, i) => {
            const x = (coord[0] + 180) * (canvas.width / 360);
            const y = (90 - coord[1]) * (canvas.height / 180);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
        };

        data.features.forEach(
          (feature: {
            geometry?: { type?: string; coordinates?: unknown };
          }) => {
            if (!feature.geometry?.coordinates) return;
            const coords = feature.geometry.coordinates;
            const type = feature.geometry.type;

            ctx.beginPath();
            if (type === "Polygon") {
              (coords as [number, number][][]).forEach(drawRing);
            } else if (type === "MultiPolygon") {
              (coords as [number, number][][][]).forEach((polygon) =>
                polygon.forEach(drawRing)
              );
            }
            ctx.stroke();
          }
        );
        borderTex.needsUpdate = true;
      })
      .catch(() => {
        borderTex.needsUpdate = true;
      });

    // --- 3. THE ATMOSPHERE CURVE (Shader) ---
    const vertexShader = `
        varying vec3 vNormal;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        varying vec3 vNormal;
        void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
            gl_FragColor = vec4(0.39, 0.45, 0.55, 0.85) * intensity;
        }
    `;

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius * 1.05, 64, 64),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    );
    globeGroup.add(atmosphere);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    // Directional light to create the "Night/Day" 30% split
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 50, -50);
    scene.add(sunLight);

    // --- ANIMATION ---
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    const handleResize = () => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[400px] bg-black overflow-hidden ${className}`}
    />
  );
}

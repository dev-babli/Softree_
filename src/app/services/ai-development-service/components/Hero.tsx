"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ShieldCheck, Users, Cpu, Sparkles, CalendarRange } from "lucide-react";

// --- HERO DATA ---
const heroData = {
  badge: "OFFSHORE AI DEVELOPMENT PARTNER",
  title: {
    blackText: "Your Offshore AI Development ",
    orangeText: "Services for Intelligent & Scalable Enterprises",
  },
  description: "Your offshore delivery partner for building production-ready AI solutions—from custom AI and Generative AI to intelligent agents, RAG, automation, and business system integration.",
  ctas: {
    primary: "Talk to An Expert",
  },
  features: [
    {
      title: "White-Label",
      description: "Trusted agency partner.",
      icon: "security"
    },
    {
      title: "Offshore Teams",
      description: "Scale on demand.",
      icon: "custom"
    },
    {
      title: "Microsoft AI",
      description: "Azure & OpenAI partners.",
      icon: "impact"
    },
    {
      title: "Enterprise AI",
      description: "Secure, production-grade.",
      icon: "models"
    },
    {
      title: "Since 2013",
      description: "13+ years of excellence.",
      icon: "history"
    }
  ],
  videoCard: {
    duration: "90–120 sec",
    title: "From Business Challenge to AI Solution",
    description: "See how we transform complex business challenges into intelligent enterprise AI solutions."
  },
  floatingCards: [
    { title: "AI AGENTS", description: "Intelligent agents for smarter operations.", icon: "bot" },
    { title: "WORKFLOW", description: "Automate processes. Boost productivity.", icon: "gear" },
    { title: "DATA INSIGHTS", description: "Turn data into actionable business insights.", icon: "chart" }
  ],
  trustLogos: [
    { name: "Microsoft" },
    { name: "Azure" },
    { name: "Power Platform" },
    { name: "OpenAI" },
    { name: "dataverse" }
  ]
};

// --- 3D SPACE GLOBE COMPONENT ---
interface ThreeDSpaceGlobeProps {
  className?: string;
}

function ThreeDSpaceGlobe({ className = "" }: ThreeDSpaceGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- 1. SCENE & CAMERA SETUP ---
    const scene = new THREE.Scene();

    const width = Math.max(container.clientWidth, 24);
    const height = Math.max(container.clientHeight, 24);

    // Camera positioned at the center, looking straight
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);
    camera.lookAt(0, 0, 0);

    // WebGL Renderer with transparency (alpha: true) to blend with star background
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    // Increase pixel ratio for super-sampling antialiasing on high-DPI displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. MULTI-DIRECTIONAL HIGH-CONTRAST LIGHTING (Crescent Rim Light) ---
    // Ambient light raised slightly to soften shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    // Main key light representing the Sun - positioned ABOVE and IN FRONT of the Earth
    // This shines directly on the top-front curve visible to the user
    const sunLight = new THREE.DirectionalLight(0xffffff, 3.8);
    sunLight.position.set(0, 10, 8);
    scene.add(sunLight);

    // Bright front-left fill light to make rotating continents clearly visible (warm white tint)
    const frontFill = new THREE.DirectionalLight(0xffd6c2, 1.8);
    frontFill.position.set(-8, 6, 8);
    scene.add(frontFill);

    // Soft front-right blue fill light to add high-contrast coloring depth (sky blue tint)
    const blueFill = new THREE.DirectionalLight(0x38bdf8, 1.5);
    blueFill.position.set(8, 2, 8);
    scene.add(blueFill);

    // --- 3. CREATING EARTH SPHERE ---
    const globeRadius = 10;
    const globeGroup = new THREE.Group();
    // Planet axial tilt
    globeGroup.rotation.z = -15 * (Math.PI / 180);
    globeGroup.rotation.x = 0.2;
    scene.add(globeGroup);

    const textureLoader = new THREE.TextureLoader();

    // Procedural High-Contrast Earth Color Map (Slate-Gray Continents & Black Oceans + High-Tech Grid)
    // Used as a fallback if the local /earth.jpg fails to load
    const createProceduralEarthMap = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Deep space black oceans
      ctx.fillStyle = "#020205";
      ctx.fillRect(0, 0, 1024, 512);

      // Draw high-tech latitude/longitude grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 1024; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }
      for (let j = 0; j < 512; j += 32) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(1024, j);
        ctx.stroke();
      }

      // Draw dark slate-gray continents
      ctx.fillStyle = "#1e293b"; // Slate-800

      const drawContinent = (cx: number, cy: number, rx: number, ry: number, points = 12) => {
        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noise = 0.85 + Math.sin(angle * 4) * 0.1 + Math.cos(angle * 7) * 0.05;
          const x = cx + rx * Math.cos(angle) * noise;
          const y = cy + ry * Math.sin(angle) * noise;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      };

      // Scatter landmass shapes
      drawContinent(220, 180, 150, 95, 14);  // North America
      drawContinent(300, 350, 95, 115, 12);  // South America
      drawContinent(540, 160, 135, 85, 16);  // Eurasia
      drawContinent(550, 310, 105, 95, 12);  // Africa
      drawContinent(790, 350, 80, 60, 10);   // Australia
      drawContinent(500, 480, 420, 30, 8);    // Antarctica

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // --- 4. EARTH MESH ---
    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      roughness: 0.9,
      metalness: 0.05,
    });
    // Remove slate gray tint to allow the photographic earth texture to render at full brightness
    earthMaterial.color = new THREE.Color("#ffffff");

    // Load Local Photographic Texture
    let earthTexture: THREE.Texture | null = null;
    earthTexture = textureLoader.load(
      "/earth.jpg",
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;

        // --- TEXTURE SHARPENING (WebGL Anisotropic Filtering) ---
        // Sets maximum anisotropy supported by user's GPU to eliminate texture blurriness
        const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.anisotropy = maxAnisotropy;

        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn("Failed to load local photographic earth texture, using procedural fallback.", err);
        const fallback = createProceduralEarthMap();
        if (fallback) {
          earthMaterial.map = fallback;
          earthMaterial.needsUpdate = true;
        }
      }
    );

    const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
    globeGroup.add(earthMesh);

    // --- 5. ATMOSPHERE GLOW (Fresnel Shader) ---
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        // Sharp Fresnel calculation (steepened exponent to 3.0 for a thin, crisp glow rim)
        float intensity = pow(0.72 - dot(normal, viewDir), 3.0);
        // Crisp white-blue atmospheric color
        gl_FragColor = vec4(0.8, 0.9, 1.0, 1.0) * intensity;
      }
    `;

    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.045, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMaterial);
    globeGroup.add(atmosphereMesh);

    // --- 6. ANIMATION LOOP ---
    const animate = () => {
      // Speed up Earth rotation step to make the rotation movement highly visible and obvious
      earthMesh.rotation.y += 0.012;

      // Subtle axis tilt wobble
      const elapsed = Date.now() * 0.00018;
      globeGroup.rotation.x = 0.2 + Math.sin(elapsed) * 0.01;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // --- 7. RESPONSIVE RESIZING WITH ASPECT-RATIO CONDITIONAL SCALING ---
    const handleResize = () => {
      if (!container || !canvas) return;
      const w = Math.max(container.clientWidth, 24);
      const h = Math.max(container.clientHeight, 24);
      const aspect = w / h;

      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);

      // Dynamically reposition and scale the globe to guarantee responsiveness:
      // Prevent the globe from climbing up and crowding the text on narrow/tall viewports
      if (aspect < 1.0) {
        // Mobile / Portrait: Scale down and shift lower
        globeGroup.position.set(0, -11.5, 0);
        globeGroup.scale.set(0.85, 0.85, 0.85);
      } else if (aspect < 1.5) {
        // Tablet / Narrow Landscape
        globeGroup.position.set(0, -9.8, 0);
        globeGroup.scale.set(0.95, 0.95, 0.95);
      } else {
        // Desktop / Wide Screen
        globeGroup.position.set(0, -9.2, 0);
        globeGroup.scale.set(1.0, 1.0, 1.0);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Run once
    handleResize();

    // --- 8. CLEANUP ON UNMOUNT ---
    return () => {
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      earthGeo.dispose();
      atmosphereGeo.dispose();

      earthMaterial.dispose();
      atmosphereMaterial.dispose();

      earthTexture?.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

// --- HERO COMPONENT ---
interface StarType {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  animation: string;
  delay: string;
}

export default function Hero() {
  const [stars, setStars] = useState<StarType[]>([]);
  const { badge, title, description, ctas, features } = heroData;

  // Dynamically format title parts for best visual balance with the globe layout
  const blackTextStr = title.blackText || "";
  const isForAtEnd = blackTextStr.toLowerCase().endsWith("for");
  const mainTitle = isForAtEnd ? blackTextStr.slice(0, -3).trim() : blackTextStr;
  const subTitle = isForAtEnd ? `for ${title.orangeText}` : title.orangeText;

  // Generate random twinkling stars for the background on the client side with color-matching glows
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }).map((_, i) => {
      const colors = ["bg-white", "bg-blue-300", "bg-orange-300"];
      const starColor = colors[Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : 2) : 0];
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.85 ? "h-[2px] w-[2px]" : "h-[1px] w-[1px]",
        color: starColor,
        animation: i % 3 === 0 ? "star-glow-fast" : i % 3 === 1 ? "star-glow-medium" : "star-glow-slow",
        delay: `${Math.random() * 6}s`,
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-[108vh] lg:min-h-[112vh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#020205] pt-28 pb-36 select-none font-sans text-white">
      {/* CSS Animations for Gradients, Stars & Meteors */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes orangeGlow {
          0%, 100% {
            box-shadow: 0 4px 10px rgba(255, 88, 18, 0.25), 0 0 6px rgba(255, 88, 18, 0.1);
          }
          50% {
            box-shadow: 0 4px 18px rgba(255, 88, 18, 0.45), 0 0 12px rgba(255, 88, 18, 0.2);
          }
        }
        @keyframes starGlow {
          0%, 100% {
            opacity: 0.05;
            transform: scale(0.7);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.3);
          }
        }
        @keyframes meteorFlow {
          0% {
            top: -10%;
            left: 80%;
            width: 0px;
            opacity: 0;
          }
          1% {
            opacity: 0.75;
            width: 80px;
          }
          8% {
            top: 60%;
            left: 20%;
            width: 160px;
            opacity: 0;
          }
          100% {
            top: 60%;
            left: 20%;
            width: 0px;
            opacity: 0;
          }
        }
        @keyframes verticalNebula {
          0% {
            top: -25%;
            opacity: 0;
          }
          8% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.12;
          }
          92% {
            opacity: 0.05;
          }
          100% {
            top: 115%;
            opacity: 0;
          }
        }
        .star-glow-fast {
          animation: starGlow 3.5s infinite ease-in-out;
        }
        .star-glow-medium {
          animation: starGlow 5.5s infinite ease-in-out;
        }
        .star-glow-slow {
          animation: starGlow 7.5s infinite ease-in-out;
        }
        .animate-gradient-flow {
          background-size: 200% auto;
          animation: gradientFlow 5s linear infinite;
        }
        .animate-orange-button {
          background-size: 200% auto;
          animation: gradientFlow 5s linear infinite, orangeGlow 3s infinite ease-in-out;
        }
        .meteor-trail {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(255, 88, 18, 0.8) 0%, rgba(255, 255, 255, 0.35) 40%, transparent 100%);
          transform: rotate(-35deg);
          transform-origin: left center;
          filter: drop-shadow(0 0 5px rgba(255, 88, 18, 0.55));
          pointer-events: none;
          animation: meteorFlow 9s infinite ease-in-out;
        }
        .vertical-nebula-sweep {
          position: absolute;
          left: 0;
          width: 100%;
          height: 30vh;
          background: linear-gradient(180deg, transparent 0%, rgba(255, 88, 18, 0.06) 50%, transparent 100%);
          filter: blur(50px);
          pointer-events: none;
          animation: verticalNebula 16s infinite linear;
        }
      `}</style>

      {/* ── STARRY BACKGROUND (WITH GLOW UP/OFF TWINKLE) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color} ${star.size} ${star.animation}`}
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              boxShadow: star.color === "bg-white"
                ? "0 0 3px rgba(255, 255, 255, 0.4)"
                : star.color === "bg-blue-300"
                  ? "0 0 3px rgba(147, 197, 253, 0.4)"
                  : "0 0 3px rgba(253, 186, 116, 0.4)"
            }}
          />
        ))}
      </div>

      {/* ── GIANT BACKGROUND 3D SPACE GLOBE ── */}
      <div className="absolute inset-0 z-[1] w-full h-full overflow-hidden pointer-events-none">
        <ThreeDSpaceGlobe className="w-full h-full" />
      </div>

      {/* ── FULL-SCREEN CENTRALIZED RADIAL GLOW MASK ── */}
      <div
        className="absolute inset-0 z-[2] w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(2, 2, 5, 0.76) 0%, rgba(2, 2, 5, 0.45) 45%, rgba(2, 2, 5, 0) 70%)"
        }}
      />

      {/* ── VOLUMETRIC LIGHT & METEOR TRAILS ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="vertical-nebula-sweep" />
        <div className="meteor-trail" style={{ top: "-10%", left: "75%", animationDelay: "0s", animationDuration: "8s" }} />
        <div className="meteor-trail" style={{ top: "-5%", left: "90%", animationDelay: "3s", animationDuration: "10s" }} />
        <div className="meteor-trail" style={{ top: "-15%", left: "60%", animationDelay: "5.5s", animationDuration: "9s" }} />
      </div>

      {/* ── CENTERED HERO CONTENT OVERLAY ── */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Badge with Green Dot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4.5 py-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/95">
            {badge}
          </span>
        </motion.div>

        {/* Giant Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold tracking-tighter leading-[1.08] max-w-4xl"
        >
          <span className="block text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-1">
            Your Offshore
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5812] via-[#FF2A00] to-[#FF7A00] animate-gradient-flow filter drop-shadow-[0_0_35px_rgba(255,88,18,0.25)]">
            AI Development
          </span>
          <span className="block mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-200/95 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Services for Intelligent & Scalable Enterprises
          </span>
        </motion.h1>

        {/* Subtext Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-200 font-medium leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
        >
          {description}
        </motion.p>

        {/* High-Contrast Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Orange/Red Animated Primary Button with Pulsating Glow */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF5812] via-[#FF2A00] to-[#FF7A00] animate-orange-button px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 w-full sm:w-auto"
          >
            <span>{ctas.primary}</span>
            <svg
              className="h-4 w-4 text-white transition-transform duration-355 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Horizontal Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mt-16 sm:mt-20 border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-left"
        >
          {features.map((feature, idx) => {
            // Icon mapping
            let IconComponent = ShieldCheck;
            if (idx === 1) IconComponent = Users;
            if (idx === 2) IconComponent = Cpu;
            if (idx === 3) IconComponent = Sparkles;
            if (idx === 4) IconComponent = CalendarRange;

            return (
              <div key={feature.title} className="flex items-start gap-3 px-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5812]/10 text-[#FF5812] border border-[#FF5812]/20 shrink-0 mt-0.5">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[12.5px] sm:text-[13.5px] font-black uppercase tracking-wider text-white leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-[11.5px] sm:text-[12px] text-zinc-400 font-medium leading-tight mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
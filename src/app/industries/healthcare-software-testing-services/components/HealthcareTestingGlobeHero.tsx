"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color="#ff5500" // deep vibrant orange
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </group>
  );
};

export default function HealthcareTestingGlobeHero() {
  return (
    <div className="relative w-full min-h-[90vh] md:h-screen bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Globe rotationSpeed={0.004} radius={1.2} />
        </Canvas>
      </div>

      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col items-center"
        >
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/10 animate-pulse pointer-events-none" />
            <Activity className="w-4 h-4 text-orange-400 relative z-10" />
            <span className="relative z-10 text-sm font-semibold text-orange-200 tracking-wider">
              Healthcare Testing Services
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6 max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight text-white"
            >
              Your Offshore Healthcare Software Testing & QA Partner
            </motion.h1>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
              Ensure the quality, security, performance, and reliability of healthcare applications with an offshore testing team experienced in healthcare software, test automation, interoperability, compliance, and digital health platforms.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-4"
        >
          <a href="/contact">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 25px rgba(249, 115, 22, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg shadow-xl hover:bg-slate-100 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 tracking-wide">Talk to Our Healthcare Testing Team</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </a>
        </motion.div> */}
      </div>
    </div>
  );
}

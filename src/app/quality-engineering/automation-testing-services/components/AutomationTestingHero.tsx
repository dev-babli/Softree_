"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import TrustStrip from "@/components/sections/TrustStrip";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

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

export default function AutomationTestingHero() {
    return (
        <div className="relative w-full bg-black overflow-hidden flex flex-col justify-between pt-28 md:pt-32 lg:pt-32 pb-4">

            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

            {/* 3-Column Hero Content Grid: Title (Left) | Globe (Middle) | Description (Right) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 py-6 md:py-8 items-center gap-8 lg:gap-6">
                
                {/* 1. TITLE & EYEBROW (Left Column) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-4 flex flex-col justify-center items-start space-y-4 md:space-y-5 text-left min-h-[auto] lg:min-h-[440px]"
                >
                    {/* Eyebrow Pill */}
                    <div className="relative inline-flex items-center gap-2 md:gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/10 animate-pulse pointer-events-none" />
                        <Activity className="w-3.5 h-3.5 text-orange-400 relative z-10" />
                        <span className={cn("relative z-10 text-[#FF6B00] text-[10px] md:text-xs", typography.caption.default)}>
                            Automation Testing Services
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className={cn("text-white", typography.heading.h1)}>
                        Your Offshore <br />
                        <span className="text-[#FF6B00]">Automation Testing</span><br />
                        & QA Partner
                    </h1>
                </motion.div>

                {/* 2. 3D GLOBE (Middle Column) - Square aspect to prevent any edge clipping */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="lg:col-span-4 relative w-full max-w-[420px] aspect-square mx-auto z-0 flex items-center justify-center"
                >
                    {/* Soft Center Glow */}
                    <div className="absolute w-56 h-56 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <Canvas className="w-full h-full">
                        <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={52} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Globe rotationSpeed={0.004} radius={1.36} />
                    </Canvas>
                </motion.div>

                {/* 3. DESCRIPTION (Right Column) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:col-span-4 flex flex-col justify-center items-start text-left min-h-[auto] lg:min-h-[440px] lg:pl-4"
                >
                    <p className={cn("text-white/85 text-sm sm:text-base leading-relaxed md:leading-normal", typography.description.default)}>
                        Accelerate software delivery with an experienced automation testing team delivering scalable test automation, improved test coverage, faster regression cycles, and reliable application quality across web, mobile, API, and enterprise platforms.
                    </p>
                </motion.div>

            </div>

            {/* Trust Strip */}
            <div className="relative w-full z-20 pt-2 md:pt-4 pb-4 sm:pb-6 mt-2 md:mt-4">
                <TrustStrip theme="dark" />
            </div>
        </div>
    );
}

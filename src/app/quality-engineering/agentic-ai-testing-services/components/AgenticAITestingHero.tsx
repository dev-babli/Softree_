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

export default function AgenticAITestingHero() {
    return (
        <div className="relative w-full min-h-[90vh] md:min-h-screen bg-black overflow-hidden flex flex-col justify-between pt-28 md:pt-32 lg:pt-0 pb-0">

            {/* Background Gradients & Glows */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-0 pointer-events-none" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full px-6 py-0 md:py-2 items-center gap-12 lg:gap-8">
                {/* Hero Content (Left) */}
                <div className="text-left space-y-8 md:space-y-10 flex flex-col items-start justify-center md:pl-12 lg:pl-16 xl:pl-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 flex flex-col items-start"
                    >
                        {/* Eyebrow Pill */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative inline-flex items-center gap-2 md:gap-3 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 via-transparent to-orange-400/10 animate-pulse pointer-events-none" />
                            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400 relative z-10" />
                            <span className={cn("relative z-10 text-[#FF6B00] text-[10px] md:text-xs", typography.caption.default)}>
                                Automation Testing Services
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <div className="space-y-6 w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className={cn("text-white", typography.heading.h1)}
                            >
                                Your Offshore <br />
                                <span className="text-[#FF6B00] whitespace-nowrap">Automation Testing</span><br />
                                & QA Partner
                            </motion.h1>
                        </div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="max-w-[95%] md:max-w-xl"
                        >
                            <p className={cn("text-white/80 text-sm leading-relaxed md:text-base md:leading-normal", typography.description.default)}>
                                Accelerate software delivery with an experienced automation testing team delivering scalable test automation, improved test coverage, faster regression cycles, and reliable application quality across web, mobile, API, and enterprise platforms.
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

                {/* 3D Canvas Background (Right) */}
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full z-0 lg:order-last translate-y-5 lg:translate-y-13">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <Globe rotationSpeed={0.004} radius={1.4} />
                    </Canvas>
                </div>
            </div>

            {/* Trust Strip anchored to bottom */}
            <div className="relative w-full z-20 pb-4 sm:pb-6 mt-auto">
                <TrustStrip theme="dark" />
            </div>
        </div>
    );
}

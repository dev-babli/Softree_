'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FluxNode {
    x: number;
    y: number;
    originX: number;
    originY: number;
    vx: number;
    vy: number;
    size: number;
    angle: number;
    speed: number;
}

export default function TableauServerToTableauCloudMigrationHero() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Inertial pointer state
    const pointerRef = useRef({
        x: -2000,
        y: -2000,
        targetX: -2000,
        targetY: -2000,
    });

    const nodesRef = useRef<FluxNode[]>([]);
    const dimensionsRef = useRef({ width: 0, height: 0 });
    const prefersReducedMotionRef = useRef(false);

    // --- Initialize Quantum Field Nodes ---
    const initSystem = useCallback(() => {
        const { width, height } = dimensionsRef.current;
        if (width === 0 || height === 0) return;

        // Density based on screen size
        const isMobile = width < 768;
        const density = isMobile ? 45 : 100; // Increased density for better visibility

        const nodes: FluxNode[] = [];
        const cols = Math.floor(Math.sqrt(density * (width / height)));
        const rows = Math.floor(density / cols);

        const cellWidth = width / (cols + 1);
        const cellHeight = height / (rows + 1);

        for (let i = 1; i <= cols; i++) {
            for (let j = 1; j <= rows; j++) {
                const x = i * cellWidth + (Math.random() - 0.5) * 20;
                const y = j * cellHeight + (Math.random() - 0.5) * 20;
                nodes.push({
                    x,
                    y,
                    originX: x,
                    originY: y,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 2.5 + 1.2, // Larger particles
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.015 + 0.005,
                });
            }
        }
        nodesRef.current = nodes;
    }, []);

    // --- High-Performance Canvas Resize ---
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const rect = entry.contentRect;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);

                dimensionsRef.current = { width: rect.width, height: rect.height };
                canvas.width = Math.floor(rect.width * dpr);
                canvas.height = Math.floor(rect.height * dpr);
                canvas.style.width = `${rect.width}px`;
                canvas.style.height = `${rect.height}px`;

                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.scale(dpr, dpr);

                initSystem();
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, [initSystem]);

    // --- Main Smooth Render Loop ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animId = 0;

        const render = () => {
            const { width, height } = dimensionsRef.current;
            const pointer = pointerRef.current;
            const nodes = nodesRef.current;
            const reducedMotion = prefersReducedMotionRef.current;

            // Deep space background
            ctx.fillStyle = '#050508'; // Slightly charcoal/near-black
            ctx.fillRect(0, 0, width, height);

            if (!reducedMotion) {
                // Silky smooth mouse interpolation (Lerp)
                pointer.x += (pointer.targetX - pointer.x) * 0.08;
                pointer.y += (pointer.targetY - pointer.y) * 0.08;

                // Dynamic volumetric cursor aura
                if (pointer.x > 0 && pointer.y > 0) {
                    const glow = ctx.createRadialGradient(
                        pointer.x, pointer.y, 5,
                        pointer.x, pointer.y, 400
                    );
                    glow.addColorStop(0, 'rgba(255, 107, 0, 0.04)');
                    glow.addColorStop(1, 'rgba(5, 5, 8, 0)');
                    ctx.fillStyle = glow;
                    ctx.fillRect(0, 0, width, height);
                }
            }

            // Update and render node mesh
            ctx.lineWidth = 1.2; // Thicker lines
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                if (!reducedMotion) {
                    // Orbital drift oscillation
                    node.angle += node.speed;
                    const targetX = node.originX + Math.cos(node.angle) * 12;
                    const targetY = node.originY + Math.sin(node.angle) * 12;

                    // Spring physics back to target
                    const fx = (targetX - node.x) * 0.05;
                    const fy = (targetY - node.y) * 0.05;

                    node.vx = (node.vx + fx) * 0.85;
                    node.vy = (node.vy + fy) * 0.85;

                    node.x += node.vx;
                    node.y += node.vy;

                    // Mouse gravitational repulsion field
                    const dx = pointer.x - node.x;
                    const dy = pointer.y - node.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const repelRadius = 180;

                    if (dist < repelRadius && dist > 0) {
                        const force = Math.pow(1 - dist / repelRadius, 2) * 10;
                        node.x -= (dx / dist) * force;
                        node.y -= (dy / dist) * force;
                    }
                }

                // Render node point
                ctx.fillStyle = 'rgba(255, 107, 0, 0.85)'; // Higher opacity for particles
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();

                // Connect adjacent nodes dynamically for web matrix effect
                for (let j = i + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const distanceSq = Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2);
                    
                    if (distanceSq < 15000) { // Connect further apart
                        const alpha = (1 - Math.sqrt(distanceSq) / 122) * 0.45; // Higher opacity and longer reach
                        if (alpha > 0) {
                            ctx.strokeStyle = `rgba(255, 107, 0, ${alpha})`;
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animId);
    }, []);

    // --- Interactive Mouse Handlers ---
    const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotionRef.current) return;
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        pointerRef.current.targetX = e.clientX - rect.left;
        pointerRef.current.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
        pointerRef.current.targetX = -2000;
        pointerRef.current.targetY = -2000;
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            className="group relative flex min-h-[500px] md:min-h-[700px] lg:min-h-[800px] w-full select-none flex-col justify-center overflow-hidden bg-[#050508] transition-colors duration-700"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block h-full w-full"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]/90 pointer-events-none" />

            <div className="relative z-20 flex w-full max-w-[1280px] mx-auto flex-col px-6 md:px-10 py-20 pointer-events-none">
                {/* Typography Layer */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="mb-6 tracking-[0.2em] text-[10px] md:text-xs font-semibold text-white/50 uppercase flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40 block"></span>
                        OFFSHORE TABLEAU SERVER TO TABLEAU CLOUD MIGRATION
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[76px] font-bold tracking-tight text-white drop-shadow-md text-balance leading-[1.1] max-w-5xl">
                        Modernize Your Analytics with <br className="hidden lg:block" />
                        Tableau Server to Tableau Cloud <br className="hidden lg:block" />
                        Migration
                    </h1>
                    <p className="mt-8 max-w-[700px] text-sm md:text-base lg:text-lg text-white/70 leading-relaxed text-pretty">
                        Softree helps organizations migrate and modernize Tableau Server workbooks, dashboards, data sources, and analytics on Tableau Cloud through structured assessment, migration, validation, security, and optimization.
                    </p>
                </div>
            </div>
            
            {/* Subtle decorative grid/corners */}
            <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-white/10 pointer-events-none hidden md:block"></div>
            <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-white/10 pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-white/10 pointer-events-none hidden md:block"></div>
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-white/10 pointer-events-none hidden md:block"></div>
        </section>
    );
}

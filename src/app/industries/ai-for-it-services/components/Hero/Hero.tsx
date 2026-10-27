"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Users, Cpu, Sparkles, Calendar } from 'lucide-react';

const trustItems = [
    { icon: Shield, title: 'WHITE-LABEL', subtitle: 'Trusted agency partner.' },
    { icon: Users, title: 'OFFSHORE TEAMS', subtitle: 'Scale on demand.' },
    { icon: Cpu, title: 'MICROSOFT AI', subtitle: 'Azure & OpenAI partners.' },
    { icon: Sparkles, title: 'ENTERPRISE AI', subtitle: 'Secure, production-grade.' },
    { icon: Calendar, title: 'SINCE 2013', subtitle: '13+ years of excellence.' },
];

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.maxLife = 80 + Math.random() * 60;
        this.life = this.maxLife;
        this.size = 1 + Math.random() * 2;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;
        this.vx *= 0.98;
        this.vy *= 0.98;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
    }
}

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { resolvedTheme } = useTheme();
    // Default to dark mode to prevent hydration flashes on first load if theme isn't resolved yet
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        // Only update if resolvedTheme is defined (handles hydration)
        if (resolvedTheme) {
            setIsDarkMode(resolvedTheme === 'dark');
        }
    }, [resolvedTheme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
        const particles: Particle[] = [];
        const clickRipple = { x: 0, y: 0, radius: 0, maxRadius: 400, speed: 14 };

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        };

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
            mouse.targetX = clientX - width / 2;
            mouse.targetY = clientY - height / 2;
            mouse.active = true;
        };

        const handlePointerLeave = () => {
            mouse.targetX = 0;
            mouse.targetY = 0;
            mouse.active = false;
        };

        const handlePointerDown = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

            clickRipple.x = clientX;
            clickRipple.y = clientY;
            clickRipple.radius = 0;

            // Golden/Orange glow for particles to match 3rd attachment
            const pColor = isDarkMode ? 'rgba(255, 176, 32, 0.9)' : 'rgba(255, 88, 18, 0.9)';
            for (let i = 0; i < 35; i++) {
                particles.push(new Particle(clickRipple.x, clickRipple.y, pColor));
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });
        window.addEventListener('mouseleave', handlePointerLeave);
        window.addEventListener('mousedown', handlePointerDown);
        window.addEventListener('touchstart', handlePointerDown, { passive: true });

        let lastTime = performance.now();
        let time = 0;

        const noise = (x: number, t: number, o: number) =>
            (Math.sin(x * 0.0012 + t * 0.25 + o) + Math.cos(x * 0.0028 - t * 0.4 + o * 2)) / 2;

        const render = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            time += dt * 0.85;

            // Interpolate mouse position
            const lerpFactor = 1 - Math.exp(-9 * dt);
            mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
            mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

            const bgColor = isDarkMode ? '#030712' : '#ffffff';

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // Render and update active particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw(ctx);
                if (p.life <= 0) particles.splice(i, 1);
            }

            if (clickRipple.radius < clickRipple.maxRadius) {
                clickRipple.radius += clickRipple.speed;
            }

            const layers = [
                { ribbonCount: 16, step: 4, offsetMod: 0, freqScale: 0.0035, ampScale: 55, speedScale: 1.1, primary: true },
                { ribbonCount: 10, step: 6, offsetMod: 1.2, freqScale: 0.0075, ampScale: 30, speedScale: 0.7, primary: false },
            ];

            layers.forEach((layer) => {
                ctx.globalCompositeOperation = layer.primary ? 'source-over' : 'multiply';

                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                if (!isDarkMode) {
                    // Light Mode: Soft orange to deep amber gradient on white
                    gradient.addColorStop(0, `rgba(255, 140, 0, ${layer.primary ? 0.15 : 0.03})`);
                    gradient.addColorStop(0.5, `rgba(255, 88, 18, ${layer.primary ? 0.75 : 0.3})`);
                    gradient.addColorStop(1, `rgba(220, 38, 38, ${layer.primary ? 0.15 : 0.03})`);
                } else {
                    // Dark Mode: Vibrant gold to fiery orange gradient on black
                    gradient.addColorStop(0, `rgba(255, 200, 0, ${layer.primary ? 0.1 : 0.02})`);
                    gradient.addColorStop(0.5, `rgba(255, 88, 18, ${layer.primary ? 0.8 : 0.35})`);
                    gradient.addColorStop(1, `rgba(255, 50, 0, ${layer.primary ? 0.1 : 0.02})`);
                }

                for (let r = 0; r < layer.ribbonCount; r++) {
                    const ribbonProgress = r / layer.ribbonCount;
                    const yOffset = height * 0.22 + r * (height * 0.032) + layer.offsetMod * 35;
                    const baseAlpha = (1 - ribbonProgress * 0.75) * (isDarkMode ? 0.8 : 0.65);

                    const rippleDistort =
                        clickRipple.radius < clickRipple.maxRadius
                            ? Math.sin((time * 2 + ribbonProgress * Math.PI) * 2) *
                            ((clickRipple.maxRadius / Math.max(clickRipple.radius, 1)) * 2.5)
                            : 0;

                    ctx.beginPath();

                    for (let x = 0; x <= width + layer.step; x += layer.step) {
                        const edgeEnvelope = Math.sin((x / width) * Math.PI);

                        const nFreq = 1 + noise(x, time, ribbonProgress) * 0.18;
                        const nAmp = 1 + noise(x * 2, -time, ribbonProgress * 0.5) * 0.15;

                        const wave1 =
                            Math.sin(x * (layer.freqScale * nFreq) + time * layer.speedScale + r * 0.18) *
                            (layer.ampScale * edgeEnvelope * nAmp);
                        const wave2 = Math.cos(x * 0.008 - time * 0.7 + r * 0.1) * (20 * edgeEnvelope);
                        const wave3 = Math.sin(x * 0.018 + time * 1.4) * (8 * edgeEnvelope);

                        const cursorXWorld = width / 2 + mouse.x;
                        const distToMouseX = Math.abs(x - cursorXWorld);
                        const mouseRadius = layer.primary ? 380 : 220;
                        const mouseFactor = Math.exp(-Math.pow(distToMouseX / mouseRadius, 2));
                        const mouseDisplacement =
                            Math.sin(x * 0.015 + time * 2.6) *
                            (mouseFactor * (layer.primary ? 50 : 25) * edgeEnvelope);

                        const rippleFactor = Math.exp(
                            -Math.pow(Math.abs(distToMouseX - clickRipple.radius) / (25 + rippleDistort), 2)
                        );
                        const rippleDisplacement = rippleFactor * rippleDistort * (1.8 - ribbonProgress);

                        const y =
                            yOffset +
                            wave1 +
                            wave2 +
                            wave3 +
                            mouseDisplacement +
                            rippleDisplacement +
                            mouse.y * (ribbonProgress * 0.1);

                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);

                        // Small accent node markings
                        if (layer.primary && x % 48 === 0) {
                            ctx.fillStyle = !isDarkMode ? 'rgba(255, 88, 18, 0.35)' : 'rgba(255, 200, 0, 0.4)';
                            ctx.shadowBlur = 6;
                            ctx.shadowColor = ctx.fillStyle;
                            ctx.fillRect(x - 1, y - 1, 3, 3);
                            ctx.shadowBlur = 0;
                        }
                    }

                    ctx.globalAlpha = baseAlpha;
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = (layer.primary ? 1.4 : 0.8) + (1 - ribbonProgress) * 0.5;
                    ctx.stroke();
                }
            });

            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('mouseleave', handlePointerLeave);
            window.removeEventListener('mousedown', handlePointerDown);
            window.removeEventListener('touchstart', handlePointerDown);
        };
    }, [isDarkMode]);

    return (
        <section
            className={`relative w-full min-h-[85vh] lg:min-h-screen overflow-hidden select-none flex items-center justify-center ${isDarkMode ? 'bg-gray-950' : 'bg-white'
                }`}
        >
            <canvas ref={canvasRef} className="absolute inset-0 block cursor-default z-0" />

            {/* Hero Overlay */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center pointer-events-none mt-24 md:mt-20 pb-32">
                <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 sm:mb-6 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] backdrop-blur-sm pointer-events-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] shadow-[0_0_6px_#FF5812]" />
                    AI For IT DEVELOPMENT SERVICES
                </span>

                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Modernize IT With an <br className="hidden sm:block" />
                    <span className="text-[#FF5812] drop-shadow-sm">
                        Offshore AI Engineering Team
                    </span>
                </h1>

                <div className={`flex flex-col gap-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                    <p>
                        Accelerate IT transformation with dedicated AI engineers building intelligent automation, AI agents, enterprise copilots, RAG applications, and data-driven solutions across your technology ecosystem.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pointer-events-auto">
                    <Button asChild size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-orange-500/20 bg-[#FF5812] hover:bg-[#E0480C] text-white border-none">
                        <Link href="/contact">
                            Talk to Our Experts
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Bottom Trust Bar */}
            <div className={`absolute bottom-0 left-0 w-full z-20 py-5 border-t ${isDarkMode ? 'bg-black/40 backdrop-blur-md border-white/5' : 'bg-white/60 backdrop-blur-md border-slate-200'}`}>
                <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                        {trustItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex items-center gap-3 sm:gap-4">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-[#FF5812]">
                                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF5812]" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-[11px] sm:text-[13px] font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</span>
                                        <span className={`text-[10px] sm:text-[11px] mt-0.5 ${isDarkMode ? 'text-[#A1A1AA]' : 'text-slate-500'}`}>{item.subtitle}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

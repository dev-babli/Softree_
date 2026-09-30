"use client";

import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, BrainCircuit } from 'lucide-react';

// Cosmic Synapse Canvas Component
const CosmicSynapseCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let neurons: Neuron[] = [];
        let pulses: Pulse[] = [];
        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 150 };
        const perspective = 400;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };
        
        class Neuron {
            x: number;
            y: number;
            z: number;
            baseX: number;
            baseY: number;
            baseZ: number;
            radius: number;
            activation: number;
            neighbors: Neuron[];

            constructor(x: number, y: number, z: number) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.baseX = x;
                this.baseY = y;
                this.baseZ = z;
                this.radius = Math.random() * 3 + 1.5;
                this.activation = 0;
                this.neighbors = [];
            }

            project() {
                if (!canvas) return { x: 0, y: 0, scale: 0 };
                // Apply mouse-based rotation for parallax
                const rotX = (mouse.y - canvas.height / 2) * 0.0001;
                const rotY = (mouse.x - canvas.width / 2) * 0.0001;

                const cosY = Math.cos(rotY);
                const sinY = Math.sin(rotY);
                const cosX = Math.cos(rotX);
                const sinX = Math.sin(rotX);

                const x1 = this.x * cosY - this.z * sinY;
                const z1 = this.z * cosY + this.x * sinY;
                const y1 = this.y * cosX - z1 * sinX;
                const z2 = z1 * cosX + this.y * sinX;

                const scale = perspective / (perspective + z2);
                const projectedX = (x1 * scale) + canvas.width / 2;
                const projectedY = (y1 * scale) + canvas.height / 2;
                return { x: projectedX, y: projectedY, scale };
            }

            draw() {
                if (!ctx) return;
                const { x, y, scale } = this.project();
                ctx.beginPath();
                ctx.arc(x, y, this.radius * scale, 0, Math.PI * 2);
                const color = `rgba(255, 95, 0, ${0.65 + this.activation * 0.35})`; // Bright Deep Orange
                ctx.fillStyle = color;
                ctx.fill();
            }

            update() {
                // Gravitational pull towards mouse
                const { x: projectedX, y: projectedY } = this.project();
                const dx = mouse.x - projectedX;
                const dy = mouse.y - projectedY;
                const dist = Math.hypot(dx, dy);
                const force = Math.max(0, (mouse.radius - dist) / mouse.radius);
                
                this.x += (dx / dist) * force * 0.5;
                this.y += (dy / dist) * force * 0.5;

                // Return to base position
                this.x += (this.baseX - this.x) * 0.01;
                this.y += (this.baseY - this.y) * 0.01;

                if (this.activation > 0) {
                    this.activation -= 0.01;
                }
                this.draw();
            }
            
            fire() {
                if (this.activation > 0.5) return;
                this.activation = 1;
                this.neighbors.forEach(neighbor => {
                    pulses.push(new Pulse(this, neighbor));
                });
            }
        }

        class Pulse {
            start: Neuron;
            end: Neuron;
            progress: number;
            speed: number;

            constructor(startNeuron: Neuron, endNeuron: Neuron) {
                this.start = startNeuron;
                this.end = endNeuron;
                this.progress = 0;
                this.speed = 0.05;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.end.activation = Math.min(1, this.end.activation + 0.5);
                    return true;
                }
                return false;
            }

            draw() {
                if (!ctx) return;
                const startPos = this.start.project();
                const endPos = this.end.project();

                const x = startPos.x + (endPos.x - startPos.x) * this.progress;
                const y = startPos.y + (endPos.y - startPos.y) * this.progress;
                const scale = startPos.scale + (endPos.scale - startPos.scale) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 200, 150, ${1 - this.progress})`;
                ctx.shadowColor = 'white';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow blur
            }
        }

        const init = () => {
            neurons = [];
            // Optimize for mobile by reducing particles
            const isMobile = window.innerWidth < 768;
            const numNeurons = isMobile ? 400 : 1000;
            const radius = isMobile ? 150 : 250;
            
            for (let i = 0; i < numNeurons; i++) {
                const phi = Math.acos(-1 + (2 * i) / numNeurons);
                const theta = Math.sqrt(numNeurons * Math.PI) * phi;
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(phi) * Math.sin(theta);
                const z = radius * Math.cos(phi);
                neurons.push(new Neuron(x, y, z));
            }
            
            neurons.forEach(neuron => {
                neurons.forEach(other => {
                    if (neuron !== other) {
                        const dist = Math.hypot(neuron.x - other.x, neuron.y - other.y, neuron.z - other.z);
                        if (dist < (isMobile ? 30 : 40)) {
                            neuron.neighbors.push(other);
                        }
                    }
                });
            });
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            if (Math.random() > 0.99) {
                if (neurons.length > 0) {
                    neurons[Math.floor(Math.random() * neurons.length)].fire();
                }
            }

            neurons.forEach(neuron => neuron.update());
            
            pulses = pulses.filter(pulse => !pulse.update());
            pulses.forEach(pulse => pulse.draw());

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        // Handle touch for mobile
        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length > 0) {
                mouse.x = event.touches[0].clientX;
                mouse.y = event.touches[0].clientY;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        
        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full bg-black pointer-events-none" />;
};

// The main hero component
const HealthcareTestingNeuralHero = () => {
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <section 
            className="relative min-h-[90vh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
        >
            <CosmicSynapseCanvas />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>

            {/* Overlay HTML Content */}
            <div className="relative z-20 text-center p-6 max-w-5xl mx-auto w-full flex flex-col items-center">
                <motion.div
                    custom={0} variants={fadeUpVariants} initial="hidden" animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6 backdrop-blur-sm"
                >
                    <BrainCircuit className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-200">
                        Healthcare Testing Services
                    </span>
                </motion.div>

                <motion.h1
                    custom={1} variants={fadeUpVariants} initial="hidden" animate="visible"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 max-w-4xl mx-auto leading-tight md:leading-tight"
                >
                    Your Offshore Healthcare Software Testing & QA Partner
                </motion.h1>

                <motion.p
                    custom={2} variants={fadeUpVariants} initial="hidden" animate="visible"
                    className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 mb-10"
                >
                    Ensure the quality, security, performance, and reliability of healthcare applications with an offshore testing team experienced in healthcare software, test automation, interoperability, compliance, and digital health platforms.
                </motion.p>

                <motion.div
                    custom={3} variants={fadeUpVariants} initial="hidden" animate="visible"
                >
                    <a 
                        href="/contact"
                        className="px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2 mx-auto"
                    >
                        Talk to Our Healthcare Testing Team
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HealthcareTestingNeuralHero;

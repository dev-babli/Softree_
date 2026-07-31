'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Database, FileBox, Layers, Search, Bot, Handshake, Users, Cpu, ShieldCheck, Box, TrendingUp } from 'lucide-react';
import { KnowledgeSourceCard } from './KnowledgeSourceCard';
import { PipelineNode } from './PipelineNode';
import { AnimatedConnection } from './AnimatedConnection';
import { HERO_DATA } from '../data/heroData';

export const EnterpriseRAGHero: React.FC = () => {
  const { label, heading, paragraph, ctaButtons, features, knowledgeSources } = HERO_DATA;

  // 9-Second Timeline State
  const [time, setTime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setTime(((Date.now() - start) / 1000) % 9);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Node Activations based on timeline
  const isDocActive = time >= 2.5 && time < 3.5;
  const isEmbedActive = time >= 3.8 && time < 4.8;
  const isVectorDBActive = time >= 5.1 && time < 6.4;
  const isRetrievalActive = time >= 6.6 && time < 7.6;
  const isModelActive = time >= 3.0 && time < 4.0;

  // Parallax Setup
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const containerX = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const containerY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const pipelineX = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);
  const pipelineY = useTransform(smoothY, [-0.5, 0.5], [-2, 2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as const } },
  };

  return (
    <section 
      className="relative w-full min-h-[calc(100vh-80px)] bg-transparent overflow-hidden flex items-center pt-20 pb-20 lg:pt-24 lg:pb-32"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start w-full lg:w-[50%] text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 mb-5"
            >
              <div className="w-1 h-1 rounded-full bg-[#FF6B00] shrink-0" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#FF6B00] uppercase">
                {label}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-[clamp(40px,5vw,60px)] leading-[0.95] font-semibold tracking-[-0.03em] text-[#0A0A1A] mb-6"
            >
              <span className="whitespace-pre-wrap">{heading.prefix} </span>
              <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF5812] bg-clip-text text-transparent whitespace-nowrap">{heading.highlight}</span>
              {heading.suffix && <span> {heading.suffix}</span>}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-[15px] text-[#0A0A1A]/70 leading-relaxed max-w-lg mb-7"
            >
              {paragraph}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full pb-8">
              <Link
                href={ctaButtons.primary.href}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-[#0A0A1A] font-semibold text-[15px] shadow-sm hover:bg-orange-50 hover:border-orange-200 hover:text-[#FF6B00] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{ctaButtons.primary.text}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row w-full pt-6 border-t border-gray-100 gap-5 md:gap-4"
            >
              {/* Item 1 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0A1A] leading-[1.25]">White-Label<br/>Friendly</h4>
                </div>
                <p className="text-[11px] text-[#0A0A1A]/70 leading-relaxed pr-2">Trusted partner for tech agencies.</p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <Box className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0A1A] leading-[1.25]">Dedicated<br/>Offshore Teams</h4>
                </div>
                <p className="text-[11px] text-[#0A0A1A]/70 leading-relaxed pr-2">Scale engineering on demand.</p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0A1A] leading-[1.25]">Microsoft AI<br/>Expertise</h4>
                </div>
                <p className="text-[11px] text-[#0A0A1A]/70 leading-relaxed pr-2">Azure, OpenAI & Power Platform.</p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <Cpu className="w-5 h-5 text-[#FF6B00] shrink-0 mt-[1px]" strokeWidth={1.5} />
                  <h4 className="text-[12.5px] font-semibold text-[#0A0A1A] leading-[1.25]">Enterprise-Ready<br/>Delivery</h4>
                </div>
                <p className="text-[11px] text-[#0A0A1A]/70 leading-relaxed pr-2">Secure, production-grade solutions.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: RAG Architecture Animation */}
          <div className="w-full lg:w-[50%] flex flex-col items-center justify-center relative mt-10 lg:mt-0">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 bg-white/50 backdrop-blur px-3 py-1 rounded-full border border-gray-100"
            >
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }} 
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Live RAG Pipeline</span>
            </motion.div>

            <motion.div 
              className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
              style={{ x: isMobile ? 0 : bgX, y: isMobile ? 0 : bgY }}
            >
              <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] w-[250px] h-[250px] bg-blue-500 rounded-full blur-[80px] mix-blend-multiply" />
              <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.1, 0.07] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-[35%] w-[300px] h-[300px] bg-purple-500 rounded-full blur-[80px] mix-blend-multiply" />
              <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.09, 0.14, 0.09] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute top-[55%] w-[350px] h-[350px] bg-[#FF6B00] rounded-full blur-[90px] mix-blend-multiply" />
              <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.07, 0.1, 0.07] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }} className="absolute top-[75%] w-[250px] h-[250px] bg-cyan-500 rounded-full blur-[70px] mix-blend-multiply" />
            </motion.div>

            <motion.div 
              className="relative w-full max-w-lg mb-4 z-20"
              style={{ x: isMobile ? 0 : containerX, y: isMobile ? 0 : containerY }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {knowledgeSources.map((source, idx) => (
                  <motion.div
                    key={source.title}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3, ease: 'easeInOut' }}
                  >
                    <KnowledgeSourceCard
                      title={source.title}
                      icon={source.icon}
                      delay={0.2 + idx * 0.05}
                      colorClass={(source as any).colorClass}
                      bgClass={(source as any).bgClass}
                      borderClass={(source as any).borderClass}
                      glowClass={(source as any).glowClass}
                      isActive={time < 1.0}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center w-full relative z-10"
              style={{ x: isMobile ? 0 : pipelineX, y: isMobile ? 0 : pipelineY }}
            >
              <AnimatedConnection 
                height={20} 
                particles={[
                  { color: '#0D9488', glow: 'rgba(13,148,136,0.6)', delay: 1.0 },
                  { color: '#DC2626', glow: 'rgba(220,38,38,0.6)', delay: 1.2 },
                  { color: '#2563EB', glow: 'rgba(37,99,235,0.6)', delay: 1.4 },
                  { color: '#8B5CF6', glow: 'rgba(139,92,246,0.6)', delay: 1.6 },
                ]}
              />

              <PipelineNode
                title="Document Processing"
                icon={FileBox}
                isHighlighted={true}
                accent="blue"
                isActive={isDocActive}
                tooltipText="Parsing & chunking enterprise content."
              />

              <AnimatedConnection 
                height={20} 
                particles={[{ color: '#3B82F6', glow: 'rgba(59,130,246,0.7)', delay: 3.2 }]} 
              />

              <PipelineNode
                title="Embeddings"
                icon={Layers}
                isHighlighted={true}
                accent="purple"
                isActive={isEmbedActive}
                tooltipText="Transforming knowledge into vector representations."
              />

              <AnimatedConnection 
                height={20} 
                particles={[{ color: '#8B5CF6', glow: 'rgba(139,92,246,0.7)', delay: 4.5 }]} 
              />

              <PipelineNode
                title="Vector Database"
                icon={Database}
                isHighlighted={true}
                accent="orange"
                isActive={isVectorDBActive}
                tooltipText="Storing searchable semantic knowledge."
              />

              <AnimatedConnection 
                height={20} 
                particles={[{ color: '#FF6B00', glow: 'rgba(255,107,0,0.8)', delay: 6.0 }]} 
              />

              <PipelineNode
                title="Retrieval Engine"
                icon={Search}
                isHighlighted={true}
                accent="cyan"
                isActive={isRetrievalActive}
                tooltipText="Finding the most relevant enterprise context."
              />

              <AnimatedConnection 
                height={20} 
                particles={[{ color: '#06B6D4', glow: 'rgba(6,182,212,0.7)', delay: 7.3 }]} 
              />
            </motion.div>

            <motion.div
              style={{ x: isMobile ? 0 : pipelineX, y: isMobile ? 0 : pipelineY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: isModelActive ? -2 : 0,
                scale: isModelActive ? 1.02 : 1,
                boxShadow: isModelActive ? '0 8px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-2 bg-white/80 backdrop-blur-xl border border-white rounded-full px-6 py-3 flex items-center justify-center gap-6 shadow-sm z-20 relative"
            >
              <div className="flex items-center gap-2 text-slate-500">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Models:</span>
              </div>
              <div className="flex gap-4 text-xs font-bold text-[#0A0A1A]">
                {[
                  { name: 'OpenAI', color: 'text-slate-800' }, 
                  { name: 'Claude', color: 'text-[#D97757]' }, 
                  { name: 'Gemini', color: 'text-[#8B5CF6]' }, 
                  { name: 'Llama', color: 'text-[#2563EB]' }
                ].map((model, i) => {
                  const isThisModelActive = time >= 3.0 + (i * 0.2) && time < 3.8;
                  return (
                    <React.Fragment key={model.name}>
                      <span 
                        className={`transition-colors duration-300 relative ${isThisModelActive ? model.color : 'text-slate-700'}`}
                        style={{ transform: isThisModelActive ? 'translateY(-1px)' : 'translateY(0)' }}
                      >
                        {model.name}
                        <motion.span 
                          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                          style={{ backgroundColor: 'currentColor' }}
                          animate={{ opacity: isThisModelActive ? 1 : 0 }}
                        />
                      </span>
                      {i < 3 && <span className="text-gray-300">•</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

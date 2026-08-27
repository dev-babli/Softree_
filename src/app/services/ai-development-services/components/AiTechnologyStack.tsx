"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  SiPython, 
  SiPytorch, 
  SiDatabricks, 
  SiTensorflow, 
  SiOpencv, 
  SiDocker, 
  SiHuggingface, 
  SiScikitlearn, 
  SiPandas, 
  SiGrafana, 
  SiFastapi, 
  SiKubernetes,
  SiLangchain,
  SiApacheairflow,
  SiApachespark
} from "react-icons/si";
import { TbBrandAzure, TbBrandAws } from "react-icons/tb";
import { FaWindows } from "react-icons/fa";
import { Brain, Database, GitMerge, SquareDot, LineChart } from "lucide-react";

// Exact brand logos mapped for all 24 tech items
const techStack = [
  { name: "Python", icon: SiPython },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Azure OpenAI", icon: TbBrandAzure },
  { name: "LangChain", icon: SiLangchain },
  { name: "LangGraph", icon: GitMerge },
  { name: "LlamaIndex", icon: SiApachespark },
  { name: "Pinecone", icon: SquareDot },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "Copilot Studio", icon: FaWindows },
  { name: "Semantic Kernel", icon: FaWindows },
  { name: "Databricks", icon: SiDatabricks },
  { name: "Machine Learning", icon: Brain },
  { name: "OpenCV", icon: SiOpencv },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "Tensorflow", icon: SiTensorflow },
  { name: "Pandas", icon: SiPandas },
  { name: "Microsoft Fabric", icon: FaWindows },
  { name: "Azure AI Search", icon: TbBrandAzure },
  { name: "ETL Processes", icon: SiApacheairflow },
  { name: "FastAPI / APIs", icon: SiFastapi },
  { name: "Docker & K8s", icon: SiDocker },
  { name: "DevOps & MLOps", icon: SiKubernetes },
  { name: "AWS Cloud", icon: TbBrandAws },
  { name: "Grafana", icon: SiGrafana },
];

export default function AiTechnologyStack() {
  return (
    <section className="bg-black text-white py-20 lg:py-24 relative overflow-hidden font-sans">
      
      {/* Ambient background decorative orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF6B2C]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B2C]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="max-w-4xl mb-12 lg:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B2C] mb-4 block"
          >
            Capabilities & Stack
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-6"
          >
            Powering Enterprise Innovation with Our Advanced AI Technology Stack
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-[15px] text-slate-400 leading-relaxed max-w-3xl"
          >
            We combine leading foundation models, cloud infrastructure, and modern development frameworks to build secure, scalable, and production-ready enterprise solutions. From custom automated agents to high-performance data engineering pipelines, our vetted engineering team leverages a robust technology stack to deliver measurable ROI, accelerate operations, and secure your competitive edge.
          </motion.p>
        </div>

        {/* ================= TECH STACK GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group flex items-center gap-4 px-6 py-5 bg-[#0C0C0C] border border-white/5 hover:border-[#FF6B2C]/30 hover:bg-[#121212] transition-all duration-300 rounded-xl cursor-pointer relative overflow-hidden"
              >
                {/* Micro-glow background highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B2C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Container */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] text-slate-400 group-hover:bg-[#FF6B2C]/15 group-hover:text-[#FF6B2C] ring-1 ring-white/10 group-hover:ring-[#FF6B2C]/30 transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                
                {/* Tech Name */}
                <span className="relative z-10 text-[14.5px] font-bold text-slate-300 group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

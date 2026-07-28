import React from 'react';
import { 
  Target, 
  Search, 
  BrainCircuit, 
  Bot, 
  Settings, 
  Network, 
  Puzzle, 
  Database, 
  Shield, 
  CloudUpload, 
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Users
} from 'lucide-react';
import Image from 'next/image';

const leftCards = [
  {
    title: "AI Strategy & Roadmap Consulting",
    icon: Target,
    tags: ["AI Strategy", "Roadmap", "ROI Planning"],
  },
  {
    title: "AI Opportunity Assessment",
    icon: Search,
    tags: ["AI Readiness", "Use Case Analysis", "Impact"],
  },
  {
    title: "Generative AI Solutions",
    icon: BrainCircuit,
    tags: ["LLMs", "AI Copilots", "GenAI Apps"],
  },
  {
    title: "AI Agents & Autonomous Workflows",
    icon: Bot,
    tags: ["AI Agents", "Autonomous AI", "RPA+AI"],
  },
  {
    title: "Business Process Automation",
    icon: Settings,
    tags: ["Automation", "Workflows", "Efficiency"],
  }
];

const rightCards = [
  {
    title: "Machine Learning Solutions",
    icon: Network,
    tags: ["ML Models", "Predictive Analytics", "AI Models"],
  },
  {
    title: "Enterprise AI Integration",
    icon: Puzzle,
    tags: ["System Integration", "APIs", "Microsoft AI"],
  },
  {
    title: "AI Data & Analytics",
    icon: Database,
    tags: ["Data Engineering", "Analytics", "BI"],
  },
  {
    title: "AI Security & Governance",
    icon: Shield,
    tags: ["Governance", "Security", "Compliance"],
  },
  {
    title: "AI Implementation & Deployment",
    icon: CloudUpload,
    tags: ["Deployment", "MLOps", "Optimization"],
  }
];

export function CapabilitiesBentoGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 px-4 md:px-8 relative overflow-hidden">
      {/* Optional: subtle background mesh or grid could go here */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-multiply"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <style>{`
              @keyframes line-stretch {
                0%, 100% { width: 40px; opacity: 0.6; }
                50% { width: 100px; opacity: 1; }
              }
              .animate-line-stretch {
                animation: line-stretch 3s ease-in-out infinite;
              }
            `}</style>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute left-0 w-2 h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
            </div>
            <span className="text-[#FF5812] font-bold tracking-[0.2em] text-sm uppercase">OUR CORE CAPABILITIES</span>
            <div className="animate-line-stretch flex items-center relative h-[1.5px] bg-[#FF5812]">
              <div className="absolute right-0 w-2 h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-6">
            Comprehensive <span className="text-[#FF5812]">AI Capabilities.</span> Real Business Impact.
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
            End-to-end AI consulting services that help enterprises strategize, build, deploy, and scale intelligent solutions that drive measurable outcomes.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-12 items-center relative">
          
          {/* SVG Background Lines for Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
             {/* We can place SVG lines here if we have fixed coordinates, but for a responsive layout, a CSS grid approach with connector dots is safer without complex math. */}
          </div>

          {/* Left Column */}
          <div className="flex flex-col gap-6 relative z-10">
            {leftCards.map((card, i) => (
              <div key={i} className="relative p-[1px] rounded-2xl overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(255,88,18,0.15)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                {/* Animated Moving Border */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative bg-white rounded-[15px] p-6 flex flex-col md:flex-row items-start md:items-center gap-4 h-full">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-white border border-[#FF5812]/20 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF5812]/50 transition-all duration-300">
                    <card.icon className="w-6 h-6 text-[#FF5812]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#FF5812] transition-colors">{card.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {card.tags.map((tag, j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5812]" />
                          <span className="text-xs font-medium text-gray-500">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column - Glowing Orb */}
          <div className="hidden lg:flex flex-col items-center justify-center relative py-12 px-8 min-w-[350px]">
            {/* Concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
               <div className="w-[450px] h-[450px] rounded-full border-[1.5px] border-dashed border-[#D8450B] animate-[spin_60s_linear_infinite]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
               <div className="w-[350px] h-[350px] rounded-full border-[1.5px] border-dashed border-[#D8450B] animate-[spin_40s_linear_infinite_reverse]"></div>
            </div>
            
            {/* Central Glowing Orb */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="relative w-48 h-48 bg-gradient-to-b from-[#FF7030] to-[#FF5812] rounded-full shadow-[inset_0_-10px_20px_rgba(0,0,0,0.15)] flex items-center justify-center p-6 text-center border-4 border-white/20 z-10 before:content-[''] before:absolute before:inset-0 before:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] before:opacity-20 before:rounded-full before:mix-blend-overlay">
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/50 rounded-full blur-[2px]"></div>
                <h3 className="text-white font-black text-xl tracking-tight leading-tight uppercase relative z-20">
                  AI CONSULTING<br/>EXCELLENCE
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 relative z-10">
            {rightCards.map((card, i) => (
              <div key={i} className="relative p-[1px] rounded-2xl overflow-hidden group shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_30px_rgba(255,88,18,0.15)] transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                {/* Animated Moving Border */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#FF5812_360deg)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative bg-white rounded-[15px] p-6 flex flex-col md:flex-row items-start md:items-center gap-4 h-full">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-white border border-[#FF5812]/20 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:border-[#FF5812]/50 transition-all duration-300">
                    <card.icon className="w-6 h-6 text-[#FF5812]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#FF5812] transition-colors">{card.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {card.tags.map((tag, j) => (
                        <div key={j} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5812]" />
                          <span className="text-xs font-medium text-gray-500">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-6 lg:p-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center gap-4 lg:w-1/3 shrink-0 lg:border-r border-gray-100 lg:pr-8">
               <div className="w-16 h-16 rounded-full bg-white border-2 border-[#FF5812]/20 flex items-center justify-center">
                 <Target className="w-8 h-8 text-[#FF5812]" />
               </div>
               <div>
                 <h3 className="font-bold text-gray-900 text-xl leading-tight">AI That Delivers<br/>Real Business Impact</h3>
               </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <TrendingUp className="w-8 h-8 text-[#FF5812]/70 mb-1" strokeWidth={1.5} />
                <span className="font-bold text-gray-900 text-sm">Drive Efficiency</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 lg:border-l border-gray-100">
                <div className="w-8 h-8 rounded-full border-2 border-[#FF5812]/70 flex items-center justify-center mb-1">
                  <DollarSign className="w-4 h-4 text-[#FF5812]/70" strokeWidth={2} />
                </div>
                <span className="font-bold text-gray-900 text-sm">Reduce Costs</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 lg:border-l border-gray-100">
                <Lightbulb className="w-8 h-8 text-[#FF5812]/70 mb-1" strokeWidth={1.5} />
                <span className="font-bold text-gray-900 text-sm">Accelerate Innovation</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 lg:border-l border-gray-100">
                <Users className="w-8 h-8 text-[#FF5812]/70 mb-1" strokeWidth={1.5} />
                <span className="font-bold text-gray-900 text-sm">Deliver Measurable ROI</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


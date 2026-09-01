import React from 'react';
import dynamic from 'next/dynamic';
import { WovenLightHero } from './WovenLightHero';
import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import NavigationClient from '@/components/sections/navigation-client';
import Footer from '@/components/sections/footer';
import TrustedBrandsMarquee from "@/app/services/offshore-power-platform-development/trust";

// Dynamically import below-the-fold components to prioritize network resources for Hero video & LCP
const BusinessChallenges = dynamic(() => import('./components/BusinessChallenges'), { ssr: true });
const BusinessOutcomes = dynamic(() => import('./components/BusinessOutcomes'), { ssr: true });
const CoreCapabilities = dynamic(() => import('./components/CoreCapabilities'), { ssr: true });
const DigitalEngineeringSolutions = dynamic(() => import('./components/DigitalEngineeringSolutions'), { ssr: true });
const AiReadinessBanner = dynamic(() => import('./components/AiReadinessBanner'), { ssr: true });
const PartnerShowcase = dynamic(() => import('./components/PartnerShowcase'), { ssr: true });
const ClientTestimonialsShowcase = dynamic(() => import('./components/ClientTestimonialsShowcase'), { ssr: true });
const Industries = dynamic(() => import('./components/Industries'), { ssr: true });
const AiTechnologyStack = dynamic(() => import('./components/AiTechnologyStack'), { ssr: true });
// const AiArchitectureShowcase = dynamic(() => import('./components/AiArchitectureShowcase'), { ssr: true });
const SuccessStories = dynamic(() => import('./components/SuccessStories/SuccessStories').then((mod) => mod.SuccessStories), { ssr: true });
const AIPhilosophy = dynamic(() => import('./components/AIPhilosophy'), { ssr: true });
const AIDilemma = dynamic(() => import('./components/AIDilemma'), { ssr: true });
const AiRoadmap = dynamic(() => import('./components/AiRoadmap'), { ssr: true });
const WhyChooseWithTestimonials = dynamic(() => import('./components/WhyChooseWithTestimonials'), { ssr: true });
const LightFAQExact = dynamic(() => import('./components/LightFAQExact'), { ssr: true });
const LightContactSection = dynamic(() => import('@/components/homepage-light/LightContactSection'), { ssr: true });
const CurtainSlider = dynamic(() => import('./components/CurtainSlider/CurtainSlider'), { ssr: true });
const ReverseStickyScroll = dynamic(() => import('./components/ReverseStickyScroll/ReverseStickyScroll').then((mod) => mod.ReverseStickyScroll), { ssr: true });
const MicrosoftAiBentoGrid = dynamic(() => import('./components/MicrosoftAiBentoGrid').then((mod) => mod.MicrosoftAiBentoGrid), { ssr: true });
const WhoWeHelp = dynamic(() => import('./components/WhoWeHelp').then((mod) => mod.WhoWeHelp), { ssr: true });
const NetworkGlobe = dynamic(() => import('./components/NetworkGlobe'), { ssr: true });
const AiTransformationStepWipe = dynamic(() => import('./components/StepWipe').then((mod) => mod.AiTransformationStepWipe), { ssr: true });
import DetailDrawer from './components/AiTechnologyStack';
import PhotoStackGallery from './components/PhotoStackGallery';
export const metadata: Metadata = {
  title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
  description: 'Extend your delivery capacity with Softree\'s offshore AI development team for custom AI, Generative AI, AI agents, RAG, automation, and enterprise integrations.',
  keywords: [
    'AI Development Services',
    'Custom AI Development',
    'Offshore AI Development',
    'AI Development Partner',
    'AI Delivery Partner',
    'AI Solutions',
    'AI Application Development',
    'AI Software Development',
    'Generative AI Development',
    'AI Agent Development',
    'RAG Development',
    'AI Integration Services',
    'White-Label AI Development',
    'AI Engineering Services',
    'Offshore AI Team',
    'Dedicated AI Development Team',
    'AI Implementation Services',
    'LLM Application Development',
    'Generative AI Solutions',
    'AI Automation',
    'Intelligent Automation',
    'AI Workflow Automation',
    'Azure AI Development',
    'Microsoft AI Solutions'
  ],
  alternates: {
    canonical: 'https://www.softreetechnology.com/ai-development-services',
  },
  openGraph: {
    title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
    description: 'Scale your AI delivery with Softree\'s offshore engineering team for custom AI, Generative AI, AI agents, RAG, automation, and production-ready AI integrations.',
    url: 'https://www.softreetechnology.com/ai-development-services',
    siteName: 'Softree Technology',
    images: [
      {
        url: '/logo/Softree-Technology-Final-Logo-Dark-BG.png',
        width: 1200,
        height: 630,
        alt: 'Softree Technology Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Development Services | Offshore AI Delivery Partner | Softree',
    description: 'Scale your AI delivery with Softree\'s offshore engineering team for custom AI, Generative AI, AI agents, RAG, automation, and production-ready AI integrations.',
    images: ['/logo/Softree-Technology-Final-Logo-Dark-BG.png'],
  },
};

export default function AiDevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-500 selection:text-white overflow-x-clip">
      <NavigationClient />
      <WovenLightHero />

      {/* Reverse Sticky Scroll Overall Header */}
      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-10 text-center">
        <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
          <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
            OFFSHORE AI DELIVERY
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
          Accelerating Your <span className="text-[#FF6B2C]">AI Evolution</span>
        </h2>

        <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Build, deploy, and scale production-grade Agentic systems and custom GenAI pipelines with our vetted offshore engineering teams.
        </p>
      </div>

      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto mt-8">
        <ReverseStickyScroll />
      </div>

      {/* Who We Help & Global Network Section */}
      <div className="bg-white mt-20 md:mt-32 py-16 md:py-24 text-slate-900">
        <div className="max-w-[88vw] lg:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Unified Centered Header */}
          <div className="flex flex-col items-center w-full mb-16 md:mb-20 text-center">
            <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
              <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
                PARTNERSHIP & GLOBAL REACH
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Who We Help & <span className="text-[#FF6B2C]">Where We Operate</span>
            </h2>

            <p className="text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We embed dedicated offshore AI engineering teams to help tech-driven organizations accelerate their roadmaps, build custom agents, and deploy secure vector search engines globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Who We Help */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <WhoWeHelp />
            </div>
            {/* Right Column: Global Presence (NetworkGlobe) */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[550px] lg:max-w-[600px]">
                <NetworkGlobe />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* AI Transformation StepWipe Showcase */}
      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <div className="flex flex-col items-start w-full mb-10 text-left">
          <div className="shadow-[inset_2px_2px_5px_#e4e4e7,inset_-2px_-2px_5px_#ffffff] bg-zinc-50/50 px-4 py-1.5 rounded-full border border-white/60 mb-4 inline-block">
            <span className="text-[11px] font-bold text-[#FF6B2C] tracking-widest uppercase">
              AI INNOVATION & ENGINEERING
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight max-w-4xl">
            End-to-End AI Services for <span className="text-[#FF6B2C]">Intelligent Business Transformation</span>
          </h2>

          <p className="text-[15px] lg:text-base text-slate-500 max-w-3xl leading-relaxed">
            From AI strategy and consulting to development, integration, and deployment, we deliver end-to-end AI solutions built around your business goals.
          </p>
        </div>

        <AiTransformationStepWipe />
      </div>

      {/* 
      <TrustedBrandsMarquee /> */}
      {/* <AIPhilosophy />
      <SuccessStories /> */}
      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="relative w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <DetailDrawer
            heroImage="/images/imgweb/1.png"
            heroImageAlt="Premium B2B SaaS neural network architecture diagram representing Softree's AI stack"
            heroHeadline="Our B2B AI Tech Stack"
            panelTitle="Architecting Scalable AI Systems"
            blocks={[
              {
                type: 'text',
                as: 'h3',
                content: '1. Models & Frameworks',
              },
              {
                type: 'text',
                content: 'We orchestrate domain-optimized foundation models using Azure OpenAI, PyTorch, LangChain, and LangGraph to build resilient agent networks.',
              },
              {
                type: 'text',
                as: 'h3',
                content: '2. Vector Search & Processing',
              },
              {
                type: 'text',
                content: 'Our systems implement hybrid semantic search powered by Pinecone database nodes, LlamaIndex, and Azure AI Search for high-fidelity retrieval.',
              },
              {
                type: 'image',
                src: '/images/mlops-pipeline.jpg',
                alt: 'AI Ingestion, Training, and MLOps Pipeline Diagram',
              },
              {
                type: 'text',
                as: 'h3',
                content: '3. Production MLOps',
              },
              {
                type: 'text',
                content: 'Vetted pipelines configured on Databricks, Docker, and Kubernetes clusters across AWS and Azure, continuously monitored via Grafana.',
              },
            ]}
          />
        </div>
      </div>

      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#C94716] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C94716] animate-pulse" />
          MICROSOFT AI ECOSYSTEM
        </div>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
          Microsoft AI Ecosystem Integrations
        </h2>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-6">
          We build, customize, and orchestrate Microsoft's full-stack AI services—orchestrating private model instances, autonomous copilots, and real-time Fabric data streams.
        </p>
        <div className="text-xs font-mono font-bold tracking-wider text-slate-400 max-w-4xl mx-auto leading-relaxed border-t border-slate-100 pt-4 mb-4">
          Azure AI &nbsp;→&nbsp; Azure OpenAI &nbsp;→&nbsp; Copilot &nbsp;→&nbsp; Copilot Studio &nbsp;→&nbsp; Microsoft 365 &nbsp;→&nbsp; Power Platform &nbsp;→&nbsp; Azure AI Search &nbsp;→&nbsp; Fabric
        </div>
        <div className="mt-6 w-full flex justify-center">
          <MicrosoftAiBentoGrid />
        </div>
      </div>

      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-8 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
          From Business Challenges to Intelligent Solutions
        </h2>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
          Our disciplined, engineering-first approach to analyzing process complexity, mapping bottlenecks, and building secure, production-ready AI systems.
        </p>
      </div>

      <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden border border-zinc-200 shadow-lg">
          <CurtainSlider auto={3} />
        </div>
      </div>


      {/* Interactive Photo Stack Section */}
      <div className="bg-white py-24 text-slate-900">
        <div className="max-w-[94vw] lg:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
                Inside Our AI Engineering Ecosystem
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
                We bring together the architecture, infrastructure, data engineering, and specialized AI expertise required to move enterprise AI from experimentation to production. Every engagement is designed for secure development, intelligent automation, measurable performance, and long-term scale.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-8 text-left border-t border-slate-100 pt-8">
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1">Disciplined Design</span>
                  <span className="text-[13px] text-slate-500">Scalable architectures mapped to business goals</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1">Production Ready</span>
                  <span className="text-[13px] text-slate-500">Observability, cost control, and security guardrails</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-slate-900 mb-1">Continuous Scale</span>
                  <span className="text-[13px] text-slate-500">Automated evaluation and deployment tuning</span>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-[#C94716] hover:bg-[#A83002] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C94716]"
                >
                  <span>Schedule an AI Consult</span>
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            {/* Right Photo Stack Side */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <PhotoStackGallery />
            </div>
          </div>
        </div>
      </div>

      <CoreCapabilities />
      <Industries />

      {/* <AiArchitectureShowcase /> */}
      {/* <DigitalEngineeringSolutions /> */}
      <AiRoadmap />
      <AiReadinessBanner />
      <PartnerShowcase />
      <ClientTestimonialsShowcase />
      {/* Storytelling Flow
      <BusinessChallenges />
      <BusinessOutcomes /> */}
      {/* <AIDilemma /> */}


      <WhyChooseWithTestimonials />
      <LightFAQExact />
      <LightContactSection />
      <Footer />
    </main>
  );
}

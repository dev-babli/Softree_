"use client";

import React from "react";
import {
  Cpu,
  Database,
  Zap,
  RefreshCw,
  Wrench,
  Layers,
  Settings,
  Brain,
  Search,
  MessageSquare,
  Bot,
  FileText,
  Activity,
  Network,
  Workflow,
  Target,
  Terminal,
  Code2,
  Server,
  Cloud,
  Boxes,
  Sparkles,
  Layers3,
} from "lucide-react";

// Real tech logos
const AwsCloudLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
  </svg>
);

const PythonLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
  </svg>
);

const FastApiLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896"/>
  </svg>
);

const ReactLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
  </svg>
);

const NextJsLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
  </svg>
);

const TypeScriptLogo = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
  </svg>
);

const BedrockLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG with floating animation
const IsometricBlocksLogo = () => (
  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center">
    <style>{`
      @keyframes floatTop {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-7px); }
      }
      @keyframes floatMiddle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3.5px); }
      }
      @keyframes pedestalGlow {
        0%, 100% { opacity: 0.45; stroke-width: 1.5px; }
        50% { opacity: 0.85; stroke-width: 2.2px; }
      }
      .animate-float-top {
        animation: floatTop 3s ease-in-out infinite;
      }
      .animate-float-middle {
        animation: floatMiddle 3.5s ease-in-out infinite;
      }
      .animate-pedestal-glow {
        animation: pedestalGlow 2.5s ease-in-out infinite;
      }
    `}</style>
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_0_24px_rgba(255,88,18,0.35)]"
    >
      <ellipse
        cx="60"
        cy="102"
        rx="48"
        ry="14"
        fill="none"
        stroke="#FF5812"
        className="animate-pedestal-glow"
        strokeDasharray="3 3"
      />
      <ellipse
        cx="60"
        cy="102"
        rx="38"
        ry="10"
        fill="rgba(255,88,18,0.06)"
        stroke="#FF5812"
        strokeWidth="2"
      />
      <ellipse
        cx="60"
        cy="102"
        rx="26"
        ry="7"
        fill="none"
        stroke="#FF5812"
        strokeWidth="1"
        opacity="0.5"
      />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF5812" strokeWidth="1" />

      {/* Layer 1 bottom cubes */}
      <g>
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />

        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 2 middle cube */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1e293b" stroke="#FF5812" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#0f172a" stroke="#FF5812" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#020617" stroke="#FF5812" strokeWidth="1" />
      </g>

      {/* Layer 3 top cube */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#ff5812" stroke="#FF8542" strokeWidth="1.2" opacity="0.9" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#e04707" stroke="#FF8542" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#b93800" stroke="#FF8542" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

export default function HowWeBuildIt() {
  // 5 Technology Stack Categories as requested
  const stackCategories = [
    {
      category: "STACK 01",
      title: "AI & CLOUD",
      items: [
        { name: "Amazon Bedrock", icon: <BedrockLogo className="w-4 h-4 text-[#FF5812]" /> },
        { name: "Amazon Nova 2 Sonic", icon: <Brain className="w-4 h-4 text-orange-600" /> },
        { name: "AWS Cloud", icon: <AwsCloudLogo className="w-4 h-4 text-slate-700" /> },
      ],
    },
    {
      category: "STACK 02",
      title: "GENERATIVE AI & VOICE AI ENGINEERING",
      items: [
        { name: "RAG", icon: <Database className="w-4 h-4 text-orange-500" /> },
        { name: "LLMs", icon: <Brain className="w-4 h-4 text-orange-600" /> },
        { name: "AI Agents", icon: <Bot className="w-4 h-4 text-slate-800" /> },
        { name: "Prompt Engineering", icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
        { name: "Conversational AI", icon: <MessageSquare className="w-4 h-4 text-orange-500" /> },
      ],
    },
    {
      category: "STACK 03",
      title: "BACKEND DEVELOPMENT",
      items: [
        { name: "Python", icon: <PythonLogo className="w-4 h-4 text-[#3776AB]" /> },
        { name: "FastAPI", icon: <FastApiLogo className="w-4 h-4 text-[#009688]" /> },
        { name: "REST APIs", icon: <Network className="w-4 h-4 text-orange-600" /> },
        { name: "WebSockets", icon: <RefreshCw className="w-4 h-4 text-slate-700" /> },
      ],
    },
    {
      category: "STACK 04",
      title: "FRONTEND DEVELOPMENT",
      items: [
        { name: "React", icon: <ReactLogo className="w-4 h-4 text-[#61DAFB]" /> },
        { name: "Next.js", icon: <NextJsLogo className="w-4 h-4 text-slate-900" /> },
        { name: "TypeScript", icon: <TypeScriptLogo className="w-4 h-4 text-[#3178C6]" /> },
      ],
    },
    {
      category: "STACK 05",
      title: "DATA & KNOWLEDGE SYSTEMS",
      items: [
        { name: "Vector Databases", icon: <Boxes className="w-4 h-4 text-purple-600" /> },
        { name: "Knowledge Bases", icon: <Search className="w-4 h-4 text-orange-600" /> },
        { name: "Enterprise Databases", icon: <Server className="w-4 h-4 text-slate-700" /> },
      ],
    },
  ];

  const rightCapabilities = [
    {
      title: "REAL-TIME VOICE AI",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <MessageSquare className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Sub-200ms speech-to-speech with natural turn-taking & barge-in.",
    },
    {
      title: "AI AGENTS & TOOL CALLING",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Wrench className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Connect voice AI directly to APIs, CRM, ERP, and operational tools.",
    },
    {
      title: "ENTERPRISE RAG SYSTEMS",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Database className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Ground voice dialogues in enterprise knowledge bases & vector stores.",
    },
    {
      title: "AGENTIC WORKFLOWS",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Workflow className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Multi-tool reasoning, autonomous execution, and error recovery.",
    },
    {
      title: "ENTERPRISE INTEGRATION",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Network className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Secure mTLS, role-based access, and enterprise compliance.",
    },
  ];

  const bottomStackSummary = [
    { title: "AI ENGINE", value: "Amazon Nova 2 Sonic", icon: <Brain className="w-4 h-4 text-[#FF5812]" /> },
    { title: "CLOUD & LLM", value: "Amazon Bedrock · AWS", icon: <Cloud className="w-4 h-4 text-[#FF5812]" /> },
    { title: "BACKEND", value: "Python · FastAPI · REST", icon: <Zap className="w-4 h-4 text-[#FF5812]" /> },
    { title: "FRONTEND", value: "React · Next.js · TS", icon: <Cpu className="w-4 h-4 text-[#FF5812]" /> },
    { title: "KNOWLEDGE", value: "Vector DBs · RAG", icon: <Database className="w-4 h-4 text-[#FF5812]" /> },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-10 md:py-14 z-10 relative font-sans flex flex-col gap-6 sm:gap-10">
      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 text-[#FF5812] typo-caption mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          HOW WE BUILD IT · TECHNOLOGY STACK
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-3 sm:mb-4">
          Amazon Nova 2 Sonic Technology Stack for Voice AI Development
        </h2>
        <p className="typo-description text-slate-600 max-w-3xl text-center">
          Softree combines Amazon Nova 2 Sonic, Amazon Bedrock, generative AI, RAG, AI agents,
          modern backend technologies, and scalable data platforms to build production-ready voice
          AI applications.
        </p>

      </div>

      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[580px] flex items-center text-slate-900 w-full">
        {/* Subtle radial reflections */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,88,18,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,88,18,0.04),transparent_45%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full relative z-10">
          {/* Left Column: Heading, Isometric Stack */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:h-full z-10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] typo-caption font-mono mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                  VOICE AI ECOSYSTEM
                </div>
                <h3 className="typo-heading-4 tracking-wider text-slate-900 uppercase leading-[1.1] mb-1">
                  VOICE AI
                  <br />
                  STACK
                </h3>
                <p className="typo-caption-meta font-bold text-orange-600">
                  NOVA 2 SONIC · BEDROCK · AGENTS
                </p>
              </div>

              {/* 3D Stack illustration */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>

              <div className="typo-caption-meta font-mono text-slate-500 text-center border-t border-slate-200/80 pt-3">
                Full-Stack Voice AI Engineering
              </div>
            </div>
          </div>

          {/* Center-Right Columns: 5 Layers Stack + Glowing Core + 5 Capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
            
            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden xl:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 500" fill="none" preserveAspectRatio="none">
                {/* Left Branches */}
                <path d="M 450 50 L 465 50 L 475 210" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 50 L 465 50 L 475 210" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 150 L 465 150 L 475 230" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 150 L 465 150 L 475 230" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 250 L 475 250" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 250 L 475 250" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 350 L 465 350 L 475 270" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 350 L 465 350 L 475 270" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 450 450 L 465 450 L 475 290" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 450 L 465 450 L 475 290" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches */}
                <path d="M 575 210 L 585 50 L 600 50" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 210 L 585 50 L 600 50" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 230 L 585 150 L 600 150" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 230 L 585 150 L 600 150" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 250 L 600 250" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 250 L 600 250" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 270 L 585 350 L 600 350" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 270 L 585 350 L 600 350" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                <path d="M 575 290 L 585 450 L 600 450" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 290 L 585 450 L 600 450" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 50 L 465 50 L 475 210" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 150 L 465 150 L 475 230" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 250 L 475 250" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 350 L 465 350 L 475 270" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.3s" repeatCount="indefinite" path="M 450 450 L 465 450 L 475 290" /></circle>

                {/* Right Dot Animations */}
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 210 L 585 50 L 600 50" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 230 L 585 150 L 600 150" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 250 L 600 250" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.0s" repeatCount="indefinite" path="M 575 270 L 585 350 L 600 350" /></circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1"><animateMotion dur="2.3s" repeatCount="indefinite" path="M 575 290 L 585 450 L 600 450" /></circle>
              </svg>
            </div>

            {/* Col A (5 Stack Layers) */}
            <div className="xl:col-span-6 flex flex-col justify-between gap-2.5 xl:gap-2 py-1 h-auto xl:h-full xl:min-h-[580px] relative z-10">
              {stackCategories.map((cat, idx) => (
                <div
                  key={cat.category}
                  className="relative p-2.5 sm:p-3 rounded-[12px] border border-orange-500/20 bg-white hover:border-[#FF5812]/50 hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  <div className="w-full sm:w-[130px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1 sm:pb-0 border-b sm:border-b-0 border-orange-500/15">
                    <div>
                      <span className="typo-caption-meta font-black text-orange-600 block mb-0.5">
                        {cat.category}
                      </span>
                      <span className="typo-caption font-black text-slate-900 tracking-tight uppercase leading-tight block">
                        {cat.title}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block w-[1px] h-8 bg-orange-500/20 self-center shrink-0" />

                  {/* Pills row */}
                  <div className="flex flex-wrap gap-1.5 flex-1 items-center">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-200/80 hover:bg-orange-50/60 hover:border-orange-200 transition-colors typo-caption-meta font-semibold text-slate-700"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Col B: Central Glowing Core */}
            <div className="xl:col-span-2 flex items-center justify-center relative z-10 py-8 xl:py-0">
              <div className="relative flex items-center justify-center w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]">
                {/* Rotating orbital rings */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="rgba(255,88,18,0.15)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="1 3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="rgba(255,88,18,0.25)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 8"
                  />
                </svg>

                {/* Core dial */}
                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[0_0_25px_rgba(255,88,18,0.15)] flex flex-col items-center justify-center gap-0.5 z-10">
                  <Activity className="w-5 h-5 text-[#FF5812] animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest text-slate-900 text-center mt-0.5">
                    NOVA 2
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-[#FF5812] text-center mt-[-1px]">
                    SONIC
                  </span>
                  <span className="text-[7px] font-bold tracking-widest text-slate-500 select-none text-center leading-tight">
                    VOICE AI
                  </span>
                </div>
              </div>
            </div>

            {/* Col C: 5 Capabilities indicators */}
            <div className="xl:col-span-4 flex flex-col justify-between gap-2.5 xl:gap-2 py-1 h-auto xl:h-full xl:min-h-[580px] text-left pl-0 xl:pl-2 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-4 sm:pl-5 w-full group">
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110`}
                  >
                    {cap.icon}
                  </div>
                  <div
                    className={`w-full border ${cap.borderClass} bg-white p-2 sm:p-2.5 pl-7 sm:pl-8 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.03)]`}
                  >
                    <span
                      className={`typo-caption font-black block mb-0.5 ${cap.textClass}`}
                    >
                      {cap.title}
                    </span>
                    <span className="typo-body-sm text-slate-500 leading-snug block font-medium group-hover:text-slate-700 transition-colors">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technology Stack Summary Strip */}
      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6 z-10 text-slate-900 w-full">
        <div className="flex items-center gap-3 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 pb-3 lg:pb-0 lg:pr-6 w-full lg:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-orange-500/40 text-orange-600 shadow-[0_0_10px_rgba(255,88,18,0.05)] animate-pulse">
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <span className="typo-caption font-black text-orange-600 tracking-wider uppercase select-none">
              TECH STACK
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap justify-between items-center w-full gap-4">
          {bottomStackSummary.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3 text-left group">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-orange-500/20 shadow-[0_0_8px_rgba(255,88,18,0.05)] transition-all duration-300 group-hover:scale-110 shrink-0">
                  {metric.icon}
                </div>
                <div>
                  <span className="typo-caption font-black text-slate-900 block tracking-tight uppercase leading-none mb-0.5">
                    {metric.title}
                  </span>
                  <span className="typo-body-sm text-slate-500 font-semibold block leading-none">
                    {metric.value}
                  </span>
                </div>
              </div>
              {idx < bottomStackSummary.length - 1 && (
                <div className="hidden lg:block w-[1px] h-6 bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

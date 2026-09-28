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

// Cloud and AI vector logos
const AwsCloudLogo = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.5 13.5C5.1 13.5 4 12.4 4 11C4 9.8 4.8 8.7 6 8.5C6.4 6.5 8.2 5 10.5 5C12.4 5 14 6.1 14.7 7.7C15.2 7.3 15.8 7 16.5 7C18.4 7 20 8.6 20 10.5C20 12.4 18.4 14 16.5 14H6.5V13.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 18C10.5 20.5 16 20 19 17.5"
      stroke="#FF5812"
      strokeWidth="2"
      strokeLinecap="round"
    />
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

// Real Tech Icons
const OldPowerBiIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-patterns/power-bi.svg" alt="Power BI" className={className} />
);

const AzureIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" alt="Azure" className={className} />
);

const SparkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg" alt="Apache Spark" className={className} />
);

const DynamicsIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://raw.githubusercontent.com/benc-uk/icon-collection/master/logos/dynamics.svg" alt="Dynamics 365" className={className} />
);

const SynapseIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Azure-Synapse-Analytics.svg" alt="Synapse" className={className} />
);

const PurviewIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <Search className={className + " text-blue-600"} />
);

const DataFactoryIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <img src="https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-icons/Data-Factory.svg" alt="Data Factory" className={className} />
);


const ExcelIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#21A366"/><path d="M14 2v6h6" fill="#107C41"/><path d="M10 12l2.5 3.5L10 19h2.5l1.25-2.25L15 19h2.5l-2.5-3.5L17.5 12H15l-1.25 2.25L12.5 12H10z" fill="#ffffff"/></svg>
);

const SqlServerIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <Database className={className + " text-red-600"} />
);

const SharePointIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg"><path fill="#0078D4" d="M14.654 13.916c-.365.174-.757.306-1.157.387-.513.104-.844-.066-1.134-.337-.181-.17-.384-.334-.582-.493-.195-.157-.384-.251-.628-.182-.294.083-.43.328-.532.583-.166.417-.348.828-.535 1.238-.175.385-.436.568-.863.633a2.915 2.915 0 0 1-1.002-.03c-.22-.047-.367-.184-.447-.4-.112-.3-.217-.604-.325-.905-.098-.276-.192-.553-.298-.828-.063-.162-.16-.328-.328-.396-.153-.06-.319-.011-.476.012-.416.064-.83.136-1.247.19a.63.63 0 0 1-.689-.356A21.576 21.576 0 0 1 3.513 11a21.417 21.417 0 0 1 .897-2.343c.125-.262.338-.415.632-.38.406.049.815.086 1.222.146.195.029.35.158.423.342.203.511.418 1.018.636 1.524.08.188.196.257.394.205.215-.058.435-.1.65-.16a.434.434 0 0 0 .317-.468c-.02-.857-.045-1.714-.078-2.57-.01-.263.15-.494.4-.608a2.915 2.915 0 0 1 1.054-.265c.328-.02.58.125.688.435.112.317.22.637.319.957.094.3.178.604.264.908.064.225.195.342.423.364.226.022.453.036.678.066.305.04.53-.082.722-.31a9.237 9.237 0 0 1 1.34-1.282c.427-.323 1.066-.35 1.488.132.338.386.416.892.205 1.378-.291.67-.655 1.306-1.042 1.931-.17.275-.38.528-.592.81zm-9.3-8.813a1.996 1.996 0 0 0-1.24-.76A1.979 1.979 0 0 0 2.147 5c-.752.662-1.026 1.571-.828 2.535a1.942 1.942 0 0 0 1.564 1.523 2.015 2.015 0 0 0 2.213-.919c.477-.739.516-1.57.108-2.332a2.03 2.03 0 0 0-.85-.704zm13.111.902c-.89-.001-1.611.724-1.611 1.613a1.611 1.611 0 0 0 1.612 1.61c.889.002 1.611-.72 1.611-1.61a1.613 1.613 0 0 0-1.612-1.613zM6.924.999a2.008 2.008 0 0 0-2.048 1.956c-.035 1.134.887 2.062 2.023 2.036a2.006 2.006 0 0 0 1.94-2.07c-.015-1.065-.873-1.935-1.915-1.922z"/></svg>
);

const PowerAutomateIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg"><path fill="#0066FF" d="M12.036 0v7.653c0 2.246 1.838 4.084 4.084 4.084h7.828c.034-.145.052-.294.052-.446V3.638C24 1.624 22.376 0 20.362 0h-8.326zM0 12.753v7.609C0 22.376 1.624 24 3.638 24h7.94c.08 0 .16-.002.24-.007v-7.295c0-2.256-1.839-4.095-4.095-4.095H0v.15z"/></svg>
);

const FabricIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg"><path fill="#5C2D91" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7.5 3.7-7.5 3.8-7.5-3.8L12 4.8zM4 9.6l7 3.5v7.1l-7-3.6V9.6zm9 10.6v-7.1l7-3.5v7.1l-7 3.5z"/></svg>
);

const AzureDataLakeIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <Database className={className + " text-teal-500"} />
);

const PowerBiIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} width="100%" height="100%"><path fill="#EDBD11" d="M21.17 18.549h-.485v-.968h.485a1.865 1.865 0 001.862-1.862V5.83a1.865 1.865 0 00-1.862-1.862H2.831A1.865 1.865 0 00.968 5.83v9.888c0 1.026.836 1.862 1.863 1.862h.484v.968h-.484A2.832 2.832 0 010 15.719V5.83C0 4.27 1.27 3 2.831 3H21.17C22.731 3 24 4.27 24 5.83v9.888a2.833 2.833 0 01-2.83 2.831M5.804 20.964c.725 0 1.314-.588 1.314-1.314l-.001-3.029a1.314 1.314 0 10-2.628.001l.001 3.028a1.314 1.314 0 001.314 1.314m4.131 0c.725 0 1.314-.588 1.314-1.314l-.001-7.775a1.313 1.313 0 10-2.628 0l.001 7.775c0 .726.589 1.314 1.314 1.314m8.262-.038c.725 0 1.314-.588 1.314-1.314L19.51 8.601a1.314 1.314 0 00-2.628 0l.001 11.012a1.315 1.315 0 001.314 1.313m-4.13.038c.725 0 1.314-.588 1.314-1.314l-.001-5.775a1.314 1.314 0 00-2.628 0l.001 5.775c0 .726.588 1.314 1.314 1.314"/></svg>
);

const AzureSqlIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <Database className={className + " text-blue-600"} />
);

export default function FabricTechnologyStack() {

  // 5 Technology Stack Categories as requested
  const stackCategories = [
    {
      category: "STACK 01",
      title: "DATA CONNECTIVITY",
      items: [
        { name: "Excel", icon: <ExcelIcon className="w-4 h-4 shrink-0" /> },
        { name: "SQL Server", icon: <SqlServerIcon className="w-4 h-4 shrink-0" /> },
        { name: "SharePoint", icon: <SharePointIcon className="w-4 h-4 shrink-0" /> },
        { name: "APIs", icon: <Network className="w-4 h-4 text-blue-500" /> },
        { name: "Cloud Platforms", icon: <Cloud className="w-4 h-4 text-blue-400" /> },
      ],
    },
    {
      category: "STACK 02",
      title: "DATA TRANSFORMATION",
      items: [
        { name: "Power Query", icon: <RefreshCw className="w-4 h-4 text-orange-500" /> },
        { name: "Dataflows", icon: <Workflow className="w-4 h-4 text-blue-500" /> },
        { name: "Data Preparation", icon: <Settings className="w-4 h-4 text-gray-500" /> },
        { name: "Data Modeling", icon: <Database className="w-4 h-4 text-purple-500" /> },
      ],
    },
    {
      category: "STACK 03",
      title: "POWER BI ANALYTICS",
      items: [
        { name: "Power BI Desktop", icon: <PowerBiIcon className="w-4 h-4 shrink-0" /> },
        { name: "Power BI Service", icon: <PowerBiIcon className="w-4 h-4 shrink-0" /> },
        { name: "DAX", icon: <Code2 className="w-4 h-4 text-slate-700" /> },
        { name: "Paginated Reports", icon: <FileText className="w-4 h-4 text-slate-600" /> },
        { name: "Custom Visuals", icon: <Sparkles className="w-4 h-4 text-pink-500" /> },
      ],
    },
    {
      category: "STACK 04",
      title: "MICROSOFT DATA PLATFORM",
      items: [
        { name: "Microsoft Fabric", icon: <FabricIcon className="w-4 h-4 shrink-0" /> },
        { name: "OneLake", icon: <Database className="w-4 h-4 text-orange-500" /> },
        { name: "Azure Synapse", icon: <SynapseIcon className="w-4 h-4 shrink-0" /> },
        { name: "Azure SQL", icon: <AzureSqlIcon className="w-4 h-4 shrink-0" /> },
        { name: "Azure Data Lake", icon: <AzureDataLakeIcon className="w-4 h-4 shrink-0" /> },
      ],
    },
    {
      category: "STACK 05",
      title: "GOVERNANCE, AUTOMATION & OPTIMIZATION",
      items: [
        { name: "Row-Level Security", icon: <Search className="w-4 h-4 text-slate-700" /> },
        { name: "Power Automate", icon: <PowerAutomateIcon className="w-4 h-4 shrink-0" /> },
        { name: "Scheduled Refresh", icon: <RefreshCw className="w-4 h-4 text-green-500" /> },
        { name: "Gateway", icon: <Network className="w-4 h-4 text-slate-600" /> },
        { name: "Performance Analyzer", icon: <Activity className="w-4 h-4 text-red-500" /> },
      ],
    },
  ];

  const rightCapabilities = [
    {
      title: "DATA INTEGRATION",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Network className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Integrate APIs, databases, and cloud sources for unified Power BI reporting.",
    },
    {
      title: "DATA MODELING",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Database className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Clean and structure data with Power Query for accurate, high-performance analytics.",
    },
    {
      title: "POWER BI DEVELOPMENT",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Activity className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Build interactive dashboards and custom DAX measures tailored to your business needs.",
    },
    {
      title: "FABRIC & AZURE INTEGRATION",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Cloud className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Natively extend Power BI with Microsoft Fabric to build scalable enterprise analytics.",
    },
    {
      title: "SECURE & OPTIMIZED ANALYTICS",
      borderClass: "border-[#FF5812]/30",
      textClass: "text-[#FF5812]",
      glowClass: "shadow-[0_0_15px_rgba(255,88,18,0.2)]",
      hoverBorder: "group-hover:border-[#FF5812]/60",
      icon: <Search className="w-5 h-5 text-[#FF5812]" strokeWidth={2} />,
      desc: "Secure Power BI with role-based access and governance while optimizing performance.",
    },
  ];

    const bottomStackSummary = [
    { title: "Data", value: "Excel · SharePoint", suffix: "", icon: <Database className="w-4 h-4 text-[#FF5812]" /> },
    { title: "Transformation", value: "Power Query · Dataflows", suffix: "", icon: <Workflow className="w-4 h-4 text-[#FF5812]" /> },
    { title: "Analytics", value: "Power BI · DAX", suffix: "", icon: <Activity className="w-4 h-4 text-[#FF5812]" /> },
    { title: "Microsoft", value: "Fabric · OneLake · Azure", suffix: "", icon: <Cloud className="w-4 h-4 text-[#FF5812]" /> },
    { title: "Governance", value: "Power Automate", suffix: "", icon: <Settings className="w-4 h-4 text-[#FF5812]" /> },
  ];

  return (
    <section className="w-full max-w-[1600px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 py-10 md:py-14 z-10 relative font-sans flex flex-col gap-6 sm:gap-10">
      {/* Section Heading */}
      <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-500/20 text-[#FF5812] typo-caption mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5812] animate-pulse" />
          MICROSOFT POWER BI TECHNOLOGY
        </div>
        <h2 className="typo-heading-2 text-slate-900 mb-3 sm:mb-4">
          Power BI Technology Stack for <br className="hidden sm:inline" />
          Data & AI
        </h2>
        <p className="typo-description text-slate-600 max-w-3xl text-center">
          Build modern Power BI analytics on a unified Microsoft data foundation. We use Microsoft Fabric, OneLake, data integration, semantic models, Power BI, Azure, and AI capabilities to deliver scalable business intelligence solutions.
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
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,88,18,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:min-h-[500px] z-10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] typo-caption font-mono mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                  DATA & AI ECOSYSTEM
                </div>
                <h3 className="typo-heading-4 tracking-wider text-slate-900 uppercase leading-[1.1] mb-1">
                  MICROSOFT
                  <br />
                  POWER BI
                </h3>
                <p className="typo-caption-meta font-bold text-orange-600">
                  EXCEL · SQL SERVER · AZURE
                </p>
              </div>

              {/* 3D Stack illustration */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>

              <div className="typo-caption-meta font-mono text-slate-500 text-center border-t border-slate-200/80 pt-3">
                Enterprise Data Architecture
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
            <div className="xl:col-span-6 flex flex-col justify-between gap-3 xl:gap-4 py-1 h-auto xl:min-h-[500px] relative z-10">
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
                  <img src="https://raw.githubusercontent.com/benc-uk/icon-collection/master/azure-patterns/power-bi.svg" alt="Power BI" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm mb-1" />
                  <span className="text-[10px] font-black tracking-widest text-slate-900 text-center mt-0.5">
                    MICROSOFT
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-[#FF5812] text-center mt-[-1px]">
                    POWER BI
                  </span>
                  <span className="text-[7px] font-bold tracking-widest text-slate-500 select-none text-center leading-tight">
                    DATA PLATFORM
                  </span>
                </div>
              </div>
            </div>

            {/* Col C: 5 Capabilities indicators */}
            <div className="xl:col-span-4 flex flex-col justify-between gap-3 xl:gap-4 py-1 h-auto xl:min-h-[500px] text-left pl-0 xl:pl-2 relative z-10">
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

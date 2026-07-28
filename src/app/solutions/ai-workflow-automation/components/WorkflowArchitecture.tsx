"use client";

import React from "react";
import Image from "next/image";

export const WorkflowArchitecture = () => {
  return (
    <section className="relative w-full py-24 bg-[#FAFAFA] font-sans overflow-hidden">
      {/* Background Dotted Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#FF5812 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          maskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 30%, black 100%)',
        }}
      />
      {/* Background Concentric Circles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]">
        <div className="w-[800px] h-[800px] rounded-full border border-[#FF5812] absolute" />
        <div className="w-[1200px] h-[1200px] rounded-full border border-[#FF5812] absolute" />
        <div className="w-[1600px] h-[1600px] rounded-full border border-[#FF5812] absolute" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[46px] font-bold text-[#111827] tracking-tight mb-4">
            AI Workflow Automation <span className="text-[#FF5812]">Architecture</span>
          </h2>
          <p className="text-[#4B5563] text-[17px] max-w-3xl mx-auto leading-relaxed">
            An intelligent, secure, and scalable architecture that connects AI capabilities with your business systems
            to automate workflows, drive decisions, and deliver real business impact.
          </p>
        </div>

        {/* Diagram Container */}
        <div className="relative w-full flex flex-col items-center pt-8 pb-12">
          
          {/* =======================
              SVG CONNECTION LINES 
              ======================= */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-full pointer-events-none z-0 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central vertical drop 1 (Trigger to Decision) */}
              <line x1="50%" y1="105" x2="50%" y2="155" stroke="#FF5812" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
              <circle cx="50%" cy="130" r="3.5" fill="#FF5812" filter="url(#glow)" />

              {/* Central vertical drop 2 (Decision to Middle Capabilities) */}
              <line x1="50%" y1="265" x2="50%" y2="335" stroke="#FF5812" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
              <circle cx="50%" cy="300" r="3.5" fill="#FF5812" filter="url(#glow)" />

              {/* Central vertical drop 3 (Middle Capabilities to Target Systems) */}
              <line x1="50%" y1="465" x2="50%" y2="525" stroke="#FF5812" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
              <circle cx="50%" cy="495" r="3.5" fill="#FF5812" filter="url(#glow)" />

              {/* Side Line Left: Moving Dashed Orange Line */}
              <path d="M 31% 82 L 15% 82 Q 5% 82 5% 150 L 5% 510 Q 5% 550 12.5% 550" fill="none" stroke="#FF5812" strokeWidth="1.5" className="animated-dash-left" opacity="0.9" />
              <polygon points="12.5%,547 14%,550 12.5%,553" fill="#FF5812" />
              
              {/* Dotted Chevron Left */}
              <path d="M 29% 77 L 27% 82 L 29% 87 M 27.5% 77 L 25.5% 82 L 27.5% 87 M 26% 77 L 24% 82 L 26% 87" fill="none" stroke="#FF5812" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />

              {/* Side Line Right: Moving Dashed Orange Line */}
              <path d="M 69% 82 L 85% 82 Q 95% 82 95% 150 L 95% 510 Q 95% 550 87.5% 550" fill="none" stroke="#FF5812" strokeWidth="1.5" className="animated-dash-right" opacity="0.9" />
              <polygon points="87.5%,547 86%,550 87.5%,553" fill="#FF5812" />
              
              {/* Dotted Chevron Right */}
              <path d="M 71% 77 L 73% 82 L 71% 87 M 72.5% 77 L 74.5% 82 L 72.5% 87 M 74% 77 L 76% 82 L 74% 87" fill="none" stroke="#FF5812" strokeWidth="1.5" strokeDasharray="1 3" strokeLinecap="round" />

              {/* Horizontal line dropping into Level 4 Items (Restricted to CRM -> APIs) */}
              <line x1="26%" y1="525" x2="74%" y2="525" stroke="#FF5812" strokeWidth="1" strokeOpacity="0.6" />
              {[26, 38, 50, 62, 74].map((x, i) => (
                <g key={i}>
                  <line x1={`${x}%`} y1="525" x2={`${x}%`} y2="550" stroke="#FF5812" strokeWidth="1" strokeOpacity="0.6" />
                  <circle cx={`${x}%`} cy="525" r="2.5" fill="#FF5812" opacity="0.8" />
                </g>
              ))}
            </svg>
          </div>

          {/* =======================
              LEVEL 1: Business Trigger
              ======================= */}
          <div className="relative z-10 w-full max-w-[420px] rounded-full p-[2px] bg-gradient-to-b from-[#FFF2ED] to-white shadow-[0_4px_30px_rgba(255,88,18,0.15)] mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-full flex items-center p-2.5 pr-6 border border-white relative overflow-hidden h-[100px]">
              <div className="w-[70px] h-[70px] bg-gradient-to-tr from-[#FFF0E8] to-[#FFF9F6] border border-[#FFE4D6] rounded-full flex items-center justify-center flex-shrink-0 shadow-[inset_0_2px_10px_rgba(255,88,18,0.05)] mx-3 relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5812" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center relative z-10">
                <h3 className="font-bold text-[17px] text-[#1F2937] leading-tight mb-1">Business Trigger</h3>
                <p className="text-[13px] text-[#6B7280] leading-snug">Event or action initiates the workflow</p>
              </div>
            </div>
          </div>

          {/* =======================
              LEVEL 2: AI Decision Engine
              ======================= */}
          <div className="relative z-10 w-full max-w-[480px] rounded-full p-[2px] bg-gradient-to-b from-[#FFF2ED] to-white shadow-[0_4px_30px_rgba(255,88,18,0.15)] mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-full flex items-center p-2.5 pr-8 border border-white relative overflow-hidden h-[105px]">
              
              {/* Circuit background left */}
              <svg className="absolute left-0 top-0 h-full opacity-20 pointer-events-none" width="120" viewBox="0 0 120 100" fill="none">
                <path d="M0 30h40l20 20h20" stroke="#FF5812" strokeWidth="1"/>
                <path d="M0 70h30l15-15h25" stroke="#FF5812" strokeWidth="1"/>
                <circle cx="80" cy="50" r="3" fill="#FF5812"/>
                <circle cx="70" cy="55" r="3" fill="#FF5812"/>
              </svg>
              {/* Dots background right */}
              <svg className="absolute right-0 top-0 h-full opacity-[0.15] pointer-events-none" width="100" viewBox="0 0 100 100" fill="none">
                <circle cx="70" cy="30" r="1.5" fill="#FF5812"/>
                <circle cx="85" cy="45" r="2.5" fill="#FF5812"/>
                <circle cx="75" cy="70" r="2" fill="#FF5812"/>
                <circle cx="60" cy="50" r="3" fill="#FF5812"/>
                <circle cx="90" cy="65" r="1.5" fill="#FF5812"/>
              </svg>

              <div className="w-[70px] h-[70px] bg-gradient-to-tr from-[#FFF0E8] to-[#FFF9F6] border border-[#FFE4D6] rounded-full flex items-center justify-center flex-shrink-0 shadow-[inset_0_2px_10px_rgba(255,88,18,0.05)] mx-3 relative z-10">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5812" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                  <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                  <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
                  <path d="M6.002 6.5A3 3 0 0 1 5.603 5.125"/>
                  <path d="M11.8 21a2 2 0 0 0 1.8 1.8"/>
                  <path d="M12 21a2 2 0 0 1-1.8 1.8"/>
                </svg>
              </div>
              <div className="flex flex-col justify-center relative z-10">
                <h3 className="font-bold text-[17px] text-[#1F2937] leading-tight mb-1">AI Decision Engine</h3>
                <p className="text-[12.5px] text-[#6B7280] leading-[1.4] pr-2">AI models analyze data, understand context,<br/>and make intelligent decisions</p>
              </div>
            </div>
          </div>

          {/* =======================
              LEVEL 3: Capabilities
              ======================= */}
          <div className="relative z-10 w-full max-w-[1100px] bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] p-3 mb-[70px] flex items-center justify-between">
            <CapItem 
              icon={<IconRobot />} 
              title="AI Agent" 
              desc="Intelligent agent performs tasks and interacts autonomously" 
            />
            <Divider />
            <CapItem 
              icon={<IconPowerAutomate />} 
              title="Power Automate" 
              desc="Automate workflows, approvals, and business processes" 
            />
            <Divider />
            <CapItem 
              icon={<IconBusinessRules />} 
              title="Business Rules" 
              desc="Apply policies, validations, and business logic consistently" 
            />
            <Divider />
            <CapItem 
              icon={<IconIntegrations />} 
              title="Integrations" 
              desc="Seamless integration with tools, platforms, and services" 
            />
            <Divider />
            <CapItem 
              icon={<IconNotifications />} 
              title="Notifications" 
              desc="Real-time alerts and notifications across channels" 
            />
          </div>

          {/* =======================
              LEVEL 4: Target Systems
              ======================= */}
          <div className="relative z-10 w-full max-w-[1100px] bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] px-4 py-4 flex items-center justify-between">
            <SysItem icon={<IconERP />} title="ERP" />
            <SysItem icon={<IconCRM />} title="CRM" />
            <SysItem icon={<IconM365 />} title="Microsoft 365" />
            <SysItem icon={<IconSharePoint />} title="SharePoint" />
            <SysItem icon={<IconDataverse />} title="Dataverse" />
            <SysItem icon={<IconAPIs />} title="APIs" />
            <SysItem icon={<IconDatabase />} title="Database" />
          </div>

        </div>
      </div>
    </section>
  );
};

// ==========================================
// Subcomponents
// ==========================================

const CapItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-center gap-4 px-2 w-[20%]">
    <div className="w-[52px] h-[52px] rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-shrink-0 items-center justify-center">
      {icon}
    </div>
    <div className="flex flex-col">
      <h4 className="font-bold text-[14px] text-gray-900 leading-tight mb-1">{title}</h4>
      <p className="text-[11px] text-gray-500 leading-snug">{desc}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="relative h-16 w-px bg-gradient-to-b from-transparent via-[#FFDCD0] to-transparent flex items-center justify-center flex-shrink-0">
    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5812]"></div>
  </div>
);

const SysItem = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 w-[14%]">
    <div className="w-[60px] h-[60px] rounded-full bg-white shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] border border-gray-50 flex items-center justify-center">
      {icon}
    </div>
    <span className="font-bold text-[13px] text-gray-900">{title}</span>
  </div>
);

// ==========================================
// Custom Inline SVGs
// ==========================================

const IconRobot = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-800">
    <path d="M12 8V4H8" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="4" y="8" width="16" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 14h2M20 14h2M15 13v2M9 13v2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPowerAutomate = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#0066FF">
    <path d="M19 12l-6-6-2.5 2.5 4.5 4.5H3v3h12l-4.5 4.5 2.5 2.5 6-6z" />
  </svg>
);

const IconBusinessRules = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FF5812]">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2v6h6M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconIntegrations = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FF5812]">
    <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M15.88 15.88L8.12 8.12M8.12 15.88l7.76-7.76" />
  </svg>
);

const IconNotifications = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#FF5812]">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconERP = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-900">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4M6 8h4M6 12h2" />
  </svg>
);

const IconCRM = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-900">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconM365 = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#3B82F6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const IconSharePoint = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#008080">
    <circle cx="12" cy="12" r="10" /><path d="M8 14c0 2 8 2 8-2 0-3-8-1-8-4 0-2 8-2 8 2" stroke="white" strokeWidth="2" fill="none" />
  </svg>
);

const IconDataverse = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#10B981">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const IconAPIs = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-900">
    <path d="M17 10h-2V8a5 5 0 0 0-10 0v2H3v11h14V10zM7 8a3 3 0 0 1 6 0v2H7V8zM19 14h2M19 18h2" />
  </svg>
);

const IconDatabase = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-900">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

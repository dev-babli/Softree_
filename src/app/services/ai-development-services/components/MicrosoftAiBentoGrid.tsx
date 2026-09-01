"use client";

import React from "react";
import {
  ArrowUpRight,
  Cpu,
  Layers,
  MessageSquare,
  Database,
  Search,
  Mail,
  FileText,
  Globe,
  Calendar,
  Users,
  HardDrive,
  Link,
  Zap,
  Repeat,
  Play,
  CheckSquare,
  Workflow,
  Settings,
  BarChart3,
  Activity,
  TrendingUp,
  Sparkles
} from "lucide-react";

const AzureLogo = () => (
  <svg viewBox="0 0 128 128" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="azure-original-a" x1="60.919" y1="9.602" x2="18.667" y2="134.423" gradientUnits="userSpaceOnUse">
        <stop stopColor="#114A8B"/>
        <stop offset="1" stopColor="#0669BC"/>
      </linearGradient>
      <linearGradient id="azure-original-b" x1="74.117" y1="67.772" x2="64.344" y2="71.076" gradientUnits="userSpaceOnUse">
        <stop stopOpacity=".3"/>
        <stop offset=".071" stopOpacity=".2"/>
        <stop offset=".321" stopOpacity=".1"/>
        <stop offset=".623" stopOpacity=".05"/>
        <stop offset="1" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="azure-original-c" x1="68.742" y1="5.961" x2="115.122" y2="129.525" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3CCBF4"/>
        <stop offset="1" stopColor="#2892DF"/>
      </linearGradient>
    </defs>
    <path d="M46.09.002h40.685L44.541 125.137a6.485 6.485 0 01-6.146 4.413H6.733a6.482 6.482 0 01-5.262-2.699 6.474 6.474 0 01-.876-5.848L39.944 4.414A6.488 6.488 0 0146.09 0z" fill="url(#azure-original-a)" transform="translate(.587 4.468) scale(.91904)"/>
    <path d="M97.28 81.607H37.987a2.743 2.743 0 00-1.874 4.751l38.1 35.562a5.991 5.991 0 004.087 1.61h33.574z" fill="#0078d4"/>
    <path d="M46.09.002A6.434 6.434 0 0039.93 4.5L.644 120.897a6.469 6.469 0 006.106 8.653h32.48a6.942 6.942 0 005.328-4.531l7.834-23.089 27.985 26.101a6.618 6.618 0 004.165 1.519h36.396l-15.963-45.616-46.533.011L86.922.002z" fill="url(#azure-original-b)" transform="translate(.587 4.468) scale(.91904)"/>
    <path d="M98.055 4.408A6.476 6.476 0 0091.917.002H46.575a6.478 6.478 0 016.137 4.406l39.35 116.594a6.476 6.476 0 01-6.137 8.55h45.344a6.48 6.48 0 006.136-8.55z" fill="url(#azure-original-c)" transform="translate(.587 4.468) scale(.91904)"/>
  </svg>
);

const CopilotStudioLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 23.3 512.1 465.4" className="w-6 h-6">
    <radialGradient id="a" cx="-79.674" cy="645.551" r="11.637" gradientTransform="matrix(-10.9605 -13.3892 -12.5901 10.3064 7673.291 -7504.614)" gradientUnits="userSpaceOnUse">
      <stop offset=".096" stopColor="#00aeff"/>
      <stop offset=".773" stopColor="#2253ce"/>
      <stop offset="1" stopColor="#0736c4"/>
    </radialGradient>
    <path d="M374 62c-6.7-22.9-27.8-38.7-51.7-38.7h-15.7c-26 0-48.3 18.6-53 44.2l-26.9 146.8 6.7-22.9c6.7-23 27.8-38.8 51.7-38.8h91.4l38.3 14.9 36.9-14.9H441c-23.9 0-45-15.8-51.7-38.7z" fill="url(#a)"/>
    <radialGradient id="b" cx="-20.581" cy="641.788" r="11.637" gradientTransform="matrix(9.8803 12.5737 12.1968 -9.5842 -7518.271 6768.395)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#ffb657"/>
      <stop offset=".634" stopColor="#ff5f3d"/>
      <stop offset=".923" stopColor="#c02b3c"/>
    </radialGradient>
    <path d="M143.5 449.8c6.7 23 27.8 38.9 51.8 38.9h33.4c29.2 0 53.1-23.3 53.9-52.5l3.6-141.5-7.6 26c-6.7 23-27.8 38.7-51.7 38.7h-92.2l-32.9-17.8-35.6 17.8h10.6c24 0 45.1 15.9 51.8 38.9z" fill="url(#b)"/>
    <linearGradient id="c" x1="151.476" x2="178.106" y1="452.543" y2="144.451" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
      <stop offset=".156" stopColor="#0d91e1"/>
      <stop offset=".487" stopColor="#52b471"/>
      <stop offset=".652" stopColor="#98bd42"/>
      <stop offset=".937" stopColor="#ffc800"/>
    </linearGradient>
    <path d="M320 23.3H133.4C80 23.3 48 93.7 26.7 164.2 1.4 247.7-31.6 359.4 64 359.4h80.6c24.1 0 45.2-15.9 51.8-39.1 14-49 38.6-134.5 57.9-199.6 9.8-33.1 18-61.5 30.5-79.2 7.1-9.9 18.8-18.2 35.2-18.2" fill="url(#c)"/>
    <linearGradient id="d" x1="154.129" x2="168.669" y1="491.116" y2="155.012" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#3dcbff"/>
      <stop offset=".247" stopColor="#0588f7" stopOpacity="0"/>
    </linearGradient>
    <path d="M320 23.3H133.4C80 23.3 48 93.7 26.7 164.2 1.4 247.7-31.6 359.4 64 359.4h80.6c24.1 0 45.2-15.9 51.8-39.1 14-49 38.6-134.5 57.9-199.6 9.8-33.1 18-61.5 30.5-79.2 7.1-9.9 18.8-18.2 35.2-18.2" fill="url(#d)"/>
    <radialGradient id="e" cx="-46.943" cy="664.318" r="11.637" gradientTransform="matrix(-12.6711 36.2357 43.4092 15.1796 -28974.764 -8263.428)" gradientUnits="userSpaceOnUse">
      <stop offset=".066" stopColor="#8c48ff"/>
      <stop offset=".5" stopColor="#f2598a"/>
      <stop offset=".896" stopColor="#ffb152"/>
    </radialGradient>
    <path d="M192 488.7h186.7c53.3 0 85.3-70.5 106.7-141 25.3-83.5 58.3-195.2-37.3-195.2h-80.6c-24.1 0-45.2 15.9-51.8 39.1-14 49-38.6 134.6-57.9 199.7-9.8 33.1-18 61.5-30.5 79.2-7.2 9.9-18.9 18.2-35.3 18.2" fill="url(#e)"/>
    <linearGradient id="f" x1="352.459" x2="352.268" y1="382.231" y2="290.663" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse">
      <stop offset=".058" stopColor="#f8adfa"/>
      <stop offset=".708" stopColor="#a86edd" stopOpacity="0"/>
    </linearGradient>
    <path d="M192 488.7h186.7c53.3 0 85.3-70.5 106.7-141 25.3-83.5 58.3-195.2-37.3-195.2h-80.6c-24.1 0-45.2 15.9-51.8 39.1-14 49-38.6 134.6-57.9 199.7-9.8 33.1-18 61.5-30.5 79.2-7.2 9.9-18.9 18.2-35.3 18.2" fill="url(#f)"/>
  </svg>
);

const PowerPlatformLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-5 10.4 102 77.6" className="w-6 h-6">
    <defs>
      <filter id="filter0_f">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur"/>
      </filter>
      <filter id="filter1_f">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
      </filter>
      <linearGradient id="paint0_linear" x1="43" y1="55" x2="29" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0D36A5"/>
        <stop offset="1" stopColor="#1152D4"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="46" y1="10" x2="46" y2="86" gradientUnits="userSpaceOnUse">
        <stop stopColor="#84CAFF"/>
        <stop offset="1" stopColor="#61B1FB"/>
      </linearGradient>
      <linearGradient id="paint2_linear" x1="37.5" y1="10" x2="37.5" y2="86" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B90F5"/>
        <stop offset="1" stopColor="#2A78EE"/>
      </linearGradient>
      <clipPath id="clip0">
        <rect width="96" height="96" fill="white"/>
      </clipPath>
      <clipPath id="clip1">
        <rect width="96" height="96" fill="white"/>
      </clipPath>
    </defs>
    <g clipPath="url(#clip0)">
      <g clipPath="url(#clip1)">
        <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-1" y="10" width="97" height="76">
          <path d="M61.2116 10C62.3496 10 63.4337 10.4847 64.1925 11.3328L94.6136 45.3328C95.9723 46.8514 95.9723 49.1486 94.6136 50.6672L64.1925 84.6672C63.4337 85.5153 62.3496 86 61.2116 86H3.94634C0.488777 86 -1.34012 81.9095 0.965366 79.3328L29 48L0.965366 16.6672C-1.34012 14.0905 0.488777 10 3.94634 10H61.2116Z" fill="white"/>
        </mask>
        <g mask="url(#mask0)">
          <path d="M63 10L29 48L-5 10H63Z" fill="url(#paint0_linear)"/>
          <g filter="url(#filter0_f)">
            <path d="M63 10.4L-5 86.4H63L97 48.4L63 10.4Z" fill="black" fillOpacity="0.24"/>
          </g>
          <g filter="url(#filter1_f)">
            <path d="M63 12L-5 88H63L97 50L63 12Z" fill="black" fillOpacity="0.32"/>
          </g>
          <path d="M-5 86L63 10L97 48L63 86H-5Z" fill="url(#paint1_linear)"/>
          <path d="M-5 86L63 10L80 29L29 86H-5Z" fill="url(#paint2_linear)"/>
        </g>
      </g>
    </g>
  </svg>
);

const BedrockLogo = () => (
  <svg className="w-6 h-6 rounded-md overflow-hidden" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>Amazon Bedrock</title>
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fill="#01A88D">
        <rect x="0" y="0" width="80" height="80"></rect>
      </g>
      <g transform="translate(12.000000, 12.000000)" fill="#FFFFFF">
        <path d="M52,26.9998918 C50.897,26.9998918 50,26.1028918 50,24.9998918 C50,23.8968918 50.897,22.9998918 52,22.9998918 C53.103,22.9998918 54,23.8968918 54,24.9998918 C54,26.1028918 53.103,26.9998918 52,26.9998918 L52,26.9998918 Z M20.113,53.9078918 L16.865,52.0138918 L23.53,47.8478918 L22.47,46.1518918 L14.913,50.8748918 L9,47.4258918 L9,38.5348918 L14.555,34.8318918 L13.445,33.1678918 L7.959,36.8248918 L2,33.4198918 L2,28.5798918 L8.496,24.8678918 L7.504,23.1318918 L2,26.2768918 L2,22.5798918 L8,19.1518918 L14,22.5798918 L14,26.4338918 L9.485,29.1428918 L10.515,30.8568918 L15,28.1658918 L19.485,30.8568918 L20.515,29.1428918 L16,26.4338918 L16,22.5348918 L21.555,18.8318918 C21.833,18.6458918 22,18.3338918 22,17.9998918 L22,10.9998918 L20,10.9998918 L20,17.4648918 L14.959,20.8248918 L9,17.4198918 L9,8.57389181 L14,5.65789181 L14,13.9998918 L16,13.9998918 L16,4.49089181 L20.113,2.09189181 L28,4.72089181 L28,33.4338918 L13.485,42.1428918 L14.515,43.8568918 L28,35.7658918 L28,51.2788918 L20.113,53.9078918 Z M50,37.9998918 C50,39.1028918 49.103,39.9998918 48,39.9998918 C46.897,39.9998918 46,39.1028918 46,37.9998918 C46,36.8968918 46.897,35.9998918 48,35.9998918 C49.103,35.9998918 50,36.8968918 50,37.9998918 L50,37.9998918 Z M40,47.9998918 C40,49.1028918 39.103,49.9998918 38,49.9998918 C36.897,49.9998918 36,49.1028918 36,47.9998918 C36,46.8968918 36.897,45.9998918 38,45.9998918 C39.103,45.9998918 40,46.8968918 40,47.9998918 L40,47.9998918 Z M39,7.99989181 C39,6.89689181 39.897,5.99989181 41,5.99989181 C42.103,5.99989181 43,6.89689181 43,7.99989181 C43,9.10289181 42.103,9.99989181 41,9.99989181 C39.897,9.99989181 39,9.10289181 39,7.99989181 L39,7.99989181 Z M52,20.9998918 C50.141,20.9998918 48.589,22.2798918 48.142,23.9998918 L30,23.9998918 L30,18.9998918 L41,18.9998918 C41.553,18.9998918 42,18.5518918 42,17.9998918 L42,11.8578918 C43.72,11.4108918 45,9.85789181 45,7.99989181 C45,5.79389181 43.206,3.99989181 41,3.99989181 C38.794,3.99989181 37,5.79389181 37,7.99989181 C37,9.85789181 38.28,11.4108918 40,11.8578918 L40,16.9998918 L30,16.9998918 L30,3.99989181 C30,3.56889181 29.725,3.18789181 29.316,3.05089181 L20.316,0.050891811 C20.042,-0.039108189 19.744,-0.00910818904 19.496,0.135891811 L7.496,7.13589181 C7.188,7.31489181 7,7.64489181 7,7.99989181 L7,17.4198918 L0.504,21.1318918 C0.192,21.3098918 0,21.6408918 0,21.9998918 L0,33.9998918 C0,34.3588918 0.192,34.6898918 0.504,34.8678918 L7,38.5798918 L7,47.9998918 C7,48.3548918 7.188,48.6848918 7.496,48.8638918 L19.496,55.8638918 C19.65,55.9538918 19.825,55.9998918 20,55.9998918 C20.106,55.9998918 20.213,55.9828918 20.316,55.9488918 L29.316,52.9488918 C29.725,52.8118918 30,52.4308918 30,51.9998918 L30,39.9998918 L37,39.9998918 L37,44.1418918 C35.28,44.5888918 34,46.1418918 34,47.9998918 C34,50.2058918 35.794,51.9998918 38,51.9998918 C40.206,51.9998918 42,50.2058918 42,47.9998918 C42,46.1418918 40.72,44.5888918 39,44.1418918 L39,38.9998918 C39,38.4478918 38.553,37.9998918 38,37.9998918 L30,37.9998918 L30,32.9998918 L42.5,32.9998918 L44.638,35.8498918 C44.239,36.4718918 44,37.2068918 44,37.9998918 C44,40.2058918 45.794,41.9998918 48,41.9998918 C50.206,41.9998918 52,40.2058918 52,37.9998918 C52,35.7938918 50.206,33.9998918 48,33.9998918 C47.316,33.9998918 46.682,34.1878918 46.119,34.4918918 L43.8,31.3998918 C43.611,31.1478918 43.314,30.9998918 43,30.9998918 L30,30.9998918 L30,25.9998918 L48.142,25.9998918 C48.589,27.7198918 50.141,28.9998918 52,28.9998918 C54.206,28.9998918 56,27.2058918 56,24.9998918 C56,22.7938918 54.206,20.9998918 52,20.9998918 L52,20.9998918 Z"></path>
      </g>
    </g>
  </svg>
);

export function SlidingMarquee({ icons, speed = "18s" }: { icons: React.ReactNode[]; speed?: string }) {
  return (
    <div className="relative flex overflow-hidden w-full py-3 mt-4 bg-white/[0.02] border border-white/5 rounded-xl select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueeSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slide {
          animation: marqueeSlide ${speed} linear infinite;
        }
      `}} />
      <div className="flex gap-8 shrink-0 animate-marquee-slide whitespace-nowrap min-w-full justify-around items-center">
        {icons.map((icon, idx) => (
          <div key={idx} className="flex items-center justify-center shrink-0">
            {icon}
          </div>
        ))}
      </div>
      <div className="flex gap-8 shrink-0 animate-marquee-slide whitespace-nowrap min-w-full justify-around items-center" aria-hidden="true">
        {icons.map((icon, idx) => (
          <div key={`dup-${idx}`} className="flex items-center justify-center shrink-0">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MicrosoftAiBentoGrid() {
  const cards = [
    {
      colSpan: "lg:col-span-3 md:col-span-2",
      eyebrow: "LLM FOUNDATION",
      title: "Azure OpenAI Service",
      desc: "Deploy and orchestrate domain-optimized foundation models (GPT-4o, o1, and specialized LLMs) securely inside your dedicated virtual network.",
      logo: <AzureLogo />,
      colorClass: "border-cyan-500/25 hover:border-cyan-400/40 text-cyan-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-cyan-500/10",
      features: ["Private Virtual Network", "Zero Data Leaks", "Custom Model Fine-tuning"],
      illustration: (
        <SlidingMarquee
          speed="18s"
          icons={[
            <div key="o1" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              o1-preview
            </div>,
            <div key="4o" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Cpu className="w-3 h-3 text-orange-450" />
              gpt-4o
            </div>,
            <div key="d3" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              dall-e-3
            </div>,
            <div key="wh" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Sparkles className="w-3 h-3 text-orange-450" />
              whisper
            </div>,
            <div key="cd" className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
              <Cpu className="w-3 h-3 text-orange-450" />
              codex
            </div>
          ]}
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "AGENT SWARMS",
      title: "Copilot Studio",
      desc: "Build custom autonomous agent networks and multi-agent workflows connected directly to Microsoft 365, SharePoint, and Teams.",
      logo: <CopilotStudioLogo />,
      colorClass: "border-emerald-500/25 hover:border-emerald-400/40 text-emerald-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-emerald-500/10",
      features: ["Multi-Agent Orchestration", "Teams Bots Integration", "Cognitive Actions API"],
      illustration: (
        <SlidingMarquee
          speed="15s"
          icons={[
            <div key="msg" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>MS Teams</span>
            </div>,
            <div key="mail" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>Outlook</span>
            </div>,
            <div key="file" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>SharePoint</span>
            </div>,
            <div key="web" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Globe className="w-4 h-4 text-orange-400" />
              <span>Web Apps</span>
            </div>,
            <div key="cal" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Calendar</span>
            </div>,
            <div key="crm" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Users className="w-4 h-4 text-orange-400" />
              <span>Dynamics</span>
            </div>
          ]}
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "COGNITIVE RAG",
      title: "Azure AI Search",
      desc: "Implement hybrid semantic vector search engines to power high-fidelity Retrieval-Augmented Generation (RAG) pipelines and private knowledge bases.",
      logo: <AzureLogo />,
      colorClass: "border-indigo-500/25 hover:border-indigo-400/40 text-indigo-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-indigo-500/10",
      features: ["Hybrid Semantic Ranker", "Vector Indexing", "Document Intelligence API"],
      illustration: (
        <SlidingMarquee
          speed="16s"
          icons={[
            <div key="pdf" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Documents</span>
            </div>,
            <div key="db" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Database className="w-4 h-4 text-orange-400" />
              <span>SQL DB</span>
            </div>,
            <div key="blob" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <HardDrive className="w-4 h-4 text-orange-400" />
              <span>Blob Store</span>
            </div>,
            <div key="url" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Link className="w-4 h-4 text-orange-400" />
              <span>Web URLs</span>
            </div>,
            <div key="vec" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Layers className="w-4 h-4 text-orange-400" />
              <span>Vector Index</span>
            </div>,
            <div key="rank" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Search className="w-4 h-4 text-orange-400" />
              <span>Hybrid Ranker</span>
            </div>
          ]}
        />
      )
    },
    {
      colSpan: "lg:col-span-1 md:col-span-1",
      eyebrow: "WORKFLOWS",
      title: "Power Automate",
      desc: "Integrate Agentic triggers directly with databases, custom APIs, and legacy systems.",
      logo: <PowerPlatformLogo />,
      colorClass: "border-purple-500/25 hover:border-purple-400/40 text-purple-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-purple-500/10",
      features: ["Desktop RPA Flow", "Dataverse API"],
      illustration: (
        <SlidingMarquee
          speed="14s"
          icons={[
            <div key="zp" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Triggers</span>
            </div>,
            <div key="rp" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Repeat className="w-4 h-4 text-orange-400" />
              <span>Schedule</span>
            </div>,
            <div key="pl" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Play className="w-4 h-4 text-orange-400" />
              <span>RPA Flows</span>
            </div>,
            <div key="chk" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <CheckSquare className="w-4 h-4 text-orange-400" />
              <span>Approvals</span>
            </div>,
            <div key="wf" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Workflow className="w-4 h-4 text-orange-400" />
              <span>Pipelines</span>
            </div>,
            <div key="st" className="flex items-center gap-2 text-xs font-semibold text-orange-400/90">
              <Settings className="w-4 h-4 text-orange-400" />
              <span>Actions</span>
            </div>
          ]}
        />
      )
    },
    {
      colSpan: "lg:col-span-2 md:col-span-1",
      eyebrow: "FOUNDATION MODELS",
      title: "Amazon Bedrock",
      desc: "Build secure, production-ready generative AI applications using foundation models, agents, knowledge bases, and enterprise-grade AI capabilities.",
      logo: <BedrockLogo />,
      colorClass: "border-orange-500/25 hover:border-orange-400/40 text-orange-400 bg-gradient-to-r from-black via-[#4c1c02] to-black",
      accentBg: "bg-orange-500/10",
      features: ["Multi-Model AI", "Bedrock Agents", "Knowledge Bases", "Guardrails", "Model Customization"],
      illustration: (
        <SlidingMarquee
          speed="18s"
          icons={[
            <div key="fm" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Cpu className="w-4 h-4 text-orange-400" />
              <span>Foundation Models</span>
            </div>,
            <div key="ba" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Bedrock Agents</span>
            </div>,
            <div key="kb" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Database className="w-4 h-4 text-orange-400" />
              <span>Knowledge Bases</span>
            </div>,
            <div key="gr" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <CheckSquare className="w-4 h-4 text-orange-400" />
              <span>Guardrails</span>
            </div>,
            <div key="mc" className="flex items-center gap-2 text-xs font-semibold text-orange-400/95">
              <Settings className="w-4 h-4 text-orange-400" />
              <span>Model Customization</span>
            </div>
          ]}
        />
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-[1600px] mx-auto mt-6 text-left items-stretch">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`group relative rounded-[20px] border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden ${card.colorClass} ${card.colSpan}`}
        >
          {/* Accent glow on card backgrounds */}
          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${card.accentBg}`} />

          <div className="space-y-4 w-full">
            {/* Logo row */}
            <div className="flex items-center justify-between w-full">
              <div className="shadow-md border border-white/10 bg-white/5 p-2 rounded-xl">
                {card.logo}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {card.eyebrow}
              </span>
            </div>

            {/* Content info */}
            <div className="space-y-2">
              <h3 className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>{card.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400" />
              </h3>
              <p className="text-[13px] lg:text-[13.5px] text-slate-400 leading-normal">
                {card.desc}
              </p>
            </div>

            {/* Vector illustration component */}
            {card.illustration}
          </div>

          {/* Features list */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-1.5 w-full">
            {card.features.map((feat, fIdx) => (
              <span key={fIdx} className="inline-flex items-center text-[11px] font-semibold text-slate-300">
                <span className="w-1 h-1 rounded-full bg-[#FF6B00] mr-1.5" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import React from "react";
import { 
  Cpu, Users, Settings, BarChart2, Database, Zap, RefreshCw, Wrench, Shield, 
  Layers, HelpCircle, Eye, Sliders, Target, Lightbulb, Layers3, Network, 
  Workflow, ChartNoAxesCombined, Scaling, Brain, ShieldCheck, Search, 
  User, MessageSquare, Star, Bot, FileText 
} from "lucide-react";

// Microsoft Capability Icons (Official designs recreated in high-fidelity vector formats)
const MicrosoftLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 23 23" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
    <rect x="11.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
    <rect x="0" y="12" width="10.5" height="10.5" fill="#00A4EF" />
    <rect x="11.5" y="12" width="10.5" height="10.5" fill="#FFB900" />
  </svg>
);

const AzureAiLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
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

const OpenAiLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3 10.6a5.5 5.5 0 00-2.3-4.1 5.6 5.6 0 00-5.7-.3 5.6 5.6 0 00-4.8-2.6 5.6 5.6 0 00-5.3 3.7 5.5 5.5 0 00-1.8 4.3 5.5 5.5 0 002.3 4.1 5.6 5.6 0 005.7.3 5.6 5.6 0 004.8 2.6 5.6 5.6 0 005.3-3.7 5.5 5.5 0 001.8-4.3z" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.7 4.8a4 4 0 011.9.5 6 6 0 00-2.3 4 V4.9a4 4 0 01.4-.1z" fill="#FFF" />
    <path d="M5.8 7.9a4 4 0 012.5-1.4 5.9 5.9 0 001.3 4.4 4 4 0 01-3.8-3z" fill="#FFF" />
    <path d="M4.7 13.2a4 4 0 01-.6-2 4 4 0 01.6-2 6 6 0 003.6 2.3 6 6 0 00-3.6 1.7z" fill="#FFF" />
    <path d="M11.3 19.2a4 4 0 01-1.9-.5 6 6 0 002.3-4 v4.4a4 4 0 01-.4.1z" fill="#FFF" />
    <path d="M18.2 16.1a4 4 0 01-2.5 1.4 5.9 5.9 0 00-1.3-4.4 4 4 0 013.8 3z" fill="#FFF" />
    <path d="M19.3 10.8a4 4 0 01.6 2 4 4 0 01-.6 2 6 6 0 00-3.6-2.3 6 6 0 003.6-1.7z" fill="#FFF" />
  </svg>
);

const CopilotLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="1.9996654987335205 4 43.9973030090332 40">
    <title>Copilot icon - Microsoft Fabric Core</title>
    <path fill="url(#i33c17e-paint0_radial_42584_82282)" d="M34.142 7.325A4.63 4.63 0 0 0 29.7 4h-1.352a4.63 4.63 0 0 0-4.553 3.794L21.48 20.407l.574-1.965a4.63 4.63 0 0 1 4.444-3.33h7.854l3.294 1.282 3.175-1.283h-.927a4.63 4.63 0 0 1-4.442-3.325z"/>
    <path fill="url(#i33c17e-paint1_radial_42584_82282)" d="M14.33 40.656A4.63 4.63 0 0 0 18.778 44h2.87a4.63 4.63 0 0 0 4.628-4.51l.313-12.163-.654 2.233a4.63 4.63 0 0 1-4.443 3.329h-7.92l-2.823-1.532-3.056 1.532h.911a4.63 4.63 0 0 1 4.448 3.344z"/>
    <path fill="url(#i33c17e-paint2_linear_42584_82282)" d="M29.5 4H13.46c-4.583 0-7.332 6.057-9.165 12.113C2.123 23.29-.72 32.885 7.503 32.885h6.925a4.63 4.63 0 0 0 4.456-3.358 2079 2079 0 0 1 4.971-17.156c.843-2.843 1.544-5.284 2.621-6.805C27.08 4.714 28.086 4 29.5 4"/>
    <path fill="url(#i33c17e-paint3_linear_42584_82282)" d="M29.5 4H13.46c-4.583 0-7.332 6.057-9.165 12.113C2.123 23.29-.72 32.885 7.503 32.885h6.925a4.63 4.63 0 0 0 4.456-3.358 2079 2079 0 0 1 4.971-17.156c.843-2.843 1.544-5.284 2.621-6.805C27.08 4.714 28.086 4 29.5 4"/>
    <path fill="url(#i33c17e-paint4_radial_42584_82282)" d="M18.498 44h16.039c4.583 0 7.332-6.058 9.165-12.115 2.172-7.177 5.014-16.775-3.208-16.775H33.57a4.63 4.63 0 0 0-4.456 3.358 2082 2082 0 0 1-4.971 17.16c-.843 2.843-1.544 5.285-2.621 6.805-.604.853-1.61 1.567-3.023 1.567"/>
    <path fill="url(#i33c17e-paint5_linear_42584_82282)" d="M18.498 44h16.039c4.583 0 7.332-6.058 9.165-12.115 2.172-7.177 5.014-16.775-3.208-16.775H33.57a4.63 4.63 0 0 0-4.456 3.358 2082 2082 0 0 1-4.971 17.16c-.843 2.843-1.544 5.285-2.621 6.805-.604.853-1.61 1.567-3.023 1.567"/>
    <defs>
      <radialGradient id="i33c17e-paint0_radial_42584_82282" cx="0" cy="0" r="1" gradientTransform="matrix(-10.96051 -13.38922 12.59013 -10.30637 38.005 20.514)" gradientUnits="userSpaceOnUse"><stop offset=".096" stopColor="#00AEFF"/><stop offset=".773" stopColor="#2253CE"/><stop offset="1" stopColor="#0736C4"/></radialGradient>
      <radialGradient id="i33c17e-paint1_radial_42584_82282" cx="0" cy="0" r="1" gradientTransform="rotate(51.84 -28.202 27.85)scale(15.9912 15.5119)" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB657"/><stop offset=".634" stopColor="#FF5F3D"/><stop offset=".923" stopColor="#C02B3C"/></radialGradient>
      <linearGradient id="i33c17e-paint2_linear_42584_82282" x1="12.5" x2="14.788" y1="7.5" y2="33.975" gradientUnits="userSpaceOnUse"><stop offset=".156" stopColor="#0D91E1"/><stop offset=".487" stopColor="#52B471"/><stop offset=".652" stopColor="#98BD42"/><stop offset=".937" stopColor="#FFC800"/></linearGradient>
      <linearGradient id="i33c17e-paint3_linear_42584_82282" x1="14.5" x2="15.75" y1="4" y2="32.885" gradientUnits="userSpaceOnUse"><stop stopColor="#3DCBFF"/><stop offset=".247" stopColor="#0588F7" stopOpacity="0"/></linearGradient>
      <radialGradient id="i33c17e-paint4_radial_42584_82282" cx="0" cy="0" r="1" gradientTransform="rotate(109.274 16.301 20.802)scale(38.3873 45.9867)" gradientUnits="userSpaceOnUse"><stop offset=".066" stopColor="#8C48FF"/><stop offset=".5" stopColor="#F2598A"/><stop offset=".896" stopColor="#FFB152"/></radialGradient>
      <linearGradient id="i33c17e-paint5_linear_42584_82282" x1="42.585" x2="42.569" y1="13.346" y2="21.215" gradientUnits="userSpaceOnUse"><stop offset=".058" stopColor="#F8ADFA"/><stop offset=".708" stopColor="#A86EDD" stopOpacity="0"/></linearGradient>
    </defs>
  </svg>
);

const CopilotStudioLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke="#00B4F0" strokeWidth="1.5" />
    <path d="M16 6v20M6 16h20" stroke="#00F0B4" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="4.5" fill="#00B4F0" />
  </svg>
);

const Microsoft365Logo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512" className={className}>
    <radialGradient id="microsoft-365_svg__a" cx="-90.407" cy="-6.401" r="11.637" gradientTransform="matrix(-11.7002 31.247 -54.5012 -20.4075 -1227.181 2794.834)" gradientUnits="userSpaceOnUse">
      <stop offset=".064" stopColor="#ae7fe2"/>
      <stop offset="1" stopColor="#0078d4"/>
    </radialGradient>
    <path d="m210.4 11.9-2.6 1.6q-6.3 3.75-11.7 8.4l7.5-5.3h64l11.6 88.1-58.2 58.2-58.2 40.4V250c0 32.6 17 62.8 44.9 79.6l61.3 37.1-129.4 75.5h-25L68.2 414c-27.9-16.9-44.9-47.1-44.9-79.6V177.6c0-32.6 17-62.8 44.9-79.7l139.6-84.5c.9-.5 1.8-1 2.6-1.5" fill="url(#microsoft-365_svg__a)"/>
    <linearGradient id="microsoft-365_svg__b" x1="253.639" x2="198.241" y1="653.085" y2="557.27" gradientTransform="translate(0 -278)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#114a8b"/>
      <stop offset="1" stopColor="#0078d4" stopOpacity={0}/>
    </linearGradient>
    <path d="m210.4 11.9-2.6 1.6q-6.3 3.75-11.7 8.4l7.5-5.3h64l11.6 88.1-58.2 58.2-58.2 40.4V250c0 32.6 17 62.8 44.9 79.6l61.3 37.1-129.4 75.5h-25L68.2 414c-27.9-16.9-44.9-47.1-44.9-79.6V177.6c0-32.6 17-62.8 44.9-79.7l139.6-84.5c.9-.5 1.8-1 2.6-1.5" fill="url(#microsoft-365_svg__b)"/>
    <radialGradient id="microsoft-365_svg__c" cx="-95.09" cy="32.254" r="11.637" gradientTransform="matrix(30.7198 -4.5183 2.9847 20.2925 2922.94 -684.456)" gradientUnits="userSpaceOnUse">
      <stop offset=".134" stopColor="#d59dff"/>
      <stop offset="1" stopColor="#5e438f"/>
    </radialGradient>
    <path d="M349.1 197.8v52.1c0 32.6-17 62.8-44.9 79.6L164.6 414c-28.6 17.4-64.1 18-93.2 2l136.4 82.6c29.6 17.9 66.8 17.9 96.4 0L443.8 414c27.9-16.9 44.9-47.1 44.9-79.6v-37.7l-11.6-17.5z" fill="url(#microsoft-365_svg__c)"/>
    <linearGradient id="microsoft-365_svg__d" x1="389.732" x2="330.368" y1="510.531" y2="595.653" gradientTransform="translate(0 -278)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#493474"/>
      <stop offset="1" stopColor="#8c66ba" stopOpacity={0}/>
    </linearGradient>
    <path d="M349.1 197.8v52.1c0 32.6-17 62.8-44.9 79.6L164.6 414c-28.6 17.4-64.1 18-93.2 2l136.4 82.6c29.6 17.9 66.8 17.9 96.4 0L443.8 414c27.9-16.9 44.9-47.1 44.9-79.6v-37.7l-11.6-17.5z" fill="url(#microsoft-365_svg__d)"/>
    <radialGradient id="microsoft-365_svg__e" cx="-123.182" cy="-9.402" r="11.637" gradientTransform="matrix(-24.1583 -6.1256 10.3118 -40.6682 -2424.463 -851.827)" gradientUnits="userSpaceOnUse">
      <stop offset=".058" stopColor="#50e6ff"/>
      <stop offset="1" stopColor="#436dcd"/>
    </radialGradient>
    <path d="M443.8 97.9 304.2 13.4C275.5-4 239.8-4.5 210.6 11.8l-2.8 1.7a93.13 93.13 0 0 0-44.9 79.7v110.4l44.9-27.2c29.6-17.9 66.7-17.9 96.4 0l139.6 84.5c27 16.3 43.8 45.2 44.9 76.6 0-1 .1-2 .1-3.1V177.6c-.1-32.6-17.1-62.8-45-79.7" fill="url(#microsoft-365_svg__e)"/>
    <linearGradient id="microsoft-365_svg__f" x1="174.261" x2="261.665" y1="446.725" y2="446.725" gradientTransform="translate(0 -278)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#2d3f80"/>
      <stop offset="1" stopColor="#436dcd" stopOpacity={0}/>
    </linearGradient>
    <path d="M443.8 97.9 304.2 13.4C275.5-4 239.8-4.5 210.6 11.8l-2.8 1.7a93.13 93.13 0 0 0-44.9 79.7v110.4l44.9-27.2c29.6-17.9 66.7-17.9 96.4 0l139.6 84.5c27 16.3 43.8 45.2 44.9 76.6 0-1 .1-2 .1-3.1V177.6c-.1-32.6-17.1-62.8-45-79.7" fill="url(#microsoft-365_svg__f)"/>
  </svg>
);

const PowerPlatformLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg id="ba4919b9-482a-4601-a507-e1cb9c3f18c3" className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
    <defs>
      <mask id="e9bc2698-00b3-4450-a305-4d48e69c6ba4" x="1" y="0.621" width="16" height="16.759" maskUnits="userSpaceOnUse">
        <g id="bb174594-fe99-4829-b2eb-db1301c0edf3">
          <path d="M7.02.621h7.231a2.745,2.745,0,0,1,2.477,3.928l.135-.268L14.35,9.307l-.022.045-.393.785.393-.786a2.746,2.746,0,0,1-2.456,1.518H7.53L4.455,17.018a.654.654,0,0,1-1.17,0l-2.148-4.3a1.267,1.267,0,0,1,.006-1.158l2.365-4.73a1.31,1.31,0,0,1,1.171-.723h9.062a2.706,2.706,0,0,0-1.868-.732H5.3a.655.655,0,0,1-.585-.948L6.434.982A.656.656,0,0,1,7.02.621Z" fill="#fff"/>
        </g>
      </mask>
      <linearGradient id="bf1af69a-6e94-4e91-8588-549cb62ce951" x1="262.943" y1="-361.368" x2="264.773" y2="-368.322" gradientTransform="matrix(1, 0, 0, -1, -259, -351)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#159455"/><stop offset="1" stopColor="#3fbda9"/>
      </linearGradient>
      <linearGradient id="bf21e1fc-27ba-435a-bf83-c3214ae2881a" x1="263.98" y1="-352.196" x2="274.597" y2="-356.916" gradientTransform="matrix(1, 0, 0, -1, -259, -351)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#23a794"/><stop offset="0.568" stopColor="#007a84"/><stop offset="1" stopColor="#005158"/>
      </linearGradient>
      <linearGradient id="b597e15c-979a-4069-af4a-a47a7e5d8979" x1="271.456" y1="-359.139" x2="269.534" y2="-354.107" gradientTransform="matrix(1, 0, 0, -1, -259, -351)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#004a8b"/><stop offset="0.406" stopColor="#105da8" stopOpacity="0.5"/><stop offset="1" stopColor="#2170c6" stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="e1bbe83f-6ec8-4780-9a6c-215d171f58b6" x1="263.151" y1="-356.537" x2="272.758" y2="-361.295" gradientTransform="matrix(1, 0, 0, -1, -259, -351)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#7fd9a2"/><stop offset="0.196" stopColor="#47bf79"/><stop offset="0.714" stopColor="#009280"/><stop offset="1" stopColor="#007a84"/>
      </linearGradient>
      <linearGradient id="b66967df-cbfe-4d0c-81da-52941e4a27a5" x1="263.08" y1="-356.705" x2="265.276" y2="-357.803" gradientTransform="matrix(1, 0, 0, -1, -259, -351)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#a8e47c" stopOpacity="0.86"/><stop offset="0.367" stopColor="#87d152" stopOpacity="0.2"/><stop offset="1" stopColor="#58be5a" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <g>
      <g id="a89b33df-ced6-49a3-aeee-25a65899c40f">
        <path d="M7.02.621h7.231a2.745,2.745,0,0,1,2.477,3.928l.135-.268L14.35,9.307l-.022.045-.393.785.393-.786a2.746,2.746,0,0,1-2.456,1.518H7.53L4.455,17.018a.654.654,0,0,1-1.17,0l-2.148-4.3a1.267,1.267,0,0,1,.006-1.158l2.365-4.73a1.31,1.31,0,0,1,1.171-.723h9.062a2.706,2.706,0,0,0-1.868-.732H5.3a.655.655,0,0,1-.585-.948L6.434.982A.656.656,0,0,1,7.02.621Z" fill="#fff"/>
      </g>
      <g mask="url(#e9bc2698-00b3-4450-a305-4d48e69c6ba4)">
        <g>
          <path d="M2.283,10.869H7.53L4.455,17.018a.655.655,0,0,1-1.171,0l-2.147-4.3A1.28,1.28,0,0,1,2.283,10.869Z" fill="url(#bf1af69a-6e94-4e91-8588-549cb62ce951)"/>
          <path d="M7.019.621h7.232a2.745,2.745,0,0,1,2.456,3.972L14.349,9.307l-.021.045-.393.785.414-.83a2.744,2.744,0,0,0-2.476-3.928H5.3a.655.655,0,0,1-.585-.948L6.434.982A.656.656,0,0,1,7.019.621Z" fill="url(#bf21e1fc-27ba-435a-bf83-c3214ae2881a)"/>
          <path d="M7.019.621h7.232a2.745,2.745,0,0,1,2.456,3.972L14.344,9.318l-.017.034-.209.419.226-.453a2.745,2.745,0,0,0-2.471-3.939H5.3a.655.655,0,0,1-.585-.948L6.434.982A.656.656,0,0,1,7.019.621Z" fill="url(#b597e15c-979a-4069-af4a-a47a7e5d8979)"/>
          <path d="M11.872,10.942H2.3a1.31,1.31,0,0,0-1.171.723L3.508,6.907a1.31,1.31,0,0,1,1.171-.723h9.572A2.744,2.744,0,0,0,16.7,4.67l.159-.316-2.535,5.07A2.746,2.746,0,0,1,11.872,10.942Z" fillOpacity="0.24"/>
          <path d="M11.872,11.235H2.3a1.31,1.31,0,0,0-1.171.723L3.508,7.2a1.31,1.31,0,0,1,1.171-.723h9.572A2.744,2.744,0,0,0,16.7,4.963l.159-.316-2.535,5.07A2.746,2.746,0,0,1,11.872,11.235Z" fillOpacity="0.32"/>
          <path d="M11.872,10.869H2.3a1.31,1.31,0,0,0-1.171.723L3.508,6.834a1.31,1.31,0,0,1,1.171-.723h9.572A2.744,2.744,0,0,0,16.7,4.6l.159-.316-2.535,5.07A2.746,2.746,0,0,1,11.872,10.869Z" fill="url(#e1bbe83f-6ec8-4780-9a6c-215d171f58b6)"/>
          <path d="M11.867,10.869H2.307a1.31,1.31,0,0,0-1.171.723L3.515,6.834a1.31,1.31,0,0,1,1.171-.723H14.3A2.666,2.666,0,0,0,16.68,4.647L14.321,9.353A2.744,2.744,0,0,1,11.867,10.869Z" opacity="0.7" fill="url(#b66967df-cbfe-4d0c-81da-52941e4a27a5)" style={{ isolation: "isolate" }}/>
        </g>
      </g>
    </g>
  </svg>
);

const PowerAppsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path fill="#94248a" d="m19.012 18.027l-4.751 5.183a1 1 0 0 1-1.477 0l-4.148-4.525a1.003 1.003 0 0 1 0-1.353l4.266-4.655a1.006 1.006 0 0 0 0-1.354L8.636 6.668c-.35-.38-.35-.972 0-1.353L12.784.79a1.003 1.003 0 0 1 1.477 0l4.751 5.183c-.414.004-.809.18-1.088.486l-3.84 4.188a2.01 2.01 0 0 0 0 2.706l3.84 4.188c.293.32.69.482 1.088.486m-7.613 4.411l-.627.716a1 1 0 0 1-1.507 0L.371 12.989a1.5 1.5 0 0 1 0-1.978L9.265.846a1 1 0 0 1 1.507 0l.627.716l-3.131 3.416a1.503 1.503 0 0 0 0 2.028l4.266 4.655a.506.506 0 0 1 0 .678l-4.266 4.655a1.503 1.503 0 0 0 0 2.028zm8.357-5.222a1.005 1.005 0 0 1-1.464-.013l-3.839-4.188a1.51 1.51 0 0 1 0-2.03l3.839-4.188a1.004 1.004 0 0 1 1.464-.013l3.85 4.201a1.505 1.505 0 0 1 0 2.03z"/>
  </svg>
);

const PowerAutomateLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="-5 10.4 102 77.6">
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
        <mask id="mask0" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-1" y="10" width="97" height="76">
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

const AiAgentsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cyan-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" />
    <line x1="16" y1="16" x2="16" y2="16.01" />
  </svg>
);

const AzureAiSearchLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="8.5" stroke="#0078D4" strokeWidth="2.5" />
    <path d="M19.5 19.5l8 8" stroke="#00C3FF" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="13" cy="13" r="3.5" fill="#0078D4" opacity="0.45" />
  </svg>
);

const FabricLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="3.999685764312744 3.999889373779297 39.99939727783203 40.001121520996094">
    <title>Fabric icon - Microsoft Fabric Core</title>
    <path fill="url(#i7fa1c1-a)" fillRule="evenodd" d="m5.64 31.6-.586 2.144c-.218.685-.524 1.693-.689 2.59a5.63 5.63 0 0 0 4.638 7.588c.792.114 1.688.108 2.692-.04l4.613-.636a2.92 2.92 0 0 0 2.421-2.127l3.175-11.662L5.64 31.599Z" clipRule="evenodd"/>
    <path fill="url(#i7fa1c1-b)" d="M10.14 32.152c-4.863.753-5.861 4.423-5.861 4.423l4.656-17.11 24.333-3.292-3.318 12.052a1.71 1.71 0 0 1-1.388 1.244l-.136.022-18.423 2.684z"/>
    <path fill="url(#i7fa1c1-c)" fillOpacity=".8" d="M10.14 32.152c-4.863.753-5.861 4.423-5.861 4.423l4.656-17.11 24.333-3.292-3.318 12.052a1.71 1.71 0 0 1-1.388 1.244l-.136.022-18.423 2.684z"/>
    <path fill="url(#i7fa1c1-d)" d="m12.899 21.235 26.938-3.98a1.6 1.6 0 0 0 1.323-1.17l2.78-10.06a1.595 1.595 0 0 0-1.74-2.012L16.498 7.81a7.19 7.19 0 0 0-5.777 5.193L7.013 26.438c.744-2.717 1.202-4.355 5.886-5.203"/>
    <path fill="url(#i7fa1c1-e)" d="m12.899 21.235 26.938-3.98a1.6 1.6 0 0 0 1.323-1.17l2.78-10.06a1.595 1.595 0 0 0-1.74-2.012L16.498 7.81a7.19 7.19 0 0 0-5.777 5.193L7.013 26.438c.744-2.717 1.202-4.355 5.886-5.203"/>
    <path fill="url(#i7fa1c1-f)" fillOpacity=".4" d="m12.899 21.235 26.938-3.98a1.6 1.6 0 0 0 1.323-1.17l2.78-10.06a1.595 1.595 0 0 0-1.74-2.012L16.498 7.81a7.19 7.19 0 0 0-5.777 5.193L7.013 26.438c.744-2.717 1.202-4.355 5.886-5.203"/>
    <path fill="url(#i7fa1c1-g)" d="M12.899 21.236c-3.901.706-4.87 1.962-5.514 3.932L4.279 36.577s.992-3.633 5.796-4.41l18.352-2.673.136-.022a1.71 1.71 0 0 0 1.388-1.244l2.73-9.915z"/>
    <path fill="url(#i7fa1c1-h)" fillOpacity=".2" d="M12.899 21.236c-3.901.706-4.87 1.962-5.514 3.932L4.279 36.577s.992-3.633 5.796-4.41l18.352-2.673.136-.022a1.71 1.71 0 0 0 1.388-1.244l2.73-9.915z"/>
    <path fill="url(#i7fa1c1-i)" fillRule="evenodd" d="M10.075 32.167c-4.06.657-5.392 3.345-5.71 4.164a5.63 5.63 0 0 0 4.638 7.59c.792.114 1.688.108 2.692-.039l4.613-.637a2.92 2.92 0 0 0 2.421-2.127l2.894-10.633-11.547 1.683z" clipRule="evenodd"/>
    <defs>
      <linearGradient id="i7fa1c1-a" x1="12.953" x2="12.953" y1="44.001" y2="29.457" gradientUnits="userSpaceOnUse"><stop offset=".056" stopColor="#2AAC94"/><stop offset=".155" stopColor="#239C87"/><stop offset=".372" stopColor="#177E71"/><stop offset=".588" stopColor="#0E6961"/><stop offset=".799" stopColor="#095D57"/><stop offset="1" stopColor="#085954"/></linearGradient>
      <linearGradient id="i7fa1c1-b" x1="31.331" x2="17.286" y1="33.448" y2="18.173" gradientUnits="userSpaceOnUse"><stop offset=".042" stopColor="#ABE88E"/><stop offset=".549" stopColor="#2AAA92"/><stop offset=".906" stopColor="#117865"/></linearGradient>
      <linearGradient id="i7fa1c1-c" x1="-3.182" x2="10.183" y1="32.706" y2="28.148" gradientUnits="userSpaceOnUse"><stop stopColor="#6AD6F9"/><stop offset="1" stopColor="#6AD6F9" stopOpacity="0"/></linearGradient>
      <linearGradient id="i7fa1c1-d" x1="7.013" x2="42.589" y1="15.219" y2="15.219" gradientUnits="userSpaceOnUse"><stop offset=".043" stopColor="#25FFD4"/><stop offset=".874" stopColor="#55DDB9"/></linearGradient>
      <linearGradient id="i7fa1c1-e" x1="7.013" x2="39.06" y1="10.247" y2="25.128" gradientUnits="userSpaceOnUse"><stop stopColor="#6AD6F9"/><stop offset=".23" stopColor="#60E9D0"/><stop offset=".651" stopColor="#6DE9BB"/><stop offset=".994" stopColor="#ABE88E"/></linearGradient>
      <linearGradient id="i7fa1c1-f" x1="9.978" x2="27.404" y1="13.031" y2="16.885" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity="0"/><stop offset=".459" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
      <linearGradient id="i7fa1c1-g" x1="15.756" x2="16.168" y1="27.96" y2="15.74" gradientUnits="userSpaceOnUse"><stop offset=".205" stopColor="#063D3B" stopOpacity="0"/><stop offset=".586" stopColor="#063D3B" stopOpacity=".237"/><stop offset=".872" stopColor="#063D3B" stopOpacity=".75"/></linearGradient>
      <linearGradient id="i7fa1c1-h" x1="2.81" x2="17.701" y1="26.744" y2="29.545" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" stopOpacity="0"/><stop offset=".459" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
      <linearGradient id="i7fa1c1-i" x1="13.567" x2="10.662" y1="39.97" y2="25.764" gradientUnits="userSpaceOnUse"><stop offset=".064" stopColor="#063D3B" stopOpacity="0"/><stop offset=".17" stopColor="#063D3B" stopOpacity=".135"/><stop offset=".562" stopColor="#063D3B" stopOpacity=".599"/><stop offset=".85" stopColor="#063D3B" stopOpacity=".9"/><stop offset="1" stopColor="#063D3B"/></linearGradient>
    </defs>
  </svg>
);

const DataEngineeringLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-cyan-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const RealTimeAnalyticsLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-amber-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const EnterpriseDataLogo = ({ className = "w-6 h-6 shrink-0" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} text-blue-400`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

// Isometric Stacked Blocks on circular pedestal SVG (High-fidelity vector design) with embedded floating animations
const IsometricBlocksLogo = () => (
  <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto flex items-center justify-center">
    <style>{`
      @keyframes floatTop {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes floatMiddle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
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
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_24px_rgba(255,107,44,0.45)]">
      {/* Base pedestal circular light wave */}
      <ellipse cx="60" cy="102" rx="48" ry="14" fill="none" stroke="#FF6B2C" className="animate-pedestal-glow" strokeDasharray="3 3" />
      <ellipse cx="60" cy="102" rx="38" ry="10" fill="rgba(255,107,44,0.06)" stroke="#FF6B2C" strokeWidth="2" />
      <ellipse cx="60" cy="102" rx="26" ry="7" fill="none" stroke="#FF6B2C" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="102" x2="60" y2="92" stroke="#FF6B2C" strokeWidth="1" />

      {/* Stack pyramid bottom (3 cubes) */}
      <g>
        {/* Left-Bottom cube */}
        <path d="M42 90 L24 81 L42 72 L60 81 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M24 81 L24 90 L42 99 L42 90 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M42 90 L42 99 L60 90 L60 81 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />

        {/* Right-Bottom cube */}
        <path d="M78 90 L60 81 L78 72 L96 81 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M60 81 L60 90 L78 99 L78 90 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M78 90 L78 99 L96 90 L96 81 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />
      </g>

      {/* Center-Middle cube (Layer 2) - Animated Floating */}
      <g className="animate-float-middle">
        <path d="M60 76 L42 67 L60 58 L78 67 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M42 67 L42 76 L60 85 L60 76 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1" />
        <path d="M60 76 L60 85 L78 76 L78 67 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1" />
      </g>

      {/* Top cube (Layer 3) - Animated Floating Higher */}
      <g className="animate-float-top">
        <path d="M60 55 L42 46 L60 37 L78 46 Z" fill="#1f1f1f" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M42 46 L42 55 L60 64 L60 55 Z" fill="#111111" stroke="#FF6B2C" strokeWidth="1.2" />
        <path d="M60 55 L60 64 L78 55 L78 46 Z" fill="#000000" stroke="#FF6B2C" strokeWidth="1.2" />
      </g>
    </svg>
  </div>
);

const CrossedWrenchesIcon = ({ className = "w-6 h-6 text-white" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const CloudCheckIcon = ({ className = "w-6 h-6 text-white" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19A5.5 5.5 0 0 0 18 8h-1.26A8 8 0 1 0 3 15.28" />
    <path d="M9 13l2 2 4-4" />
  </svg>
);

export default function MicrosoftAiShowcase() {
  const layer1Caps = [
    { name: "Model Management", logo: <Brain className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Responsible AI", logo: <ShieldCheck className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Search & Knowledge", logo: <Search className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const layer2Caps = [
    { name: "AI Assistants & Copilots", logo: <User className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Conversational Experiences", logo: <MessageSquare className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Personalized Engagement", logo: <Star className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const layer3Caps = [
    { name: "Workflow Automation", logo: <Workflow className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Intelligent Agents", logo: <Bot className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Process Orchestration", logo: <FileText className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const layer4Caps = [
    { name: "Data Management", logo: <Database className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Analytics & Insights", logo: <BarChart2 className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
    { name: "Governance & Security", logo: <Shield className="w-5 h-5 shrink-0 text-slate-800 group-hover:text-orange-600 transition-colors" /> },
  ];

  const rightCapabilities = [
    { title: "AUTONOMOUS REASON", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Brain className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Goal decomposition, chain-of-thought & multi-step self-correction" },
    { title: "SECURE TOOL CALLING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Wrench className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Sandboxed execution across ERPs, databases & enterprise SaaS APIs" },
    { title: "SWARM ORCHESTRATE", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Workflow className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Multi-agent coordination with deterministic state & failover logic" },
    { title: "SEMANTIC GROUNDING", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Database className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Real-time vector graphs & persistent agent memory grounding" },
    { title: "ENTERPRISE GUARDRAILS", borderClass: "border-[#FF6B2C]/30", textClass: "text-[#FF6B2C]", glowClass: "shadow-[0_0_15px_rgba(255,107,44,0.25)]", hoverBorder: "group-hover:border-[#FF6B2C]/60", icon: <Shield className="w-6 h-6 lg:w-[26px] lg:h-[26px] text-[#FF6B2C]" strokeWidth={2} />, desc: "Zero-trust policy enforcement, human-in-the-loop & audit logs" },
  ];

  const businessImpactMetrics = [
    { title: "Autonomous Tasking", value: "99.4% Completion", icon: <Zap className="w-5 h-5 text-orange-400" /> },
    { title: "Tool Call Latency", value: "< 180ms Execution", icon: <RefreshCw className="w-5 h-5 text-orange-400" /> },
    { title: "Deterministic Ops", value: "Zero Hallucination", icon: <BarChart2 className="w-5 h-5 text-orange-400" /> },
    { title: "Connected SaaS", value: "50+ Secure Tools", icon: <Target className="w-5 h-5 text-orange-400" /> },
    { title: "Enterprise Scale", value: "10M+ Daily Calls", icon: <Lightbulb className="w-5 h-5 text-orange-400" /> },
  ];

  return (
    <div className="flex flex-col gap-6 w-full z-10 relative font-sans">
      {/* Outer Dashboard Card */}
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-h-[580px] flex items-center text-slate-900 w-full">
        
        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_25%,rgba(255,107,44,0.03),transparent_40%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(255,107,44,0.04),transparent_45%)] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full relative z-10">
          
          {/* Left Column: Heading, Isometric Stack (contained inside a glowing card) */}
          <div className="lg:col-span-3 flex">
            <div className="relative overflow-hidden rounded-[18px] border border-orange-500/30 bg-slate-50 p-5 sm:p-6 shadow-[0_0_25px_rgba(255,107,44,0.05)] flex flex-col justify-between items-stretch w-full h-auto min-h-[300px] lg:h-[440px] z-10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5812] text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5812] animate-pulse" />
                  AGENTIC AI RUNTIME
                </div>
                <h2 className="text-[20px] sm:text-[22px] lg:text-[25px] font-black tracking-wider text-slate-900 uppercase leading-tight">
                  AGENTIC SYSTEM
                </h2>
                <p className="text-[11px] sm:text-[12px] font-bold text-orange-600 tracking-wider uppercase">
                  Think • Reason • Act • Execute
                </p>
              </div>

              {/* 3D Stack pedestal illustration with smooth floating animation */}
              <div className="py-2 sm:py-4 flex items-center justify-center">
                <IsometricBlocksLogo />
              </div>
            </div>
          </div>

          {/* Center-Right Columns holding the 4 layers stack, branch lines, and the glowing core next to 5 capabilities */}
          <div className="lg:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
            
            {/* Unified SVG Branching Connection Overlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" viewBox="0 0 900 350" fill="none" preserveAspectRatio="none">
                {/* Left Branches (Layers -> Central Core) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* Layer 01 Cyan */}
                <path d="M 450 35 L 465 35 L 475 145" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 35 L 465 35 L 475 145" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Layer 02 Purple */}
                <path d="M 450 128 L 465 128 L 475 165" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 128 L 465 128 L 475 165" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 03 Pink */}
                <path d="M 450 222 L 465 222 L 475 185" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 222 L 465 222 L 475 185" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Layer 04 Green */}
                <path d="M 450 315 L 465 315 L 475 205" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 450 315 L 465 315 L 475 205" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Right Branches (Central Core -> 5 Capabilities) - Advanced Dual-Layer Neon Glowing Lines */}
                {/* BUILD Cyan */}
                <path d="M 575 145 L 585 35 L 600 35" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 145 L 585 35 L 600 35" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* CONNECT Purple */}
                <path d="M 575 165 L 585 105 L 600 105" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 165 L 585 105 L 600 105" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* AUTOMATE Pink */}
                <path d="M 575 175 L 600 175" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 175 L 600 175" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* ANALYZE Yellow */}
                <path d="M 575 185 L 585 245 L 600 245" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 185 L 585 245 L 600 245" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* SCALE Blue */}
                <path d="M 575 205 L 585 315 L 600 315" stroke="#FF6B2C" strokeWidth="5.5" opacity="0.18" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 575 205 L 585 315 L 600 315" stroke="#FF6B2C" strokeWidth="2.5" opacity="0.95" strokeLinecap="round" strokeLinejoin="round" />

                {/* Left Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 450 35 L 465 35 L 475 145" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 450 128 L 465 128 L 475 165" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 450 222 L 465 222 L 475 185" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 450 315 L 465 315 L 475 205" />
                </circle>

                {/* Right Flowing Dot Animations (Thicker data packages) */}
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.2s" repeatCount="indefinite" path="M 575 145 L 585 35 L 600 35" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 575 165 L 585 105 L 600 105" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M 575 175 L 600 175" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.0s" repeatCount="indefinite" path="M 575 185 L 585 245 L 600 245" />
                </circle>
                <circle r="4.5" fill="#FF6B2C" opacity="1">
                  <animateMotion dur="2.3s" repeatCount="indefinite" path="M 575 205 L 585 315 L 600 315" />
                </circle>
              </svg>
            </div>

            {/* Col A (4 Layers stack) - lg:col-span-6 */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[440px] relative z-10">
              
              {/* Layer 01: AI Foundation */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 min-h-[66px]">
                <div className="w-full sm:w-[102px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[10px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">LAYER 01</span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight uppercase leading-tight block">AI FOUNDATION</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 pl-0 sm:pl-2 flex-1 items-center w-full">
                  {layer1Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 sm:gap-2 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent">
                      <div className="transition-all duration-300 group-hover:scale-115 group-hover:rotate-[6deg] shrink-0">
                        {cap.logo}
                      </div>
                      <span className="text-[11.5px] sm:text-[11px] lg:text-[11.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-tight">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 02: Intelligent Experiences */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 min-h-[66px]">
                <div className="w-full sm:w-[102px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[10px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">LAYER 02</span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight uppercase leading-tight block">INTELLIGENT EXPERIENCES</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 pl-0 sm:pl-2 flex-1 items-center w-full">
                  {layer2Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 sm:gap-2 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent">
                      <div className="transition-all duration-300 group-hover:scale-115 group-hover:rotate-[6deg] shrink-0">
                        {cap.logo}
                      </div>
                      <span className="text-[11.5px] sm:text-[11px] lg:text-[11.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-tight">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 03: Business Automation */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 min-h-[66px]">
                <div className="w-full sm:w-[102px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[10px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">LAYER 03</span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight uppercase leading-tight block">BUSINESS AUTOMATION</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 pl-0 sm:pl-2 flex-1 items-center w-full">
                  {layer3Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 sm:gap-2 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent">
                      <div className="transition-all duration-300 group-hover:scale-115 group-hover:rotate-[6deg] shrink-0">
                        {cap.logo}
                      </div>
                      <span className="text-[11.5px] sm:text-[11px] lg:text-[11.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-tight">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layer 04: Data & Intelligence */}
              <div className="relative p-3 sm:p-3.5 lg:p-3 rounded-[14px] lg:rounded-[12px] border border-orange-500/25 bg-white shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 min-h-[66px]">
                <div className="w-full sm:w-[102px] shrink-0 text-left flex sm:block items-center justify-between sm:justify-start pb-1.5 sm:pb-0 border-b sm:border-b-0 border-orange-500/15 pl-0.5">
                  <div>
                    <span className="text-[10px] font-black text-orange-600 block tracking-wider uppercase mb-0.5">LAYER 04</span>
                    <span className="text-[11px] font-black text-slate-900 tracking-tight uppercase leading-tight block">DATA & INTELLIGENCE</span>
                  </div>
                </div>
                <div className="hidden sm:block w-[1px] h-9 bg-orange-500/25 self-center shrink-0" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 pl-0 sm:pl-2 flex-1 items-center w-full">
                  {layer4Caps.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 sm:gap-2 group cursor-pointer bg-slate-50/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-100 sm:border-none transition-all duration-200 hover:bg-orange-50/50 sm:hover:bg-transparent">
                      <div className="transition-all duration-300 group-hover:scale-115 group-hover:rotate-[6deg] shrink-0">
                        {cap.logo}
                      </div>
                      <span className="text-[11.5px] sm:text-[11px] lg:text-[11.5px] font-bold text-slate-700 group-hover:text-orange-600 transition-colors duration-200 leading-tight">{cap.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col B (Central Glowing Microsoft Core - Sci-fi dial design) */}
            <div className="lg:col-span-2 flex items-center justify-center relative z-10 py-6 lg:py-0">
              <div className="relative flex items-center justify-center w-[150px] h-[150px] sm:w-[180px] sm:h-[180px]">
                {/* Concentric rotating neon circles with technical cockpit ticks */}
                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[spin_20s_linear_infinite] shadow-[0_0_40px_rgba(255,107,44,0.05)]" />
                <div className="absolute inset-2 sm:inset-3 rounded-full border border-orange-500/20 animate-[spin_12s_linear_infinite_reverse]" />
                
                <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,107,44,0.12)" strokeWidth="1" fill="none" strokeDasharray="1 3" />
                  <circle cx="50" cy="50" r="42" stroke="rgba(255,107,44,0.22)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
                </svg>

                {/* Core content with inner reflection */}
                <div className="absolute inset-4 sm:inset-5 rounded-full bg-white border-2 border-orange-400/50 shadow-[inset_0_0_20px_rgba(255,107,44,0.05),0_0_30px_rgba(255,107,44,0.15)] flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
                  <MicrosoftLogo className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-500 hover:scale-110 hover:rotate-[360deg] cursor-pointer" />
                  <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-black tracking-[0.14em] text-slate-900 select-none">AGENTIC</span>
                  <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-black tracking-[0.08em] text-orange-600 select-none">RUNTIME</span>
                </div>
              </div>
            </div>

            {/* Col C (5 Capabilities indicators - Overlapping Circular Buttons on Glow Cards) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3 lg:gap-0 py-1 h-auto lg:h-[440px] text-left pl-0 lg:pl-3 relative z-10">
              {rightCapabilities.map((cap, idx) => (
                <div key={idx} className="relative flex items-center pl-5 sm:pl-6 w-full group">
                  {/* Circular indicator button offset to the left */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border-2 ${cap.borderClass} ${cap.glowClass} z-20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[15deg]`}>
                    {cap.icon}
                  </div>
                  {/* Text banner with matching card border color */}
                  <div className={`w-full border ${cap.borderClass} bg-white p-2.5 sm:p-2.5 pl-8 sm:pl-10 rounded-lg text-left transition-all duration-300 ${cap.hoverBorder} shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}>
                    <span className={`text-[11.5px] sm:text-[12px] lg:text-[13px] font-black block tracking-wider uppercase mb-0.5 ${cap.textClass}`}>
                      {cap.title}
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] lg:text-[11px] text-slate-500 leading-snug block font-semibold group-hover:text-slate-700 transition-colors duration-200">
                      {cap.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Integrated bottom delivering business impact banner */}
      <div className="relative overflow-hidden rounded-[20px] border border-orange-500/20 bg-white py-4 px-4 sm:px-6 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6 z-10 text-slate-900 w-full">
        
        {/* Mirror-morphism reflection glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,44,0.03),transparent_50%)] pointer-events-none" />
        
        {/* Header left */}
        <div className="flex items-center gap-3 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 pb-3 lg:pb-0 lg:pr-6 w-full lg:w-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-orange-500/40 text-orange-600 shadow-[0_0_10px_rgba(255,107,44,0.05)] animate-pulse">
            <Target className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <span className="text-[13px] sm:text-[14.5px] lg:text-[15px] font-black text-orange-600 tracking-wider uppercase select-none">DELIVERING BUSINESS IMPACT</span>
          </div>
        </div>
 
        {/* 5 Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap justify-between items-center w-full gap-4">
          {businessImpactMetrics.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-3 text-left group">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-orange-500/20 shadow-[0_0_8px_rgba(255,107,44,0.05)] transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 shrink-0">
                  {React.cloneElement(metric.icon, { className: "w-4.5 h-4.5 text-orange-600 animate-pulse" })}
                </div>
                <div>
                  <span className="text-[12px] sm:text-[13px] font-black text-slate-900 block tracking-tight uppercase leading-none mb-0.5">{metric.title}</span>
                  <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] text-slate-500 font-semibold block leading-none">{metric.value}</span>
                </div>
              </div>
              {idx < businessImpactMetrics.length - 1 && (
                <div className="hidden lg:block w-[1px] h-6 bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

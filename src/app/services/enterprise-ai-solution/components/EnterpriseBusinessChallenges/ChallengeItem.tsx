"use client";

import React from 'react';
import { motion } from 'framer-motion';

import {
    BadgeDollarSign,
    BrainCircuit,
    ShieldAlert,
    Hourglass,
    Network,
    Bot,
    ServerCog,
    Rocket
} from 'lucide-react';

const SvgIcon = ({ children }: { children: React.ReactNode }) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
        {children}
    </svg>
);

const getIcon = (type: string) => {
    const lucideProps = { className: "w-full h-full", strokeWidth: 1.5 };
    switch (type) {
        case 'badge-dollar': return <BadgeDollarSign {...lucideProps} />;
        case 'brain-circuit': return <BrainCircuit {...lucideProps} />;
        case 'shield-alert': return <ShieldAlert {...lucideProps} />;
        case 'hourglass': return <Hourglass {...lucideProps} />;
        case 'network': return <Network {...lucideProps} />;
        case 'bot': return <Bot {...lucideProps} />;
        case 'server-cog': return <ServerCog {...lucideProps} />;
        case 'rocket': return <Rocket {...lucideProps} />;

        case 'headset': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0A9 9 0 005.636 5.636m12.728 0A9 9 0 0112 3v1m0 16v1" /></SvgIcon>;
        case 'document': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></SvgIcon>;
        case 'database': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></SvgIcon>;
        case 'edit': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></SvgIcon>;
        case 'workflow': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2zM9 8h2v5h3" /></SvgIcon>;
        case 'link': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></SvgIcon>;
        case 'user': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></SvgIcon>;
        case 'clock': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></SvgIcon>;
        case 'lock': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></SvgIcon>;
        case 'robot': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></SvgIcon>;
        case 'brain': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></SvgIcon>;
        case 'grid': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></SvgIcon>;
        case 'chart': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></SvgIcon>;
        case 'cpu': return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></SvgIcon>;
        default: return <SvgIcon><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></SvgIcon>;
    }
}

export default function ChallengeItem({
    item,
    isRight,
    isActive,
    onHover,
    onLeave
}: {
    item: any,
    isRight: boolean,
    isActive: boolean,
    onHover: () => void,
    onLeave: () => void
}) {
    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            animate={isActive ? { y: -4 } : { y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative flex items-center gap-4 p-4 rounded-xl border shadow-[0_2px_10px_rgb(0,0,0,0.02)] cursor-pointer transition-all duration-300 ease-out w-full
        ${!isRight ? (
                    isActive
                        ? 'bg-[#FFF9F6] border-transparent text-[#FF5812] shadow-[0_8px_20px_rgba(0,0,0,0.15)]'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)]'
                ) : (
                    isActive
                        ? 'bg-[#FFF1EA] border-transparent border-l-[4px] border-l-[#FF5812] shadow-[0_8px_20px_rgb(0,0,0,0.06)] text-[#FF5812]'
                        : 'bg-white border-[#ECECEC] border-l-[4px] border-l-transparent text-slate-800 hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)]'
                )}
      `}
        >
            <div className={`shrink-0 w-6 h-6 flex items-center justify-center transition-colors duration-300
        ${!isRight ? (isActive ? 'text-[#FF5812]' : 'text-white') : (isActive ? 'text-[#FF5812]' : 'text-blue-500')}
      `}>
                {getIcon(item.icon)}
            </div>

            <div className="flex-1">
                <span className={`text-[14px] font-medium transition-colors duration-300
          ${!isRight ? (isActive ? 'text-[#FF5812]' : 'text-white') : (isActive ? 'text-[#FF5812]' : 'text-slate-800')}
        `}>
                    {item.title}
                </span>
            </div>

        </motion.div>
    );
}

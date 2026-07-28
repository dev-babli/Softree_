import React from 'react';
import { heroData } from '../data/hero';

const LogoPlaceholder = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-1.5 text-slate-700 font-semibold opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap">
      <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center">
        {/* Generic icon shape */}
        <div className="w-2.5 h-2.5 bg-slate-400 rounded-[2px]"></div>
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
}

export default function TrustRibbon() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8 lg:mt-10">
      <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-100 rounded-xl p-3 lg:p-4 flex flex-col lg:flex-row items-center gap-6 shadow-sm">
        <div className="flex flex-col items-center lg:items-start flex-shrink-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            TRUSTED BY<br />INNOVATIVE ENTERPRISES
          </span>
        </div>
        
        <div className="w-[1px] h-8 bg-slate-200 hidden lg:block"></div>
        
        <div className="flex-1 w-full overflow-hidden">
          <div className="flex items-center justify-between gap-6 min-w-max px-2">
            {heroData.trustLogos.map((logo, index) => (
              <LogoPlaceholder key={index} name={logo.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

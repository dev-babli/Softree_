import React from 'react';

export default function SectionBadge({ text, variant = 'pill' }: { text: string, variant?: 'pill' | 'line' }) {
  if (variant === 'line') {
    return (
      <div className="mb-4 flex items-center justify-center gap-4 md:gap-6">
        <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
          <div className="absolute left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] -translate-x-1/2"></div>
        </div>
        <span className="text-[#FF5812] font-bold tracking-[0.2em] text-[11px] uppercase">
          {text}
        </span>
        <div className="flex items-center relative h-[1.5px] w-10 sm:w-16 bg-[#FF5812]">
          <div className="absolute right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 bg-[#FF5812] translate-x-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center w-fit gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
      <span className="text-[10px] font-bold tracking-wider text-orange-600 uppercase">
        {text}
      </span>
    </div>
  );
}

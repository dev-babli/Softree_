import React from 'react';

export default function SectionBadge({ text, variant = 'pill' }: { text: string, variant?: 'pill' | 'line' }) {
  if (variant === 'line') {
    return (
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-[1px] bg-orange-200"></div>
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-[11px] font-bold tracking-widest text-orange-600 uppercase">
            {text}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
        </div>
        <div className="w-8 h-[1px] bg-orange-200"></div>
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

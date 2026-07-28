import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const IconPlaceholder = ({ type }: { type: string }) => {
  // Return different SVG icons based on type
  if (type === 'security') {
    return (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (type === 'custom') {
    return (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    );
  }
  if (type === 'impact') {
    return (
      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );
};

export default function HeroFeatureList({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 border-t border-slate-100">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center">
              <IconPlaceholder type={feature.icon} />
            </div>
            <h3 className="text-[12px] font-semibold text-slate-800 leading-tight">
              {feature.title}
            </h3>
          </div>
          <p className="text-[10px] text-slate-500">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

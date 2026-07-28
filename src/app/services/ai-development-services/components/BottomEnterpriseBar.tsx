import React from 'react';

export default function BottomEnterpriseBar() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12 bg-[#FAFAF9] border border-[#ECECEC] rounded-2xl p-4 flex items-center justify-center gap-3">
      <div className="text-orange-500">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <span className="text-[14px] font-medium text-slate-700">
        Secure. Scalable. Intelligent. Built for Enterprise.
      </span>
    </div>
  );
}

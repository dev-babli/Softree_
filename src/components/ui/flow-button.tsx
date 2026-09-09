'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  variant?: 'orange-filled' | 'orange-outline' | 'dark' | 'white' | 'white-filled' | 'dark-filled';
  className?: string;
  children?: React.ReactNode;
  as?: 'button' | 'div' | 'span';
}

export function FlowButton({ 
  text = "Modern Button",
  href,
  variant = "orange-filled",
  className = "",
  children,
  onClick,
  as,
  ...props 
}: FlowButtonProps) {
  const content = text || children;

  // Variant styling configurations
  const variantStyles = {
    'orange-filled': {
      button: 'border-[#FF5812] bg-[#FF5812] text-white shadow-[0_6px_20px_rgba(255,88,18,0.25)] hover:shadow-[0_12px_28px_rgba(255,88,18,0.35)]',
      circle: 'bg-[#0D0E12]',
      arrowInitial: 'stroke-white',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
    'orange-outline': {
      button: 'border-[#FF5812] bg-transparent text-[#FF5812] hover:border-transparent',
      circle: 'bg-[#FF5812]',
      arrowInitial: 'stroke-[#FF5812]',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
    'dark': {
      button: 'border-[#333333]/40 bg-transparent text-[#111111] hover:border-transparent',
      circle: 'bg-[#111111]',
      arrowInitial: 'stroke-[#111111]',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
    'white': {
      button: 'border-white/30 bg-white/10 backdrop-blur-md text-white hover:border-transparent',
      circle: 'bg-[#FF5812]',
      arrowInitial: 'stroke-white',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
    'white-filled': {
      button: 'border-white bg-white text-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-transparent',
      circle: 'bg-[#FF5812]',
      arrowInitial: 'stroke-[#111111]',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
    'dark-filled': {
      button: 'border-[#111111] bg-[#111111] text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:border-transparent',
      circle: 'bg-[#FF5812]',
      arrowInitial: 'stroke-white',
      arrowHover: 'group-hover:stroke-white',
      textHover: 'group-hover:text-white',
    },
  }[variant];

  const innerContent = (
    <>
      {/* Left arrow (arr-2) - slides in from left on hover */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          variantStyles.arrowInitial,
          variantStyles.arrowHover
        )} 
      />
 
      {/* Text - shifts right on hover */}
      <span className={cn(
        "relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out",
        variantStyles.textHover
      )}>
        {content}
      </span>
 
      {/* Circle - expands from center to fill button on hover */}
      <span className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:w-[600px] group-hover:h-[600px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none",
        variantStyles.circle
      )}></span>
 
      {/* Right arrow (arr-1) - slides out to right on hover */}
      <ArrowRight 
        className={cn(
          "absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          variantStyles.arrowInitial,
          variantStyles.arrowHover
        )} 
      />
    </>
  );

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[14px] active:scale-[0.95] select-none",
    variantStyles.button,
    className
  );

  if (as === 'div') {
    return (
      <div onClick={onClick as any} className={baseClasses}>
        {innerContent}
      </div>
    );
  }

  if (as === 'span') {
    return (
      <span onClick={onClick as any} className={baseClasses}>
        {innerContent}
      </span>
    );
  }

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} {...props}>
      {innerContent}
    </button>
  );
}

export default FlowButton;

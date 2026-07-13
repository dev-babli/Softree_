import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/**/*.{js,ts,jsx,tsx,mdx}',
    '../../frontend/**/*.{js,ts,jsx,tsx,mdx}',
    '../../studio/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          base: 'var(--neo-bg-base)',
          surface: 'var(--neo-bg-surface)',
          elevated: 'var(--neo-bg-elevated)',
          overlay: 'var(--neo-bg-overlay)',
          subtle: 'var(--neo-bg-subtle)',
        },
        text: {
          primary: 'var(--neo-text-primary)',
          secondary: 'var(--neo-text-secondary)',
          tertiary: 'var(--neo-text-tertiary)',
          muted: 'var(--neo-text-muted)',
          inverse: 'var(--neo-text-inverse)',
        },
        brand: {
          primary: 'var(--neo-brand-primary)',
          'primary-hover': 'var(--neo-brand-primary-hover)',
          'primary-subtle': 'var(--neo-brand-primary-subtle)',
          secondary: 'var(--neo-brand-secondary)',
          'secondary-subtle': 'var(--neo-brand-secondary-subtle)',
        },
        status: {
          success: 'var(--neo-status-success)',
          warning: 'var(--neo-status-warning)',
          error: 'var(--neo-status-error)',
          info: 'var(--neo-status-info)',
          neutral: 'var(--neo-status-neutral)',
        },
        border: {
          DEFAULT: 'var(--neo-border-default)',
          hover: 'var(--neo-border-hover)',
          active: 'var(--neo-border-active)',
          error: 'var(--neo-border-error)',
        },
      },
      borderRadius: {
        sm: 'var(--neo-radius-sm)',
        md: 'var(--neo-radius-md)',
        lg: 'var(--neo-radius-lg)',
        xl: 'var(--neo-radius-xl)',
        full: 'var(--neo-radius-full)',
      },
      spacing: {
        '1': 'var(--neo-space-1)',
        '2': 'var(--neo-space-2)',
        '3': 'var(--neo-space-3)',
        '4': 'var(--neo-space-4)',
        '5': 'var(--neo-space-5)',
        '6': 'var(--neo-space-6)',
        '8': 'var(--neo-space-8)',
        '10': 'var(--neo-space-10)',
        '12': 'var(--neo-space-12)',
        '16': 'var(--neo-space-16)',
      },
      fontFamily: {
        sans: ['var(--neo-font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--neo-font-mono)', 'monospace'],
      },
      backgroundImage: {
        'ai-gradient': 'linear-gradient(135deg, var(--neo-brand-primary), var(--neo-brand-secondary))',
      },
      boxShadow: {
        sm: 'var(--neo-shadow-sm)',
        md: 'var(--neo-shadow-md)',
        lg: 'var(--neo-shadow-lg)',
        glow: 'var(--neo-shadow-glow)',
        focus: 'var(--neo-focus-ring)',
      },
      transitionDuration: {
        '100': 'var(--neo-duration-fast)',
        '150': 'var(--neo-duration-normal)',
        '250': 'var(--neo-duration-slow)',
      },
      transitionTimingFunction: {
        'neo-default': 'var(--neo-ease-default)',
        'neo-out': 'var(--neo-ease-out)',
      },
      keyframes: {
        'ai-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'ai-shimmer': 'ai-shimmer 2s linear infinite',
        'skeleton-pulse': 'skeleton-pulse 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 150ms ease-out',
        'scale-in': 'scale-in 150ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;

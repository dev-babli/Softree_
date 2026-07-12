import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
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
      fontFamily: {
        sans: ['var(--neo-font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--neo-font-mono)', 'monospace'],
      },
      boxShadow: {
        focus: 'var(--neo-focus-ring)',
        glow: 'var(--neo-shadow-glow)',
      },
      keyframes: {
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
        'fade-in': 'fade-in 150ms ease-out',
        'scale-in': 'scale-in 150ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;

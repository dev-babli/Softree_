import { cn } from '../lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-100',
          'focus:outline-none focus-visible:shadow-focus',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover': variant === 'primary',
            'bg-neo-elevated text-text-primary border border-border hover:border-border-hover': variant === 'secondary',
            'bg-transparent text-text-secondary hover:bg-neo-elevated hover:text-text-primary': variant === 'ghost',
            'bg-brand-secondary-subtle text-brand-secondary border border-brand-secondary/30 hover:bg-brand-secondary/25': variant === 'destructive',
            'bg-brand-primary-subtle text-text-primary border border-brand-primary/30 hover:bg-brand-primary/25': variant === 'ai',
            'h-7 px-2 text-xs': size === 'sm',
            'h-9 px-3 text-sm': size === 'md',
            'h-11 px-5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

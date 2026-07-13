import { cn } from '../lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <input
          ref={ref}
          className={cn(
            'flex h-9 w-full rounded-md border bg-neo-surface px-3 py-2 text-sm text-text-primary',
            'placeholder:text-text-tertiary',
            'focus:outline-none focus-visible:border-brand-primary/50 focus-visible:shadow-focus',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-border-error',
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-status-error">{error}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

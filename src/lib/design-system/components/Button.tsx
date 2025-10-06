/**
 * Yello Solar Hub - Button Component
 * Based on Vercel Geist Design System
 * 
 * Variants:
 * - primary: Yello Yellow (#FFEE00) - Main CTA
 * - secondary: Yello Orange (#FF6600) - Secondary actions
 * - tertiary: Yello Magenta (#FF0066) - Accent actions
 * - ghost: Transparent with border - Subtle actions
 * - outline: Gray outline - Neutral actions
 */

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles (Vercel Geist)
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 
          'bg-yello-yellow text-black hover:bg-yello-yellow400 active:bg-yello-yellow500 focus-visible:ring-yello-yellow shadow-sm',
        secondary: 
          'bg-yello-orange text-white hover:bg-yello-orange400 active:bg-yello-orange500 focus-visible:ring-yello-orange shadow-sm',
        tertiary: 
          'bg-yello-magenta text-white hover:bg-yello-magenta400 active:bg-yello-magenta500 focus-visible:ring-yello-magenta shadow-sm',
        ghost: 
          'bg-transparent hover:bg-geist-100 active:bg-geist-200 text-geist-900 border border-geist-200',
        outline: 
          'bg-white hover:bg-geist-50 active:bg-geist-100 text-geist-900 border border-geist-300 shadow-sm',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500 shadow-sm',
        link:
          'text-geist-900 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-sm',      // 36px height
        md: 'h-10 px-4 text-base',   // 40px height (default)
        lg: 'h-12 px-6 text-lg',     // 48px height
        xl: 'h-14 px-8 text-xl',     // 56px height
        icon: 'h-10 w-10',           // Square icon button
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

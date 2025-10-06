/**
 * Yello Solar Hub - Button Component
 * Based on Medusa UI with Yello Solar brand customization
 *
 * Variants:
 * - primary: Yello Yellow (#FFEE00) - Main CTA
 * - secondary: Yello Orange (#FF6600) - Secondary actions
 * - tertiary: Yello Magenta (#FF0066) - Accent actions
 * - ghost: Transparent with border - Subtle actions
 * - outline: Gray outline - Neutral actions
 */

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Button as MedusaButton } from '@medusajs/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Yello-specific variants that override Medusa defaults
const yelloButtonVariants = cva('', {
  variants: {
    yelloVariant: {
      primary: 'bg-[var(--button-primary)] text-black hover:bg-[var(--button-primary-hover)] border-[var(--button-primary)]',
      secondary: 'bg-[var(--button-secondary)] text-white hover:bg-[var(--button-secondary-hover)] border-[var(--button-secondary)]',
      tertiary: 'bg-[var(--button-tertiary)] text-white hover:bg-[var(--button-tertiary-hover)] border-[var(--button-tertiary)]',
      ghost: 'bg-transparent hover:bg-geist-100 border-geist-200 text-geist-900',
      outline: 'bg-white hover:bg-geist-50 border-geist-300 text-geist-900',
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
    yelloVariant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof yelloButtonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, yelloVariant = 'primary', size, fullWidth, loading, children, disabled, ...props }, ref) => {
    // Map Yello variants to Medusa variants for base functionality
    const medusaVariantMap: Record<NonNullable<typeof yelloVariant>, 'primary' | 'secondary' | 'danger' | 'transparent'> = {
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'danger', // Reuse danger for magenta
      ghost: 'transparent',
      outline: 'secondary',
    };

    const medusaVariant = medusaVariantMap[yelloVariant!];

    return (
      <MedusaButton
        ref={ref}
        variant={medusaVariant}
        className={cn(
          yelloButtonVariants({ yelloVariant, size, fullWidth }),
          // Override Medusa styles with Yello colors
          yelloVariant === 'primary' && 'shadow-sm focus-visible:ring-[var(--border-focus)]',
          yelloVariant === 'secondary' && 'shadow-sm focus-visible:ring-[var(--border-focus)]',
          yelloVariant === 'tertiary' && 'shadow-sm focus-visible:ring-[var(--border-focus)]',
          className
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin animate-bounce"
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
      </MedusaButton>
    );
  }
);

Button.displayName = 'Button';

export { Button, yelloButtonVariants };

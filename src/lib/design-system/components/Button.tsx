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

"use client"

import React, { forwardRef, useMemo, ButtonHTMLAttributes } from 'react';
import { Button as MedusaButton } from '@medusajs/ui';
import { withRenderCounter } from '@/lib/design-system/dev/withRenderCounter'
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

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
  /**
   * Estado de carregamento - mostra spinner e desabilita interação
   * @default false
   */
  loading?: boolean;
}

const MEDUSA_VARIANT_MAP = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'danger', // Reuse danger for magenta
  ghost: 'transparent',
  outline: 'secondary',
} as const;

const ButtonInner = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, yelloVariant = 'primary', size, fullWidth, loading, children, disabled, ...props }, ref) => {
    const medusaVariant = MEDUSA_VARIANT_MAP[yelloVariant! as keyof typeof MEDUSA_VARIANT_MAP];

    const combinedClassName = useMemo(
      () =>
        cn(
          yelloButtonVariants({ yelloVariant, size, fullWidth }),
          // Override Medusa styles with Yello colors
          (yelloVariant === 'primary' || yelloVariant === 'secondary' || yelloVariant === 'tertiary') &&
          'shadow-sm focus-visible:ring-[var(--border-focus)]',
          className
        ),
      [yelloVariant, size, fullWidth, className]
    );

    return (
      <MedusaButton
        ref={ref}
        variant={medusaVariant}
        className={combinedClassName}
        disabled={disabled || loading}
        aria-busy={loading ? 'true' : undefined}
        {...props}
      >
        {loading && <Spinner size="sm" className="mr-2" />}
        {children}
      </MedusaButton>
    );
  }
);

const Button = React.memo(ButtonInner);
Button.displayName = 'Button';

const ExportedButton = process.env.NODE_ENV === 'development' ? withRenderCounter(Button, 'Button') : Button

export { ExportedButton as Button, yelloButtonVariants }

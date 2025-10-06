/**
 * Yello Solar Hub - Input Component
 * Based on Medusa UI with Yello Solar brand customization
 */

import { forwardRef, InputHTMLAttributes } from 'react';
import { Input as MedusaInput } from '@medusajs/ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const yelloInputVariants = cva('', {
    variants: {
        size: {
            base: 'h-8 px-2 py-1.5',
            small: 'h-7 px-2 py-1',
        },
    },
    defaultVariants: {
        size: 'base',
    },
});

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof yelloInputVariants> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <MedusaInput
                ref={ref}
                className={cn(
                    yelloInputVariants({ size }),
                    // Yello brand focus styles
                    'focus-visible:border-[var(--border-interactive)] focus-visible:ring-[var(--shadow-focus)]',
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
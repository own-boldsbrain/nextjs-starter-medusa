/**
 * Button Component — Yello Design System
 * Wrapper over @medusajs/ui Button with Yello styling
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-yello-yellow text-geist-900 hover:bg-yello-yellow400 shadow-sm',
                secondary: 'bg-yello-orange text-white hover:bg-yello-orange400 shadow-sm',
                tertiary: 'bg-yello-magenta text-white hover:bg-yello-magenta400 shadow-sm',
                ghost: 'hover:bg-geist-100 hover:text-geist-900',
                outline: 'border border-geist-300 bg-transparent hover:bg-geist-50',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4',
                lg: 'h-12 px-6 text-base',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

// Select component (cleaned header)
import React from 'react';
import { Select as MedusaSelect } from '@medusajs/ui';
import { cn } from '@/lib/utils';

type MedusaSelectProps = React.ComponentPropsWithoutRef<typeof MedusaSelect>;

export interface SelectProps extends Omit<MedusaSelectProps, 'size'> {
    size?: 'base' | 'small'
}

const SelectInner = React.forwardRef<any, SelectProps>(({ size = 'base', className, children, ...props }, ref) => {
    const sizeClasses = size === 'base' ? 'h-8' : 'h-7';

    return (
        <MedusaSelect
            ref={ref}
            className={cn(
                sizeClasses,
                'focus-visible:border-[var(--border-interactive)] focus-visible:ring-[var(--shadow-focus)]',
                className
            )}
            {...props}
        >
            {children}
        </MedusaSelect>
    );
});

const Select = React.memo(SelectInner);
Select.displayName = 'Select';

export { Select };
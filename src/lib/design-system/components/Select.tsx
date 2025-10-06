/**/**

 * Yello Solar Hub - Select Component * Yello Solar Hub - Select Component

    * Based on Medusa UI with Yello Solar brand customization * Based on Medusa UI with Yello Solar brand customization

        * / */



import { Select as MedusaSelect } from '@medusajs/ui'; import { forwardRef, SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/utils'; import { Select as MedusaSelect } from '@medusajs/ui';

import { cva, type VariantProps } from 'class-variance-authority';

export interface SelectProps {import { cn } from '@/lib/utils';

size ?: 'base' | 'small';

className ?: string; const yelloSelectVariants = cva('', {

    children?: React.ReactNode; variants: {

        [key: string]: any; size: {

        }            base: 'h-8',

        small: 'h-7',

        const Select: React.FC<SelectProps> = ({},

            size = 'base',    },

    className, defaultVariants: {

        children, size: 'base',

        ...props
    },

}) => { });

const sizeClasses = {

    base: 'h-8', export interface SelectProps

    small: 'h-7', extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,

}; VariantProps < typeof yelloSelectVariants > {}



return (const Select = forwardRef<HTMLSelectElement, SelectProps>(

    <MedusaSelect  ({ className, size, children, ...props }) => {

        className = {
            cn(    return(

                sizeClasses[size],      <MedusaSelect

        // Yello brand focus styles        className={cn(

        'focus-visible:border-[var(--border-interactive)] focus-visible:ring-[var(--shadow-focus)]', yelloSelectVariants({ size }),

            className          // Yello brand focus styles

      )}          'focus-visible:border-[var(--border-interactive)] focus-visible:ring-[var(--shadow-focus)]',

    { ...props }          className

    >        )}

{ children } {...props }

    </MedusaSelect >      >

  ); { children }

};      </MedusaSelect >

    );

Select.displayName = 'Select';  }

); Select.displayName = 'Select';

export { Select };
export { Select };
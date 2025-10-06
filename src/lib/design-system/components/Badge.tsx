/**/**

 * Yello Solar Hub - Badge Component * Yello Solar Hub - Badge Component

    * Custom implementation with Yello Solar brand styling * Based on Medusa UI with Yello Solar brand customization

        * / */



import { cva, type VariantProps } from 'class-variance-authority'; import { Badge as MedusaBadge } from '@medusajs/ui';

import { cn } from '@/lib/utils'; import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const yelloBadgeVariants = cva(

    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',const yelloBadgeVariants = cva(

        {
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',

            variants: {    {

        variant: {
            variants: {

                default: 'bg-geist-100 text-geist-900', variant: {

                    yellow: 'bg-yello-yellow50 text-yello-yellow500 border border-yello-yellow200', default: 'bg-geist-100 text-geist-900',

                    orange: 'bg-yello-orange50 text-yello-orange500 border border-yello-orange200', yellow: 'bg-yello-yellow50 text-yello-yellow500 border border-yello-yellow200',

                    magenta: 'bg-yello-magenta50 text-yello-magenta500 border border-yello-magenta200', orange: 'bg-yello-orange50 text-yello-orange500 border border-yello-orange200',

                    destructive: 'bg-red-100 text-red-700 border border-red-200', magenta: 'bg-yello-magenta50 text-yello-magenta500 border border-yello-magenta200',

                }, destructive: 'bg-red-100 text-red-700 border border-red-200',

            },
        },

        defaultVariants: {},

        variant: 'default', defaultVariants: {

        }, variant: 'default',

    }        },

);    }

);

export interface BadgeProps

    extends React.HTMLAttributes<HTMLDivElement>,export interface BadgeProps

  VariantProps < typeof yelloBadgeVariants > {}    extends React.HTMLAttributes<HTMLDivElement>,

    VariantProps < typeof yelloBadgeVariants > {}

const Badge: React.FC<BadgeProps> = ({

    className, const Badge: React.FC<BadgeProps> = ({

        variant, className,

        ...props    variant,

    }) => {    ...props

  return(}) => {

    <div return (

        className = { cn(yelloBadgeVariants({ variant }), className)
} <MedusaBadge

    {...props} className={cn(yelloBadgeVariants({ variant }), className)}

/>            {...props }

  );        />

};    );

};

Badge.displayName = 'Badge';

Badge.displayName = 'Badge';

export { Badge };
export { Badge };
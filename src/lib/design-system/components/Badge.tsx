import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const yelloBadgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
    {
        variants: {
            variant: {
                default: 'bg-geist-100 text-geist-900',
                yellow: 'bg-yello-yellow50 text-yello-yellow500 border border-yello-yellow200',
                orange: 'bg-yello-orange50 text-yello-orange500 border border-yello-orange200',
                magenta: 'bg-yello-magenta50 text-yello-magenta500 border border-yello-magenta200',
                destructive: 'bg-red-100 text-red-700 border border-red-200',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof yelloBadgeVariants> { }

const BadgeComponent: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
    return <div className={cn(yelloBadgeVariants({ variant }), className)} {...props} />;
};

const Badge = React.memo(BadgeComponent);
Badge.displayName = 'Badge';

export { Badge };
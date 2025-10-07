/**
 * Spinner Component
 * 
 * Loading indicator para estados de carregamento em buttons, forms e overlays.
 * Implementação minimalista com animação CSS pura.
 * 
 * Uso:
 * - Button loading state
 * - Form submission feedback
 * - Page transitions
 */

import { cn } from '@/lib/utils'

interface SpinnerProps {
    /**
     * Tamanho do spinner
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg'

    /**
     * Cor do spinner (usa currentColor por padrão)
     */
    className?: string

    /**
     * Aria label para acessibilidade
     * @default 'Carregando...'
     */
    'aria-label'?: string
}

const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-[3px]',
}

export function Spinner({
    size = 'md',
    className,
    'aria-label': ariaLabel = 'Carregando...',
}: SpinnerProps) {
    return (
        <div
            role="status"
            aria-label={ariaLabel}
            className={cn(
                'inline-block rounded-full border-solid border-current border-r-transparent',
                'animate-spin',
                sizeMap[size],
                className
            )}
            data-testid="spinner"
        >
            <span className="sr-only">{ariaLabel}</span>
        </div>
    )
}

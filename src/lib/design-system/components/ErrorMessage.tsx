/**
 * Error Message Component
 * 
 * Componente reutilizável para exibir mensagens de erro com estilo consistente.
 * Padrão Medusa: rose-50 background, rose-600 text, icon + mensagem.
 * 
 * Uso:
 * - Form validation errors
 * - API error responses
 * - Checkout step errors
 * - Product actions feedback
 * 
 * @see https://github.com/medusajs/nextjs-starter-medusa/blob/main/src/modules/checkout/components/error-message/index.tsx
 */

import { cn } from '@/lib/utils'

// Inline ExclamationCircle icon
const ExclamationCircleIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
    </svg>
)

interface ErrorMessageProps {
    /**
     * Mensagem de erro a ser exibida
     */
    error?: string | null

    /**
     * Classes CSS adicionais
     */
    className?: string

    /**
     * Data-testid para testes automatizados
     */
    'data-testid'?: string
}

export function ErrorMessage({
    error,
    className,
    'data-testid': dataTestid = 'error-message',
}: ErrorMessageProps) {
    if (!error) {
        return null
    }

    return (
        <div
            className={cn(
                'flex items-center gap-x-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-600',
                'border border-rose-100',
                className
            )}
            role="alert"
            aria-live="polite"
            data-testid={dataTestid}
        >
            <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
        </div>
    )
}

/**
 * Success Message Component
 * 
 * Variante para mensagens de sucesso.
 */
interface SuccessMessageProps {
    message?: string | null
    className?: string
    'data-testid'?: string
}

export function SuccessMessage({
    message,
    className,
    'data-testid': dataTestid = 'success-message',
}: SuccessMessageProps) {
    if (!message) {
        return null
    }

    return (
        <div
            className={cn(
                'flex items-center gap-x-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600',
                'border border-emerald-100',
                className
            )}
            role="alert"
            aria-live="polite"
            data-testid={dataTestid}
        >
            <svg
                className="h-5 w-5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                />
            </svg>
            <span>{message}</span>
        </div>
    )
}

/**
 * Info Message Component
 * 
 * Variante para mensagens informativas.
 */
interface InfoMessageProps {
    message?: string | null
    className?: string
    'data-testid'?: string
}

export function InfoMessage({
    message,
    className,
    'data-testid': dataTestid = 'info-message',
}: InfoMessageProps) {
    if (!message) {
        return null
    }

    return (
        <div
            className={cn(
                'flex items-center gap-x-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-600',
                'border border-blue-100',
                className
            )}
            role="alert"
            aria-live="polite"
            data-testid={dataTestid}
        >
            <svg
                className="h-5 w-5 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clipRule="evenodd"
                />
            </svg>
            <span>{message}</span>
        </div>
    )
}

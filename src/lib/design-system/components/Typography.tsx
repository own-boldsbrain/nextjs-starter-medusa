/**
 * Typography Helpers - @medusajs/ui Integration
 * 
 * Wrappers para Heading e Text do @medusajs/ui com Yello branding.
 * Migração de classes Tailwind diretas para token system consistente.
 * 
 * Classes disponíveis:
 * - text-3xl-semi → Heading H1
 * - text-2xl-semi → Heading H2
 * - text-xl-semi → Heading H3
 * - text-large-semi → Body large semibold
 * - text-base-regular → Body base regular
 * - text-small-regular → Body small regular
 * - txt-compact-medium → Compact buttons/labels
 * 
 * @see https://docs.medusajs.com/ui
 */

import { Heading as MedusaHeading, Text as MedusaText } from '@medusajs/ui'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

// ============================================
// Heading Component
// ============================================

type HeadingLevel = 'h1' | 'h2' | 'h3'
type HeadingSize = '3xl' | '2xl' | 'xl' | 'lg' | 'base'

interface HeadingProps extends Omit<ComponentProps<typeof MedusaHeading>, 'level'> {
    /**
     * Semantic heading level (h1-h6)
     * @default 'h2'
     */
    level?: HeadingLevel

    /**
     * Visual size (independent of semantic level)
     * @default 'xl'
     */
    size?: HeadingSize

    /**
     * Apply Yello gradient (yellow → orange → magenta)
     */
    gradient?: boolean
}

const headingSizeMap: Record<HeadingSize, string> = {
    '3xl': 'text-3xl-semi',
    '2xl': 'text-2xl-semi',
    'xl': 'text-xl-semi',
    'lg': 'text-large-semi',
    'base': 'text-base-semi',
}

export function Heading({
    level = 'h2',
    size = 'xl',
    gradient = false,
    className,
    children,
    ...props
}: HeadingProps) {
    return (
        <MedusaHeading
            level={level}
            className={cn(
                headingSizeMap[size],
                gradient && 'bg-gradient-to-r from-yello-yellow via-yello-orange to-yello-magenta bg-clip-text text-transparent',
                className
            )}
            {...props}
        >
            {children}
        </MedusaHeading>
    )
}

// ============================================
// Text Component
// ============================================

type TextSize = 'large' | 'base' | 'small' | 'xsmall'
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
type TextColor = 'base' | 'subtle' | 'muted' | 'disabled' | 'interactive'

interface TextProps extends Omit<ComponentProps<typeof MedusaText>, 'size' | 'weight'> {
    /**
     * Text size
     * @default 'base'
     */
    size?: TextSize

    /**
     * Text weight
     * @default 'regular'
     */
    weight?: TextWeight

    /**
     * Semantic color from Medusa UI token system
     * @default 'base'
     */
    color?: TextColor

    /**
     * Compact variant (for buttons/labels)
     */
    compact?: boolean
}

const textSizeMap: Record<TextSize, string> = {
    large: 'text-large',
    base: 'text-base',
    small: 'text-small',
    xsmall: 'text-xsmall',
}

const textWeightMap: Record<TextWeight, string> = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
}

const textColorMap: Record<TextColor, string> = {
    base: 'text-ui-fg-base',
    subtle: 'text-ui-fg-subtle',
    muted: 'text-ui-fg-muted',
    disabled: 'text-ui-fg-disabled',
    interactive: 'text-ui-fg-interactive',
}

export function Text({
    size = 'base',
    weight = 'regular',
    color = 'base',
    compact = false,
    className,
    children,
    ...props
}: TextProps) {
    return (
        <MedusaText
            className={cn(
                compact ? 'txt-compact-medium' : `${textSizeMap[size]}-${weight}`,
                textColorMap[color],
                className
            )}
            {...props}
        >
            {children}
        </MedusaText>
    )
}

// ============================================
// Specialized Components
// ============================================

/**
 * PageTitle - Hero heading com gradient Yello
 */
export function PageTitle({ children, className, ...props }: Omit<HeadingProps, 'level' | 'size' | 'gradient'>) {
    return (
        <Heading
            level="h1"
            size="3xl"
            gradient
            className={cn('mb-4', className)}
            {...props}
        >
            {children}
        </Heading>
    )
}

/**
 * SectionTitle - Section heading com Yello orange
 */
export function SectionTitle({ children, className, ...props }: Omit<HeadingProps, 'level' | 'size'>) {
    return (
        <Heading
            level="h2"
            size="2xl"
            className={cn('text-yello-orange mb-6', className)}
            {...props}
        >
            {children}
        </Heading>
    )
}

/**
 * Label - Compact label text
 */
export function Label({ children, className, ...props }: Omit<TextProps, 'compact'>) {
    return (
        <Text
            compact
            color="subtle"
            className={cn('uppercase tracking-wide', className)}
            {...props}
        >
            {children}
        </Text>
    )
}

/**
 * Caption - Small muted text
 */
export function Caption({ children, className, ...props }: Omit<TextProps, 'size' | 'color'>) {
    return (
        <Text
            size="small"
            color="muted"
            className={className}
            {...props}
        >
            {children}
        </Text>
    )
}

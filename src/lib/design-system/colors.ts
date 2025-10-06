/**
 * Yello Solar Hub Design System - Color Tokens
 * Based on Vercel Geist with Yello Solar brand gradient
 * 
 * Brand Gradient: #FFEE00 (0%) → #FF6600 (34%) → #FF0066 (50%)
 */

export const yello = {
    // Primary Brand Colors (Gradient)
    yellow: '#FFEE00',
    orange: '#FF6600',
    magenta: '#FF0066',

    // Yellow Scale (50-500)
    yellow50: '#FFFEF5',
    yellow100: '#FFFCE6',
    yellow200: '#FFF9CC',
    yellow300: '#FFF399',
    yellow400: '#FFEE66',
    yellow500: '#FFEE00',

    // Orange Scale (50-500)
    orange50: '#FFF7F0',
    orange100: '#FFE6CC',
    orange200: '#FFD199',
    orange300: '#FFB366',
    orange400: '#FF8933',
    orange500: '#FF6600',

    // Magenta Scale (50-500)
    magenta50: '#FFF0F5',
    magenta100: '#FFCCE0',
    magenta200: '#FF99C2',
    magenta300: '#FF66A3',
    magenta400: '#FF3385',
    magenta500: '#FF0066',
} as const;

export const geist = {
    // Grays (from Vercel Geist)
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',

    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#FAFAFA',
    backgroundTertiary: '#F5F5F5',

    // Foregrounds
    foreground: '#171717',
    foregroundSecondary: '#737373',
    foregroundTertiary: '#A3A3A3',

    // Borders
    border: '#E5E5E5',
    borderSecondary: '#D4D4D4',

    // Accents (Blue from Geist)
    accentBlue: '#0070F3',
    accentBlue50: '#E6F6FF',
    accentBlue100: '#BAE6FD',
    accentBlue500: '#0070F3',

    // Success (Green from Geist)
    success: '#0ACF83',
    success50: '#EAFCF3',
    success500: '#0ACF83',

    // Error (Red from Geist)
    error: '#EE0000',
    error50: '#FFF0F0',
    error500: '#EE0000',

    // Warning (Yellow-Orange from Yello blend)
    warning: yello.orange,
    warning50: yello.orange50,
    warning500: yello.orange500,
} as const;

export const semantic = {
    // Primary Actions (Yello Yellow)
    primary: yello.yellow,
    primaryHover: yello.yellow400,
    primaryActive: yello.yellow500,

    // Secondary Actions (Yello Orange)
    secondary: yello.orange,
    secondaryHover: yello.orange400,
    secondaryActive: yello.orange500,

    // Tertiary Actions (Yello Magenta)
    tertiary: yello.magenta,
    tertiaryHover: yello.magenta400,
    tertiaryActive: yello.magenta500,

    // Status Colors
    success: geist.success,
    error: geist.error,
    warning: geist.warning,
    info: geist.accentBlue,

    // Surfaces
    surface: geist.background,
    surfaceSecondary: geist.backgroundSecondary,
    surfaceTertiary: geist.backgroundTertiary,

    // Text
    textPrimary: geist.foreground,
    textSecondary: geist.foregroundSecondary,
    textTertiary: geist.foregroundTertiary,

    // Borders
    border: geist.border,
    borderSecondary: geist.borderSecondary,
} as const;

// CSS Variables for Tailwind
export const cssVars = {
    '--yello-yellow': yello.yellow,
    '--yello-orange': yello.orange,
    '--yello-magenta': yello.magenta,

    '--geist-background': geist.background,
    '--geist-foreground': geist.foreground,
    '--geist-border': geist.border,

    '--primary': semantic.primary,
    '--secondary': semantic.secondary,
    '--tertiary': semantic.tertiary,
} as const;

export type YelloBrandColor = keyof typeof yello;
export type GeistColor = keyof typeof geist;
export type SemanticColor = keyof typeof semantic;

/**
 * Medusa UI Token Overrides - Yello Solar Brand Integration
 * Maps Yello colors to Medusa UI CSS variables for seamless integration
 */
export const medusaYelloTokens = {
    // Button variants mapping to Yello colors
    '--button-primary': yello.yellow,
    '--button-primary-hover': yello.yellow400,
    '--button-primary-pressed': yello.yellow500,

    '--button-secondary': yello.orange,
    '--button-secondary-hover': yello.orange400,
    '--button-secondary-pressed': yello.orange500,

    '--button-tertiary': yello.magenta,
    '--button-tertiary-hover': yello.magenta400,
    '--button-tertiary-pressed': yello.magenta500,

    // Interactive elements
    '--bg-interactive': yello.orange,
    '--bg-interactive-hover': yello.orange400,
    '--border-interactive': yello.magenta,
    '--border-interactive-hover': yello.magenta400,

    // Focus states
    '--border-focus': yello.yellow,
    '--shadow-focus': `0 0 0 2px ${yello.yellow}20`,

    // Brand gradient
    '--gradient-yello': `linear-gradient(135deg, ${yello.yellow} 0%, ${yello.orange} 50%, ${yello.magenta} 100%)`,
} as const;

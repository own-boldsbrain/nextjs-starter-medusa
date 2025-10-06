/**
 * Yello Solar Hub Design System - Spacing System
 * Based on Vercel Geist 8px base unit
 * 
 * Scale: 0.25rem (4px) increments
 * Range: 0 to 128 (0px to 512px)
 */

export const spacing = {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px - Base Unit
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    7: '1.75rem',   // 28px
    8: '2rem',      // 32px
    9: '2.25rem',   // 36px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    14: '3.5rem',   // 56px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    28: '7rem',     // 112px
    32: '8rem',     // 128px
    36: '9rem',     // 144px
    40: '10rem',    // 160px
    44: '11rem',    // 176px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
    80: '20rem',    // 320px
    96: '24rem',    // 384px
    128: '32rem',   // 512px
} as const;

export const containerMaxWidths = {
    xs: '20rem',    // 320px
    sm: '24rem',    // 384px
    md: '28rem',    // 448px
    lg: '32rem',    // 512px
    xl: '36rem',    // 576px
    '2xl': '42rem', // 672px
    '3xl': '48rem', // 768px
    '4xl': '56rem', // 896px
    '5xl': '64rem', // 1024px
    '6xl': '72rem', // 1152px
    '7xl': '80rem', // 1280px
    full: '100%',
} as const;

export const containerPadding = {
    mobile: spacing[4],     // 16px
    tablet: spacing[6],     // 24px
    desktop: spacing[8],    // 32px
    wide: spacing[12],      // 48px
} as const;

export const gridGaps = {
    none: spacing[0],
    xs: spacing[2],    // 8px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
    xl: spacing[12],   // 48px
    '2xl': spacing[16],// 64px
} as const;

export const borderRadius = {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',   // Fully rounded
} as const;

export const borderWidth = {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
} as const;

export const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// Vercel-style elevation system
export const elevations = {
    flat: {
        boxShadow: shadows.none,
        zIndex: 0,
    },
    raised: {
        boxShadow: shadows.sm,
        zIndex: 1,
    },
    floating: {
        boxShadow: shadows.md,
        zIndex: 10,
    },
    overlay: {
        boxShadow: shadows.lg,
        zIndex: 20,
    },
    modal: {
        boxShadow: shadows.xl,
        zIndex: 50,
    },
    toast: {
        boxShadow: shadows['2xl'],
        zIndex: 100,
    },
} as const;

export type Spacing = keyof typeof spacing;
export type ContainerMaxWidth = keyof typeof containerMaxWidths;
export type GridGap = keyof typeof gridGaps;
export type BorderRadius = keyof typeof borderRadius;
export type BorderWidth = keyof typeof borderWidth;
export type Shadow = keyof typeof shadows;
export type Elevation = keyof typeof elevations;

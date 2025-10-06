/**
 * Yello Solar Hub Design System - Typography
 * Based on Vercel Geist font system
 * 
 * Fonts: Geist Sans (UI), Geist Mono (Code)
 * Scale: rem-based with fluid scaling
 */

export const fontFamilies = {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
} as const;

export const fontSizes = {
    // Display Sizes (Hero, Large Headings)
    display1: '4.5rem',    // 72px
    display2: '3.75rem',   // 60px
    display3: '3rem',      // 48px

    // Heading Sizes
    h1: '2.5rem',          // 40px
    h2: '2rem',            // 32px
    h3: '1.75rem',         // 28px
    h4: '1.5rem',          // 24px
    h5: '1.25rem',         // 20px
    h6: '1.125rem',        // 18px

    // Body Sizes
    bodyLarge: '1.125rem', // 18px
    body: '1rem',          // 16px
    bodySmall: '0.875rem', // 14px

    // UI Sizes
    caption: '0.75rem',    // 12px
    overline: '0.625rem',  // 10px
} as const;

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
} as const;

export const lineHeights = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
} as const;

export const letterSpacings = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
} as const;

// Typography Presets (Vercel Geist Style)
export const typographyPresets = {
    display1: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.display1,
        fontWeight: fontWeights.black,
        lineHeight: lineHeights.tight,
        letterSpacing: letterSpacings.tighter,
    },
    display2: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.display2,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeights.tight,
        letterSpacing: letterSpacings.tight,
    },
    display3: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.display3,
        fontWeight: fontWeights.bold,
        lineHeight: lineHeights.snug,
        letterSpacing: letterSpacings.tight,
    },
    h1: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h1,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.snug,
        letterSpacing: letterSpacings.tight,
    },
    h2: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h2,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.snug,
        letterSpacing: letterSpacings.normal,
    },
    h3: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h3,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
    h4: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h4,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
    h5: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h5,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
    h6: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.h6,
        fontWeight: fontWeights.medium,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
    bodyLarge: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.bodyLarge,
        fontWeight: fontWeights.regular,
        lineHeight: lineHeights.relaxed,
        letterSpacing: letterSpacings.normal,
    },
    body: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.body,
        fontWeight: fontWeights.regular,
        lineHeight: lineHeights.relaxed,
        letterSpacing: letterSpacings.normal,
    },
    bodySmall: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.bodySmall,
        fontWeight: fontWeights.regular,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
    caption: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.caption,
        fontWeight: fontWeights.regular,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.wide,
    },
    overline: {
        fontFamily: fontFamilies.sans,
        fontSize: fontSizes.overline,
        fontWeight: fontWeights.semibold,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.widest,
        textTransform: 'uppercase' as const,
    },
    code: {
        fontFamily: fontFamilies.mono,
        fontSize: fontSizes.bodySmall,
        fontWeight: fontWeights.regular,
        lineHeight: lineHeights.normal,
        letterSpacing: letterSpacings.normal,
    },
} as const;

export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacings;
export type TypographyPreset = keyof typeof typographyPresets;

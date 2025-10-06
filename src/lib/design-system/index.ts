/**
 * Yello Solar Hub Design System
 * 
 * Enterprise-grade design system based on Vercel Geist
 * with Yello Solar Hub brand gradient (#FFEE00 → #FF6600 → #FF0066)
 * 
 * @see https://vercel.com/geist/introduction
 */

export * from './colors';
export * from './typography';
export * from './spacing';

// Re-export for convenience
export { yelloBrand, geist, semantic, cssVars } from './colors';
export { fontFamilies, fontSizes, fontWeights, typographyPresets } from './typography';
export { spacing, containerMaxWidths, borderRadius, shadows, elevations } from './spacing';

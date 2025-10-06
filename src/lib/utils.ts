/**
 * Utility functions for Yello Solar Hub
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * Uses clsx for conditional classes + tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price in Brazilian Real (R$)
 * @param price - Price in cents or reais
 * @param inCents - Whether price is in cents (default: false)
 * @returns Formatted price string
 */
export function formatPrice(price: number, inCents = false): string {
    const value = inCents ? price / 100 : price;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

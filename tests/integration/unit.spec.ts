/**
 * Unit Tests for Integration Layer
 *
 * Tests DTOs, mappings, and normalization functions
 */

import { describe, it, expect } from '@jest/globals';
import {
    normalizeProductSummary,
    normalizeCategories,
    type ProductSummary,
    type CategorySummary
} from '../../src/lib/integration/dto';
import {
    slugToCategoryId,
    categoryIdToSlug,
    validateMappings
} from '../../src/lib/integration/mappings';// Mock Medusa product data
const mockMedusaProduct = {
    id: 'prod_123',
    title: 'Painel Solar 400W',
    handle: 'painel-solar-400w',
    description: 'Painel solar monocristalino de alta eficiência',
    thumbnail: 'https://example.com/thumbnail.jpg',
    variants: [{
        id: 'variant_123',
        title: '400W',
        sku: 'PS-400W',
        prices: [{
            amount: 250000, // 2500.00 in cents
            currency_code: 'BRL'
        }]
    }],
    categories: [{
        id: 'cat_paineis_solares',
        name: 'Painéis Solares',
        handle: 'paineis-solares'
    }],
    metadata: {
        power_watts: 400,
        efficiency: 0.22,
        brand: 'Yello Solar'
    }
};

// Mock Medusa category data
const mockMedusaCategories = [
    {
        id: 'cat_paineis_solares',
        name: 'Painéis Solares',
        handle: 'paineis-solares',
        description: 'Painéis solares fotovoltaicos',
        metadata: { type: 'product' }
    },
    {
        id: 'cat_kit_on_grid',
        name: 'Kit On-Grid',
        handle: 'on-grid',
        description: 'Kits para sistemas conectados à rede',
        metadata: { type: 'kit' }
    }
];

describe('DTO Normalization', () => {
    describe('normalizeProductSummary', () => {
        it('should normalize a complete Medusa product', () => {
            const result = normalizeProductSummary(mockMedusaProduct);

            expect(result).toEqual({
                id: 'prod_123',
                title: 'Painel Solar 400W',
                handle: 'painel-solar-400w',
                description: 'Painel solar monocristalino de alta eficiência',
                thumbnail: 'https://example.com/thumbnail.jpg',
                price: 250000, // In cents
                currency_code: 'BRL',
                sku: 'PS-400W',
                metadata: {
                    power_watts: 400,
                    efficiency: 0.22,
                    brand: 'Yello Solar'
                }
            });
        });

        it('should handle products without variants', () => {
            const productWithoutVariant = {
                ...mockMedusaProduct,
                variants: []
            };

            const result = normalizeProductSummary(productWithoutVariant);

            expect(result.price).toBe(0); // Default price
            expect(result.currency_code).toBe('brl'); // Default currency
            expect(result.sku).toBeUndefined();
        });

        it('should handle products without prices', () => {
            const productWithoutPrice = {
                ...mockMedusaProduct,
                variants: [{
                    id: 'variant_123',
                    title: '400W',
                    sku: 'PS-400W',
                    prices: []
                }]
            };

            const result = normalizeProductSummary(productWithoutPrice);

            expect(result.price).toBe(0); // Default price
            expect(result.currency_code).toBe('brl'); // Default currency
        });

        it('should extract solar metadata correctly', () => {
            const result = normalizeProductSummary(mockMedusaProduct);

            expect(result.metadata).toEqual({
                power_watts: 400,
                efficiency: 0.22,
                brand: 'Yello Solar'
            });
        });
    });

    describe('normalizeCategories', () => {
        it('should normalize Medusa categories', () => {
            const result = normalizeCategories(mockMedusaCategories);

            expect(result).toHaveLength(2);
            expect(result[0]).toEqual({
                id: 'cat_paineis_solares',
                name: 'Painéis Solares',
                handle: 'paineis-solares',
                description: 'Painéis solares fotovoltaicos',
                type: 'product',
                metadata: { type: 'product' }
            });

            expect(result[1]).toEqual({
                id: 'cat_kit_on_grid',
                name: 'Kit On-Grid',
                handle: 'on-grid',
                description: 'Kits para sistemas conectados à rede',
                type: 'kit',
                metadata: { type: 'kit' }
            });
        });

        it('should handle categories without metadata', () => {
            const categoriesWithoutMetadata = [{
                id: 'cat_test',
                name: 'Test Category',
                handle: 'test'
            }];

            const result = normalizeCategories(categoriesWithoutMetadata);

            expect(result[0].metadata).toBeUndefined();
        });
    });
});

describe('Slug ↔ ID Mappings', () => {
    describe('slugToCategoryId', () => {
        it('should convert kit slugs to IDs', () => {
            expect(slugToCategoryId('on-grid')).toBe('cat_kit_on_grid');
            expect(slugToCategoryId('off-grid-interativo')).toBe('cat_kit_off_grid_interativo');
            expect(slugToCategoryId('hibrido')).toBe('cat_kit_hibrido');
        });

        it('should convert product category slugs to IDs', () => {
            expect(slugToCategoryId('paineis-solares')).toBe('cat_paineis_solares');
            expect(slugToCategoryId('baterias')).toBe('cat_baterias');
            expect(slugToCategoryId('inversores')).toBe('cat_inversores');
        });

        it('should return null for unknown slugs', () => {
            expect(slugToCategoryId('unknown-category')).toBeNull();
            expect(slugToCategoryId('')).toBeNull();
        });
    });

    describe('categoryIdToSlug', () => {
        it('should convert IDs to slugs', () => {
            expect(categoryIdToSlug('cat_kit_on_grid')).toBe('on-grid');
            expect(categoryIdToSlug('cat_paineis_solares')).toBe('paineis-solares');
        });

        it('should return null for unknown IDs', () => {
            expect(categoryIdToSlug('unknown_id')).toBeNull();
            expect(categoryIdToSlug('')).toBeNull();
        });
    });

    describe('validateMappings', () => {
        it('should validate that mappings are bidirectional', () => {
            const isValid = validateMappings();
            expect(isValid).toBe(true);
        });
    });
});

describe('Integration Data Flow', () => {
    it('should handle end-to-end product normalization with category mapping', () => {
        // Simulate API response with category_id
        const apiResponse = {
            data: [mockMedusaProduct],
            count: 1,
            offset: 0,
            limit: 24
        };

        // Normalize products
        const products: ProductSummary[] = normalizeProductSummaries(apiResponse.data);

        expect(products).toHaveLength(1);
        expect(products[0].id).toBe('prod_123');
        expect(products[0].price).toBe(250000);
        expect(products[0].metadata?.power_watts).toBe(400);
    });

    it('should handle category filtering with slug conversion', () => {
        const categorySlug = 'paineis-solares';
        const categoryId = slugToCategoryId(categorySlug);

        expect(categoryId).toBe('cat_paineis_solares');

        // This would be used in API call: category_id: categoryId
        const expectedApiParam = categoryId;
        expect(expectedApiParam).toBe('cat_paineis_solares');
    });
});
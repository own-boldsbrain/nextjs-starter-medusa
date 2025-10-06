/**
 * API Smoke Tests
 * 
 * Basic smoke tests to verify API endpoints are responding correctly
 * Tests: 200 status, JSON response, basic structure
 */

import { describe, it, expect } from '@jest/globals';

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

describe('API Smoke Tests', () => {
    describe('/api/health', () => {
        it('should return 200 and health status', async () => {
            const response = await fetch(`${API_BASE_URL}/api/health`);

            expect(response.status).toBe(200);
            expect(response.headers.get('content-type')).toContain('application/json');

            const data = await response.json();
            expect(data).toHaveProperty('ok', true);
            expect(data).toHaveProperty('timestamp');
            expect(data).toHaveProperty('service');
        });
    });

    describe('/api/version', () => {
        it('should return 200 and version info', async () => {
            const response = await fetch(`${API_BASE_URL}/api/version`);

            expect(response.status).toBe(200);
            expect(response.headers.get('content-type')).toContain('application/json');
            expect(response.headers.get('cache-control')).toContain('public');

            const data = await response.json();
            expect(data).toHaveProperty('version');
            expect(data).toHaveProperty('commit');
            expect(data).toHaveProperty('builtAt');
        });
    });

    describe('/api/catalog/categories', () => {
        it('should return 200 with categories list', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);

            expect(response.status).toBe(200);
            expect(response.headers.get('content-type')).toContain('application/json');

            const data = await response.json();
            expect(data).toHaveProperty('data');
            expect(data).toHaveProperty('meta');
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.meta).toHaveProperty('total');
        });

        it('should include pagination headers (RFC 8288)', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/categories?limit=5`);

            expect(response.headers.has('x-total-count')).toBe(true);
            // Link header may be present if there are more pages
        });

        it('should include cache headers (RFC 9111)', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);

            expect(response.headers.has('cache-control')).toBe(true);
            expect(response.headers.get('cache-control')).toContain('public');
        });

        it('should include CORS headers', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);

            expect(response.headers.has('access-control-allow-origin')).toBe(true);
            expect(response.headers.has('vary')).toBe(true);
        });
    });

    describe('/api/catalog/products', () => {
        it('should return 200 with products list', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/products`);

            expect(response.status).toBe(200);
            expect(response.headers.get('content-type')).toContain('application/json');

            const data = await response.json();
            expect(data).toHaveProperty('data');
            expect(data).toHaveProperty('meta');
            expect(Array.isArray(data.data)).toBe(true);
            expect(data.meta).toHaveProperty('total');
        });

        it('should include pagination headers', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/products?limit=10`);

            expect(response.headers.has('x-total-count')).toBe(true);
        });

        it('should include cache and ETag headers', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/products`);

            expect(response.headers.has('cache-control')).toBe(true);
            expect(response.headers.get('cache-control')).toContain('stale-while-revalidate');
            // ETag may be present
        });

        it('should filter by category', async () => {
            const response = await fetch(
                `${API_BASE_URL}/api/catalog/products?category=cat_kit_on_grid`
            );

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data).toHaveProperty('data');
        });

        it('should respect limit parameter', async () => {
            const response = await fetch(`${API_BASE_URL}/api/catalog/products?limit=5`);

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data.data.length).toBeLessThanOrEqual(5);
        });
    });

    describe('/api/facets', () => {
        it('should return 200 with facets data', async () => {
            const response = await fetch(`${API_BASE_URL}/api/facets`);

            expect(response.status).toBe(200);
            expect(response.headers.get('content-type')).toContain('application/json');

            const data = await response.json();
            expect(data).toHaveProperty('data');
        });
    });

    describe('/api/kits/:type', () => {
        it('should return 200 for valid kit type', async () => {
            const response = await fetch(`${API_BASE_URL}/api/kits/on-grid`);

            expect(response.status).toBe(200);
            const data = await response.json();
            expect(data).toHaveProperty('data');
            expect(data).toHaveProperty('meta');
            expect(data.meta).toHaveProperty('kitType', 'on-grid');
            expect(data.meta).toHaveProperty('categoryId');
        });

        it('should return 400 for invalid kit type (RFC 9457)', async () => {
            const response = await fetch(`${API_BASE_URL}/api/kits/invalid-type`);

            expect(response.status).toBe(400);
            expect(response.headers.get('content-type')).toContain('application/problem+json');

            const data = await response.json();
            expect(data).toHaveProperty('type');
            expect(data).toHaveProperty('title');
            expect(data).toHaveProperty('status', 400);
            expect(data).toHaveProperty('detail');
            expect(data).toHaveProperty('instance');
        });
    });
});

describe('OPTIONS (CORS) Tests', () => {
    it('should respond to OPTIONS with 204', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/categories`, {
            method: 'OPTIONS',
        });

        expect(response.status).toBe(204);
    });

    it('should include CORS headers in OPTIONS response', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/products`, {
            method: 'OPTIONS',
        });

        expect(response.status).toBe(204);
        expect(response.headers.has('access-control-allow-origin')).toBe(true);
        expect(response.headers.has('access-control-allow-methods')).toBe(true);
        expect(response.headers.has('access-control-allow-headers')).toBe(true);
    });
});

describe('Error Handling (RFC 9457)', () => {
    it('should return Problem Details for validation errors', async () => {
        const response = await fetch(
            `${API_BASE_URL}/api/catalog/products?limit=999` // Over max
        );

        // May return 200 with clamped value or 400 with error
        if (response.status === 400) {
            expect(response.headers.get('content-type')).toContain('application/problem+json');

            const data = await response.json();
            expect(data).toHaveProperty('type');
            expect(data).toHaveProperty('title');
            expect(data).toHaveProperty('status', 400);
        }
    });

    it('should return Problem Details for not found', async () => {
        const response = await fetch(`${API_BASE_URL}/api/products/nonexistent-id`);

        if (response.status === 404) {
            expect(response.headers.get('content-type')).toContain('application/problem+json');

            const data = await response.json();
            expect(data).toHaveProperty('type');
            expect(data).toHaveProperty('title');
            expect(data).toHaveProperty('status', 404);
            expect(data).toHaveProperty('instance');
        }
    });
});

describe('Cache Headers (RFC 9111)', () => {
    it('should include Cache-Control with max-age', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);

        const cacheControl = response.headers.get('cache-control');
        expect(cacheControl).toBeTruthy();
        expect(cacheControl).toMatch(/max-age=\d+/);
    });

    it('should include stale-while-revalidate', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/products`);

        const cacheControl = response.headers.get('cache-control');
        expect(cacheControl).toBeTruthy();
        expect(cacheControl).toContain('stale-while-revalidate');
    });

    it('should include ETag when available', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/categories`);

        // ETag may be present - not guaranteed but should be there
        const etag = response.headers.get('etag');
        if (etag) {
            expect(etag).toMatch(/^".*"$/); // Quoted string
        }
    });
});

describe('Pagination (RFC 8288)', () => {
    it('should include X-Total-Count header', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/products`);

        expect(response.headers.has('x-total-count')).toBe(true);
        const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);
        expect(totalCount).toBeGreaterThanOrEqual(0);
    });

    it('should include Link header when more pages exist', async () => {
        const response = await fetch(`${API_BASE_URL}/api/catalog/products?limit=1`);

        const totalCount = parseInt(response.headers.get('x-total-count') || '0', 10);

        if (totalCount > 1) {
            const linkHeader = response.headers.get('link');
            expect(linkHeader).toBeTruthy();
            expect(linkHeader).toContain('rel="next"');
        }
    });

    it('should include rel=prev when cursor > 0', async () => {
        // First get next cursor
        const firstResponse = await fetch(`${API_BASE_URL}/api/catalog/products?limit=5`);
        const linkHeader = firstResponse.headers.get('link');

        if (linkHeader && linkHeader.includes('rel="next"')) {
            // Extract next cursor
            const match = linkHeader.match(/cursor=(\d+)/);
            if (match) {
                const nextCursor = match[1];

                const secondResponse = await fetch(
                    `${API_BASE_URL}/api/catalog/products?limit=5&cursor=${nextCursor}`
                );

                const secondLinkHeader = secondResponse.headers.get('link');
                expect(secondLinkHeader).toBeTruthy();
                expect(secondLinkHeader).toContain('rel="prev"');
            }
        }
    });
});

/**
 * Integration Tests - Storefront API Proxies
 * 
 * Testa integração completa Frontend ↔ Backend (Next.js ↔ Medusa)
 * 
 * Cobertura:
 * - Mapeamentos slug ↔ ID bidirecionais
 * - Proxies /api/storefront/* chamando Medusa Store API
 * - Normalização de DTOs
 * - Cache headers (Cache-Control, ETag)
 * - Paginação (Link header RFC 8288, X-Total-Count)
 * - Erros (RFC 9457 Problem Details)
 * - CORS (Access-Control-Allow-*)
 * 
 * Requisitos:
 * - Backend Medusa rodando em http://localhost:9000
 * - Dados seedados (14 categorias + 42 produtos)
 * - ENV var NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY configurada
 * 
 * Execução:
 * ```bash
 * # Terminal 1: Backend
 * cd YSH_backend && pnpm dev:api
 * 
 * # Terminal 2: Frontend
 * cd YSH_storefront && pnpm dev:web
 * 
 * # Terminal 3: Testes
 * cd YSH_storefront && pnpm test:integration
 * ```
 */

import { describe, it, expect, beforeAll } from 'vitest';
import {
    validateMappings,
    slugToCategoryId,
    categoryIdToSlug,
    kitSlugToCategoryId,
    isKitSlug,
    getAllCategorySlugs,
} from '@/lib/integration/mappings';
import type { CategorySummary, ProductSummary, ProductDetail, Cart } from '@/lib/integration/dto';

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

// ============================================================================
// GATE-INT2: Mapeamentos Bidirecionais
// ============================================================================

describe('GATE-INT2: Mapeamentos slug ↔ ID', () => {
    it('deve validar todos os mapeamentos bidirecionais', () => {
        const isValid = validateMappings();
        expect(isValid).toBe(true);
    });

    it('deve ter 14 categorias (5 kits + 9 produtos)', () => {
        const slugs = getAllCategorySlugs();
        expect(slugs).toHaveLength(14);
    });

    it('deve converter slug → ID → slug (invertível)', () => {
        const testCases = [
            { slug: 'on-grid', id: 'cat_kit_on_grid' },
            { slug: 'paineis-solares', id: 'cat_paineis_solares' },
            { slug: 'baterias', id: 'cat_baterias' },
        ];

        testCases.forEach(({ slug, id }) => {
            expect(slugToCategoryId(slug)).toBe(id);
            expect(categoryIdToSlug(id)).toBe(slug);
        });
    });

    it('deve identificar kits corretamente', () => {
        expect(isKitSlug('on-grid')).toBe(true);
        expect(isKitSlug('off-grid-interativo')).toBe(true);
        expect(isKitSlug('paineis-solares')).toBe(false);
    });

    it('deve mapear kit slug para category ID', () => {
        expect(kitSlugToCategoryId('on-grid')).toBe('cat_kit_on_grid');
        expect(kitSlugToCategoryId('hibrido')).toBe('cat_kit_hibrido');
    });
});

// ============================================================================
// GATE-INT1 & INT3: Proxies + DTOs Normalizados
// ============================================================================

describe('GATE-INT1 & INT3: Proxies /api/storefront/*', () => {
    describe('GET /api/storefront/categories', () => {
        it('deve retornar 200 com CategorySummary[]', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/categories?limit=20`);
            expect(res.status).toBe(200);

            const json = await res.json();
            expect(json.data).toBeInstanceOf(Array);
            expect(json.meta).toHaveProperty('total');

            // Validar DTO CategorySummary
            const category: CategorySummary = json.data[0];
            expect(category).toHaveProperty('id');
            expect(category).toHaveProperty('name');
            expect(category).toHaveProperty('handle');
        });

        it('deve incluir X-Total-Count', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/categories`);
            const totalCount = res.headers.get('X-Total-Count');
            expect(totalCount).toBeTruthy();
            expect(parseInt(totalCount!)).toBeGreaterThanOrEqual(14);
        });
    });

    describe('GET /api/storefront/products', () => {
        it('deve retornar 200 com ProductSummary[]', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/products?limit=10`);
            expect(res.status).toBe(200);

            const json = await res.json();
            expect(json.data).toBeInstanceOf(Array);

            // Validar DTO ProductSummary
            if (json.data.length > 0) {
                const product: ProductSummary = json.data[0];
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('title');
                expect(product).toHaveProperty('handle');
                expect(product).toHaveProperty('thumbnail');
                expect(product).toHaveProperty('price');
                expect(product).toHaveProperty('currency_code');
            }
        });

        it('deve filtrar por category slug', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/products?category=paineis-solares`);
            expect(res.status).toBe(200);

            const json = await res.json();
            expect(json.data).toBeInstanceOf(Array);
        });

        it('deve rejeitar category slug inválido', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/products?category=invalid-slug`);
            expect(res.status).toBe(400);

            const json = await res.json();
            expect(json.type).toContain('validation');
        });
    });

    describe('GET /api/storefront/products/[handle]', () => {
        it('deve retornar 200 com ProductDetail', async () => {
            // Primeiro obter um handle válido
            const listRes = await fetch(`${BASE_URL}/api/storefront/products?limit=1`);
            const listJson = await listRes.json();

            if (listJson.data.length === 0) {
                console.warn('⚠️  No products found, skipping product detail test');
                return;
            }

            const handle = listJson.data[0].handle;

            // Buscar detalhe
            const res = await fetch(`${BASE_URL}/api/storefront/products/${handle}`);
            expect(res.status).toBe(200);

            const json = await res.json();
            const product: ProductDetail = json.data;

            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('images');
            expect(product).toHaveProperty('variants');
            expect(product.variants).toBeInstanceOf(Array);
        });

        it('deve retornar 404 para handle inexistente', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/products/nonexistent-handle-12345`);
            expect(res.status).toBe(404);

            const json = await res.json();
            expect(json.type).toContain('not-found');
        });
    });

    describe('GET /api/storefront/kits/[slug]', () => {
        it('deve retornar produtos do kit on-grid', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/kits/on-grid`);
            expect(res.status).toBe(200);

            const json = await res.json();
            expect(json.data).toBeInstanceOf(Array);
            expect(json.meta.kit.slug).toBe('on-grid');
            expect(json.meta.kit.category_id).toBe('cat_kit_on_grid');
        });

        it('deve retornar 404 para kit inválido', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/kits/invalid-kit-slug`);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /api/storefront/cart', () => {
        it('deve criar novo carrinho', async () => {
            const res = await fetch(`${BASE_URL}/api/storefront/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            expect(res.status).toBe(201);

            const json = await res.json();
            const cart: Cart = json.data;

            expect(cart).toHaveProperty('id');
            expect(cart).toHaveProperty('items');
            expect(cart.items).toBeInstanceOf(Array);
            expect(cart.items).toHaveLength(0); // Novo carrinho vazio
        });
    });

    describe('POST /api/storefront/cart/[id]/line-items', () => {
        it('deve adicionar item ao carrinho', async () => {
            // 1. Criar carrinho
            const createRes = await fetch(`${BASE_URL}/api/storefront/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            const cartJson = await createRes.json();
            const cartId = cartJson.data.id;

            // 2. Obter variant_id de um produto
            const productsRes = await fetch(`${BASE_URL}/api/storefront/products?limit=1`);
            const productsJson = await productsRes.json();

            if (productsJson.data.length === 0) {
                console.warn('⚠️  No products found, skipping cart line-items test');
                return;
            }

            const productHandle = productsJson.data[0].handle;
            const detailRes = await fetch(`${BASE_URL}/api/storefront/products/${productHandle}`);
            const detailJson = await detailRes.json();
            const variantId = detailJson.data.variants[0].id;

            // 3. Adicionar ao carrinho
            const addRes = await fetch(`${BASE_URL}/api/storefront/cart/${cartId}/line-items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    variant_id: variantId,
                    quantity: 2,
                }),
            });

            expect(addRes.status).toBe(200);

            const updatedCart: Cart = (await addRes.json()).data;
            expect(updatedCart.items).toHaveLength(1);
            expect(updatedCart.items[0].quantity).toBe(2);
        });
    });
});

// ============================================================================
// GATE-INT4: Cache e Revalidação
// ============================================================================

describe('GATE-INT4: Cache headers', () => {
    it('GET /categories deve ter Cache-Control', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/categories`);
        const cacheControl = res.headers.get('Cache-Control');

        expect(cacheControl).toBeTruthy();
        expect(cacheControl).toContain('public');
        expect(cacheControl).toContain('max-age');
        expect(cacheControl).toContain('stale-while-revalidate');
    });

    it('GET /products deve ter Cache-Control', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/products`);
        const cacheControl = res.headers.get('Cache-Control');

        expect(cacheControl).toBeTruthy();
        expect(cacheControl).toContain('public');
    });

    it('GET /products/[handle] deve ter Cache-Control com max-age maior', async () => {
        // Obter handle
        const listRes = await fetch(`${BASE_URL}/api/storefront/products?limit=1`);
        const listJson = await listRes.json();

        if (listJson.data.length === 0) return;

        const handle = listJson.data[0].handle;
        const res = await fetch(`${BASE_URL}/api/storefront/products/${handle}`);

        const cacheControl = res.headers.get('Cache-Control');
        expect(cacheControl).toContain('max-age=120'); // PDP tem max-age maior que listagens
    });
});

// ============================================================================
// GATE-INT5: Erros Padronizados (RFC 9457)
// ============================================================================

describe('GATE-INT5: Erros RFC 9457', () => {
    it('deve retornar Problem Details em erro 400', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/products?category=invalid-slug`);
        expect(res.status).toBe(400);

        const contentType = res.headers.get('Content-Type');
        expect(contentType).toContain('application/problem+json');

        const json = await res.json();
        expect(json).toHaveProperty('type');
        expect(json).toHaveProperty('title');
        expect(json).toHaveProperty('status');
        expect(json).toHaveProperty('detail');
        expect(json).toHaveProperty('instance');
        expect(json.status).toBe(400);
    });

    it('deve retornar Problem Details em erro 404', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/products/nonexistent-handle`);
        expect(res.status).toBe(404);

        const json = await res.json();
        expect(json.type).toContain('not-found');
        expect(json.status).toBe(404);
    });
});

// ============================================================================
// GATE-INT6: CORS
// ============================================================================

describe('GATE-INT6: CORS headers', () => {
    it('OPTIONS /storefront/categories deve retornar 204', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/categories`, {
            method: 'OPTIONS',
        });

        expect(res.status).toBe(204);

        const allowOrigin = res.headers.get('Access-Control-Allow-Origin');
        const allowMethods = res.headers.get('Access-Control-Allow-Methods');

        expect(allowOrigin).toBeTruthy();
        expect(allowMethods).toContain('GET');
        expect(allowMethods).toContain('OPTIONS');
    });

    it('OPTIONS /storefront/cart deve permitir POST', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/cart`, {
            method: 'OPTIONS',
        });

        expect(res.status).toBe(204);

        const allowMethods = res.headers.get('Access-Control-Allow-Methods');
        expect(allowMethods).toContain('POST');
    });

    it('GET responses devem ter CORS headers', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/categories`);
        const allowOrigin = res.headers.get('Access-Control-Allow-Origin');

        expect(allowOrigin).toBeTruthy(); // * ou origem específica
    });
});

// ============================================================================
// GATE-INT8: Paginação (RFC 8288)
// ============================================================================

describe('GATE-INT8: Paginação Link header', () => {
    it('deve incluir Link header quando houver próxima página', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/products?limit=5&offset=0`);
        const totalCount = parseInt(res.headers.get('X-Total-Count') || '0');

        if (totalCount > 5) {
            const linkHeader = res.headers.get('Link');
            expect(linkHeader).toBeTruthy();
            expect(linkHeader).toContain('rel="next"');
        }
    });

    it('deve incluir rel="prev" quando offset > 0', async () => {
        const res = await fetch(`${BASE_URL}/api/storefront/products?limit=5&offset=5`);
        const linkHeader = res.headers.get('Link');

        if (linkHeader) {
            expect(linkHeader).toContain('rel="prev"');
        }
    });
});

/**
 * GET /api/storefront/products
 * 
 * Proxy para Medusa Store API - Products
 * - Suporta filtros: category (slug ou ID), q (busca), sort
 * - Traduz category slug para category_id
 * - Normaliza dados para ProductSummary[]
 * - Cache: public, max-age=60, stale-while-revalidate=600
 * - Paginação: Link header + X-Total-Count
 * 
 * @see https://docs.medusajs.com/api/store#products_getproducts
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeProductSummaries, type ProductSummary } from '@/lib/integration/dto';
import { slugToCategoryId } from '@/lib/integration/mappings';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Parsing
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24'), 1), 100);
        const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
        const q = searchParams.get('q') || undefined;
        const sort = searchParams.get('sort') || undefined;

        // Category: pode ser slug ou ID
        let categoryParam = searchParams.get('category') || undefined;
        if (categoryParam && !categoryParam.startsWith('cat_')) {
            // É slug, traduzir para ID
            const categoryId = slugToCategoryId(categoryParam);
            if (!categoryId) {
                return problemJson(
                    400,
                    ProblemTypes.VALIDATION,
                    'Invalid category',
                    `Category slug "${categoryParam}" not found`,
                    '/api/storefront/products'
                );
            }
            categoryParam = categoryId;
        }

        // Chamar Medusa
        const response = await medusaClient.getPaginated('/store/products', {
            limit,
            offset,
            category_id: categoryParam,
            q,
            order: sort, // ex: "created_at" ou "-created_at"
        });

        // Normalizar
        const products: ProductSummary[] = normalizeProductSummaries(response.data.data);
        const total = response.data.count;

        // Link header
        const links: string[] = [];
        const baseUrl = new URL('/api/storefront/products', req.url).toString();
        const queryBase = `limit=${limit}${categoryParam ? `&category=${categoryParam}` : ''}${q ? `&q=${q}` : ''
            }${sort ? `&sort=${sort}` : ''}`;

        if (offset + limit < total) {
            links.push(`<${baseUrl}?${queryBase}&offset=${offset + limit}>; rel="next"`);
        }

        if (offset > 0) {
            const prevOffset = Math.max(0, offset - limit);
            links.push(`<${baseUrl}?${queryBase}&offset=${prevOffset}>; rel="prev"`);
        }

        // Headers
        const headers = new Headers(corsHeaders);
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
        headers.set('X-Total-Count', total.toString());

        if (response.etag) {
            headers.set('ETag', response.etag);
        }

        if (links.length > 0) {
            headers.set('Link', links.join(', '));
        }

        return new Response(
            JSON.stringify({
                data: products,
                meta: { total, offset, limit },
            }),
            {
                status: 200,
                headers,
            }
        );
    } catch (error: any) {
        console.error('[/api/storefront/products] Error:', error);

        if (error.type && error.status) {
            return new Response(JSON.stringify(error), {
                status: error.status,
                headers: {
                    'Content-Type': 'application/problem+json',
                    ...corsHeaders,
                },
            });
        }

        return problemJson(
            500,
            ProblemTypes.INTERNAL,
            'Internal Server Error',
            error.message || 'Failed to fetch products',
            '/api/storefront/products'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            ...corsHeaders,
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
    });
}

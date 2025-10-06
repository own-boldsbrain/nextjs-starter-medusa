/**
 * GET /api/storefront/categories
 * 
 * Proxy para Medusa Store API - Product Categories
 * - Traduz slugs para category_id
 * - Normaliza dados para CategorySummary[]
 * - Cache: public, max-age=60, stale-while-revalidate=600
 * - Paginação: Link header (RFC 8288) + X-Total-Count
 * - CORS habilitado
 * 
 * @see https://docs.medusajs.com/api/store#product-categories_getproductcategories
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeCategories, type CategorySummary } from '@/lib/integration/dto';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge'; // Edge runtime para performance

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Parsing de query params
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100);
        const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
        const parent = searchParams.get('parent') || undefined;
        const q = searchParams.get('q') || undefined;

        // Chamar Medusa Store API
        const response = await medusaClient.getPaginated('/store/product-categories', {
            limit,
            offset,
            parent_category_id: parent,
            q,
        });

        // Normalizar dados
        const categories: CategorySummary[] = normalizeCategories(response.data.data);
        const total = response.data.count;

        // Construir Link header (RFC 8288)
        const links: string[] = [];
        const baseUrl = new URL('/api/storefront/categories', req.url).toString();

        if (offset + limit < total) {
            const nextUrl = `${baseUrl}?limit=${limit}&offset=${offset + limit}`;
            links.push(`<${nextUrl}>; rel="next"`);
        }

        if (offset > 0) {
            const prevOffset = Math.max(0, offset - limit);
            const prevUrl = `${baseUrl}?limit=${limit}&offset=${prevOffset}`;
            links.push(`<${prevUrl}>; rel="prev"`);
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

        // Response
        return new Response(
            JSON.stringify({
                data: categories,
                meta: { total, offset, limit },
            }),
            {
                status: 200,
                headers,
            }
        );
    } catch (error: any) {
        console.error('[/api/storefront/categories] Error:', error);

        // Se for ProblemDetails, retornar direto
        if (error.type && error.status) {
            return new Response(JSON.stringify(error), {
                status: error.status,
                headers: {
                    'Content-Type': 'application/problem+json',
                    ...corsHeaders,
                },
            });
        }

        // Erro genérico
        return problemJson(
            500,
            ProblemTypes.INTERNAL,
            'Internal Server Error',
            error.message || 'Failed to fetch categories',
            '/api/storefront/categories'
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

/**
 * Products Catalog Endpoint
 * GET /api/catalog/products
 * 
 * Lists products with filtering, sorting, and pagination
 * RFC 8288 - Link header for pagination
 * RFC 9111 - HTTP Caching
 */

import { NextRequest } from 'next/server';
import { listProducts } from '@/lib/api/catalog';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24'), 1), 100);
        const cursor = searchParams.get('cursor') || undefined;
        const category = searchParams.get('category') || undefined;
        const q = searchParams.get('q') || undefined;
        const sort = searchParams.get('sort') || undefined;

        const result = await listProducts({ limit, cursor, category, q, sort });

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');

        if (result.etag) {
            headers.set('ETag', result.etag);
        }

        // RFC 8288 Link header for pagination
        const links: string[] = [];
        const baseUrl = new URL(req.url);
        baseUrl.searchParams.set('limit', String(limit));

        if (result.nextCursor) {
            baseUrl.searchParams.set('cursor', result.nextCursor);
            links.push(`<${baseUrl.toString()}>; rel="next"`);
        }

        if (result.prevCursor) {
            baseUrl.searchParams.set('cursor', result.prevCursor);
            links.push(`<${baseUrl.toString()}>; rel="prev"`);
        }

        if (links.length > 0) {
            headers.set('Link', links.join(', '));
        }

        headers.set('X-Total-Count', String(result.total));

        return new Response(
            JSON.stringify({
                data: result.products,
                meta: {
                    total: result.total,
                    facets: result.facets,
                },
            }),
            { status: 200, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro interno do servidor',
            error instanceof Error ? error.message : 'Unknown error',
            '/api/catalog/products'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

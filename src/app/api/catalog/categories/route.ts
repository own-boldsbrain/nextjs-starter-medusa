/**
 * Categories Catalog Endpoint
 * GET /api/catalog/categories
 * 
 * Lists product categories with pagination
 * RFC 8288 - Link header for pagination
 * RFC 9111 - HTTP Caching
 */

import { NextRequest } from 'next/server';
import { listCategories } from '@/lib/api/catalog';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20'), 1), 100);
        const cursor = searchParams.get('cursor') || undefined;
        const parent = searchParams.get('parent') || undefined;
        const q = searchParams.get('q') || undefined;

        const result = await listCategories({ limit, cursor, parent, q });

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
                data: result.categories,
                meta: {
                    total: result.total,
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
            '/api/catalog/categories'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

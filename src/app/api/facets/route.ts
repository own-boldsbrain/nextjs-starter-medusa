/**
 * Facets Aggregation Endpoint
 * GET /api/facets
 * 
 * Returns aggregated facets for filtering (price range, brands, power, etc)
 */

import { NextRequest } from 'next/server';
import { getFacets } from '@/lib/api/catalog';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const category = searchParams.get('category') || undefined;
        const q = searchParams.get('q') || undefined;

        const result = await getFacets({ category, q });

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

        return new Response(
            JSON.stringify({
                data: result.facets,
            }),
            { status: 200, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro interno do servidor',
            error instanceof Error ? error.message : 'Unknown error',
            '/api/facets'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

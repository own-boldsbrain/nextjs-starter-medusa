/**
 * Kits Endpoint (Solar Kit Types)
 * GET /api/kits/:type
 * 
 * Proxies to catalog/products filtered by kit category
 * Types: on-grid, off-grid-interativo, zero-grid, hibrido, antiapagao
 */

import { NextRequest } from 'next/server';
import { listProducts } from '@/lib/api/catalog';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

const KIT_TYPE_TO_CATEGORY: Record<string, string> = {
    'on-grid': 'cat_kit_on_grid',
    'off-grid-interativo': 'cat_kit_off_grid_interativo',
    'zero-grid': 'cat_kit_zero_grid',
    'hibrido': 'cat_kit_hibrido',
    'antiapagao': 'cat_kit_antiapagao',
};

export async function GET(
    req: NextRequest,
    { params }: { params: { type: string } }
) {
    try {
        const { type } = params;
        const categoryId = KIT_TYPE_TO_CATEGORY[type];

        if (!categoryId) {
            return problemJson(
                400,
                'https://yello.solar/errors/validation',
                'Tipo de kit inválido',
                `O tipo '${type}' não é válido. Tipos válidos: ${Object.keys(KIT_TYPE_TO_CATEGORY).join(', ')}`,
                `/api/kits/${type}`,
                [{ path: 'type', message: 'Tipo de kit inválido' }]
            );
        }

        const searchParams = req.nextUrl.searchParams;
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24'), 1), 100);
        const cursor = searchParams.get('cursor') || undefined;
        const sort = searchParams.get('sort') || undefined;

        const result = await listProducts({ limit, cursor, category: categoryId, sort });

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');

        if (result.etag) {
            headers.set('ETag', result.etag);
        }

        // RFC 8288 Link header
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
                    kitType: type,
                    categoryId,
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
            `/api/kits/${params.type}`
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

/**
 * Product Detail Endpoint
 * GET /api/products/:idOrHandle
 * 
 * Returns detailed product information
 * RFC 9111 - HTTP Caching (longer TTL for details)
 */

import { NextRequest } from 'next/server';
import { getProduct } from '@/lib/api/catalog';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function GET(
    req: NextRequest,
    { params }: { params: { idOrHandle: string } }
) {
    try {
        const { idOrHandle } = params;

        const result = await getProduct(idOrHandle);

        if (!result.product) {
            return problemJson(
                404,
                'https://yello.solar/errors/not-found',
                'Produto não encontrado',
                `O produto com identificador '${idOrHandle}' não foi encontrado`,
                `/api/products/${idOrHandle}`
            );
        }

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

        if (result.etag) {
            headers.set('ETag', result.etag);
        }

        return new Response(
            JSON.stringify({
                data: result.product,
            }),
            { status: 200, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro interno do servidor',
            error instanceof Error ? error.message : 'Unknown error',
            `/api/products/${params.idOrHandle}`
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

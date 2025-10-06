/**
 * GET /api/storefront/products/[handle]
 * 
 * Proxy para Medusa Store API - Product Detail
 * - Busca produto por handle (slug)
 * - Normaliza para ProductDetail (completo com variantes, imagens, metadata)
 * - Cache: public, max-age=120, stale-while-revalidate=600 (maior que listagens)
 * 
 * @see https://docs.medusajs.com/api/store#products_getproductshandle
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeProductDetail, type ProductDetail } from '@/lib/integration/dto';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

interface RouteParams {
    params: {
        handle: string;
    };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { handle } = params;

        if (!handle) {
            return problemJson(
                400,
                ProblemTypes.VALIDATION,
                'Missing handle',
                'Product handle is required',
                `/api/storefront/products/${handle}`
            );
        }

        // Chamar Medusa (GET /store/products?handle=...)
        const response = await medusaClient.get(`/store/products`, {
            handle,
        });

        // Medusa retorna array, pegar primeiro
        const rawProduct = response.data.products?.[0];

        if (!rawProduct) {
            return problemJson(
                404,
                ProblemTypes.NOT_FOUND,
                'Product not found',
                `Product with handle "${handle}" not found`,
                `/api/storefront/products/${handle}`
            );
        }

        // Normalizar
        const product: ProductDetail = normalizeProductDetail(rawProduct);

        // Headers
        const headers = new Headers(corsHeaders);
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');

        if (response.etag) {
            headers.set('ETag', response.etag);
        }

        return new Response(
            JSON.stringify({
                data: product,
            }),
            {
                status: 200,
                headers,
            }
        );
    } catch (error: any) {
        console.error(`[/api/storefront/products/${params.handle}] Error:`, error);

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
            error.message || 'Failed to fetch product',
            `/api/storefront/products/${params.handle}`
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

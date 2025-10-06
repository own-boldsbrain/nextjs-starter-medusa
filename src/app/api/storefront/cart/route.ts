/**
 * POST /api/storefront/cart
 * 
 * Cria novo carrinho no Medusa Store API
 * - Preserve credentials: "include" para sessão
 * - Retorna Cart normalizado
 * - CORS habilitado
 * 
 * @see https://docs.medusajs.com/api/store#carts_postcarts
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeCart, type Cart } from '@/lib/integration/dto';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        // Parsing body (opcional para criação inicial)
        const body = await req.json().catch(() => ({}));

        // Chamar Medusa
        const response = await medusaClient.post('/store/carts', body);

        // Normalizar
        const cart: Cart = normalizeCart(response.data.cart);

        // Headers
        const headers = new Headers(corsHeaders);
        headers.set('Content-Type', 'application/json');

        return new Response(
            JSON.stringify({
                data: cart,
            }),
            {
                status: 201,
                headers,
            }
        );
    } catch (error: any) {
        console.error('[/api/storefront/cart] POST Error:', error);

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
            error.message || 'Failed to create cart',
            '/api/storefront/cart'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            ...corsHeaders,
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-publishable-api-key',
        },
    });
}

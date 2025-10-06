/**
 * Cart Management Endpoint
 * POST /api/checkout/carts - Create new cart
 * 
 * Proxies to Medusa Store API /store/carts
 * RFC 9457 - Problem Details for HTTP APIs
 */

import { NextRequest } from 'next/server';
import { createCart } from '@/lib/api/checkout';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));

        const result = await createCart(body);

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');

        return new Response(
            JSON.stringify({
                data: result.cart,
            }),
            { status: 201, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro ao criar carrinho',
            error instanceof Error ? error.message : 'Unknown error',
            '/api/checkout/carts'
        );
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            ...corsHeaders(),
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
    });
}

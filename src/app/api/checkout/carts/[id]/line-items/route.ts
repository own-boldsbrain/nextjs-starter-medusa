/**
 * Cart Line Items Endpoint
 * POST /api/checkout/carts/:id/line-items - Add item to cart
 * 
 * Proxies to Medusa Store API
 * RFC 9457 - Problem Details for HTTP APIs
 */

import { NextRequest } from 'next/server';
import { addLineItem } from '@/lib/api/checkout';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await req.json();

        // Validate required fields
        if (!body.variant_id) {
            return problemJson(
                400,
                'https://yello.solar/errors/validation',
                'Dados inválidos',
                'O campo variant_id é obrigatório',
                `/api/checkout/carts/${id}/line-items`,
                [{ path: 'variant_id', message: 'Campo obrigatório' }]
            );
        }

        if (!body.quantity || body.quantity < 1) {
            return problemJson(
                400,
                'https://yello.solar/errors/validation',
                'Dados inválidos',
                'O campo quantity deve ser maior ou igual a 1',
                `/api/checkout/carts/${id}/line-items`,
                [{ path: 'quantity', message: 'Deve ser >= 1' }]
            );
        }

        const result = await addLineItem(id, body);

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');

        return new Response(
            JSON.stringify({
                data: result.cart,
            }),
            { status: 200, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro ao adicionar item ao carrinho',
            error instanceof Error ? error.message : 'Unknown error',
            `/api/checkout/carts/${params.id}/line-items`
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

/**
 * Checkout Sessions Endpoint
 * POST /api/checkout/sessions - Initialize checkout/payment
 * 
 * Proxies to Medusa Store API payment initialization
 */

import { NextRequest } from 'next/server';
import { createCheckoutSession } from '@/lib/api/checkout';
import { problemJson } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.cart_id) {
            return problemJson(
                400,
                'https://yello.solar/errors/validation',
                'Dados inválidos',
                'O campo cart_id é obrigatório',
                '/api/checkout/sessions',
                [{ path: 'cart_id', message: 'Campo obrigatório' }]
            );
        }

        const result = await createCheckoutSession(body);

        const headers = new Headers(corsHeaders());
        headers.set('Content-Type', 'application/json');

        return new Response(
            JSON.stringify({
                data: result.session,
            }),
            { status: 201, headers }
        );
    } catch (error) {
        return problemJson(
            500,
            'https://yello.solar/errors/internal',
            'Erro ao iniciar checkout',
            error instanceof Error ? error.message : 'Unknown error',
            '/api/checkout/sessions'
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

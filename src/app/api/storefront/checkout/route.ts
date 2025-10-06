/**
 * POST /api/storefront/checkout
 * 
 * Inicia sessão de checkout (integração futura com payment provider)
 * - Body: { cart_id: string }
 * - Retorna checkout session
 * - CORS habilitado
 * 
 * @see https://docs.medusajs.com/learn/storefront-development/checkout
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        // Parsing body
        const body = await req.json();

        if (!body.cart_id) {
            return problemJson(
                400,
                ProblemTypes.VALIDATION,
                'Invalid request body',
                'cart_id is required',
                '/api/storefront/checkout',
                [{ path: 'cart_id', message: 'Required field' }]
            );
        }

        // TODO: Implementar lógica de checkout quando payment provider estiver configurado
        // Por enquanto, retornar placeholder

        return problemJson(
            501,
            'https://yello.solar/errors/not-implemented',
            'Not Implemented',
            'Checkout integration pending payment provider configuration. Configure Stripe/PayPal in Medusa backend first.',
            '/api/storefront/checkout'
        );

        // Exemplo futuro:
        // const response = await medusaClient.post('/store/carts/:id/complete', { cart_id: body.cart_id });
        // return new Response(JSON.stringify({ data: response.data }), { status: 200, headers: corsHeaders });
    } catch (error: any) {
        console.error('[/api/storefront/checkout] POST Error:', error);

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
            error.message || 'Failed to create checkout session',
            '/api/storefront/checkout'
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

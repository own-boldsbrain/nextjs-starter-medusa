/**
 * POST /api/storefront/cart/[id]/line-items
 * 
 * Adiciona item ao carrinho existente
 * - Body: { variant_id: string, quantity: number }
 * - Retorna Cart atualizado
 * - CORS habilitado
 * 
 * @see https://docs.medusajs.com/api/store#carts_postcartsidlineitems
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeCart, type Cart } from '@/lib/integration/dto';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function POST(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = params;

        // Parsing body
        const body = await req.json();

        // Validação básica
        if (!body.variant_id || typeof body.quantity !== 'number') {
            return problemJson(
                400,
                ProblemTypes.VALIDATION,
                'Invalid request body',
                'variant_id (string) and quantity (number) are required',
                `/api/storefront/cart/${id}/line-items`,
                [
                    { path: 'variant_id', message: 'Required field' },
                    { path: 'quantity', message: 'Must be a number' },
                ]
            );
        }

        // Chamar Medusa
        const response = await medusaClient.post(`/store/carts/${id}/line-items`, body);

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
                status: 200,
                headers,
            }
        );
    } catch (error: any) {
        console.error(`[/api/storefront/cart/${params.id}/line-items] POST Error:`, error);

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
            error.message || 'Failed to add line item to cart',
            `/api/storefront/cart/${params.id}/line-items`
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

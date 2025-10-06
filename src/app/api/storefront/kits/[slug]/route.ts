/**
 * GET /api/storefront/kits/[slug]
 * 
 * Proxy para produtos de kits específicos
 * - Traduz kitSlug → category_id
 * - Filtra produtos da categoria do kit
 * - Normaliza para ProductSummary[]
 * - Cache: public, max-age=60, stale-while-revalidate=600
 * 
 * Kits disponíveis:
 * - on-grid
 * - off-grid-interativo
 * - zero-grid
 * - hibrido
 * - antiapagao
 */

import { NextRequest } from 'next/server';
import { medusaClient } from '@/lib/integration/medusa-client';
import { normalizeProductSummaries, type ProductSummary } from '@/lib/integration/dto';
import { kitSlugToCategoryId, isKitSlug } from '@/lib/integration/mappings';
import { problemJson, ProblemTypes } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export const runtime = 'edge';

interface RouteParams {
    params: {
        slug: string;
    };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = params;

        // Validar se é kit válido
        if (!isKitSlug(slug)) {
            return problemJson(
                404,
                ProblemTypes.NOT_FOUND,
                'Kit not found',
                `Kit with slug "${slug}" not found. Valid kits: on-grid, off-grid-interativo, zero-grid, hibrido, antiapagao`,
                `/api/storefront/kits/${slug}`
            );
        }

        // Traduzir slug → category_id
        const categoryId = kitSlugToCategoryId(slug);

        if (!categoryId) {
            return problemJson(
                500,
                ProblemTypes.INTERNAL,
                'Mapping error',
                `Failed to map kit slug "${slug}" to category ID`,
                `/api/storefront/kits/${slug}`
            );
        }

        // Parsing paginação
        const { searchParams } = new URL(req.url);
        const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24'), 1), 100);
        const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);

        // Chamar Medusa
        const response = await medusaClient.getPaginated('/store/products', {
            category_id: categoryId,
            limit,
            offset,
        });

        // Normalizar
        const products: ProductSummary[] = normalizeProductSummaries(response.data.data);
        const total = response.data.count;

        // Link header
        const links: string[] = [];
        const baseUrl = new URL(`/api/storefront/kits/${slug}`, req.url).toString();

        if (offset + limit < total) {
            links.push(`<${baseUrl}?limit=${limit}&offset=${offset + limit}>; rel="next"`);
        }

        if (offset > 0) {
            const prevOffset = Math.max(0, offset - limit);
            links.push(`<${baseUrl}?limit=${limit}&offset=${prevOffset}>; rel="prev"`);
        }

        // Headers
        const headers = new Headers(corsHeaders);
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
        headers.set('X-Total-Count', total.toString());

        if (response.etag) {
            headers.set('ETag', response.etag);
        }

        if (links.length > 0) {
            headers.set('Link', links.join(', '));
        }

        return new Response(
            JSON.stringify({
                data: products,
                meta: {
                    total,
                    offset,
                    limit,
                    kit: {
                        slug,
                        category_id: categoryId,
                    },
                },
            }),
            {
                status: 200,
                headers,
            }
        );
    } catch (error: any) {
        console.error(`[/api/storefront/kits/${params.slug}] Error:`, error);

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
            error.message || 'Failed to fetch kit products',
            `/api/storefront/kits/${params.slug}`
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

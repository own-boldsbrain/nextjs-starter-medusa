/**
 * Storefront Data Layer
 *
 * Consome as rotas internas `/api/storefront/*` responsáveis por
 * orquestrar e normalizar os dados do Medusa Store API. Mantemos
 * todo o fetching no servidor com suporte a ISR, cache HTTP e erros
 * padronizados (RFC 9457) expostos pela camada de proxy.
 */

import type {
    CategorySummary,
    ProductDetail,
    ProductSummary,
} from '@/lib/integration/dto';

type NextFetchOptions = RequestInit & {
    next?: {
        revalidate?: number;
    };
};

interface StorefrontListResponse<T> {
    data: T[];
    meta: {
        total: number;
        offset: number;
        limit: number;
    };
}

interface StorefrontDetailResponse<T> {
    data: T;
}

const DEFAULT_SITE_URL = (() => {
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
})();

const STOREFRONT_API_BASE =
    process.env.NEXT_PUBLIC_STOREFRONT_API_BASE || DEFAULT_SITE_URL;

async function fetchStorefront<T>(
    path: string,
    init?: NextFetchOptions,
    revalidate: number = 300
): Promise<{ body: T; headers: Headers }> {
    const url = path.startsWith('http') ? path : `${STOREFRONT_API_BASE}${path}`;

    const response = await fetch(url, {
        ...init,
        headers: {
            Accept: 'application/json',
            ...init?.headers,
        },
        next: {
            ...init?.next,
            revalidate: init?.next?.revalidate ?? revalidate,
        },
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(
            `[Storefront API] ${response.status} ${response.statusText}: ${detail}`
        );
    }

    const body = (await response.json()) as T;
    return { body, headers: response.headers };
}

export async function getCategories({
    limit = 100,
    offset = 0,
}: {
    limit?: number;
    offset?: number;
} = {}): Promise<{ categories: CategorySummary[]; total: number }> {
    const search = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });

    const { body } = await fetchStorefront<StorefrontListResponse<CategorySummary>>(
        `/api/storefront/categories?${search.toString()}`,
        undefined,
        3600
    );

    return {
        categories: body.data,
        total: body.meta.total,
    };
}

export async function getProductsByCategory(
    category: string,
    page: number = 0,
    limit: number = 12
): Promise<{ products: ProductSummary[]; count: number }> {
    const offset = page * limit;
    const search = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
    });

    // category pode ser slug (ex: "paineis-solares") ou ID (cat_*)
    if (category) {
        search.set('category', category);
    }

    const { body } = await fetchStorefront<StorefrontListResponse<ProductSummary>>(
        `/api/storefront/products?${search.toString()}`,
        undefined,
        300
    );

    return {
        products: body.data,
        count: body.meta.total,
    };
}

export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
    if (!handle) return null;

    try {
        const { body } = await fetchStorefront<StorefrontDetailResponse<ProductDetail>>(
            `/api/storefront/products/${handle}`,
            undefined,
            600
        );

        return body.data;
    } catch (error) {
        console.error(`[Storefront] Error fetching product ${handle}:`, error);
        return null;
    }
}

/**
 * Medusa Client — REST API Wrapper
 */

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

export type MedusaCategory = {
    id: string;
    name: string;
    handle: string;
    parent_category_id?: string | null;
};

export type MedusaProduct = {
    id: string;
    title: string;
    handle: string;
    description?: string;
    thumbnail?: string;
    variants: Array<{
        id: string;
        title: string;
        sku?: string;
        prices: Array<{
            currency_code: string;
            amount: number;
        }>;
    }>;
    categories?: Array<{ id: string }>;
};

export type MedusaListResponse<T> = {
    products?: T[];
    product_categories?: T[];
    count: number;
    offset: number;
    limit: number;
};

async function fetchMedusa<T>(endpoint: string): Promise<T> {
    const url = `${MEDUSA_BACKEND_URL}${endpoint}`;

    const res = await fetch(url, {
        next: { revalidate: 3600 }, // ISR: 1 hour
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`Medusa API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function getCategories(): Promise<MedusaCategory[]> {
    const data = await fetchMedusa<MedusaListResponse<MedusaCategory>>('/store/product-categories');
    return data.product_categories || [];
}

export async function getProductsByCategory(
    categoryId: string,
    page: number = 0,
    limit: number = 12
): Promise<{ products: MedusaProduct[]; count: number }> {
    const offset = page * limit;
    const data = await fetchMedusa<MedusaListResponse<MedusaProduct>>(
        `/store/products?category_id[]=${categoryId}&offset=${offset}&limit=${limit}`
    );

    return {
        products: data.products || [],
        count: data.count || 0,
    };
}

export async function getProductByHandle(handle: string): Promise<MedusaProduct | null> {
    try {
        const data = await fetchMedusa<MedusaListResponse<MedusaProduct>>(
            `/store/products?handle=${handle}`
        );
        return data.products?.[0] || null;
    } catch (error) {
        console.error(`Error fetching product ${handle}:`, error);
        return null;
    }
}

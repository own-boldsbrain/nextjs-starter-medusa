/**
 * Catalog API Service
 * 
 * Handles catalog operations (categories, products) via Medusa Store API
 * Implements pagination (RFC 8288), caching (RFC 9111), and normalization
 */

import { medusaFetch, extractPaginationFromMedusa, generateETag } from './medusa-fetch';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Category {
    id: string;
    name: string;
    handle: string;
    parent_id?: string | null;
    description?: string;
    metadata?: Record<string, unknown>;
}

export interface ProductSummary {
    id: string;
    title: string;
    handle: string;
    thumbnail?: string;
    description?: string;
    price?: number;
    currency?: string;
    sku?: string;
    metadata?: Record<string, unknown>;
}

export interface ProductDetail extends ProductSummary {
    images?: string[];
    variants?: Array<{
        id: string;
        title: string;
        sku: string;
        prices: Array<{
            amount: number;
            currency_code: string;
        }>;
    }>;
    categories?: Category[];
}

export interface ListCategoriesParams {
    limit?: number;
    cursor?: string;
    parent?: string;
    q?: string;
}

export interface ListProductsParams {
    limit?: number;
    cursor?: string;
    category?: string;
    q?: string;
    sort?: string;
}

export interface Facets {
    price?: {
        min: number;
        max: number;
    };
    brands?: string[];
    power_watts?: number[];
    [key: string]: unknown;
}

// ============================================================================
// CATALOG FUNCTIONS
// ============================================================================

/**
 * List categories with pagination
 * 
 * @param params Query parameters
 * @returns Categories list with pagination metadata
 */
export async function listCategories(params: ListCategoriesParams) {
    const { limit = 20, cursor, parent, q } = params;
    const offset = cursor ? parseInt(cursor, 10) : 0;

    try {
        const response = await medusaFetch<{
            product_categories: Category[];
            offset: number;
            limit: number;
            count: number;
        }>('/store/product-categories', {
            params: {
                limit,
                offset,
                parent_category_id: parent,
                q,
            },
        });

        const { product_categories = [], offset: resOffset, limit: resLimit, count } = response.data;
        const pagination = extractPaginationFromMedusa({ offset: resOffset, limit: resLimit, count });

        return {
            categories: product_categories,
            ...pagination,
            etag: generateETag(product_categories),
        };
    } catch (error) {
        console.error('[listCategories] Error:', error);
        throw error;
    }
}

/**
 * List products with pagination and filtering
 * 
 * @param params Query parameters
 * @returns Products list with pagination and facets
 */
export async function listProducts(params: ListProductsParams) {
    const { limit = 24, cursor, category, q, sort } = params;
    const offset = cursor ? parseInt(cursor, 10) : 0;

    try {
        const response = await medusaFetch<{
            products: ProductSummary[];
            offset: number;
            limit: number;
            count: number;
        }>('/store/products', {
            params: {
                limit,
                offset,
                category_id: category,
                q,
                // Medusa sorting: created_at, updated_at
                // Custom sorting may need backend customization
            },
        });

        const { products = [], offset: resOffset, limit: resLimit, count } = response.data;
        const pagination = extractPaginationFromMedusa({ offset: resOffset, limit: resLimit, count });

        // Normalize product data
        const normalizedProducts = products.map(normalizeProductSummary);

        // Extract facets (basic implementation)
        const facets = extractFacets(products);

        return {
            products: normalizedProducts,
            ...pagination,
            facets,
            etag: generateETag(normalizedProducts),
        };
    } catch (error) {
        console.error('[listProducts] Error:', error);
        throw error;
    }
}

/**
 * Get product by ID or handle
 * 
 * @param idOrHandle Product ID or handle
 * @returns Product detail
 */
export async function getProduct(idOrHandle: string) {
    try {
        const response = await medusaFetch<{
            product: ProductDetail;
        }>(`/store/products/${idOrHandle}`);

        const { product } = response.data;

        if (!product) {
            return {
                product: null,
                etag: undefined,
            };
        }

        const normalizedProduct = normalizeProductDetail(product);

        return {
            product: normalizedProduct,
            etag: generateETag(normalizedProduct),
        };
    } catch (error) {
        console.error('[getProduct] Error:', error);
        return {
            product: null,
            etag: undefined,
        };
    }
}

/**
 * Get facets for filtering
 * 
 * @param params Query parameters
 * @returns Aggregated facets
 */
export async function getFacets(params: { category?: string; q?: string }) {
    try {
        // Fetch products to extract facets
        const response = await medusaFetch<{
            products: ProductSummary[];
        }>('/store/products', {
            params: {
                limit: 1000, // Fetch large set for aggregation
                category_id: params.category,
                q: params.q,
            },
        });

        const { products = [] } = response.data;
        const facets = extractFacets(products);

        return {
            facets,
        };
    } catch (error) {
        console.error('[getFacets] Error:', error);
        return {
            facets: {},
        };
    }
}

// ============================================================================
// NORMALIZATION HELPERS
// ============================================================================

/**
 * Normalize product summary from Medusa format
 */
function normalizeProductSummary(product: any): ProductSummary {
    const variant = product.variants?.[0];
    const price = variant?.prices?.[0];

    return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        thumbnail: product.thumbnail || undefined,
        description: product.description || undefined,
        price: price?.amount ? price.amount / 100 : undefined, // Convert cents to currency
        currency: price?.currency_code || 'BRL',
        sku: variant?.sku || undefined,
        metadata: product.metadata || {},
    };
}

/**
 * Normalize product detail from Medusa format
 */
function normalizeProductDetail(product: any): ProductDetail {
    const summary = normalizeProductSummary(product);

    return {
        ...summary,
        images: product.images?.map((img: any) => img.url) || [],
        variants: product.variants?.map((v: any) => ({
            id: v.id,
            title: v.title,
            sku: v.sku,
            prices: v.prices?.map((p: any) => ({
                amount: p.amount / 100, // Convert cents
                currency_code: p.currency_code,
            })) || [],
        })) || [],
        categories: product.categories || [],
    };
}

/**
 * Extract facets from products list
 * 
 * NOTE: This is a basic implementation. For production, consider using
 * a search engine (Elasticsearch, Meilisearch) or Medusa plugins for faceted search.
 */
function extractFacets(products: any[]): Facets {
    const facets: Facets = {
        price: { min: Infinity, max: -Infinity },
        brands: [],
        power_watts: [],
    };

    products.forEach((product) => {
        // Extract price range
        const variant = product.variants?.[0];
        const price = variant?.prices?.[0];
        if (price?.amount) {
            const priceValue = price.amount / 100;
            facets.price!.min = Math.min(facets.price!.min, priceValue);
            facets.price!.max = Math.max(facets.price!.max, priceValue);
        }

        // Extract brand from metadata
        if (product.metadata?.brand) {
            const brand = String(product.metadata.brand);
            if (!facets.brands!.includes(brand)) {
                facets.brands!.push(brand);
            }
        }

        // Extract power from metadata
        if (product.metadata?.power_watts) {
            const power = Number(product.metadata.power_watts);
            if (!facets.power_watts!.includes(power)) {
                facets.power_watts!.push(power);
            }
        }
    });

    // Clean up infinities if no products
    if (facets.price!.min === Infinity) {
        facets.price = { min: 0, max: 0 };
    }

    return facets;
}

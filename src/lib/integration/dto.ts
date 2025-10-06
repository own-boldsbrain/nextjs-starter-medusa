/**
 * DTOs e Normalização de Dados - Integração Frontend ↔ Backend
 * 
 * Converte dados do Medusa Store API para modelos do domínio Yello Solar Hub
 * 
 * Responsabilidades:
 * - Definir interfaces Frontend-friendly
 * - Normalizar response do Medusa (remover campos internos, renomear, mapear)
 * - Extrair metadata relevante (potência, voltagem, etc.)
 * - Formatar preços (centavos → BRL)
 * - Mapear imagens (thumbnail + gallery)
 * 
 * @see https://docs.medusajs.com/api/store
 */

// ============================================================================
// FRONTEND DTOs (contratos para UI)
// ============================================================================

/**
 * Categoria (resumo) para listagens
 */
export interface CategorySummary {
    id: string;
    name: string;
    handle: string;
    parent_id?: string | null;
    description?: string;
    metadata?: Record<string, any>;
}

/**
 * Produto (resumo) para listagens/cards
 */
export interface ProductSummary {
    id: string;
    title: string;
    handle: string;
    thumbnail: string;
    description?: string;
    price: number; // em centavos (R$ 25.000 = 2.500.000)
    currency_code: string; // "brl"
    sku?: string;
    metadata?: {
        power_watts?: number;
        voltage?: string;
        brand?: string;
        [key: string]: any;
    };
}

/**
 * Variante de produto (para seleção)
 */
export interface ProductVariant {
    id: string;
    title: string;
    sku?: string;
    prices: {
        amount: number; // centavos
        currency_code: string;
    }[];
    inventory_quantity?: number;
    allow_backorder?: boolean;
    metadata?: Record<string, any>;
}

/**
 * Produto (detalhe completo) para PDPs
 */
export interface ProductDetail extends ProductSummary {
    description: string;
    images: string[]; // galeria completa
    variants: ProductVariant[];
    categories: CategorySummary[];
    material?: string;
    weight?: number;
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    metadata: Record<string, any>;
}

/**
 * Item no carrinho
 */
export interface CartLineItem {
    id: string;
    variant_id: string;
    product_id: string;
    title: string;
    thumbnail?: string;
    quantity: number;
    unit_price: number; // centavos
    subtotal: number; // centavos (quantity * unit_price)
    metadata?: Record<string, any>;
}

/**
 * Carrinho completo
 */
export interface Cart {
    id: string;
    items: CartLineItem[];
    email?: string;
    shipping_address?: any;
    billing_address?: any;
    region_id?: string;
    subtotal: number; // centavos
    discount_total: number; // centavos
    shipping_total: number; // centavos
    tax_total: number; // centavos
    total: number; // centavos
    currency_code: string;
    metadata?: Record<string, any>;
}

/**
 * Região (para checkout)
 */
export interface Region {
    id: string;
    name: string;
    currency_code: string;
    tax_rate: number;
    countries: { iso_2: string; display_name: string }[];
}

// ============================================================================
// MEDUSA RAW TYPES (parcial, para referência)
// ============================================================================

interface MedusaCategory {
    id: string;
    name: string;
    handle: string;
    parent_category_id?: string | null;
    description?: string;
    metadata?: Record<string, any>;
    created_at?: string;
    updated_at?: string;
}

interface MedusaProduct {
    id: string;
    title: string;
    handle: string;
    description?: string;
    thumbnail?: string;
    images?: { url: string }[];
    variants?: MedusaVariant[];
    categories?: MedusaCategory[];
    material?: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    metadata?: Record<string, any>;
    created_at?: string;
    updated_at?: string;
}

interface MedusaVariant {
    id: string;
    title: string;
    sku?: string;
    prices?: { amount: number; currency_code: string }[];
    inventory_quantity?: number;
    allow_backorder?: boolean;
    metadata?: Record<string, any>;
}

interface MedusaCart {
    id: string;
    items?: MedusaLineItem[];
    email?: string;
    region?: { id: string; currency_code: string };
    subtotal?: number;
    discount_total?: number;
    shipping_total?: number;
    tax_total?: number;
    total?: number;
    metadata?: Record<string, any>;
}

interface MedusaLineItem {
    id: string;
    variant_id: string;
    product_id: string;
    title: string;
    thumbnail?: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    metadata?: Record<string, any>;
}

// ============================================================================
// NORMALIZERS (Medusa → Frontend DTO)
// ============================================================================

/**
 * Normaliza categoria do Medusa para CategorySummary
 */
export function normalizeCategory(medusaCategory: MedusaCategory): CategorySummary {
    return {
        id: medusaCategory.id,
        name: medusaCategory.name,
        handle: medusaCategory.handle,
        parent_id: medusaCategory.parent_category_id,
        description: medusaCategory.description,
        metadata: medusaCategory.metadata,
    };
}

/**
 * Normaliza array de categorias
 */
export function normalizeCategories(medusaCategories: MedusaCategory[]): CategorySummary[] {
    return medusaCategories.map(normalizeCategory);
}

/**
 * Normaliza produto do Medusa para ProductSummary (listagens)
 */
export function normalizeProductSummary(medusaProduct: MedusaProduct): ProductSummary {
    // Extrair preço da primeira variante
    const firstVariant = medusaProduct.variants?.[0];
    const price = firstVariant?.prices?.[0]?.amount ?? 0;
    const currency_code = firstVariant?.prices?.[0]?.currency_code ?? 'brl';
    const sku = firstVariant?.sku;

    return {
        id: medusaProduct.id,
        title: medusaProduct.title,
        handle: medusaProduct.handle,
        thumbnail: medusaProduct.thumbnail || '/placeholder-product.png',
        description: medusaProduct.description,
        price,
        currency_code,
        sku,
        metadata: medusaProduct.metadata,
    };
}

/**
 * Normaliza array de produtos para summaries
 */
export function normalizeProductSummaries(medusaProducts: MedusaProduct[]): ProductSummary[] {
    return medusaProducts.map(normalizeProductSummary);
}

/**
 * Normaliza variante do Medusa
 */
export function normalizeVariant(medusaVariant: MedusaVariant): ProductVariant {
    return {
        id: medusaVariant.id,
        title: medusaVariant.title,
        sku: medusaVariant.sku,
        prices: medusaVariant.prices || [],
        inventory_quantity: medusaVariant.inventory_quantity,
        allow_backorder: medusaVariant.allow_backorder,
        metadata: medusaVariant.metadata,
    };
}

/**
 * Normaliza produto do Medusa para ProductDetail (PDP)
 */
export function normalizeProductDetail(medusaProduct: MedusaProduct): ProductDetail {
    const summary = normalizeProductSummary(medusaProduct);

    return {
        ...summary,
        description: medusaProduct.description || '',
        images: medusaProduct.images?.map((img) => img.url) || [summary.thumbnail],
        variants: medusaProduct.variants?.map(normalizeVariant) || [],
        categories: medusaProduct.categories?.map(normalizeCategory) || [],
        material: medusaProduct.material,
        weight: medusaProduct.weight,
        dimensions: {
            length: medusaProduct.length,
            width: medusaProduct.width,
            height: medusaProduct.height,
        },
        metadata: medusaProduct.metadata || {},
    };
}

/**
 * Normaliza line item do Medusa
 */
export function normalizeLineItem(medusaItem: MedusaLineItem): CartLineItem {
    return {
        id: medusaItem.id,
        variant_id: medusaItem.variant_id,
        product_id: medusaItem.product_id,
        title: medusaItem.title,
        thumbnail: medusaItem.thumbnail,
        quantity: medusaItem.quantity,
        unit_price: medusaItem.unit_price,
        subtotal: medusaItem.subtotal,
        metadata: medusaItem.metadata,
    };
}

/**
 * Normaliza carrinho do Medusa
 */
export function normalizeCart(medusaCart: MedusaCart): Cart {
    return {
        id: medusaCart.id,
        items: medusaCart.items?.map(normalizeLineItem) || [],
        email: medusaCart.email,
        region_id: medusaCart.region?.id,
        subtotal: medusaCart.subtotal ?? 0,
        discount_total: medusaCart.discount_total ?? 0,
        shipping_total: medusaCart.shipping_total ?? 0,
        tax_total: medusaCart.tax_total ?? 0,
        total: medusaCart.total ?? 0,
        currency_code: medusaCart.region?.currency_code ?? 'brl',
        metadata: medusaCart.metadata,
    };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formata preço em centavos para string BRL
 * @param cents Preço em centavos (ex: 250000 = R$ 2.500,00)
 * @param currency Código da moeda (default: "BRL")
 * @returns String formatada (ex: "R$ 2.500,00")
 */
export function formatPrice(cents: number, currency: string = 'BRL'): string {
    const value = cents / 100;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(value);
}

/**
 * Extrai metadata tipada de produto solar
 * @param metadata Metadata do Medusa
 * @returns Metadata normalizada com tipos conhecidos
 */
export function extractSolarMetadata(metadata?: Record<string, any>) {
    if (!metadata) return {};

    return {
        power_watts: metadata.power_watts ? Number(metadata.power_watts) : undefined,
        voltage: metadata.voltage ? String(metadata.voltage) : undefined,
        brand: metadata.brand ? String(metadata.brand) : undefined,
        efficiency: metadata.efficiency ? Number(metadata.efficiency) : undefined,
        warranty_years: metadata.warranty_years ? Number(metadata.warranty_years) : undefined,
        certifications: metadata.certifications ? String(metadata.certifications) : undefined,
    };
}

/**
 * Calcula subtotal de array de line items
 * @param items Array de CartLineItem
 * @returns Subtotal em centavos
 */
export function calculateSubtotal(items: CartLineItem[]): number {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
}

/**
 * Verifica se produto está em estoque
 * @param variant Variante do produto
 * @returns true se em estoque ou com backorder permitido
 */
export function isInStock(variant: ProductVariant): boolean {
    if (variant.allow_backorder) return true;
    return (variant.inventory_quantity ?? 0) > 0;
}

/**
 * Obtém menor preço de um produto (considerando todas variantes)
 * @param product ProductDetail com variantes
 * @returns Menor preço em centavos
 */
export function getLowestPrice(product: ProductDetail): number {
    if (!product.variants || product.variants.length === 0) {
        return product.price;
    }

    const prices = product.variants.flatMap((v) =>
        v.prices.filter((p) => p.currency_code === product.currency_code).map((p) => p.amount)
    );

    return prices.length > 0 ? Math.min(...prices) : product.price;
}

/**
 * Obtém maior preço de um produto (considerando todas variantes)
 * @param product ProductDetail com variantes
 * @returns Maior preço em centavos
 */
export function getHighestPrice(product: ProductDetail): number {
    if (!product.variants || product.variants.length === 0) {
        return product.price;
    }

    const prices = product.variants.flatMap((v) =>
        v.prices.filter((p) => p.currency_code === product.currency_code).map((p) => p.amount)
    );

    return prices.length > 0 ? Math.max(...prices) : product.price;
}

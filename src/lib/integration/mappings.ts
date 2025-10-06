/**
 * Mapeamentos Slug ↔ ID para Integração Frontend ↔ Backend
 * 
 * Taxonomia Yello Solar Hub:
 * - 5 Kits (on-grid, off-grid-interativo, zero-grid, hibrido, antiapagao)
 * - 9 Produtos (paineis-solares, baterias, inversores, carregadores-ev, medidor-grid-zero, 
 *               string-box, estruturas, bomba-de-agua, transformador)
 * 
 * Total: 14 categorias
 * 
 * @see YSH_backend/scripts/seed-categories.ts
 */

// ============================================================================
// TYPES
// ============================================================================

export interface CategoryMapping {
    id: string;
    slug: string;
    name: string;
    type: 'kit' | 'product';
    parent_id?: string;
}

// ============================================================================
// CATEGORY MAPPINGS (14 categorias)
// ============================================================================

export const CATEGORY_MAPPINGS: CategoryMapping[] = [
    // KITS (5)
    {
        id: 'cat_kit_on_grid',
        slug: 'on-grid',
        name: 'Kit On-Grid',
        type: 'kit',
    },
    {
        id: 'cat_kit_off_grid_interativo',
        slug: 'off-grid-interativo',
        name: 'Kit Off-Grid Interativo',
        type: 'kit',
    },
    {
        id: 'cat_kit_zero_grid',
        slug: 'zero-grid',
        name: 'Kit Zero Grid',
        type: 'kit',
    },
    {
        id: 'cat_kit_hibrido',
        slug: 'hibrido',
        name: 'Kit Híbrido',
        type: 'kit',
    },
    {
        id: 'cat_kit_antiapagao',
        slug: 'antiapagao',
        name: 'Kit Antiapagão',
        type: 'kit',
    },

    // PRODUTOS (9)
    {
        id: 'cat_paineis_solares',
        slug: 'paineis-solares',
        name: 'Painéis Solares',
        type: 'product',
    },
    {
        id: 'cat_baterias',
        slug: 'baterias',
        name: 'Baterias',
        type: 'product',
    },
    {
        id: 'cat_inversores',
        slug: 'inversores',
        name: 'Inversores',
        type: 'product',
    },
    {
        id: 'cat_carregadores_veiculares',
        slug: 'carregadores-ev',
        name: 'Carregadores Veiculares',
        type: 'product',
    },
    {
        id: 'cat_medidor_grid_zero',
        slug: 'medidor-grid-zero',
        name: 'Medidor Grid Zero',
        type: 'product',
    },
    {
        id: 'cat_string_box',
        slug: 'string-box',
        name: 'String Box',
        type: 'product',
    },
    {
        id: 'cat_estrutura_montagem',
        slug: 'estruturas',
        name: 'Estrutura de Montagem',
        type: 'product',
    },
    {
        id: 'cat_bomba_agua',
        slug: 'bomba-de-agua',
        name: 'Bomba de Água Solar',
        type: 'product',
    },
    {
        id: 'cat_transformador',
        slug: 'transformador',
        name: 'Transformador',
        type: 'product',
    },
];

// ============================================================================
// LOOKUP MAPS (para performance O(1))
// ============================================================================

// Slug → ID
export const SLUG_TO_ID: Map<string, string> = new Map(
    CATEGORY_MAPPINGS.map((cat) => [cat.slug, cat.id])
);

// ID → Slug
export const ID_TO_SLUG: Map<string, string> = new Map(
    CATEGORY_MAPPINGS.map((cat) => [cat.id, cat.slug])
);

// Slug → CategoryMapping completo
export const SLUG_TO_CATEGORY: Map<string, CategoryMapping> = new Map(
    CATEGORY_MAPPINGS.map((cat) => [cat.slug, cat])
);

// ID → CategoryMapping completo
export const ID_TO_CATEGORY: Map<string, CategoryMapping> = new Map(
    CATEGORY_MAPPINGS.map((cat) => [cat.id, cat])
);

// ============================================================================
// KIT MAPPINGS (subconjunto de 5 kits)
// ============================================================================

export const KIT_MAPPINGS = CATEGORY_MAPPINGS.filter((cat) => cat.type === 'kit');

export const KIT_SLUG_TO_ID: Map<string, string> = new Map(
    KIT_MAPPINGS.map((kit) => [kit.slug, kit.id])
);

export const KIT_ID_TO_SLUG: Map<string, string> = new Map(
    KIT_MAPPINGS.map((kit) => [kit.id, kit.slug])
);

// ============================================================================
// PRODUCT MAPPINGS (subconjunto de 9 produtos)
// ============================================================================

export const PRODUCT_CATEGORY_MAPPINGS = CATEGORY_MAPPINGS.filter(
    (cat) => cat.type === 'product'
);

export const PRODUCT_SLUG_TO_ID: Map<string, string> = new Map(
    PRODUCT_CATEGORY_MAPPINGS.map((prod) => [prod.slug, prod.id])
);

export const PRODUCT_ID_TO_SLUG: Map<string, string> = new Map(
    PRODUCT_CATEGORY_MAPPINGS.map((prod) => [prod.id, prod.slug])
);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Converte slug de categoria para ID do backend
 * @param slug Slug amigável (ex: "paineis-solares")
 * @returns ID do backend (ex: "cat_paineis_solares") ou null se não encontrado
 */
export function slugToCategoryId(slug: string): string | null {
    return SLUG_TO_ID.get(slug) ?? null;
}

/**
 * Converte ID do backend para slug amigável
 * @param id ID do backend (ex: "cat_paineis_solares")
 * @returns Slug amigável (ex: "paineis-solares") ou null se não encontrado
 */
export function categoryIdToSlug(id: string): string | null {
    return ID_TO_SLUG.get(id) ?? null;
}

/**
 * Converte slug de kit para ID do backend
 * @param slug Slug do kit (ex: "on-grid")
 * @returns ID do backend (ex: "cat_kit_on_grid") ou null se não encontrado
 */
export function kitSlugToCategoryId(slug: string): string | null {
    return KIT_SLUG_TO_ID.get(slug) ?? null;
}

/**
 * Converte ID do backend para slug de kit
 * @param id ID do backend (ex: "cat_kit_on_grid")
 * @returns Slug do kit (ex: "on-grid") ou null se não encontrado
 */
export function categoryIdToKitSlug(id: string): string | null {
    return KIT_ID_TO_SLUG.get(id) ?? null;
}

/**
 * Obtém CategoryMapping completo por slug
 * @param slug Slug amigável
 * @returns CategoryMapping ou null
 */
export function getCategoryBySlug(slug: string): CategoryMapping | null {
    return SLUG_TO_CATEGORY.get(slug) ?? null;
}

/**
 * Obtém CategoryMapping completo por ID
 * @param id ID do backend
 * @returns CategoryMapping ou null
 */
export function getCategoryById(id: string): CategoryMapping | null {
    return ID_TO_CATEGORY.get(id) ?? null;
}

/**
 * Verifica se um slug é de kit
 * @param slug Slug a verificar
 * @returns true se for kit, false caso contrário
 */
export function isKitSlug(slug: string): boolean {
    const category = getCategoryBySlug(slug);
    return category?.type === 'kit';
}

/**
 * Verifica se um slug é de categoria de produto
 * @param slug Slug a verificar
 * @returns true se for categoria de produto, false caso contrário
 */
export function isProductCategorySlug(slug: string): boolean {
    const category = getCategoryBySlug(slug);
    return category?.type === 'product';
}

/**
 * Lista todos os slugs de kits
 * @returns Array de slugs de kits
 */
export function getAllKitSlugs(): string[] {
    return KIT_MAPPINGS.map((kit) => kit.slug);
}

/**
 * Lista todos os slugs de categorias de produtos
 * @returns Array de slugs de categorias de produtos
 */
export function getAllProductCategorySlugs(): string[] {
    return PRODUCT_CATEGORY_MAPPINGS.map((prod) => prod.slug);
}

/**
 * Lista todos os slugs (kits + produtos)
 * @returns Array de todos os slugs
 */
export function getAllCategorySlugs(): string[] {
    return CATEGORY_MAPPINGS.map((cat) => cat.slug);
}

/**
 * Valida se os mapeamentos são bidirecionais (para testes)
 * @returns true se todos os mapeamentos são invertíveis
 */
export function validateMappings(): boolean {
    // Verificar slug → id → slug
    for (const [slug, id] of Array.from(SLUG_TO_ID.entries())) {
        const backToSlug = ID_TO_SLUG.get(id);
        if (backToSlug !== slug) {
            console.error(`Mapping error: slug "${slug}" → id "${id}" → slug "${backToSlug}"`);
            return false;
        }
    }

    // Verificar id → slug → id
    for (const [id, slug] of Array.from(ID_TO_SLUG.entries())) {
        const backToId = SLUG_TO_ID.get(slug);
        if (backToId !== id) {
            console.error(`Mapping error: id "${id}" → slug "${slug}" → id "${backToId}"`);
            return false;
        }
    }

    // Verificar contagem
    if (SLUG_TO_ID.size !== 14 || ID_TO_SLUG.size !== 14) {
        console.error(`Mapping count error: expected 14, got ${SLUG_TO_ID.size} and ${ID_TO_SLUG.size}`);
        return false;
    }

    return true;
}// ============================================================================
// SELF-VALIDATION (executado na inicialização em dev)
// ============================================================================

if (process.env.NODE_ENV === 'development') {
    const isValid = validateMappings();
    if (!isValid) {
        console.warn('[MAPPINGS] ⚠️  Mapping validation failed! Check console for details.');
    } else {
        console.log('[MAPPINGS] ✅ All mappings validated (14 categories: 5 kits + 9 products)');
    }
}

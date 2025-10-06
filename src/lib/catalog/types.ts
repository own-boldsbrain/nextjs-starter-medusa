/**
 * Catalog Types
 * 
 * TypeScript types generated from JSON schemas for solar equipment catalog
 * Aligned with Medusa product structure
 */

// ========================================
// Base Types
// ========================================

export type TierLevel = 'XPP' | 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | 'XGG';

export type DistributorSource = 'NeoSolar' | 'Solfácil' | 'ODEX' | 'Fortlev';

export type VoltageType =
    | 'monofasico_127v'
    | 'monofasico_220v'
    | 'bifasico_220v'
    | 'trifasico_220v'
    | 'trifasico_380v';

export interface Dimensions {
    length: number; // mm
    width: number; // mm
    height?: number; // mm
    thickness?: number; // mm
}

export interface WarrantyInfo {
    product: number; // years
    performance: number; // years
}

// ========================================
// Solar Panel Types
// ========================================

export type PanelTechnology =
    | 'Monocristalino'
    | 'Monocristalino PERC'
    | 'Monocristalino PERC Half-Cell'
    | 'Monocristalino Half-Cell (dopagem Gálio)'
    | 'N-Type TOPCon'
    | 'N-Type TOPCon Bifacial'
    | 'N-Type Tiger Neo Bifacial'
    | 'N-Type Bifacial'
    | 'N-Type Monocristalino Full Black'
    | 'HJT (Heterojunction) Bifacial'
    | 'Policristalino';

export interface SolarPanel {
    sku: string;
    manufacturer: string;
    model: string;
    technology: PanelTechnology;
    kwp: number;
    cells: number;
    efficiency_pct: number;
    dimensions_mm: Dimensions;
    weight_kg: number;
    warranty_years: WarrantyInfo;
    price_brl: number;
    source: DistributorSource;
    tier_recommendation: TierLevel[];
    use_cases: string[];
    bifacial: boolean;
    bifaciality_pct?: number;
    certifications: string[];
    // Metadata for Medusa integration
    images?: string[];
    datasheet_url?: string;
    stock_quantity?: number;
    last_updated?: string;
}

export interface PanelsCatalog {
    metadata: {
        version: string;
        last_updated: string;
        sources: DistributorSource[];
        currency: 'BRL' | 'USD';
        notes?: string;
    };
    panels: SolarPanel[];
}

// ========================================
// Inverter Types
// ========================================

export type InverterType = 'microinverter' | 'string' | 'hybrid' | 'off-grid';

export interface Inverter {
    sku: string;
    manufacturer: string;
    model: string;
    type: InverterType;
    kw_ac_nominal: number;
    max_dc_power_kw: number;
    voltage: VoltageType;
    mppt_count: number;
    max_modules_per_mppt: number;
    efficiency_pct: number;
    features: string[];
    dimensions_mm: Dimensions;
    weight_kg: number;
    warranty_years: number;
    price_brl: number;
    source: DistributorSource;
    tier_recommendation: TierLevel[];
    use_cases: string[];
    certifications: string[];
    // Metadata for Medusa integration
    images?: string[];
    datasheet_url?: string;
    stock_quantity?: number;
    last_updated?: string;
}

export interface InvertersCatalog {
    metadata: {
        version: string;
        last_updated: string;
        sources: DistributorSource[];
        currency: 'BRL' | 'USD';
        total_skus: number;
        notes?: string;
    };
    inverters: Inverter[];
}

// ========================================
// Accessory Types
// ========================================

export type AccessoryCategory =
    | 'battery'
    | 'ev_charger'
    | 'rsd'
    | 'conduit'
    | 'junction_box'
    | 'fencing'
    | 'portable_charger'
    | 'flexible_panel'
    | 'structure'
    | 'string_box'
    | 'transformer';

export interface Accessory {
    sku: string;
    category: AccessoryCategory;
    manufacturer: string;
    model: string;
    technology?: string;
    capacity_kwh?: number; // for batteries
    voltage_v?: number | VoltageType; // numeric for DC, VoltageType for AC
    power_kw?: number; // for chargers
    features?: string[];
    dimensions_mm?: Dimensions;
    weight_kg?: number;
    warranty_years: number;
    price_brl: number;
    source: DistributorSource;
    tier_recommendation: TierLevel[];
    use_cases: string[];
    certifications: string[];
    // Metadata for Medusa integration
    images?: string[];
    datasheet_url?: string;
    stock_quantity?: number;
    last_updated?: string;
}

export interface AccessoriesCatalog {
    metadata: {
        version: string;
        last_updated: string;
        sources: DistributorSource[];
        currency: 'BRL' | 'USD';
        notes?: string;
    };
    accessories: Accessory[];
}

// ========================================
// Compatibility Matrix Types
// ========================================

export interface CompatibilityRule {
    inverter_sku: string;
    compatible_panel_skus: string[];
    max_panels_per_string: number;
    min_panels_per_string: number;
    optimal_panels_per_string: number;
    voltage_constraints: {
        voc_min_v: number; // Minimum open circuit voltage at Tmin
        voc_max_v: number; // Maximum open circuit voltage at Tmax
        vmp_min_v: number; // Minimum MPP voltage
        vmp_max_v: number; // Maximum MPP voltage
    };
    current_constraints: {
        isc_max_a: number; // Maximum short circuit current
        imp_max_a: number; // Maximum MPP current
    };
    notes?: string;
}

export interface CompatibilityMatrix {
    metadata: {
        version: string;
        last_updated: string;
        notes: string;
    };
    rules: CompatibilityRule[];
}

// ========================================
// TIER-SKU Matrix Types
// ========================================

export interface TierSKUMapping {
    tier: TierLevel;
    hsp_range: {
        min: number; // kWh/kWp/day
        max: number;
    };
    recommended_panels: {
        sku: string;
        priority: 1 | 2 | 3; // 1 = most recommended
        use_case: string;
    }[];
    recommended_inverters: {
        sku: string;
        priority: 1 | 2 | 3;
        use_case: string;
    }[];
    target_customers: string[];
    notes?: string;
}

export interface TierSKUMatrix {
    metadata: {
        version: string;
        last_updated: string;
        notes: string;
    };
    mappings: TierSKUMapping[];
}

// ========================================
// Medusa Product Integration Types
// ========================================

export interface MedusaProductMetadata {
    // Solar equipment specific
    equipment_type: 'panel' | 'inverter' | 'battery' | 'accessory';
    catalog_sku: string;
    manufacturer: string;
    technology?: string;
    tier_levels: TierLevel[];

    // Technical specs (varies by type)
    specs: Record<string, string | number | boolean>;

    // Distributor tracking
    distributor_source: DistributorSource;
    distributor_sku?: string;
    distributor_last_sync?: string;

    // Sizing/compatibility
    compatible_with?: string[]; // SKUs of compatible equipment
    requires_sizing: boolean;
    has_hsp_data: boolean;

    // SEO
    seo_keywords?: string[];
    use_cases?: string[];
}

// Unified type for all catalog products (discriminated union)
export type CatalogProduct =
    | (SolarPanel & { equipment_type: 'panel' })
    | (Inverter & { equipment_type: 'inverter' })
    | (Accessory & { equipment_type: 'accessory' });// ========================================
// Scraper Types
// ========================================

export interface ScrapedProduct {
    sku: string;
    name: string;
    category: 'panel' | 'inverter' | 'battery' | 'accessory';
    manufacturer: string;
    model: string;
    price_brl: number;
    stock_available: boolean;
    images: {
        original_url: string;
        local_path: string;
        thumbnail_path: string;
    }[];
    specifications: Record<string, string>;
    datasheet_url?: string;
    scraped_at: string;
}

export interface ScraperResult {
    distributor: DistributorSource;
    scraped_at: string;
    products: ScrapedProduct[];
    errors: {
        url: string;
        error: string;
    }[];
}

// ========================================
// Helper Functions
// ========================================

export function isSolarPanel(product: CatalogProduct): product is SolarPanel & { equipment_type: 'panel' } {
    return product.equipment_type === 'panel';
}

export function isInverter(product: CatalogProduct): product is Inverter & { equipment_type: 'inverter' } {
    return product.equipment_type === 'inverter';
}

export function isAccessory(product: CatalogProduct): product is Accessory & { equipment_type: 'accessory' } {
    return product.equipment_type === 'accessory';
} export function getTierLabel(tier: TierLevel): string {
    const labels: Record<TierLevel, string> = {
        XPP: 'Extra Pequeno Porte',
        PP: 'Pequeno Porte',
        P: 'Padrão',
        M: 'Médio',
        G: 'Grande',
        GG: 'Extra Grande',
        XG: 'Comercial/Industrial',
        XGG: 'Usinas',
    };
    return labels[tier];
}

export function formatPrice(price_brl: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price_brl);
}

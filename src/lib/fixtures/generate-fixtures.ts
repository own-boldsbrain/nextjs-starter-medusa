#!/usr/bin/env node

/**
 * Fixture Generation Script
 *
 * Reads solar equipment catalog from backend/data/catalog/
 * and generates unified fixtures for storefront development
 *
 * Usage: npx tsx scripts/generate-fixtures.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// TYPES
// ============================================================================

interface ProductSummary {
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

interface Category {
    id: string;
    name: string;
    handle: string;
    parent_id?: string | null;
    description?: string;
    metadata?: Record<string, unknown>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const BACKEND_DATA_PATH = path.join(__dirname, '../../../../YSH_backend/data');
const CATALOG_PATH = path.join(BACKEND_DATA_PATH, 'catalog');
const CATEGORIES_FILE = path.join(BACKEND_DATA_PATH, 'categories.json');
const FIXTURES_PATH = path.join(__dirname, '../fixtures');
const PRODUCTS_FIXTURE = path.join(FIXTURES_PATH, 'products.json');
const CATEGORIES_FIXTURE = path.join(FIXTURES_PATH, 'categories.json');

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
    console.log('🚀 Generating fixtures from catalog data...');

    // Ensure fixtures directory exists
    if (!fs.existsSync(FIXTURES_PATH)) {
        fs.mkdirSync(FIXTURES_PATH, { recursive: true });
    }

    // Generate categories fixture
    console.log('📂 Generating categories fixture...');
    const categories = await generateCategoriesFixture();
    fs.writeFileSync(CATEGORIES_FIXTURE, JSON.stringify(categories, null, 2));
    console.log(`✅ Generated ${categories.categories.length} categories`);

    // Generate products fixture
    console.log('📦 Generating products fixture...');
    const products = await generateProductsFixture();
    fs.writeFileSync(PRODUCTS_FIXTURE, JSON.stringify(products, null, 2));
    console.log(`✅ Generated ${products.length} products`);

    console.log('🎉 Fixtures generated successfully!');
    console.log(`📁 Categories: ${CATEGORIES_FIXTURE}`);
    console.log(`📁 Products: ${PRODUCTS_FIXTURE}`);
}

// ============================================================================
// CATEGORIES FIXTURE
// ============================================================================

async function generateCategoriesFixture(): Promise<{ categories: Category[] }> {
    if (!fs.existsSync(CATEGORIES_FILE)) {
        throw new Error(`Categories file not found: ${CATEGORIES_FILE}`);
    }

    const categoriesData = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));

    // Validate structure
    if (!categoriesData.categories || !Array.isArray(categoriesData.categories)) {
        throw new Error('Invalid categories.json structure');
    }

    return categoriesData;
}

// ============================================================================
// PRODUCTS FIXTURE
// ============================================================================

async function generateProductsFixture(): Promise<ProductSummary[]> {
    const products: ProductSummary[] = [];

    // Read all catalog JSON files
    const catalogFiles = fs.readdirSync(CATALOG_PATH)
        .filter(file => file.endsWith('.json') && file !== 'README.md')
        .map(file => path.join(CATALOG_PATH, file));

    console.log(`📂 Found ${catalogFiles.length} catalog files`);

    for (const file of catalogFiles) {
        const fileName = path.basename(file, '.json');
        console.log(`  📄 Processing ${fileName}.json...`);

        try {
            const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
            const fileProducts = normalizeFileProducts(data, fileName);
            products.push(...fileProducts);
        } catch (error) {
            console.warn(`⚠️  Failed to process ${fileName}.json:`, error);
        }
    }

    return products;
}

// ============================================================================
// NORMALIZATION FUNCTIONS
// ============================================================================

function normalizeFileProducts(data: any, fileName: string): ProductSummary[] {
    switch (fileName) {
        case 'panels':
            return normalizePanels(data);
        case 'inverters':
            return normalizeInverters(data);
        case 'kits':
            return normalizeKits(data);
        case 'batteries':
        case 'solfacil-batteries':
            return normalizeBatteries(data, fileName);
        case 'chargers':
        case 'carregadores':
            return normalizeChargers(data, fileName);
        default:
            // Generic normalization for other equipment
            return normalizeGenericEquipment(data, fileName);
    }
}

function normalizePanels(data: any): ProductSummary[] {
    if (!data.panels || !Array.isArray(data.panels)) return [];

    return data.panels.map((panel: any) => ({
        id: panel.sku,
        title: `${panel.manufacturer} ${panel.model}`,
        handle: panel.sku.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        thumbnail: `/catalog/images/panels/${panel.sku}.jpg`,
        description: `Painel solar ${panel.technology} ${panel.kwp}kWp, ${panel.cells} células, eficiência ${panel.efficiency_pct}%`,
        price: panel.price_brl,
        currency: 'BRL',
        sku: panel.sku,
        metadata: {
            equipment_type: 'panel',
            manufacturer: panel.manufacturer,
            model: panel.model,
            technology: panel.technology,
            kwp: panel.kwp,
            cells: panel.cells,
            efficiency_pct: panel.efficiency_pct,
            dimensions_mm: panel.dimensions_mm,
            weight_kg: panel.weight_kg,
            warranty_years: panel.warranty_years,
            tier_recommendation: panel.tier_recommendation,
            use_cases: panel.use_cases,
            bifacial: panel.bifacial,
            certifications: panel.certifications,
            source: panel.source,
        }
    }));
}

function normalizeInverters(data: any): ProductSummary[] {
    if (!data.inverters || !Array.isArray(data.inverters)) return [];

    return data.inverters.map((inverter: any) => ({
        id: inverter.sku,
        title: `${inverter.manufacturer} ${inverter.model}`,
        handle: inverter.sku.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        thumbnail: `/catalog/images/inverters/${inverter.sku}.jpg`,
        description: `Inversor ${inverter.type} ${inverter.kw_ac_nominal}kW AC, ${inverter.max_dc_power_kw}kW DC`,
        price: inverter.price_brl,
        currency: 'BRL',
        sku: inverter.sku,
        metadata: {
            equipment_type: 'inverter',
            manufacturer: inverter.manufacturer,
            model: inverter.model,
            type: inverter.type,
            kw_ac_nominal: inverter.kw_ac_nominal,
            max_dc_power_kw: inverter.max_dc_power_kw,
            voltage: inverter.voltage,
            mppt_count: inverter.mppt_count,
            efficiency_pct: inverter.efficiency_pct,
            features: inverter.features,
            dimensions_mm: inverter.dimensions_mm,
            weight_kg: inverter.weight_kg,
            warranty_years: inverter.warranty_years,
            tier_recommendation: inverter.tier_recommendation,
            use_cases: inverter.use_cases,
            certifications: inverter.certifications,
            source: inverter.source,
        }
    }));
}

function normalizeKits(data: any): ProductSummary[] {
    if (!Array.isArray(data)) return [];

    return data.map((kit: any, index: number) => {
        // Kits have inconsistent data, try to extract useful info
        const id = kit.id || `kit_${index}`;
        const name = extractKitName(kit);
        const price = extractKitPrice(kit.price);

        return {
            id,
            title: name,
            handle: id.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            thumbnail: kit.image || `/catalog/images/kits/${id}.jpg`,
            description: kit.description || `Kit solar ${name}`,
            price,
            currency: 'BRL',
            sku: id,
            metadata: {
                equipment_type: 'kit',
                manufacturer: kit.manufacturer || 'Vários',
                category: kit.category || 'kits',
                source: kit.source,
                availability: kit.availability,
                raw_name: kit.name,
            }
        };
    });
}

function normalizeBatteries(data: any, fileName: string): ProductSummary[] {
    // Batteries may have different structures
    if (Array.isArray(data)) {
        return data.map((battery: any, index: number) => ({
            id: battery.sku || `battery_${fileName}_${index}`,
            title: battery.name || `${battery.manufacturer} ${battery.model}`,
            handle: (battery.sku || `battery_${index}`).toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            thumbnail: battery.image || `/catalog/images/batteries/${battery.sku || index}.jpg`,
            description: battery.description || `Bateria ${battery.capacity_kwh || ''}kWh`,
            price: battery.price_brl || battery.price,
            currency: 'BRL',
            sku: battery.sku,
            metadata: {
                equipment_type: 'battery',
                ...battery,
            }
        }));
    }

    return [];
}

function normalizeChargers(data: any, fileName: string): ProductSummary[] {
    if (Array.isArray(data)) {
        return data.map((charger: any, index: number) => ({
            id: charger.sku || `charger_${fileName}_${index}`,
            title: charger.name || `${charger.manufacturer} ${charger.model}`,
            handle: (charger.sku || `charger_${index}`).toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            thumbnail: charger.image || `/catalog/images/chargers/${charger.sku || index}.jpg`,
            description: charger.description || `Carregador ${charger.power_kw || ''}kW`,
            price: charger.price_brl || charger.price,
            currency: 'BRL',
            sku: charger.sku,
            metadata: {
                equipment_type: 'charger',
                ...charger,
            }
        }));
    }

    return [];
}

function normalizeGenericEquipment(data: any, fileName: string): ProductSummary[] {
    if (Array.isArray(data)) {
        return data.map((item: any, index: number) => ({
            id: item.sku || item.id || `${fileName}_${index}`,
            title: item.name || item.title || `${fileName} ${index}`,
            handle: (item.sku || item.id || `${fileName}_${index}`).toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            thumbnail: item.image || `/catalog/images/${fileName}/${item.sku || index}.jpg`,
            description: item.description,
            price: item.price_brl || item.price,
            currency: 'BRL',
            sku: item.sku || item.id,
            metadata: {
                equipment_type: fileName,
                ...item,
            }
        }));
    }

    return [];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function extractKitName(kit: any): string {
    // Try different name fields
    if (kit.name && typeof kit.name === 'string' && !kit.name.startsWith('http')) {
        return kit.name;
    }
    if (kit.description && typeof kit.description === 'string') {
        return kit.description.split(' - ')[0] || kit.description;
    }
    return `Kit Solar ${kit.id || 'Desconhecido'}`;
}

function extractKitPrice(priceStr: string): number | undefined {
    if (!priceStr) return undefined;

    // Remove "R$ " and convert to number
    const cleaned = priceStr.replace('R$\u00A0', '').replace(/\./g, '').replace(',', '.');
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? undefined : parsed;
}

// ============================================================================
// EXECUTE
// ============================================================================

if (require.main === module) {
    main().catch(console.error);
}

export { generateProductsFixture, generateCategoriesFixture };

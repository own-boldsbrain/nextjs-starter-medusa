/**
 * Yello Solar Hub - Categories Mapping
 * 
 * Mapeia slugs de URL para IDs de categorias do Medusa
 * Sincronizar com data/categories.json após seed
 */

export interface CategoryMeta {
    id: string;
    title: string;
    slug: string;
    description: string;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    tierLevel?: 'premium' | 'standard' | 'essential';
    hasHSP?: boolean; // Suporta cálculo HSP
    requiresSizing?: boolean; // Necessita dimensionamento
}

/**
 * Mapeamento completo slug -> categoria Medusa
 * IDs devem corresponder ao seed (data/categories.json)
 */
export const categoriesMap: Record<string, CategoryMeta> = {
    // KITS COMPLETOS
    "kit-on-grid": {
        id: "cat_kit_on_grid",
        slug: "kit-on-grid",
        title: "Kit On-Grid",
        description: "Sistema fotovoltaico conectado à rede elétrica. Ideal para reduzir conta de luz com injeção de excedente.",
        seoTitle: "Kit Solar On-Grid | Sistema Conectado à Rede | Yello Solar Hub",
        seoDescription: "Kits solares on-grid completos com painéis TIER 1, inversores e estruturas. Energia solar conectada à rede com ROI em 4-6 anos.",
        keywords: ["kit on-grid", "sistema solar conectado", "geração distribuída", "créditos energéticos"],
        tierLevel: "premium",
        hasHSP: true,
        requiresSizing: true,
    },
    "kit-off-grid-interativo": {
        id: "cat_kit_off_grid_interativo",
        slug: "kit-off-grid-interativo",
        title: "Kit Off-Grid Interativo",
        description: "Sistema isolado com baterias para locais sem acesso à rede elétrica. Autonomia energética total.",
        seoTitle: "Kit Solar Off-Grid | Sistema Isolado com Baterias | Yello Solar Hub",
        seoDescription: "Kits off-grid completos para áreas remotas. Inversores híbridos + baterias de lítio + painéis solares. Autonomia de 3-7 dias.",
        keywords: ["kit off-grid", "sistema isolado", "energia autônoma", "baterias solares"],
        tierLevel: "premium",
        hasHSP: true,
        requiresSizing: true,
    },
    "kit-zero-grid": {
        id: "cat_kit_zero_grid",
        slug: "kit-zero-grid",
        title: "Kit Zero-Grid",
        description: "Sistema inteligente para zerar consumo da rede. Medidor Grid Zero + autoconsumo otimizado.",
        seoTitle: "Kit Zero-Grid | Consumo Zero da Rede Elétrica | Yello Solar Hub",
        seoDescription: "Kits Zero-Grid com medidor inteligente e controle de injeção. Zere sua conta de luz com autoconsumo total.",
        keywords: ["kit zero-grid", "consumo zero", "autoconsumo solar", "medidor grid zero"],
        tierLevel: "premium",
        hasHSP: true,
        requiresSizing: true,
    },
    "kit-hibrido": {
        id: "cat_kit_hibrido",
        slug: "kit-hibrido",
        title: "Kit Híbrido",
        description: "Sistema híbrido on-grid + baterias. Backup automático e aproveitamento de tarifas.",
        seoTitle: "Kit Solar Híbrido | On-Grid + Baterias | Yello Solar Hub",
        seoDescription: "Kits híbridos com backup automático. Combine geração solar + baterias + rede elétrica para máxima eficiência.",
        keywords: ["kit híbrido", "on-grid com baterias", "backup solar", "sistema híbrido"],
        tierLevel: "premium",
        hasHSP: true,
        requiresSizing: true,
    },
    "kit-antiapagao": {
        id: "cat_kit_antiapagao",
        slug: "kit-antiapagao",
        title: "Kit Antiapagão",
        description: "Backup solar automático contra quedas de energia. Comutação em milissegundos.",
        seoTitle: "Kit Antiapagão | Backup Solar Automático | Yello Solar Hub",
        seoDescription: "Kits antiapagão com inversores híbridos e baterias. Proteção contra quedas de energia com comutação instantânea.",
        keywords: ["kit antiapagão", "backup energia", "nobreak solar", "sistema backup"],
        tierLevel: "standard",
        hasHSP: true,
        requiresSizing: true,
    },

    // COMPONENTES PRINCIPAIS
    "paineis-solares": {
        id: "cat_paineis_solares",
        slug: "paineis-solares",
        title: "Painéis Solares",
        description: "Módulos fotovoltaicos TIER 1 de alta eficiência. Tecnologias monocristalina, policristalina e bifacial.",
        seoTitle: "Painéis Solares TIER 1 | Módulos Fotovoltaicos | Yello Solar Hub",
        seoDescription: "Painéis solares das melhores marcas: Canadian Solar, JA Solar, Jinko, Trina. Garantia 25 anos. Eficiência até 22%.",
        keywords: ["painéis solares", "módulos fotovoltaicos", "placas solares", "tier 1"],
        tierLevel: "premium",
        hasHSP: false,
        requiresSizing: false,
    },
    "inversores": {
        id: "cat_inversores",
        slug: "inversores",
        title: "Inversores",
        description: "Inversores on-grid, off-grid e híbridos das principais marcas. Eficiência > 97%.",
        seoTitle: "Inversores Solares | On-Grid, Off-Grid e Híbridos | Yello Solar Hub",
        seoDescription: "Inversores de marcas líderes: Growatt, Deye, Sofar, Hoymiles. Garantia 10 anos. Monitoramento via app.",
        keywords: ["inversores solares", "inversor on-grid", "inversor híbrido", "microinversor"],
        tierLevel: "premium",
        hasHSP: false,
        requiresSizing: false,
    },
    "baterias": {
        id: "cat_baterias",
        slug: "baterias",
        title: "Baterias",
        description: "Baterias de lítio LiFePO4 e chumbo-ácido para sistemas off-grid e híbridos.",
        seoTitle: "Baterias Solares | Lítio e Chumbo-Ácido | Yello Solar Hub",
        seoDescription: "Baterias de lítio LiFePO4 com 6000 ciclos e baterias estacionárias. Garantia até 10 anos.",
        keywords: ["baterias solares", "bateria lítio", "lifepo4", "bateria estacionária"],
        tierLevel: "premium",
        hasHSP: false,
        requiresSizing: false,
    },

    // ACESSÓRIOS E COMPLEMENTOS
    "carregadores-veiculares": {
        id: "cat_carregadores_veiculares",
        slug: "carregadores-veiculares",
        title: "Carregadores Veiculares",
        description: "Wallbox para carros elétricos e híbridos. Carregamento inteligente com energia solar.",
        seoTitle: "Carregadores Veiculares | Wallbox Solar | Yello Solar Hub",
        seoDescription: "Wallbox para carros elétricos com integração solar. Carregue seu veículo com energia limpa e gratuita.",
        keywords: ["wallbox", "carregador elétrico", "carregador solar", "ev charger"],
        tierLevel: "standard",
        hasHSP: false,
        requiresSizing: false,
    },
    "medidor-grid-zero": {
        id: "cat_medidor_grid_zero",
        slug: "medidor-grid-zero",
        title: "Medidor Grid Zero",
        description: "Medidor inteligente para zerar consumo da rede. Controle automático de injeção.",
        seoTitle: "Medidor Grid Zero | Consumo Zero da Rede | Yello Solar Hub",
        seoDescription: "Medidor inteligente Grid Zero com controle de injeção. Evite injeção de excedente e maximize autoconsumo.",
        keywords: ["medidor grid zero", "consumo zero", "controlador injeção", "autoconsumo"],
        tierLevel: "essential",
        hasHSP: false,
        requiresSizing: false,
    },
    "string-box": {
        id: "cat_string_box",
        slug: "string-box",
        title: "String Box",
        description: "Caixas de proteção CC para strings fotovoltaicas. Fusíveis, DPS e seccionadores.",
        seoTitle: "String Box | Proteção CC para Painéis Solares | Yello Solar Hub",
        seoDescription: "String Box com fusíveis, DPS e seccionadores. Proteção completa para strings fotovoltaicas. Normas NBR.",
        keywords: ["string box", "proteção cc", "dps solar", "fusíveis fotovoltaicos"],
        tierLevel: "essential",
        hasHSP: false,
        requiresSizing: false,
    },
    "estrutura-de-montagem": {
        id: "cat_estrutura_montagem",
        slug: "estrutura-de-montagem",
        title: "Estrutura de Montagem",
        description: "Estruturas metálicas para fixação de painéis. Telhado cerâmico, metálico, fibrocimento e solo.",
        seoTitle: "Estruturas de Montagem | Fixação de Painéis Solares | Yello Solar Hub",
        seoDescription: "Estruturas de alumínio e aço inox para todos os tipos de telhado. Garantia 25 anos contra corrosão.",
        keywords: ["estrutura solar", "fixação painéis", "trilho alumínio", "estrutura solo"],
        tierLevel: "standard",
        hasHSP: false,
        requiresSizing: false,
    },
    "bomba-de-agua": {
        id: "cat_bomba_agua",
        slug: "bomba-de-agua",
        title: "Bomba de Água",
        description: "Bombas solares para irrigação, abastecimento e dessalinização. Eficiência energética.",
        seoTitle: "Bombas de Água Solares | Irrigação e Abastecimento | Yello Solar Hub",
        seoDescription: "Bombas solares para poços, cisternas e irrigação. Economia total de energia elétrica.",
        keywords: ["bomba solar", "bomba água solar", "irrigação solar", "bombeamento fotovoltaico"],
        tierLevel: "standard",
        hasHSP: true,
        requiresSizing: true,
    },
    "transformador": {
        id: "cat_transformador",
        slug: "transformador",
        title: "Transformador",
        description: "Transformadores para sistemas de média tensão e usinas solares. Potências até 2500 kVA.",
        seoTitle: "Transformadores | Sistemas de Média Tensão | Yello Solar Hub",
        seoDescription: "Transformadores para conexão em média tensão. Usinas solares e sistemas comerciais/industriais.",
        keywords: ["transformador solar", "média tensão", "usina solar", "transformador trifásico"],
        tierLevel: "essential",
        hasHSP: false,
        requiresSizing: false,
    },
};

/**
 * Busca categoria por slug
 */
export function slugToCategory(slug: string): CategoryMeta | undefined {
    return categoriesMap[slug];
}

/**
 * Lista todas as categorias
 */
export function getAllCategories(): CategoryMeta[] {
    return Object.values(categoriesMap);
}

/**
 * Filtra categorias por tipo (kits, componentes, acessórios)
 */
export function getCategoriesByType(type: 'kits' | 'componentes' | 'acessorios'): CategoryMeta[] {
    const slugs = {
        kits: ['kit-on-grid', 'kit-off-grid-interativo', 'kit-zero-grid', 'kit-hibrido', 'kit-antiapagao'],
        componentes: ['paineis-solares', 'inversores', 'baterias'],
        acessorios: ['carregadores-veiculares', 'medidor-grid-zero', 'string-box', 'estrutura-de-montagem', 'bomba-de-agua', 'transformador'],
    };

    return slugs[type].map(slug => categoriesMap[slug]).filter(Boolean);
}

/**
 * Categorias que requerem dimensionamento (sizing AI)
 */
export function getCategoriesWithSizing(): CategoryMeta[] {
    return getAllCategories().filter(cat => cat.requiresSizing);
}

/**
 * Categorias com suporte HSP (cálculo regional)
 */
export function getCategoriesWithHSP(): CategoryMeta[] {
    return getAllCategories().filter(cat => cat.hasHSP);
}

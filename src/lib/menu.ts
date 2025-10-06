/**
 * Yello Solar Hub - Menu Configuration
 * 
 * Estrutura de navegação para equipamentos solares
 * Usado em MainNav, MobileNav e páginas de categoria
 */

export interface MenuItem {
    title: string;
    href: string;
    description?: string;
    icon?: string;
    category: 'kits' | 'componentes' | 'acessorios';
}

/**
 * Configuração principal do menu de equipamentos
 * Organizado por categoria para melhor UX
 */
export const menuConfig: MenuItem[] = [
    // KITS COMPLETOS
    {
        title: "Kit On-Grid",
        href: "/equipamentos/kit-on-grid",
        description: "Sistema conectado à rede elétrica com energia solar",
        icon: "solar-panel",
        category: 'kits'
    },
    {
        title: "Kit Off-Grid Interativo",
        href: "/equipamentos/kit-off-grid-interativo",
        description: "Sistema isolado com baterias e backup",
        icon: "battery",
        category: 'kits'
    },
    {
        title: "Kit Zero-Grid",
        href: "/equipamentos/kit-zero-grid",
        description: "Consumo zero da rede com autoconsumo total",
        icon: "zap-off",
        category: 'kits'
    },
    {
        title: "Kit Híbrido",
        href: "/equipamentos/kit-hibrido",
        description: "Combinação on-grid + baterias para backup",
        icon: "layers",
        category: 'kits'
    },
    {
        title: "Kit Antiapagão",
        href: "/equipamentos/kit-antiapagao",
        description: "Backup automático em caso de queda de energia",
        icon: "shield",
        category: 'kits'
    },

    // COMPONENTES PRINCIPAIS
    {
        title: "Painéis Solares",
        href: "/equipamentos/paineis-solares",
        description: "Módulos fotovoltaicos TIER 1 de alta eficiência",
        icon: "sun",
        category: 'componentes'
    },
    {
        title: "Inversores",
        href: "/equipamentos/inversores",
        description: "Inversores on-grid, off-grid e híbridos",
        icon: "cpu",
        category: 'componentes'
    },
    {
        title: "Baterias",
        href: "/equipamentos/baterias",
        description: "Baterias de lítio e chumbo-ácido para armazenamento",
        icon: "battery-charging",
        category: 'componentes'
    },

    // ACESSÓRIOS E COMPLEMENTOS
    {
        title: "Carregadores Veiculares",
        href: "/equipamentos/carregadores-veiculares",
        description: "Wallbox para carros elétricos e híbridos",
        icon: "car",
        category: 'acessorios'
    },
    {
        title: "Medidor Grid Zero",
        href: "/equipamentos/medidor-grid-zero",
        description: "Medidor inteligente para consumo zero da rede",
        icon: "gauge",
        category: 'acessorios'
    },
    {
        title: "String Box",
        href: "/equipamentos/string-box",
        description: "Proteção CC para strings de painéis",
        icon: "box",
        category: 'acessorios'
    },
    {
        title: "Estrutura de Montagem",
        href: "/equipamentos/estrutura-de-montagem",
        description: "Estruturas metálicas para telhado e solo",
        icon: "hammer",
        category: 'acessorios'
    },
    {
        title: "Bomba de Água",
        href: "/equipamentos/bomba-de-agua",
        description: "Bombas solares para irrigação e abastecimento",
        icon: "droplet",
        category: 'acessorios'
    },
    {
        title: "Transformador",
        href: "/equipamentos/transformador",
        description: "Transformadores para sistemas de média tensão",
        icon: "zap",
        category: 'acessorios'
    },
] as const;

/**
 * Menu agrupado por categoria para mega-menu
 */
export const menuByCategory = {
    kits: menuConfig.filter(item => item.category === 'kits'),
    componentes: menuConfig.filter(item => item.category === 'componentes'),
    acessorios: menuConfig.filter(item => item.category === 'acessorios'),
} as const;

/**
 * Busca item do menu por href
 */
export function getMenuItemByHref(href: string): MenuItem | undefined {
    return menuConfig.find(item => item.href === href);
}

/**
 * Busca itens relacionados (mesma categoria)
 */
export function getRelatedMenuItems(currentHref: string, limit = 3): MenuItem[] {
    const current = getMenuItemByHref(currentHref);
    if (!current) return [];

    return menuConfig
        .filter(item => item.category === current.category && item.href !== currentHref)
        .slice(0, limit);
}
